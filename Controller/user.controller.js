const {
  User,
  registrationValidate,
  loginValidate,
} = require("../Models/user.model");
const bcrypt = require("bcrypt");

module.exports = {
  userRegistration: async (req, res) => {
    try {
      const { error } = registrationValidate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(409)
          .send({ message: "User with given E-mail already exist" });
      }
      const salt = await bcrypt.genSalt(Number(process.env.SALT));

      const hashPassword = await bcrypt.hash(req.body.password, salt);
      await new User({ ...req.body, password: hashPassword }).save();
      console.log(User);
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { error } = loginValidate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).send({ message: "Invalid E-mail or Password" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).send({ message: "Invalid E-mail or Password" });
      }
      const token = user.generateAuthToken();
      res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
