const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let WeatherRecord = new Schema({
  id: {
    type: String
  },
  temperature: {
    type: Number
  },
  wind: {
    type: Number
  },
  pressure: {
    type: Number
  },
  precipitation: {
    type: Number
  },
  date: {
    type: String
  },
  response: {
    type: String
  }
},{
    collection: 'WeatherRecord'
});

module.exports = mongoose.model('WeatherRecord', WeatherRecord);