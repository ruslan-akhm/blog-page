const express = require("express");
const shortid = require("shortid");
const User = require("../models/User");
//const Post = require("../models/Post");
const apiRouter = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const GridFSBucket = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
const mongoose = require("mongoose");
var mongoURI = process.env.SECRET;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
var conn = mongoose.connection;

//set GridFS
let gfs;

//set MongoDB conection
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//set GridFS storage
const storage = new GridFSBucket({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename =
          "image-" + buf.toString("hex") + path.extname(file.originalname);
        const type = file.fieldname;
        const fileinfo = {
          filename: filename,
          bucketName: "uploads",
          metadata: { type: type, date: Date.now() },
        };
        resolve(fileinfo);
      });
    });
  },
});
const upload = multer({ storage });

//homepage route
apiRouter.get("/", (req, res) => {
  User.find().exec((err, users) => {
    if (err) return console.log(err);
    if (!users)
      res.json({ message: "No users found in database", success: false });
    else {
      let usersInfo = users.map(user => {
        return {
          name: user.bio.name,
          posts: user.posts.length,
          avatar: user.avatar,
          id: user.userID,
        };
      });
      res.json({ usersInfo });
    }
  });
});

//route for user's personal page
apiRouter.get("/users/:user", (req, res, next) => {
  const id = req.params.user;
  User.findOne({ userID: id }, (err, user) => {
    if (err) throw err;
    if (!user)
      res.json({ message: "No user with such username found", error: true });
    else {
      //checking if user is visiting their own page
      let isAuthor = false;
      if (
        req.session.hasOwnProperty("passport") &&
        user._id == req.session.passport.user
      ) {
        isAuthor = true;
      }
      let header = user.header;
      let avatar = user.avatar;
      let bio = user.bio;
      let posts = user.posts;
      posts.sort(function (a, b) {
        return b.datePosted - a.datePosted;
      });
      res.json({
        header: header,
        avatar: avatar,
        bio: bio,
        posts: posts,
        isAuthor: isAuthor,
        id: id,
      });
    }
  });
});

//upload Header image
apiRouter.post("/upload", upload.single("upfile"), (req, res) => {
  const fileObject = req.file;
  const userID = req.body.upfile;
  User.findOne({ userID: userID }, (err, user) => {
    if (err) return console.log(err);
    if (!user) res.json({ message: "Error! Unable to access user page" });
    else {
      //doublecheck if user is an Author
      if (
        req.session.hasOwnProperty("passport") &&
        user._id.toString() !== req.session.passport.user
      ) {
        res.json({ message: "You are not authorized to edit this page" });
        return;
      }
      user.header =
        "https://appnew-test-sample.glitch.me/api/image/" + fileObject.filename;
      user.save();
      res.json({
        header:
          "https://appnew-test-sample.glitch.me/api/image/" +
          fileObject.filename,
      });
    }
  });
});

//Upload Avatar
apiRouter.post("/avatar", upload.single("avatarfile"), (req, res) => {
  const fileObject = req.file;
  const userID = req.body.avatarfile;
  User.findOne({ userID: userID }, (err, user) => {
    if (err) return console.log(err);
    if (!user) res.json({ message: "Error! Unable to access user page" });
    else {
      //doublecheck if user is an Author
      if (
        req.session.hasOwnProperty("passport") &&
        user._id.toString() !== req.session.passport.user
      ) {
        res.json({ message: "You are not authorized to edit this page" });
        return;
      }
      user.avatar =
        "https://appnew-test-sample.glitch.me/api/image/" + fileObject.filename;
      user.save();
      res.json({
        avatar:
          "https://appnew-test-sample.glitch.me/api/image/" +
          fileObject.filename,
      });
    }
  });
});

//Add new posts
apiRouter.post("/post", upload.array("attachments", 5), (req, res, next) => {
  const id = req.session.passport.user;
  const files = req.files;
  const filenames = files.map(fileObject => {
    return (
      "https://appnew-test-sample.glitch.me/api/image/" + fileObject.filename
    );
  });
  const data = req.body.attachments;
  User.findOne({ _id: id }, (err, user) => {
    if (err) return console.log(err);
    if (!user) res.json({ message: "Error! Unable to access user page" });
    else {
      let newPost = {
        title: data[0],
        text: data[1],
        postId: "post-id-" + shortid.generate(),
        datePosted: Date.now(),
        type: "post",
        default: false,
        files: filenames,
      };
      user.posts.push(newPost);
      user.save();
      let latestPost = user.posts.filter(post => {
        return post.postId == newPost.postId;
      });
      return res.json(latestPost && latestPost[0]);
    }
  });
});

//Find all files in collection
apiRouter.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "no files exist",
      });
    }
    return res.json(files);
  });
});

//Find particluar file
apiRouter.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "no file exists",
      });
    }
    return res.json(file);
  });
});

//Load paricular image
apiRouter.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "no file exists",
      });
    }
    //Check if img
    if (file.contentType === "image/jpeg" || file.contentType === "img/png") {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      return res.status(404).json("Not an image");
    }
  });
});

//Delete Post
apiRouter.post("/delete", (req, res) => {
  let postId = req.body.id;
  let userId = req.session.passport.user;
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return console.log(err);
    if (!user) res.json({ message: "Error! Unable to access user page" });
    else {
      let postsFiltered = user.posts.filter(post => {
        return post._id.toString() !== postId;
      });
      user.posts = postsFiltered;
      user.save();
      res.json({ posts: user.posts });
    }
  });
});

module.exports = apiRouter;
