const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const shortid = require('shortid');
//const Seat = require("../src/database");
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
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
  //response.render(__dirname + "/public/index.html")
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
          bucketName: 'uploads'
        };
        resolve(fileinfo);
      })
    })
  }
})
const upload = multer({storage})

app.post('/api/upload', upload.single('upfile'), (req,res)=>{
  const fileObject = req.file;
  console.log(fileObject);
  const fName = fileObject.originalname;
  const fType = fileObject.mimetype;
  const fSize = fileObject.size
  res.json({name: fName, type: fType, size: fSize})
})

app.get('/api/files',(req,res)=>{
  gfs.find().toArray(())
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
