exports.isLoggedIn = function (req) {
  return req.session ? !!req.session.user : false;
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function () {
    req.session.user = newUser;
  });
};

exports.checkUser = function(req, res, next) {
  // Set property on body indicating whether user has a session
  res.body.hasNoSession = !exports.isLoggedIn(req);
  res.status(401).send('user is not logged in');
};