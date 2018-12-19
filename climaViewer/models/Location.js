const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Location = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  zip: {
    type: Number
  },
  geoLocation: {
    type: String
  },
  addedDate: {
    type: String
  }
},{
    collection: 'Location'
});

module.exports = mongoose.model('Location', Location);