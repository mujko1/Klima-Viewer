/** 
  * @desc This is the class is for the routing of the app.
  * @author mujko1 kozinai
*/

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
    WeatherRecord.find(function (err, weatherRecords){
    if(err){
      console.log(err);
    }
    else {
      res.json(weatherRecords);
    }
  });
});

// Find records by location id
weatherRecordRoutes.route('/:id').get(function (req, res) {
  WeatherRecord.find(function (err, weatherRecords){
  if(err){
    console.log(err);
  }
  else {
    let filtered = weatherRecords.filter(function(value, index, arr){
      return value.id == req.params.id;
    });
    weatherRecords = filtered;
    res.json(weatherRecords);
  }
});
});


module.exports = weatherRecordRoutes;