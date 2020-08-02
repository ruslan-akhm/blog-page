const crypto = require('crypto')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const mongoose = require('mongoose');
var mongoURI = "mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var conn = mongoose.connection;

let gfs;

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
        const type = file.fieldname;
        const fileinfo={
          filename: filename,
          bucketName: 'uploads',
          metadata:{type:type, date:Date.now()}
        };
        resolve(fileinfo);
      })
    })
  }
})
const upload = multer({storage})

// console.log('upload @ storage');
// console.log(upload);

module.exports = {gfs, upload}