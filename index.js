var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var gifsRoutes = require("./routes/gifs");
// var routes = require("");
var uriUtil = require('mongodb-uri');
var mongoose = require('mongoose');
var Gifs = require('./models/gifs');
mongoose.Promise = global.Promise;

var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/gifs';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(mongooseUri, options);

var app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function(req, res, next){
    req.veryImportantInformation = 'Super crucial to the request';
    next();
})

app.get('/v1/gifs/search', function(req, res){
    var query = req.query.q;
    Gifs.find({keyword:query}, function(err, foundgifs){
      if(err){
        next(err);
      } else {
        res.json(foundgifs)
      }
    });
})

app.post('/v1/gifs', function(req, res){
    var aGif = new Gifs();
    aGif.keyword = req.body.gif.keyword
    aGif.url = req.body.gif.url
    aGif.description = req.body.gif.description
    aGif.save(function(err, aGif){
      if(err) {
        res.send(err)
      } else {
        res.json(aGif)
      }
    });
});

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  var gifs = [];
  Gifs.find(function(err, foundgifs){
    if(err){
      next(err);
    } else {
      res.render('index', {gifs: foundgifs});
    }
  });
});

app.listen(3000);
