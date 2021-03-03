const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const net = require('net');
const http = require('http');
const https = require('https');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const busboy = require("connect-busboy");
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const passport = require('passport');

const cluster = require('cluster');
const os = require('os');

var config = require('./configure.js');
const route = require('./route');
const runtime = require('./runtime');

const logger = require('./util/logger');

// global object
global._ = require('lodash');
mrx = {
    websocket:null,
    runtime:runtime,
    db:null,
    session_store:null,
    logger:logger
}

const knex = require('knex');
const db = require('./db');

if(process.env.PORT) config.port = process.env.PORT;
if(process.env.HOST) config.proxy = process.env.HOST;
if(process.env.DB_HOST) config.database[config.database.type].host = process.env.DB_HOST;
if(process.env.DB_NAME) config.database[config.database.type].database = process.env.DB_NAME;

module.exports = (function(config) {
    var service = function() {
        mrx.session_store = new KnexSessionStore({
            knex:mrx.db.knex,
            createtable:false,
            tablename:'session'
        });
        ClusterServer = {
            name: 'ClusterServer',
            cpus: os.cpus().length,
            autoRestart: true,
            start: function (server, port, host) {
                var me = this,
                    i;

                function eachWorker(callback) { for (var id in cluster.workers) { callback(cluster.workers[id]); } }
                if (cluster.isMaster) {
                    if(config.database.type === 'sqlite3') {
                        var db_path = path.resolve(process.env.root_path, config.database[config.database.type].filename);
                        if(!fs.existsSync(db_path)) {
                            fs.writeFileSync(db_path, '', {flag:'w'})
                        }
                    }
                    
                    _.each(mrx.db.dao, (type,i) => {
                        var obj = new type();
                        obj.create().then(() => {
                            console.log('created table : ', obj.table_name);
                            if(obj.table_name === 'user') {
                                obj.batchInsert([
                                    {email:"admin", pwd:"admin" }
                                ]).then((res) => {
                                    
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                        })
                    })

                    for (i = 0; i < me.cpus; i += 1) {
                        var worker = cluster.fork();

                        worker.on('message', function(msg) {
                            eachWorker(function(_worker) {
                                _worker.send(msg);
                            })
                        })
                    }

                    cluster.on('death', function (worker) {
                        mrx.logger.warn(me.name + ': worker ' + worker.pid + ' died.')
                        if (me.autoRestart) {
                            mrx.logger.warn(me.name + ' Restarting worker thread...')
                            cluster.fork();
                        }
                    });
                } else {
                    var getAction  = function(obj, path) {
                        var count = 0;
                        var path_arr = path.split('.')
                        var result = path_arr.reduce(function (d, index) {
                            count++;

                            return d[index]
                        }, obj)
                        return result;
                    };
                    process.on("message", function(msg) {
                        var action_func = getAction(mrx, msg.action);
                        action_func.apply(null, msg.args);
                    })

                    server.listen(port, host, function(){
                        mrx.logger.info(me.name + ' starting worker thread #' + cluster.worker.id);
                    }).on('error', function(err){
                        console.log(err);
                        mrx.logger.error(err.message);
                    })
                }
            }
        }

        var app = express();

        app.set('view cache', true);
        app.use('/', express.static(path.resolve(config.root_path)))
        app.use(helmet());
        app.use(helmet.xssFilter());
        app.disable('x-powered-by');
        app.use(cors());
        app.use(compression());
        app.use(bodyParser.urlencoded({limit:'5mb',extended:true}));
        app.use(bodyParser.json({limit:'5mb'}));
        app.use(cookieParser());
        app.use(busboy());

        app.use(session({
            key: 'mrx_sid',
            secret: 'mrx',
            cookie: {
                maxAge: 1000 * 60 * config.session_time
            },
            saveUninitialized: false,
            resave: false,
            store:mrx.session_store,
            rolling:true
        }))

        app.use(passport.initialize());
        app.use(passport.session());

        route(app,config);
        if(config.proxy) app.use('/', proxy(config.proxy))

        var server = http.createServer(app);

        server.addListener("error", (err) => {
            console.log(err);
            mrx.logger.error(err.message);
        });

        ClusterServer.name = 'mrx_cluster';
        ClusterServer.start(server, config.port, config.host);
    };

    db(config.database).then(function(result) {
        mrx.db = result;
        service();
    }).catch(function(err) {
        console.log(err);
    })
})(config);
