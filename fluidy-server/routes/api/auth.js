const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

passport.use('google', new GoogleStrategy({
  callbackURL: process.env.google_domain + '/auth/google/callback',
  clientID: process.env.google_id,
  clientSecret: process.env.google_secret,
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      if (profile.emails.length > 0) {
        var email = profile._json.email;
        var photo = profile._json.picture;
        var user = new fluidy.db.dao.User();
        user.select({ email: email }).then(function (rows) {
          var query;
          var user_info = { email: email, type: 'google', photo: photo };
          if (rows.length > 0) {
            query = user.update({ email: email }, { photo: photo, created_time: fluidy.db.knex.fn.now() })
          } else {
            query = user.insert({ email: email, photo: photo, type: 'google' })
          }
          query.then(function () {
            done(null, user_info);
          })
        })
      }
    });
  })
)

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'pwd',
  session: true,
  passReqToCallback: false
}, (email, password, done) => {
  // 절차..
  var user = new fluidy.db.dao.User();

  user.select({ email: email, pwd: password }).then((rows) => {
    if (rows.length > 0) {
      console.log('local user :', rows[0])
      done(null, { email: email, type: 'local' })
    } else {
      done(null, false, { message: 'No User' })
    }
  })
}))

module.exports = {
  get: {
    /**
     * 로그인에 대한 상태 체크를 위한 API
     * @route GET /auth/check
     * @group Auth - Operations about auth
     * @returns {object} 200 - 
     * @returns {Error}  500 - Unexpected error
    */
    "check": function (req, res, next) {
      if (req.isAuthenticated()) {
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    },
    /**
     * 로그아웃을 위한 API
     * @route GET /auth/logout
     * @group Auth - Operations about auth
     * @returns {object} 200 - 
     * @returns {Error}  500 - Unexpected error
    */
    "logout": function (req, res, next) {
      req.logout();
      res.status(200).send();
    },
    /**
      * 로컬 로그인을 위한 API
      * @route GET /auth/local
      * @group Auth - Operations about auth
      * @param {string} email.query.required - username or email - eg: user@domain
      * @param {string} pwd.query.required - user's password.
      * @returns {object} 200 - An array of user info
      * @returns {Error}  500 - Unexpected error
    */
    "local": function (req, res, next) {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (info) {
          return res.status(401).send(info.message);
        }
        return req.login(user, loginErr => {
          if (loginErr) {
            return next(loginErr);
          }
          delete user.pwd
          return res.json(user);
        });
      })(req, res, next)
    },
    /**
     * 구글 로그인을 위한 API
     * @route GET /auth/google
     * @group Auth - Operations about auth
     * @returns {object} 200 - An array of user info
     * @returns {Error}  500 - Unexpected error
    */
    "google": function (req, res, next) {
      passport.authenticate('google', {
        scope: ['openid', 'email']
      }
      )(req, res, next);
    },
    "google/callback": [passport.authenticate('google', { successRedirect: `${process.env.google_domain}/#/main`, failureRedirect: '/#/' })],
  }
}