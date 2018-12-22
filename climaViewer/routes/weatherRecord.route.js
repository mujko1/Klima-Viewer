const express = require('express');
const app = express();
const weatherRecordRoutes = express.Router();

// Require weatherRecord model in our routes module
let WeatherRecord = require('../models/WeatherRecord');

// Defined store route
weatherRecordRoutes.route('/add').post(function (req, res) {
  let weatherRecord = new WeatherRecord(req.body);
  weatherRecord.save()
    .then(weatherRecord => {
      res.status(200).json({'weatherRecord': 'weatherRecord in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
weatherRecordRoutes.route('/').get(function (req, res) {
    weatherRecord.find(function (err, weatherRecords){
    if(err){
      console.log(err);
    }
    else {
      res.json(weatherRecords);
    }
  });
});

// Defined get data(index or listing) route
weatherRecordRoutes.route('/getRecordsFromID').post(function (req, res) {
  console.log(req.body);
  weatherRecord.find({id: req.body},function (err, weatherRecords){
  if(err){
    console.log(err);
  }
  else {
    res.json(weatherRecords);
  }
});
});


module.exports = weatherRecordRoutes;