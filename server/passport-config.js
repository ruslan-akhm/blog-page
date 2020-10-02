const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport){
  const authenticateUser = (username, password, done) =>{
    const user = getUserByUsername(username);
    if(user == null){
      return done(null, false, {message: "No such username found"})
    }
    
    try{
      if(await bcrypt.compare(password, user.password)){
        return done(null, user, {message: "No such username found"})
      }
      else{
        return done(null, false, {message: "Incorrect password"})
      }
    } catch {
      
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'username' }), authenticateUser)
  passport.serializeUser((user, done)=>{ })
  passport.deserializeUser((_id, done)=>{ })
}