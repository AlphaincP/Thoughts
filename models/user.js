const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.checkPassword = function (guess, done) {
  bcrypt.compare(guess, this.password, function (error, isMatch) {
    if (error) return done(error);
    else {
      return done(null, isMatch);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
