/** 
  * @desc This is the backend API server. Which connect to db and handle requests and responses.
  * @author mujko1 kozinai
*/

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');
const locationRoute = require('../routes/location.route');
const weatherRecord = require('../routes/weatherRecord.route');


// Connect with database
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

// Enable routing with routers[LocationRoutes, WeatherRecordRoute]
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/Location', locationRoute);
app.use('/WeatherRecord', weatherRecord);
const port = process.env.PORT || 4000;

// Listen on port if there comes a request.
const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});