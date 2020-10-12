const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    userID: String,
    email: String,
    password: String,
    bio: {
      name: String,
      highlights: [],
      info: String
    },
    avatar: String,
    header: String,
    
    posts: [
      {
        title: String,
        text: String,
        postId: String,
        datePosted: Number,
        type: String,
        default: Boolean,
        files: Array
      }
    ]
  },
  { typeKey: "$type" }
);

module.exports = mongoose.model("User", UserSchema);
