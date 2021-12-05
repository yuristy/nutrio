const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, refs: "Role" }],
});

module.exports = model("User", User);
