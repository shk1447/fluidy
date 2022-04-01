const fs = require('fs');
const path = require('path')
const fsPath = require('fs-path');

module.exports = {
  get: {
    /**
      * 플로우 연결정보를 가져가기 위한 API
      * @route GET /flow/edges
      * @group Flow - Operations about flow
      * @returns {object} 200 - An array of flow edges info
      * @returns {Error}  default - Unexpected error
    */
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
    /**
      * 플로우 노드정보를 가져가기 위한 API
      * @route GET /flow/nodes
      * @group Flow - Operations about flow
      * @returns {object} 200 - An array of flow nodes info
      * @returns {Error}  default - Unexpected error
    */
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
    /**
      * 플로우 연결정보를 설정하기 위한 API
      * @route POST /flow/edges
      * @group Flow - Operations about flow
      * @returns {object} 200 - An array of flow nodes info
      * @returns {Error}  default - Unexpected error
    */
    "edges": function(req,res,next) {
      var save_path = path.resolve(process.env.root_path, './user_data/' + req.session.passport.user.email + '/edges.json')
      fsPath.writeFile(save_path, req.body.content,'utf8', function() {
        
      });
      res.status(200).send();
    },
    /**
      * 플로우 노드정보를 설정하기 위한 API
      * @route POST /flow/nodes
      * @group Flow - Operations about flow
      * @returns {object} 200 - An array of flow nodes info
      * @returns {Error}  default - Unexpected error
    */
    "nodes": function(req,res,next) {
      var save_path = path.resolve(process.env.root_path, './user_data/' + req.session.passport.user.email + '/nodes.json')
      fsPath.writeFile(save_path, req.body.content,'utf8', function() {
        
      });
      res.status(200).send();
    }
  }
}