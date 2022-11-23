const express = require("express");
const app = express();
const port = 4000;
const ejs = require("ejs");
const layout = require("express-ejs-layouts");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const Note = require("./models/notes");
const User = require("./models/user");
//connect to database

mongoose
  .connect(
    "mongodb+srv://oseitutunelson:Google...12@cluster0.e3cwkes.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("database is connected");
  })
  .catch((error) => {
    console.log(error);
  });

//controllers
const userController = require("./controllers/userController");
const noteController = require("./controllers/noteController");
//middlewares
app.use(layout);
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

//routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Thoughts"
  });
});
app.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Signup"
  });
});
app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login"
  });
});
app.get("/thoughts", (req, res) => {
  Note.find().then((note) => {
    res.render("user_model", {
      note: note,
      title: "Thoughts"
    });
  });
});
app.post(
  "/login/user",
  userController.authenticate,
  userController.rediretView
);
app.post("/signup/user", userController.create, userController.rediretView);
app.post("/newIdea", noteController.create, noteController.redirectView);
app.delete(
  "/thoughts/:id/delete",
  noteController.delete,
  noteController.redirectView
);

//start server
http.createServer(app).listen(port, () => {
  console.log("App is running");
});
