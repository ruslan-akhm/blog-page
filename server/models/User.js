const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: String,
  userID: String,
  email: String,
  password: String,
  bio: {
    name: String,
    highlights: [],
    info: String
  },
  avatar:String,
  header:String,
  date: {
    type: Date,
    default: Date.now
  },
  posts: [
    {
      title: String,
      text: String,
      postId: String,
      datePosted: String,
      type: String,
      default: Boolean,
      files: Array
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
