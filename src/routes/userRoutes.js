const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });

    if (user) {
      if (password === user.password) {
        res.status(200).send(`We are in`);
      } else {
        res.status(400).send(`Username or password is incorrect`);
      }
    } else {
      res.status(400).send(`Username or password is incorrect`);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
