module.exports = (req, res, next) => {
  // if credis is not enough, return error
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' });
  }

  next();
}
