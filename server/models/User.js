const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String, required: true },
  roles: [{ type: String, refs: "Role" }],
});

module.exports = model("User", User);
