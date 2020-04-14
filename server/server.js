const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const shortid = require('shortid');
const Post = require("../server/newPost");
var mongoURI = "mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var conn = mongoose.connection;
const ejs = require('ejs')
const crypto = require('crypto')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


const app = express();
let gfs;

//EJS
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

conn.once('open',() => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject)=>{
      crypto.randomBytes(16, (err,buf)=>{
        if(err) return reject(err)
        const filename = "image-" + buf.toString('hex') + path.extname(file.originalname);
        const fileinfo={
          filename: filename,
          bucketName: 'uploads',
          datePosted:Date.now()
        };
        resolve(fileinfo);
      })
    })
  }
})
const upload = multer({storage})
//Send posts from database
app.get('/api',(req,res)=>{
  Post.find({type:"post"}).exec((err,data)=>{
    if(err) return console.log(err);
    console.log(data)
    return res.json({data:data})
  })
})
//Header image
app.post('/api/upload', upload.single('upfile'), (req,res)=>{
   const fileObject = req.file;
  
   if(fileObject.contentType==="image/jpeg"||fileObject.contentType==="img/png"){
      //const readstream = gfs.createReadStream(file.filename);
      //readstream.pipe(res)
     return res.json("image")
    }else{
      return res.status(404).json("Not an image")
    }
  
   const readstream = gfs.createReadStream(fileObject.filename);
   res.json({"image":"https://appnew-test-sample.glitch.me/api/image/"+fileObject.filename})
})
//Add new posts
app.post('/api/post',(req,res)=>{
  const data = req.body
  let post = new Post({
    title:data.title,
    text:data.text,
    postId:"post-id-"+shortid.generate(),
    datePosted:Date.now(),
    type:"post"
  })
  post.save();
  res.json({title:data.title,text:data.text})
})

//Find all files in collection
app.get('/api/files',(req,res)=>{
  gfs.files.find().toArray((err, files)=>{
    if(!files||files.length===0){
      return res.status(404).json({
        err: "no files exist"
      })
    }
    return res.json(files)
  })
})

//Find particluar file
app.get('/api/files/:filename',(req,res)=>{
  gfs.files.findOne({filename:req.params.filename},(err, file)=>{
    if(!file||file.length===0){
      return res.status(404).json({
        err: "no file exists"
      })
    }
    return res.json(file)
  })
})

//Load image
app.get('/api/image/:filename',(req,res)=>{
  gfs.files.findOne({filename:req.params.filename},(err, file)=>{
    if(!file||file.length===0){
      return res.status(404).json({
        err: "no file exists"
      })
    }
    //Check if img
    if(file.contentType==="image/jpeg"||file.contentType==="img/png"){
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res)
    }else{
      return res.status(404).json("Not an image")
    }
  })
})

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
