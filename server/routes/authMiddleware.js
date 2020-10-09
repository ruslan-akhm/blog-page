module.exports.isAuthenticated = (req,res,next) => {
  let isAuth = false;
  if (req.isAuthenticated()){
    isAuth = true;
    //next(isAuth);
  }
  else{
    isAuth = false;
    //next(isAuth);
  }
   next(isAuth);
}

module.exports.isAuthor = (req,res,next) => {
  
}