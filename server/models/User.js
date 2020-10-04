const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
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
