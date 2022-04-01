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
const fileUpload = require('express-fileupload');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const passport = require('passport');

const cluster = require('cluster');
const os = require('os');

var config = require('./configure.js');
const route = require('./routes');
const runtime = require('./runtime');

const logger = require('./util/logger');

// var nodemailer = require('nodemailer');
// var transport = nodemailer.createTransport(process.env.smtp);

// global object
global._ = require('lodash');
fluidy = {
	websocket: null,
	runtime: runtime,
	db: null,
	session_store: null,
	logger: logger,
	//transport:transport
}


const knex = require('knex');
const db = require('./db');

if (process.env.PORT) config.port = process.env.PORT;
if (process.env.HOST) config.proxy = process.env.HOST;
if (process.env.DB_HOST) config.database[config.database.type].host = process.env.DB_HOST;
if (process.env.DB_NAME) config.database[config.database.type].database = process.env.DB_NAME;

module.exports = (function (config) {
	var service = function () {
		fluidy.session_store = new KnexSessionStore({
			knex: fluidy.db.knex,
			createtable: false,
			tablename: 'session'
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
					if (config.database.type === 'sqlite3') {
						var db_path = path.resolve(process.env.root_path, config.database[config.database.type].filename);
						if (!fs.existsSync(db_path)) {
							fs.writeFileSync(db_path, '', { flag: 'w' })
						}
					}

					_.each(fluidy.db.dao, (type, i) => {
						var obj = new type();
						obj.create().then(() => {
							console.log('created table : ', obj.table_name);
							if (obj.table_name === 'user') {
								obj.batchInsert([
									{ email: "admin", pwd: "admin" }
								]).then((res) => {

								}).catch((err) => {
									console.log(err);
								})
							}
						})
					})

					for (i = 0; i < me.cpus; i += 1) {
						var worker = cluster.fork();

						worker.on('message', function (msg) {
							eachWorker(function (_worker) {
								_worker.send(msg);
							})
						})
					}

					cluster.on('death', function (worker) {
						fluidy.logger.warn(me.name + ': worker ' + worker.pid + ' died.')
						if (me.autoRestart) {
							fluidy.logger.warn(me.name + ' Restarting worker thread...')
							cluster.fork();
						}
					});
				} else {
					var getAction = function (obj, path) {
						var count = 0;
						var path_arr = path.split('.')
						var result = path_arr.reduce(function (d, index) {
							count++;

							return d[index]
						}, obj)
						return result;
					};
					process.on("message", function (msg) {
						var action_func = getAction(fluidy, msg.action);
						action_func.apply(null, msg.args);
					})

					server.listen(port, host, function () {
						fluidy.logger.info(me.name + ' starting worker thread #' + cluster.worker.id);
					}).on('error', function (err) {
						console.log(err);
						fluidy.logger.error(err.message);
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
		app.use(fileUpload({}));
		app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
		app.use(bodyParser.json({ limit: '100mb' }));
		app.use(cookieParser());
		app.use(express.urlencoded({extended: false, limit:'100mb',parameterLimit:1000000 }));
		app.use(express.json());
		app.use(session({
			key: 'fluidy_sid',
			secret: 'fluidy',
			cookie: {
				maxAge: 1000 * 60 * config.session_time
			},
			saveUninitialized: false,
			resave: false,
			store: fluidy.session_store,
			rolling: true
		}))

		app.use(passport.initialize());
		app.use(passport.session());

		route(app, config);
		if (config.proxy) app.use('/', proxy(config.proxy))

		const expressSwagger = require('express-swagger-generator')(app);
		let options = {
			swaggerDefinition: {
				info: {
					description: 'This is a sample server',
					title: 'Swagger',
					version: '1.0.0',
				},
				host: 'localhost:8081',
				basePath: '/',
				produces: [
					"application/json",
				],
				consumes: [
					"multipart/form-data",
					"application/json",
				],
				schemes: ['http', 'https'],
			},
			basedir: __dirname, //app absolute path
			files: ['./routes/api/*.js'] //Path to the API handle folder
		};
		expressSwagger(options)

		var server = http.createServer(app);

		server.addListener("error", (err) => {
			console.log(err);
			fluidy.logger.error(err.message);
		});

		ClusterServer.name = 'fluidy_cluster';
		ClusterServer.start(server, config.port, config.host);
	};

	db(config.database).then(function (result) {
		fluidy.db = result;
		service();
	}).catch(function (err) {
		console.log(err);
	})
})(config);
