const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const shortid = require('shortid');
//const Seat = require("../src/database");
var mongoURI = "mongodb+srv://ruslan-akhm:zuaGc0VJ@cluster0-y5h11.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var conn = mongoose.connection;
const ejs = require('ejs')
const multer = require('multer');

//Set storage engine
const storage = multer.diskStorage({
  destination:'./public/uploads/',
  filename: function filename(req, file, cb){
    cb(null, file.fieldName+'-'+Date.now()+path.extname(file.originalName));
  }
})

//Init upload
const upload = multer({
  storage: storage
}).single('myImage');  //Can be array too

const app = express();

//EJS
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
  //response.render(__dirname + "/public/index.html")
});

app.post('/api/upload',(req,res)=>{
  upload(req,res,(err)=>{
    if (err) res.send("Error")
    else console.log(req.file)
    res.send('test');
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
