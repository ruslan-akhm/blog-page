const express = require("express");
//const passport = require("passport");
const shortid = require("shortid");
const User = require("../models/User");
const Post = require("../models/Post");
const apiRouter = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const GridFSBucket = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
//const isAuthenticated = require('./authMiddleware').isAuthenticated;
const mongoose = require("mongoose");
var mongoURI = process.env.SECRET; //"mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
var conn = mongoose.connection;

//set GridFS
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

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
          metadata: { type: type, date: Date.now() }
        };
        resolve(fileinfo);
      });
    });
  }
});
const upload = multer({ storage });

///HERE HAVE TO LOAD USER (OR HOMEPAGE IN FACT) and not links to images and stuff
apiRouter.get("/", (req, res) => {
  //res.redirect("https://appnew-test-sample.glitch.me/login")
  console.log("HERE WE ARE at homepage");
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
          id: user.userID
        };
      });
      //console.log(usersInfo)
      //console.log("sending JSON")
      res.json({ usersInfo });
    }
  });

  // Post.find({type:"post"}).sort({_id: -1}).exec((err,data)=>{
  //   if(err) return console.log(err);
  //   else{
  //     gfs.files.find({'metadata.type':'avatarfile'}).sort({_id: -1}).limit(1).toArray((err,ava)=>{
  //       if(err) return console.log(err);
  //       else{
  //          gfs.files.find({'metadata.type':'upfile'}).sort({_id: -1}).limit(1).toArray((err,hdr)=>{
  //            if(err) return console.log(err);
  //            else{
  //             return res.json(
  //               {data:data,
  //                avatar:"https://appnew-test-sample.glitch.me/api/image/"+hdr[0].filename,
  //                header:"https://appnew-test-sample.glitch.me/api/image/"+hdr[0].filename}
  //             )
  //           }
  //         })
  //       }
  //     })
  //   }
  // })
});

//LOAD USER INFO HERE
apiRouter.get("/users/:user", (req, res, next) => {
  const id = req.params.user;

  //console.log(passport.session().passport.user)
  User.findOne({ userID: id }, (err, user) => {
    if (err) throw err;
    if (!user) console.log("NO USER");
    else {
      //console.log(req.session.hasOwnProperty("passport"));
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
      res.json({
        header: header,
        avatar: avatar,
        bio: bio,
        posts: posts,
        isAuthor: isAuthor,
        id: id
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
          fileObject.filename
      });
    }
  })
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
          fileObject.filename
      });
    }
  });
});

apiRouter.post("/bio", (req, res) => {
  console.log(req.body);
  User.findOne({ username: "test" }, (err, user) => {
    if (err) return console.log(err);
    if (!user) {
      res.json({ message: "Can not update bio. User does not exist" });
    } else {
      user.bio = req.body.bio;
      user.save();
    }
  });
  res.send("testing...");
});

//Add new posts
apiRouter.post("/post", upload.array("attachments", 5), (req, res, next) => {
  // console.log("UPLOADING NEW POSSTS")
  // console.log(req.session);
  const id = req.session.passport.user;
  const files = req.files;
  const filenames = files.map(fileObject => {
    return (
      "https://appnew-test-sample.glitch.me/api/image/" + fileObject.filename
    );
  });
  const data = req.body.attachments;
  //console.log(data);
  //console.log(filenames)
  User.findOne({_id:id},(err,user)=>{
    if (err) return console.log(err);
    if (!user) res.json({ message: "Error! Unable to access user page" });
    else{
      let post = {
        title: data[0],
        text: data[1],
        postId: "post-id-" + shortid.generate(),
        datePosted: Date.now(),
        type: "post",
        default: false,
        files: filenames
      };
      user.posts.push(post);
      user.save();
      const response = {
        _id: post._id,
        title: post.title,
        text: post.text,
        datePosted: post.datePosted,
        postId: post.postId,
        files: filenames
      };
      return res.json(response);
    }
  })
  
  // post.save();
  // const response = {
  //   _id: post._id,
  //   title: post.title,
  //   text: post.text,
  //   datePosted: post.datePosted,
  //   postId: post.postId,
  //   files: filenames
  // };
  // return res.json(response);
});

//Find all files in collection
apiRouter.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "no files exist"
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
        err: "no file exists"
      });
    }
    return res.json(file);
  });
});

//Load image
apiRouter.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "no file exists"
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

//Delete Post WORK ON THIS TOO
apiRouter.delete("/delete", (req, res) => {
  const _id = req.body.id;
  Post.deleteOne({ _id: _id }, (err, data) => {
    if (err) return console.log(err);
    Post.find({ type: "post" })
      .sort({ _id: -1 })
      .exec((err, post) => {
        if (err) return console.log(err);
        return res.json({ posts: post });
      });
  });
});


module.exports = apiRouter;
