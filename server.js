// Dependencies
var express = require("express");
var mongojs = require("mongojs");
const bodyParser = require("body-parser");
var expresshbrs = require('express-handlebars');

// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000

// allow serving to static files
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", expresshbrs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// // Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

//configure route
require("./controllers/webscrapper_controller.js")(app);


// // Retrieve data from the db
// app.get("/all", function(req, res) {
//   // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });

// Listen on port 3000
app.listen(PORT, function () {
  console.log("App running on port 3000!");
});