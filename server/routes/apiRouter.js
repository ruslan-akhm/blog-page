const express = require('express');
const shortid = require('shortid');
//const ejs = require('ejs');
const defaultData = require('../defaultData');
const Post = require("../models/Post");
const apiRouter = express.Router();
const {storage} = require('../storage/storage.js');
//const storage = require('../storage/storage.js');





apiRouter.get('/',(req,res)=>{
  Post.find({type:"post"}).sort({_id: 1}).exec((err,data)=>{
    if(err) return console.log(err);
    else{
      storage.gfs.files.find({'metadata.type':'avatarfile'}).sort({_id: -1}).limit(1).toArray((err,ava)=>{
        if(err) return console.log(err);
        else{
           storage.gfs.files.find({'metadata.type':'upfile'}).sort({_id: -1}).limit(1).toArray((err,hdr)=>{
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
apiRouter.post('/upload', storage.upload.single('upfile'), (req,res)=>{
   const fileObject = req.file;
   console.log(fileObject);
   //const readstream = gfs.createReadStream(fileObject.filename);
   return res.json({"image":"https://appnew-test-sample.glitch.me/api/image/"+fileObject.filename})
})

//Set Avatar
apiRouter.post('/avatar', storage.upload.single('avatarfile'), (req,res)=>{
   const fileObject = req.file;
   console.log(fileObject);
   //const readstream = gfs.createReadStream(fileObject.filename);
   return res.json({"src":"https://appnew-test-sample.glitch.me/api/image/"+fileObject.filename})
})

//Add new posts
apiRouter.post('/post', storage.upload.array("attachments",5), (req,res)=>{
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
apiRouter.get('/files',(req,res)=>{
  storage.gfs.files.find().toArray((err, files)=>{
    if(!files||files.length===0){
      return res.status(404).json({
        err: "no files exist"
      })
    }
    return res.json(files)
  })
})

//Find particluar file
apiRouter.get('/files/:filename',(req,res)=>{
  storage.gfs.files.findOne({filename:req.params.filename},(err, file)=>{
    if(!file||file.length===0){
      return res.status(404).json({
        err: "no file exists"
      })
    }
    return res.json(file)
  })
})

//Load image
apiRouter.get('/image/:filename',(req,res)=>{
  storage.gfs.files.findOne({filename:req.params.filename},(err, file)=>{
    if(!file||file.length===0){
      return res.status(404).json({
        err: "no file exists"
      })
    }
    //Check if img
    if(file.contentType==="image/jpeg"||file.contentType==="img/png"){
      const readstream = storage.gfs.createReadStream(file.filename);
      readstream.pipe(res)
    }else{
      return res.status(404).json("Not an image")
    }
  })
})

//Delete Post
apiRouter.delete('/delete',(req,res)=>{
  const _id = req.body.id
  console.log(_id)
  Post.deleteOne({_id:_id},(err,data)=>{
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
apiRouter.get('/default',(req,res)=>{
  Post.deleteMany({ default: false }, (err,dat)=>{
    if(err) return console.log(err);
    storage.gfs.files.deleteMany({"metadata.type":"upfile","metadata.date":{$gt:1587339231260}},(err,hdr)=>{
      if(err) return console.log(err);
      storage.gfs.files.deleteMany({"metadata.type":"avatarfile","metadata.date":{$gt:1587339222880}},(err,ava)=>{
        if(err) return console.log(err);
        storage.gfs.files.deleteMany({"metadata.type":"attachments","metadata.date":{$gt:1587339222880}},(err,att)=>{
          if(err) return console.log(err);
            defaultData.data.map(post=>{
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
        return res.json({data:defaultData.data,
                   src:defaultData.avatar,
                   image:defaultData.header})
        })
      })
    })
  });
})

module.exports = apiRouter;