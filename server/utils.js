const startServer = async (dbPath, mongoose, app, port) => {
  try {
    await mongoose.connect(dbPath);
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

const getJwtToken = (jwt, secret, id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "30m" });
};

module.exports = { startServer, getJwtToken };
