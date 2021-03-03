const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField:'pwd',
  session:true,
  passReqToCallback:false
}, (email, password, done) => {
  // 절차..
  var user = new mrx.db.dao.User();

  user.select({email:email, pwd:password}).then((rows) => {
    if(rows.length > 0) {
      done(null, {email:email, pwd:password})
    } else {
      done(null, false, { message : 'No User' })
    }
  })
}))

module.exports = {
  get: {
    "check": function (req, res, next) {
      if (req.isAuthenticated()) {
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    },
    "logout": function (req, res, next) {
      req.logout();
      res.status(200).send();
    }
  },
  post: {
    "signin": function(req,res,next) {
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
      })(req,res,next)
    },
    "signup": function(req,res,next) {
      var user = new mrx.db.dao.User();
      user.select({email:req.body.email}).then(function(rows) {
        if(rows.length > 0) {
          res.status(200).send({type:'warning',message:'이미 회원가입된 이메일입니다.'});
        } else {
          user.insert({email:req.body.email, pwd: req.body.pwd}).then(function(d) {
            res.status(200).send({type:'success',message:'정상적으로 회원가입이 완료되었습니다.'});
          }).catch(function(err) {
            res.status(500).send();
          })
        }
      })
    }
  }
}