const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const User = Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    level: { type: Number, required: true, default: 0, min: 0, max: 9 },
  },
  {
    toObject: { virtuals: true },
    toJson: { virtuals: true },
    timestamps: true
  }
);

User.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})

User.statics.CreateToken = async (id, secretId, exp) => {
  return await jwt.sign({ id }, secretId, { expiresIn: exp });
}

User.statics.CheckToken = async (req, secretId) => {
  const token = req.headers['token'];

  if (token) {
    return await jwt.verify(token, secretId);
  } else {
    return null;
  }
}

User.plugin(mongoosePaginate);

module.exports = mongoose.model("User", User);
