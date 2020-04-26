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

//Default posts, Header and Avatar to set when "To Default" button clicked
const defaultData = [ { 
     _id:"5e9ce06d57953106f91bfe1d",
     title: 'Hello World!',
     text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac felis vitae velit venenatis gravida nec eget libero. Duis faucibus ante at lacus scelerisque dapibus. Vivamus eu ipsum sed orci interdum tempus eget ac odio. Maecenas congue ullamcorper tincidunt. Aliquam suscipit risus vel commodo lobortis. ',
     postId: 'post-id-abts9nqQZ',
     datePosted: '1587339373554',
     type: 'post',
     default: true,
     __v: 0 },
   { _id: "5e9ce08b57953106f91bfe1e",
     title: 'My Favourite Lorem Ipsum',
     text:
      'Nulla ultrices ex erat, ut malesuada ligula tincidunt ac. Morbi volutpat augue eros, ac pulvinar felis condimentum venenatis. Etiam diam risus, accumsan quis tortor eu, euismod efficitur erat. Sed in arcu laoreet, aliquam eros ac, accumsan lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur lobortis, leo consectetur porta pulvinar, arcu lacus vestibulum justo, sit amet mollis magna ligula eu enim. Proin porttitor feugiat erat, id ullamcorper metus molestie eu. Pellentesque lobortis molestie tortor, ut commodo urna posuere nec. Phasellus sit amet justo euismod, bibendum elit id, iaculis magna.\n\nUt sit amet aliquam ligula. Nulla elementum lobortis nibh, eu semper orci luctus nec. Nulla leo ipsum, dignissim nec dolor vel, pulvinar elementum orci. Praesent finibus ligula id diam eleifend semper. Nulla in placerat odio. Morbi felis justo, blandit in libero vitae, lobortis tincidunt erat. Vestibulum tincidunt posuere lacus eget scelerisque.\n\nDonec velit ipsum, volutpat sed urna ac, dapibus porta metus. Integer id maximus quam, vel egestas tellus. Praesent ut vulputate libero. Nulla facilisi. Pellentesque mollis scelerisque turpis, ut vehicula ipsum hendrerit ut. Vivamus in facilisis massa. Aliquam semper orci a metus placerat dignissim. Aliquam erat volutpat. Nunc condimentum, eros eu hendrerit condimentum, orci justo volutpat nisl, in tincidunt turpis nisl efficitur arcu.',
     postId: 'post-id-F8ZuT6ET0',
     datePosted: '1587339403233',
     type: 'post',
     default: true,
     __v: 0 },
   { _id: "5e9ce8aaa157512e7fbe6892",
     title: 'The Secret of Happiness is...',
     text:
      'Donec velit ipsum, volutpat sed urna ac, dapibus porta metus. Integer id maximus quam, vel egestas tellus. Praesent ut vulputate libero. Nulla facilisi. Pellentesque mollis scelerisque turpis, ut vehicula ipsum hendrerit ut. Vivamus in facilisis massa. Aliquam semper orci a metus placerat dignissim. Aliquam erat volutpat. Nunc condimentum, eros eu hendrerit condimentum, orci justo volutpat nisl, in tincidunt turpis nisl efficitur arcu.\n\n Fusce dignissim lacus nec est posuere, ac sollicitudin metus pharetra. Pellentesque congue justo eget scelerisque laoreet. Fusce non nisl justo. Nam fringilla sodales mi et finibus. Cras ultricies, quam et molestie luctus, ex tellus imperdiet purus, et tristique lorem nisi in urna. Suspendisse potenti. Vestibulum sit amet porttitor lacus. Praesent maximus diam massa, a viverra turpis elementum in. Nam at augue diam. Sed ultricies nulla elit, non rhoncus enim pretium quis. Donec bibendum, purus id scelerisque porta, neque nunc volutpat sem, id feugiat nunc lorem eget nisl. Phasellus eget ligula posuere, interdum ante sit amet, convallis lorem.',
     postId: 'post-id-K8qR6_ZgX',
     datePosted: '1587341482882',
     type: 'post',
     default: true,
     __v: 0 } ];
