exports.isLoggedIn = function (req) {
  return req.session ? !!req.session.user : false;
};

exports.createSession = function(req, res) {
  return req.session.regenerate();
};

exports.checkUser = function(req, res, next) {
  // Set property on body indicating whether user has a session
  res.body.loggedIn = exports.isLoggedIn(req);
};