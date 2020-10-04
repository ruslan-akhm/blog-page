const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'No such username found' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password!' });
      }
      return done(null, user);
    });
  }
));