const defaultAvatar = "https://appnew-test-sample.glitch.me/api/image/image-760a96ccff179db51f63d83e1bafaca4.jpg"
const defaultHeader = "https://appnew-test-sample.glitch.me/api/image/image-a881b5893feb93aab9e4b696f5d48590.jpg"

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

//Send posts from database  
app.get('/api',(req,res)=>{
  Post.find({type:"post"}).sort({_id: 1}).exec((err,data)=>{
    if(err) return console.log(err);
    else{
      gfs.files.find({'metadata.type':'avatarfile'}).sort({_id: -1}).limit(1).toArray((err,ava)=>{
        if(err) return console.log(err);
        else{
           gfs.files.find({'metadata.type':'upfile'}).sort({_id: -1}).limit(1).toArray((err,hdr)=>{
             if(err) return console.log(err);
             else{
              //console.log(data);
              return res.json({data:data,
                               src:"https://appnew-test-sample.glitch.me/api/image/"+ava[0].filename,
                               image:"https://appnew-test-sample.glitch.me/api/image/"+hdr[0].filename})
            }
          })
        }
      })
    }
  })
})

//Set Header image
app.post('/api/upload', upload.single('upfile'), (req,res)=>{
   const fileObject = req.file;
   console.log(fileObject);
   //const readstream = gfs.createReadStream(fileObject.filename);
   return res.json({"image":"https://appnew-test-sample.glitch.me/api/image/"+fileObject.filename})
})

//Set Avatar
app.post('/api/avatar', upload.single('avatarfile'), (req,res)=>{
   const fileObject = req.file;
   console.log(fileObject);
   //const readstream = gfs.createReadStream(fileObject.filename);
   return res.json({"src":"https://appnew-test-sample.glitch.me/api/image/"+fileObject.filename})
})

//Add new posts
app.post('/api/post', upload.array("attachments",5), (req,res)=>{
  const files = req.files;
  const filenames = files.map(fileObject=>{return "https://appnew-test-sample.glitch.me/api/image/"+fileObject.filename})
  //console.log(filenames)
  const data = req.body.attachments
  let post = new Post({
    title:data[0],
    text:data[1],
    postId:"post-id-"+shortid.generate(),
    datePosted:Date.now(),
    type:"post",
    default:false,
    files:filenames
  })
  post.save();
  const response = ({id:post._id, title:post.title, text:post.text, datePosted:post.datePosted, postId:post.postId, files:filenames})
  res.json(response);
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

//Delete Post
app.delete('/api/delete',(req,res)=>{
  const postId = req.body.id
  Post.deleteOne({postId:postId},(err,data)=>{
    if(err) return console.log(err);
    console.log(data);
    Post.find({type:"post"}).exec((err,post)=>{
      if(err) return console.log(err);
      console.log(post);
      return res.json({posts:post})
    })
  })
})

//Bring the default info back and make corrections on databases 
app.get('/api/default',(req,res)=>{
  Post.deleteMany({ default: false }, (err,dat)=>{
    if(err) return console.log(err);
    gfs.files.deleteMany({"metadata.type":"upfile","metadata.date":{$gt:1587339231260}},(err,hdr)=>{
      if(err) return console.log(err);
      gfs.files.deleteMany({"metadata.type":"avatarfile","metadata.date":{$gt:1587339222880}},(err,ava)=>{
        if(err) return console.log(err);
        gfs.files.deleteMany({"metadata.type":"attachments","metadata.date":{$gt:1587339222880}},(err,att)=>{
          if(err) return console.log(err);
            defaultData.map(post=>{
              let defpost = new Post({
              _id:post._id,
              title:post.title,
              text:post.text,
              postId:post.postId,
              datePosted:post.datePosted,
              type:"post",
              default:true
              })
            defpost.save();
            })
        return res.json({data:defaultData,
                   src:defaultAvatar,
                   image:defaultHeader})
        })
      })
    })
  });
})

// Express port-switching logic for Glitch.com
let port;
console.log("NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("Running on port", listener.address().port);
});
