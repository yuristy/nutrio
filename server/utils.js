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

module.exports = { startServer };
