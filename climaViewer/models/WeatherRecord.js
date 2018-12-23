/** 
  * @desc This is the class of WeatherRecord table which work as a model for the app.
  * @author mujko1 kozinai
*/


// Bind schema from mongodb to have model in app
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for WeatherRecord
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