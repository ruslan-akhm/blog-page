const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername){
  const authenticateUser = (username, password, done) =>{
    const user = getUserByUsername(username);
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
  passport.use(new LocalStrategy({ usernameField: 'username' }), authenticateUser)
  passport.serializeUser((user, done)=>{ })
  passport.deserializeUser((_id, done)=>{ })
}

module.exports = initialize