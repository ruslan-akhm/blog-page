const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const authService = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
var mongoURI = process.env.SECRET; //"mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
var conn = mongoose.connection;
//const initializePassport = require('../passport-config')

// const init = initializePassport(passport, username=>{
//   User.findOne({username: username},(err, user)=>{
//     if(err)
//       return err
//     console.log("WE ARE LOOKIN FOR USEr ")
//     console.log(user);
//     return user;
//   })
// })

//const init = initializePassport(passport)

console.log("ININININT");
//console.log(init);
//successRedirect to `/${username}`
authService.post(
  "/login",
  passport.authenticate(
    "local", //{
    //successRedirect:'/',
    //failureRedirect:'/login'
    //}
    (req, res) => {
      console.log("USEER REQ");
      console.log(req.user);
    }
  )
);

authService.post("/register", async (req, res) => {
  const { username, email, password, password2 } = req.body;
  //check required fields
  if (!username || !email || !password || !password2) {
    res
      .status(400)
      .json({ message: "Please, fill in all fields", error: true });
  }
  //check passwords to match
  if (password !== password2) {
    res.status(400).json({ message: "Passwords do not match", error: true });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  User.findOne({ email }, (err, user) => {
    if (err)
      res.status(500).json({ message: "Internal server error", error: true });
    if (user) 
      res.status(400).json({ message: "Email is already taken", error: true });
    else {
      console.log("NO EMAIL")
      User.findOne({ username }, (err, user) => {
        if (err)
          res
            .status(500)
            .json({ message: "Internal server error", error: true });
        if (user)
          res.status(400).json({ message: "Username is taken", error: true });
        else {
          const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
          });
          newUser.save(err => {
            if (err)
              res
                .status(500)
                .json({
                  message: "Error occured while creating account",
                  error: true
                });
            else {
              res
                .status(201)
                .json({ message: "Account created!", error: false });
            }
          });
        }
      });
    }
  });

  // const hashedPassword = await bcrypt.hash(req.body.password, 10)
  // const username = req.body.username;
  // User.findOne({username},(err,user)=>{
  //   if(err)
  //     res.status(500).json({message: "internal server error", error: true})
  //   if(user)
  //     res.status(400).json({message: "username is taken", error: true})
  //   else{
  //     const newUser = new User({ username: username, password: hashedPassword})
  //     newUser.save(
  //       err=>{
  //         if(err)
  //           res.status(500).json({message: "Error occured while creating account", error: true});
  //         else{
  //           res.status(201).json({message: "Account created!", error: false})
  //         }
  //       }
  //     )
  //   }
  // })
});

module.exports = authService;
