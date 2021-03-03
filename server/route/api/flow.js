const fs = require('fs');
const path = require('path')
const fsPath = require('fs-path');

module.exports = {
  get: {
    "edges": function(req,res,next) {
      var load_path = path.resolve(process.env.root_path, './user_data/' + req.session.passport.user.email + '/edges.json')
      if(fs.existsSync(load_path)) {
        fs.readFile(load_path, {encoding:'utf-8'}, function(err, data) {
          if(err) res.status(500).send()
          res.status(200).send(JSON.parse(data))
        })
      } else {
        res.status(200).send([]);
      }
    },
    "nodes": function(req,res,next) {
      var load_path = path.resolve(process.env.root_path, './user_data/' + req.session.passport.user.email + '/nodes.json')
      if(fs.existsSync(load_path)) {
        fs.readFile(load_path, {encoding:'utf-8'}, function(err, data) {
          if(err) res.status(500).send()
          res.status(200).send(JSON.parse(data))
        })
      } else {
        res.status(200).send([{
          parent:null,
          id:'root',
          name:'Root Process',
          type:'Process',
          desc:'',
          children:[]
        }])
      }
    }
  },
  post: {
    "edges": function(req,res,next) {
      var save_path = path.resolve(process.env.root_path, './user_data/' + req.session.passport.user.email + '/edges.json')
      fsPath.writeFile(save_path, req.body.content,'utf8', function() {
        
      });
      res.status(200).send();
    },
    "nodes": function(req,res,next) {
      var save_path = path.resolve(process.env.root_path, './user_data/' + req.session.passport.user.email + '/nodes.json')
      fsPath.writeFile(save_path, req.body.content,'utf8', function() {
        
      });
      res.status(200).send();
    }
  }
}