const express = require("express");
const {
  createUserController,
  loginUserController,
} = require("../controllers/user");
const router = express.Router();

router.post("/signup", createUserController);

router.post("/login", loginUserController);

module.exports = router;
