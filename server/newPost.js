const mongoose = require('mongoose');

var Schema = mongoose.Schema

var postSchema = new Schema({
  title:String,
  text:Boolean,
  postId:String
})

var Post = mongoose.model("Post", postSchema)

module.exports = Post;
