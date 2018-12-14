var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    id: number,
    name: String,
    zip: number,
    geolcation: String,
    addedDate: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Location', LocationSchema);
