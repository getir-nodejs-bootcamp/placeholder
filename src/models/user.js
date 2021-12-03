const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be longer than 8 characters."],
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      user.password = hashedPassword;
      next();
    } catch (error) {
      console.log("an error occured while hashing password", error);
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
