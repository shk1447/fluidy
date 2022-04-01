const { uuid } = require('uuidv4');

/**
 * @typedef ListResponse
 * @property {Array.<Space>} result
 */

/**
 * @typedef Space
 * @property {string} space_guid
 * @property {string} space_name
 */

/**
 * @typedef InfoResponse
 * @property {Array.<User>} result
 */

/**
 * @typedef User
 * @property {string} email
 * @property {string} role
 */

module.exports = {
  get: {
    /**
      * WORK SPACE 리스트를 가져가기 위한 API
      * @route GET /space/list
      * @group Space - Operations about space
      * @produces application/json
      * @consumes application/json
      * @returns {ListResponse.model} 200 - An array of space info
      * @returns {Error}  default - Unexpected error
    */
    list: function (req, res, next) {
      var space = new fluidy.db.dao.Space();
      space.getTable().select('*').where({ email: req.session.passport.user.email })
        .groupBy('space_name').then((rows) => {
          res.status(200).send({ result: rows })
        });
    },
    /**
      * WORK SPACE 정보를 가져가기 위한 API
      * @route GET /space/user
      * @group Space - Operations about space
      * @produces application/json
      * @consumes application/json
      * @param {string} space_guid.body.required - space name
      * @returns {InfoResponse.model} 200 - An array of space info
      * @returns {Error}  default - Unexpected error
    */
    user: function (req, res, next) {
      var space = new fluidy.db.dao.Space();

      space.select({ space_guid: req.query.space_guid }).then((rows) => {
        res.status(200).send({
          result: rows.map((d) => { return { email: d.email, role: d.role } })
        })
      })
    },
    /**
      * WORK SPACE를 로드하기 위한 API
      * @route GET /space/load
      * @group Space - Operations about space
      * @produces application/json
      * @consumes application/json
      * @param {string} space_guid.body.required - space guid
      * @returns {InfoResponse.model} 200 - An array of space info
      * @returns {Error}  default - Unexpected error
    */
    load: function (req, res, next) {
      var space = new fluidy.db.dao.Space();
      var content = new fluidy.db.dao.Content();
      console.log(req.query);
      space.select({ space_guid: req.query.space_guid }).then((rows) => {
        var loaded_space = {}
        if (rows.length > 0) {
          loaded_space[rows[0].space_guid] = {
            name: rows[0].space_name,
            children: []
          }
          content.select({ space_guid: req.query.space_guid }).then((contents) => {
            loaded_space[rows[0].space_guid].children = contents.map((row) => {
              row.name = row.content_name;
              row.content_options = JSON.parse(row.content_options);
              return row
            });
            res.status(200).send({
              result: loaded_space
            })
          })
        }
      })
    }
  },
  post: {
    /**
      * WORK SPACE 추가하기 위한 API
      * @route POST /space/create
      * @group Space - Operations about space
      * @produces application/json
      * @consumes application/json
      * @param {Space.model} space_name.body.required - space name
      * @returns {object} 200 - An array of space info
      * @returns {Error}  default - Unexpected error
    */
    create: function (req, res, next) {
      var space = new fluidy.db.dao.Space();
      var row = {
        space_guid: uuid(),
        space_name: req.body.space_name,
        email: req.session.passport.user.email,
        role: 'manager'
      }
      space.select({ space_name: req.body.space_name }).then((rows) => {
        if (rows.length == 0) {
          space.insert(row).then(() => {
            res.status(200).send({ message: '스페이스가 생성되었습니다.' })
          }).catch((err) => {
            res.status(500).send(err)
          })
        } else {
          res.status(200).send({ message: '동일한 스페이스가 이미 있습니다.' })
        }
      })
    },
    /**
      * WORK SPACE에 사용자를 초대하기 위한 API
      * @route POST /space/rename
      * @group Space - Operations about space
      * @produces application/json
      * @consumes application/json
      * @param {string} space_guid.body.required - old space name
      * @param {string} new_name.body.required - new space name
      * @returns {object} 200 - An array of space info
      * @returns {Error}  default - Unexpected error
    */
    rename: function (req, res, next) {
      var space = new fluidy.db.dao.Space();
      space.select({
        email: req.session.passport.user.email, space_name: req.body.space_name, role: 'manager'
      }).then((rows) => {
        if (rows.length > 0) {
          space.update({ space_guid: req.body.space_guid }, { space_name: req.body.space_name }).then(() => {
            res.status(200).send();
          })
        } else {
          res.status(401).send();
        }
      })
    },
    /**
      * WORK SPACE에 사용자를 초대하기 위한 API
      * @route POST /space/user/add
      * @group Space - Operations about space
      * @produces application/json
      * @consumes application/json
      * @param {string} space_guid.body.required - space guid
      * @param {string} email.body.required - email
      * @param {string} role.body.required - 'manager' | 'editor' | 'viewer' | 'commentor'
      * @returns {object} 200 - An array of space info
      * @returns {Error}  default - Unexpected error
    */
    "user/add": function (req, res, next) {
      var space = new fluidy.db.dao.Space();
      var row = {
        space_guid: req.body.space_guid,
        email: req.body.email,
        role: req.body.role
      }
      space.select({ space_guid: req.body.space_guid }).then((rows) => {
        if (rows.length > 0) {
          var valid = rows.find((d) => d.email == req.body.email);
          if (valid) {
            res.status(200).send({ message: '이미 초대신청하였습니다.' })
          } else {
            row['space_name'] = rows[0].space_name;
            space.insert(row).then(() => {
              res.status(200).send({ message: '초대신청하였습니다.' })
            })
          }
        }
      }).catch((err) => {
        res.status(500).send(err);
      })
    },
    /**
      * WORK SPACE 삭제하기 위한 API
      * @route POST /space/delete
      * @group Space - Operations about space
      * @produces application/json
      * @consumes application/json
      * @param {string} space_guid.body.required - space name
      * @returns {object} 200 - An array of space info
      * @returns {Error}  default - Unexpected error
    */
    delete: function (req, res, next) {
      var space = new fluidy.db.dao.Space();

      space.select({
        email: req.session.passport.user.email,
        space_guid: req.body.space_guid,
        role: 'manager'
      }).then((rows) => {
        if (rows.length > 0) {
          return space.delete({ space_guid: req.body.space_guid }).then(() => {
            res.status(200).send()
          })
        } else {
          res.status(401).send()
        }
      }).catch((err) => {
        res.status(500).send();
      })
    }
  }
}