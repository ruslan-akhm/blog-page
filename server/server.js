const express = require('express');
const path = require('path');
const apiRouter = require('./routes/apiRouter')
const ejs = require('ejs')

const app = express();

app.set('trust proxy', true)

//EJS
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.ejs");
});

app.use('/api', apiRouter);

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
