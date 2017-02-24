var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var uriUtil = require('mongodb-uri');
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'js');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});


var port = process.env.PORT || 3000;

app.listen(port, function(req, res){
  console.log('listening on this port: ' + port);
});

var express = require('express');
var bodyParser = require('body-parser');
var uriUtil = require('mongodb-uri');
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/todos2';
// var mongooseUri = uriUtil.formatMongoose(mongodbUri);
// var options = {
//   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
// };
// mongoose.connect(mongooseUri, options);
var Gifs = require('./models/gifs');
var gifsRoutes = require('./routes/gifs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});

app.use('/api', gifsRoutes);

var port = process.env.PORT || 3000;

app.listen(port, function(req, res){
  console.log('listening on this port: ' + port);
});
