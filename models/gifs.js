var mongoose = require("mongoose");

var gifsSchema = new mongoose.Schema({
  keyword: String,
  url: String,
  description: String
});

module.exports = mongoose.model('Gifs', gifsSchema);
