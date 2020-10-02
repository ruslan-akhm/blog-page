const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./models/User');////

function initialize(passport, getUserByUsername){
  console.log("1) IN INITIALIZZE ")
  const authenticateUser = async (username, password, done) =>{
    // const user = await User.findOne({username: username},(err, user)=>{
    // if(err)
    //   return err
    // console.log("WE ARE LOOKIN FOR USEr ")
    // console.log(user);
    // return user;
    // })
    const user = await getUserByUsername(username); ///why NOT WAITINg?????????  upthere works
    console.log("2) IN authenUSER ")
    console.log(username)
    console.log(user);
    if(user == null){
      //res.json({message: "No such username found"})
      console.log("USER NULL")
      return done(null, false, {message: "No such username found"})
    }
    console.log("USER THERE IS ")
    try{
      if(await bcrypt.compare(password, user.password)){
        console.log("PASSWORDS MATCH")
        return done(null, user)
      }
      else{
        //res.json({message: "Incorrect password"})
        console.log("NO NO MATCH")
        return done(null, false, {message: "Incorrect password"})
      }
    } catch(e) {
      return done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done)=>{ })
  passport.deserializeUser((_id, done)=>{ })
}

module.exports = initialize