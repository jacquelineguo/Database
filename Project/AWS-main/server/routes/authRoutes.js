const passport = require('passport');

module.exports = app => {

  // request the user authentication to google
  app.post(
    '/auth/google',
    passport.authenticate('local')
  );

  app.get(
    '/auth/google/callback',
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // logout
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};