const fs = require('fs');
const path = require('path');
const fsPath = require('fs-path');

module.exports = {
  get: {
    /**
     * 유저 리스트를 제공하는 API
     * @route GET /auth/check
     * @group Auth - Operations about user
     * @produces application/json
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
    */
    "list": function (req, res, next) {
      var user = new fluidy.db.dao.User();
      var cond = {};
      if (req.query.email) cond['email'] = req.query.email;
      user.select(cond).then(function (rows) {
        var response = rows.map(function (d) {
          delete d.pwd;
          return d
        })
        res.status(200).send(response);
      })
    },
    "info": function (req, res, next) {
      var user = new fluidy.db.dao.User();
      user.select({ email: req.session.passport.user.email }).first().then(function (row) {
        res.status(200).send(row);
      })
    }
  },
  post: {
    /**
     * 회원가입을 위한 API
     * @route POST /user/create
     * @group User - Operations about user
     * @produces application/json
     * @consumes multipart/form-data
     * @param {string} email.body.required - username or email - eg: user@domain
     * @param {string} pwd.body.required - user's password.
     * @param {string} company_name.body.required - user's company name.
     * @param {string} first_name.body.option - user's first name
     * @param {string} last_name.body.option - user's last name
     * @param {file} photo.body.option - user's last name
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
    */
    "create": function (req, res, next) {
      var user = new fluidy.db.dao.User();
      var url = './user_data/' + req.body.email + '.jpg';
      var write_path = path.resolve(process.env.root_path, url);
      fsPath.writeFileSync(write_path, req.files.photo.data)

      var row = {
        type: 'local',
        email: req.body.email,
        pwd: req.body.pwd,
        company_name: req.body.company_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        photo: url
      }
      // fluidy.transport.sendMail({
      //   from:'admin@fludy.co',
      //   to:'sukan8822@gmail.com',
      //   subject:'테스트 메일입니다.',
      //   text:'인증!!!'
      // }, function(err, info) {
      //   if(err) {
      //     console.log(err)
      //   }
      //   console.log('finish mail : ' + info.response);
      //   fluidy.transport.close();
      // })
      user.select({ email: req.body.email }).then((rows) => {
        if (rows.length > 0) {
          res.status(200).send({ message: '이미 가입된 이메일입니다.' })
        } else {
          user.insert(row).then(() => {
            res.status(200).send({ message: '가입 신청이 완료되었습니다.' });
          }).catch((err) => {
            res.status(500).send(err);
          })
        }
      })
    },
    /**
     * 회원정보 수정을 위한 API
     * @route POST /user/update
     * @group User - Operations about user
     * @produces application/json
     * @consumes multipart/form-data
     * @param {string} email.body.required - username or email - eg: user@domain
     * @param {string} pwd.body.required - user's password.
     * @param {string} company_name.body.required - user's company name.
     * @param {string} first_name.body.option - user's first name
     * @param {string} last_name.body.option - user's last name
     * @param {file} photo.body.option - user's last name
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
    */
    "update": function (req, res, next) {
      var user = new fluidy.db.dao.User();

      var url = './user_data/' + req.body.email + '.jpg';
      var write_path = path.resolve(process.env.root_path, url);
      fsPath.writeFileSync(write_path, req.files.photo.data)

      user.update({ email: req.body.email }, {
        pwd: req.body.pwd,
        company_name: req.body.company_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        photo: url
      }).then(() => {
        res.status(200).send({ message: '프로필이 수정되었습니다.' })
      }).catch(() => {
        res.status(500).send()
      })
    },
    /**
     * 회원탈퇴를 위한 API
     * @route POST /user/delete
     * @group User - Operations about user
     * @produces application/json
     * @consumes multipart/form-data
     * @param {string} email.body.required - username or email - eg: user@domain
     * @param {string} pwd.body.required - user's password.
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
    */
    "delete": function (req, res, next) {
      var user = new fluidy.db.dao.User();

      user.delete({ email: req.body.email, pwd: req.body.pwd }).then(() => {
        res.status(200).send({ message: '탈퇴하였습니다.' })
      }).catch((err) => {
        res.status(200).send(err);
      })
    }
  }
}