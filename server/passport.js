const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require('./models/User');

module.exports = function(passport){
  passport.use(new LocalStrategy({usernameFiled: "email"},(email,password,done)=>{
    //check for user
    User.findOne({email},(err,user)=>{
      if(err) return console.log(err)
      if(!user){
        return done(null,false,{message: "No such username found"})
      }
      //check if password is correct
      bcrypt.compare(password, user.passsword, (err, isMatch)=>{
        if(err) throw err
        if(isMatch){
          return done(null,user)
        }
        else{
          return done(null,false,{message: "Password is incorrect"})
        }
      })
    })
  }))
}
