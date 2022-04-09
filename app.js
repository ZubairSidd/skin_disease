const express = require("express");
const res = require("express/lib/response");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/project", (req, res) => {
  res.render("project");
});
app.get("/about", (req, res) => {
  res.render("about-us");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
