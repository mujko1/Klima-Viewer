 // index.js
 const cron = require("node-cron");
 const express = require("express");
 const fs = require("fs");
 var request = require('request');
 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/";

 app = express();

 // schedule tasks to be run on the server   
 cron.schedule("0 */3 * * *", function() {    
    request('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("london", response);
        }else{
            console.log(error);
        }
      });

    request('https://api.openweathermap.org/data/2.5/weather?q=Bern,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Bern", response);
        }else{
            console.log(error);
        }
      });

    request('https://api.openweathermap.org/data/2.5/weather?q=Zurich,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Zurich", response);
        }else{
            console.log(error);
        }
      });

    request('https://api.openweathermap.org/data/2.5/weather?q=Lyss,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Lyss", response);
        }else{
            console.log(error);
        }
      });

    request('https://api.openweathermap.org/data/2.5/weather?q=Luzern,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Luzern", response);
        }else{
            console.log(error);
        }
      });

    request('https://api.openweathermap.org/data/2.5/weather?q=Solothurn,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Solothurn", response);
        }else{
            console.log(error);
        }
      });

    request('https://api.openweathermap.org/data/2.5/weather?q=Basel,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Basel", response);
        }else{
            console.log(error);
        }
      });

    request('https://api.openweathermap.org/data/2.5/weather?q=Biel,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Biel", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Murten,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Murten", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Bellizona,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("weather", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Lausanne,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Lausanne", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Neuchatel,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Neuchatel", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Geneva,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Geneva", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Gstaad,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Gstaad", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Davos,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Davos", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Schwyz,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Schwyz", response);
        }else{
            console.log(error);
        }
      });

      request('https://api.openweathermap.org/data/2.5/weather?q=Altdorf,ch&APPID=c5ff046efd910a43225f16e306180c09', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          saveData("Altdorf", response);
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