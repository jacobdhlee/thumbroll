exports.isLoggedIn = function (req) {
  if (req.session) {console.log("SESSION: ", req.session);}
  return req.session ? !!req.session : false;
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function () {
    req.session.user = newUser;
    res.cookie('userId', newUser, { maxAge: 900000, httpOnly: true });
    console.log('created session with user', newUser, 'see?', req.session.user);
  });
};

exports.checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)){
    // Set property on body indicating whether user has no session
    res.status(401).send({noSession: "true"});
   } else {
     next();
   }
};