const express = require('express');
const bcrypt = require('bcrypt');
const authService = express.Router();
const User = require('../models/User')
const mongoose = require('mongoose');
var mongoURI = "mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var conn = mongoose.connection;

authService.post("/login",(req,res)=>{
  console.log("login")
})

authService.post("/register", async (req,res)=>{
  
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const username = req.body.username;
    User.findOne({username},(err,user)=>{
      if(err)
        res.status(500).json({message: "internal server error", error: true})
      if(user)
        res.status(400).json({message: "username is taken", error: true})
      else{

        const newUser = new User({ username: username, password: hashedPassword})
        newUser.save(
          err=>{
            if(err)
              res.status(500).json({message: "Error occured while creating account", error: true});
            else{
              res.status(201).json({message: "Account created!", error: false})
            }
          }
        )
      }
    })
    
})

module.exports = authService;