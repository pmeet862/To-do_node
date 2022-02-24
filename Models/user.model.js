const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
//     expiresIn: "10m",
//   });
//   return token;
// };

const User = mongoose.model("User", userSchema);

const registrationValidate = (data) => {
  const Schema = joi.object({
    name: joi.string().required().label("Name"),
    email: joi.string().email().required().label("E-mail"),
    password: passwordComplexity().required().label("Password"),
  });
  return Schema.validate(data);
};

const loginValidate = (data) => {
  const Schema = joi.object({
    email: joi.string().email().required().label("E-mail"),
    password: joi.string().required().label("Password"),
  });
  return Schema.validate(data);
};

module.exports = { User, registrationValidate, loginValidate };
