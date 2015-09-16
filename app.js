var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var express = require('express');
var path = require('path');

var config = require('./config/settings');

var app = express();

app.set('port', config.appPort || 3000);

// Enable CORS
app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname)));

// Controllers
var user = require('./controllers/user');

// Routing
app.use(config.apiUrl + 'user', user);

// Run the Express server
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;