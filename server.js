var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
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
