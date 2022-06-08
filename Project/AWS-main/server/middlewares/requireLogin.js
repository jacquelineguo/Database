module.exports = (req, res, next) => {
  // if not login, return directly
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  next();
}
