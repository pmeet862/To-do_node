const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");

router.post("/register", userController.userRegistration);

router.post("/login", userController.userLogin);

module.exports = router;
