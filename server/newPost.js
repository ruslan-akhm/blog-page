const mongoose = require('mongoose');

var Schema = mongoose.Schema

var postSchema = new Schema({
  title:String,
  text:String,
  postId:String,
  datePosted:String,
  type:String,
  default:Boolean,
  files:Array
})

var Post = mongoose.model("Post", postSchema)

module.exports = Post;
