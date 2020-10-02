const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  posts:[{
    title:String,
    text:String,
    postId:String,
    datePosted:String,
    type:String,
    default:Boolean,
    files:Array
  }]
})



module.exports = mongoose.model('User',UserSchema);