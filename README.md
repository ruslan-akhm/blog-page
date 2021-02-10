# Personal Blog Page
---
### About 
App where registered users can create posts and attach images to them as well as modify their page, by uploading avatar and header images and adding personal information if they want to. Authentication is not required to view other users' pages as guest.

The app was originally built and is available Live [on Glitch](https://appnew-test-sample.glitch.me/)

---
### Preview 

![Mainpage](https://cdn.glitch.com/b263e770-440e-453b-8974-57d826cc0507%2FBlogPage.jpg?v=16127453043375)

---
### Highlights
  - No signup required to view other users' pages
  - User can edit their profile and avatar/header images
  - Main page has a list of users which can be narrowed down by typing user's name in filter 
  
---
### Tech Stack
  - React.js
  - Node/Express
  - MongoDB
  - Passport.js

---

### Run locally
```sh
$ git clone https://github.com/ruslan-akhm/blog-page.git
$ cd blog-page
$ npm install
$ npm start
```
Server will set up on port 3001 and app will start on port 3000.

Make sure to provide .env file in **root folder** with following variables:
 - SECRET (MongoDB database in format mongodb+srv://<username>:<password>@cluster...)
 - FAST_REFRESH=false (to disable react-refresh)
 - SESSION_SECRET (passport secret key for a cookie)

---
### Author
Ruslan Akhmetshin
