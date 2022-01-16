const checkIfNumberOnly = (req, res, next) => {
  const { email } = req.body;
  if (!isNaN(+email)) {
    return res
      .status(400)
      .json({ message: "Username cannot contain numbers only" });
  }
  next();
};

module.exports = { checkIfNumberOnly };
