const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

module.exports = function(passport) {
  passport.use(
     new LocalStrategy((email, password, done) => {
       User.findOne({ email: email }, (err, user) => {
        if (err) return console.log(err);
        if (!user) {
          return done(null, false, { message: "No such username found" });
        }
        //check if password is correct
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password is incorrect" });
          }
        });
      })
     })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
  
//   console.log("HEREREERERERERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
   // passport.use(
   //   new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//       //check for user
//       console.log("LOOKING FOR USER EMAIL")
//       User.findOne({ email }, (err, user) => {
//         if (err) return console.log(err);
//         if (!user) {
//           return done(null, false, { message: "No such username found" });
//         }
//         console.log("LOOKING FOR PASSWORD")
//         //check if password is correct
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//           if (err) throw err;
//           if (isMatch) {
//             return done(null, user);
//           } else {
//             return done(null, false, { message: "Password is incorrect" });
//           }
//         });
//       });
//     })
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });
};
