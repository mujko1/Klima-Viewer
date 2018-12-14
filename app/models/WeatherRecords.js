var mongoose = require('mongoose');

var WeatherRecordSchema = new mongoose.Schema({
    id: number,
    date: { type: Date, default: Date.now },
    temperature: String,
    wind: String,
    pressure: String,
    precipitation: String,
    addedDate: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('WeatherRecord', WeatherRecordSchema);
