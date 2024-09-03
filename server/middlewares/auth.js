// middlewares/auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Configura la estrategia local
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ user: username }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      if (user.pwd !== password) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Middleware para verificar autenticación
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = { ensureAuthenticated };
