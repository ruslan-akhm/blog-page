const express = require('express');
const authService = express.Router();
const mongoose = require('mongoose');
var mongoURI = "mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var conn = mongoose.connection;

authService.post("/login",(req,res)=>{
  console.log("login")
})

authService.post("/register",(req,res)=>{
  console.log("register")
})

module.exports = authService;