// index.js
const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbConn;
app = express();

// schedule tasks to be run on the server   
cron.schedule("0 */3 * * *", function() {    
// Every minute 
//cron.schedule("* * * * * *", function () {
function getLocations(){
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbConn = db.db("ClimaViewer");
    dbConn.collection("Location").distinct("name",{}, 
    (function(err, locations){
         if(err){
             return console.log(err);
         }
         if(locations){  
             for(let location of locations){
               sendRequest(location);
             }
         }
    })
    );
    db.close();
  });
};

function sendRequest(name) {
  request(`https://api.openweathermap.org/data/2.5/weather?q=${name},ch&APPID=c5ff046efd910a43225f16e306180c09`, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    saveData(response);
  } else {
    console.log(error);
  }
});
}

//init();
getLocations();

function saveCity(data){
  data = JSON.parse(data.body);

  var location = {
    id: data.id,
    name: data.name,
    zip: "",
    geoLocation: JSON.stringify(data.coord),
    addedDate: String(new Date()),
  };
  saveLocation(location);
}

function saveData(data) {
  data = JSON.parse(data.body);
  var weatherRecord = {
    id: data.id,
    temperature: data.main.temp,
    wind: data.wind.speed,
    pressure: data.main.pressure,
    precipitation: (typeof (data.precipitation) !== 'undefined') ? data.precipitation : "",
    date: String(new Date()),
    response: JSON.stringify(data)
  };
  saveWeatherRecord(weatherRecord);
}

function saveWeatherRecord(weatherRecord) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbConn = db.db("ClimaViewer");
    dbConn.collection("WeatherRecord").insertOne(weatherRecord, function (err, res) {
      if (err) throw err;
    });
    db.close();
  });
}

function saveLocation(location) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbConn = db.db("ClimaViewer");
    dbConn.collection("Location").insertOne(location, function (err, res) {
      if (err) throw err;
      console.log("Save a new city");
    });
    db.close();
  });
}


function init(){
  let cities = [ 
  'Solothurn',
  'Murten',
  'Biel',
  'Bern',
  'Zurich',
  'Davos',
  'Basel',
  'Neuchatel',
  'Altdorf',
  'Lyss',
  'Lausanne',
  'Geneva',
  'Schwyz',
  'Lucerne',
  'Gstaad'
 ]
 for (let city of cities){
   sendRequest(city);
 }

}


});
app.listen(3128);


