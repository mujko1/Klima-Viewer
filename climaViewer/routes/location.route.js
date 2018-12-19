const express = require('express');
const app = express();
const locationRoutes = express.Router();

// Require location model in our routes module
let Location = require('../models/Location');

// Defined store route
locationRoutes.route('/add').post(function (req, res) {
  let location = new Location(req.body);
  location.save()
    .then(location => {
      res.status(200).json({'location': 'location in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
locationRoutes.route('/').get(function (req, res) {
    Location.find(function (err, locations){
    if(err){
      console.log(err);
    }
    else {
      res.json(locations);
    }
  });
});

module.exports = locationRoutes;