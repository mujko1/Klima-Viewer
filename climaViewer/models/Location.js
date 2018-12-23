/** 
  * @desc This is the class of Location table which work as a model for the app.
  * @author mujko1 kozinai
*/


// Bind schema from mongodb to have model in app
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Location
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