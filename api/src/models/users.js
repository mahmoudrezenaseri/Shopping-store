const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const User = Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    level: { type: Number, required: true, default: 0, min: 0, max: 9 },
  },
  {
    timestamps: true,
  }
);

User.statics.CreateToken = async (id, secretId, exp) => {
  return await jwt.sign({ id }, secretId, { expiresIn: exp });
}

User.statics.CheckToken = async (req, secretId) => {
  const token = req.headers['token'];
  console.log("token")
  console.log(token)
  if (token) {
    return await jwt.verify(token, secretId);
  } else {
    return null;
  }
}

module.exports = mongoose.model("User", User);
