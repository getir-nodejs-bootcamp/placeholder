const bcrypt = require("bcryptjs");

const User = require("../models/User");

const createUserController = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  // TODO: Validate user data
  try {
    await user.save();

    res.status(201).send({ user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({ error: "User already exists" });
    }

    console.log("an error occured while creating user", err);
    res.status(500).send({ error: "Error creating user" });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).send(`We are in`);
      } else {
        res.status(400).send(`Username or password is incorrect`);
      }
    } else {
      res.status(400).send(`Username or password is incorrect`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error logging in`);
  }
};

module.exports = { createUserController, loginUserController };
