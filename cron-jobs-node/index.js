 // index.js
 const cron = require("node-cron");
 const express = require("express");
 const fs = require("fs");
 var request = require('request');
 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/";

 app = express();

 // schedule tasks to be run on the server   
 cron.schedule("* * * * * *", function() {
    console.log("running a task every minute");
    
    // London
    request('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("london", response);
        }else{
            console.log(error);
        }
      });

      // London
    request('https://api.openweathermap.org/data/2.5/weather?q=Bern,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Bern", response);
        }else{
            console.log(error);
        }
      });

      // London
    request('https://api.openweathermap.org/data/2.5/weather?q=Zurich,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Zurich", response);
        }else{
            console.log(error);
        }
      });

      // London
    request('https://api.openweathermap.org/data/2.5/weather?q=Lyss,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Lyss", response);
        }else{
            console.log(error);
        }
      });

      // London
    request('https://api.openweathermap.org/data/2.5/weather?q=Luzern,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Luzern", response);
        }else{
            console.log(error);
        }
      });

      // London
    request('https://api.openweathermap.org/data/2.5/weather?q=Solothurn,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Solothurn", response);
        }else{
            console.log(error);
        }
      });

      // London
    request('https://api.openweathermap.org/data/2.5/weather?q=Basel,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Basel", response);
        }else{
            console.log(error);
        }
      });

       // London
    request('https://api.openweathermap.org/data/2.5/weather?q=Biel,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Biel", response);
        }else{
            console.log(error);
        }
      });


      

    function saveData(city, data){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("KlimaViewer");
            data = JSON.stringify(data)
            var myobj = { city: city, json: data };
            dbo.collection("testData").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
    }
  


  });
  app.listen(3128);