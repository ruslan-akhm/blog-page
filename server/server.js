const express = require("express");
require("dotenv").config();
const path = require("path");
const passport = require("passport");
const apiRouter = require("./routes/apiRouter");
const authService = require("./services/authService");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.set("trust proxy", true);

//body-parser and static
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//set cors
app.use(
  cors({
    origin: "https://appnew-test-sample.glitch.me/",
    credentials: true,
  })
);

//set session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, //cookie for 1 hr
    },
  })
);

//cookieParser
app.use(cookieParser(process.env.SESSION_SECRET));

//use passport
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//routes
app.use("/api", apiRouter);
app.use("/api/auth", authService);

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

//listener
const listener = app.listen(port, () => {
  console.log("Running on port", listener.address().port);
});
