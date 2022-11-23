const Note = require("../models/notes");

module.exports = {
  create: (req, res, next) => {
    let newNote = {
      idea: req.body.idea,
      details: req.body.details
    };

    Note.create(newNote)
      .then((note) => {
        res.locals.redirect = "/thoughts";
        res.locals.note = note;
        next();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  delete: (req, res, next) => {
    let userId = req.params.id;
    Note.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/thoughts";
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let noteId = req.params.id;
    Note.findById(noteId)
      .then((note) => {
        res.locals.note = note;
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  showView: (req, res, next) => {
    res.render("note_show");
  }
};
