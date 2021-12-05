const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const { startServer } = require("./utils");
const authRouter = require("./routers/authRouter");

const port = process.env.PORT || 5000;
const login = process.env.LOGIN;
const password = process.env.PASSWORD;

const dbPath = `mongodb+srv://${login}:${password}@cluster0.fhdhv.mongodb.net/nutrio?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

async function startServer() {
  try {
    await mongoose.connect(dbPath);
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startServer();
