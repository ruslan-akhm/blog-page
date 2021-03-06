const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const shortid = require("shortid");
const authService = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
var mongoURI = process.env.SECRET;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
var conn = mongoose.connection;

//
authService.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.json({ message: info.message });
    } else {
      req.logIn(user, err => {
        if (err) throw err;
        res.json({
          message: "succesfully logged in",
          successLogin: true,
          userID: user.userID
        });
      });
    }
  })(req, res, next);
});

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
      //User.findOne({ username }, (err, user) => {
       // if (err)
        //  res
        //    .status(500)
         //   .json({ message: "Internal server error", error: true });
       // if (user)
      //    res.status(400).json({ message: "Username is taken", error: true });
        //else {
          const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            userID: shortid.generate(),
            header:
              "https://appnew-test-sample.glitch.me/api/image/image-e233b5f59a3bdb20e8ccedf1719ee99f.jpg",
            avatar:
              "https://appnew-test-sample.glitch.me/api/image/image-9513c017d3a1ef643530736d721e9522.jpg",
            bio: {
              name: username,
              highlights: [],
              info: ""
            }
          });
          newUser.save(err => {
            if (err)
              res.status(500).json({
                message: "Error occured while creating account",
                error: true
              });
            else {
              res
                .status(201)
                .json({ message: "Account created!", error: false });
            }
          });
        //}
      //});
    }
  });
});

authService.get("/logout", (req, res, next) => {
  req.logout();
  res.json({ message: "You have logged out" });
});

//called everytime to check if user ai authenticated
authService.get("/authenticated", (req, res, next) => {
  let isAuth = req.isAuthenticated();
  if (isAuth) {
    const id = req.session.passport.user;
    User.findOne({ _id: id }, (err, user) => {
      if (err) return console.log(err);
      if (!user) return res.json({ message: "Can not access user's settings" });
      else {
        res.json({ isAuth: isAuth, authorID: user.userID });
      }
    });
  }
});

//get personal settings of user - GET
authService.get("/settings", (req, res) => {
  if (req.session.hasOwnProperty("passport") == false) {
    res.json({ message: "You are not logged in", success: false });
    return;
  }
  const id = req.session.passport.user;
  User.findOne({ _id: id }, (err, user) => {
    if (err) return console.log(err);
    if (!user) return res.json({ message: "Can not access user's settings" });
    else {
      res.json({ settings: user.bio });
    }
  });

  //update personal settings of user - POST
  authService.post("/settings", (req, res) => {
    if (req.session.hasOwnProperty("passport") == false) {
      res.json({ message: "You are not logged in", success: false });
      return;
    }
    const { highlights, name, info } = req.body;
    const id = req.session.passport.user;
    User.findOne({ _id: id }, (err, user) => {
      if (err) return console.log(err);
      if (!user) return res.json({ message: "Can not access user's settings" });
      else {
        user.bio.highlights = highlights;
        user.bio.name = name;
        user.bio.info = info;
        user.save();
        res.json({ settings: user.bio, userID: user.userID, success: true });
      }
    });
  });

  //   authService.get("/author", (req, res) => {
  //     if (req.session.hasOwnProperty("passport") == false) {
  //       res.json({ message: "You are not logged in", success: false });
  //       return;
  //     } else {
  //       const id = req.session.passport.user;
  //       User.findOne({ _id: id }, (err, user) => {
  //         if (err) return console.log(err);
  //         if (!user)
  //           return res.json({ message: "No user found with this credentials" });
  //         else {
  //           return res.json({ authorID: user.userID });
  //         }
  //       });
  //     }
  //   });
});

module.exports = authService;
