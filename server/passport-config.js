const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./models/User');////

function initialize(passport, getUserByUsername){
  console.log("1) IN INITIALIZZE ")
  const authenticateUser = async (username, password, done) =>{
    
    const user = await User.findOne({username: username},(err, user)=>{
    if(err)
      return err
    return user;
    })
    
    //const user =  await getUserByUsername(username); ///why NOT WAITINg?????????  upthere works
    
    if(user == null){
      return done(null, false, {message: "No such username found"})
    }
    try{
      if(await bcrypt.compare(password, user.password)){
        return done(null, user)
      }
      else{
        return done(null, false, {message: "Incorrect password"})
      }
    } catch(e) {
      return done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done)=>done(null, user._id))
  passport.deserializeUser((_id, done)=>{
    return done(null, User.findOne({_id},(err, user)=>{
      if(err) return err
      return user
    }))
  })
}

module.exports = initialize