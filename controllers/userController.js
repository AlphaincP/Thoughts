const User = require("../models/user");

module.exports = {
  create: (req, res, next) => {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    User.create(newUser)
      .then((user) => {
        res.locals.redirect = `/thoughts`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user && user.password === req.body.password) {
          res.locals.redirect = `/thoughts`;
          res.locals.user = user;
          next();
        } else {
          res.locals.redirect = `/login`;
          next();
        }
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  rediretView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};
