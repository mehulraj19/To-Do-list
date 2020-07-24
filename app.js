const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const items = ["Eat", "Code"];
const workList = [];

app.get("/", function(req, res) {

  let day = date.getDate();

  res.render("list", {
    ListTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {

  var item = req.body.newItem;
  if (req.body.list === "Work") {
    workList.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work", function(req, res) {

  res.render("list", {
    ListTitle: "Work List",
    newListItems: workList
  });
});

app.get("/about",function(req,res){
  res.render("about")
});

app.listen(3000, function() {
  console.log("Server started on the port 3000");
});
