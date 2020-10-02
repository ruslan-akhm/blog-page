const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername){
  console.log("1) IN INITIALIZZE ")
  const authenticateUser = async (username, password, done) =>{
    console.log("2) IN authenUSER ")
    console.log(username)
    const user = getUserByUsername(username);
    if(user == null){
      //res.json({message: "No such username found"})
      console.log("USER NULL")
      return done(null, false, {message: "No such username found"})
    }
    console.log("USER THERE IS ")
    try{
      if(await bcrypt.compare(password, user.password)){
        return done(null, user)
      }
      else{
        //res.json({message: "Incorrect password"})
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