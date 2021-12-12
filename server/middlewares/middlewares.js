const checkIfNumberOnly = (req, res, next) => {
  const { username } = req.body;
  if (!isNaN(+username)) {
    return res
      .status(400)
      .json({ message: "Username cannot contain numbers only" });
  }
  next();
};

module.exports = { checkIfNumberOnly };
