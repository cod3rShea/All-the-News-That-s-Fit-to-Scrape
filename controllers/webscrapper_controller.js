let axios = require('axios'); // HTTP Request
let cheerio = require('cheerio'); // Web Scrapper
let mongoose = require('mongoose'); // MongoDB ORM

const connection = require("../config/connection.js");

// redirect root to index

module.exports = (app) => {

  // Export The Module Containing Routes. Called from Server.js
  app.get("/", (req, res) => res.render("index"));

  // Scrape data from one site and place it into the mongodb db
  app.get("/scrape", function (req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://blog.worldsynergy.com/").then(function (response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      // For each element with a "title" class
      var allArticlesTitle = [];
      var allArticlesContent = [];
      var allArticlesLink = [];

      $(".post-item").each(function (i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children(".post-item-content").children('.post-header').find('a').text();
        var content = $(element).children(".post-item-content").children('.post-body').find('p').text();
        var link = $(element).children(".post-item-content").children('.post-header').find('a').attr("href");
        // console.log("test " + title);
        // console.log("test 2 " + link);
        allArticlesTitle.push(title);
        allArticlesContent.push(content);
        allArticlesLink.push(link);
  
        // If this found element had both a title and a link
        // if (title && link) {
        //   // Insert the data in the scrapedData db
        //   db.scrapedData.insert({
        //     title: title,
        //     link: link
        //   },
        //     function (err, inserted) {
        //       if (err) {
        //         // Log the error if one is encountered during the query
        //         console.log(err);
        //       }
        //       else {
        //         // Otherwise, log the inserted data
        //         console.log(inserted);
        //       }
        //     });
        // }
        // console.table(response.data);
      });
      res.send({title:allArticlesTitle, content:allArticlesContent, link:allArticlesLink});
    });
    // Send a "Scrape Complete" message to the browser
    // res.send("Scrape Complete");
  });


}
