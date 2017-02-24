var express = require('express');
var router = express.Router();
var Gifs = require('../models/gifs');

router.use(function(req, res, next){
  console.log('something is happening!');
  res.setHeader('Content-Type', 'application/json');
  next();
});


router.route('/gifs')
  .post(function(req, res){

    var gifs = new Gifs();

    gifs.keyword = req.body.keyword;
    gifs.url = req.body.url;
    gifs.description = req.body.description;


    gifs.save(function(err, gifs){
      if(err){
        res.send(err)
      } else {
        res.json(gifs)
      }
    })
  })
  .get(function(req, res){
    Gifs.find(function(err, gifs){
      if(err){
        return next(err);
      } else {
        res.json(gifs)
      }
    })
  });

router.route('/gifs/:gif_id')
  .get(function(req, res){
    Gifs.findById(req.params.gif_id, function(err, gifs){
      if(err){
        console.log(err);
      } else {
        res.json(gifs);
      }
    })
  })
  // .put(function(req, res){
  //   Gifs.findById(req.params.gif_id, function(err, gifs){
  //     if(err){
  //       console.log(err)
  //     } else {
  //       gifs.keyname = req.body.keyname || gifs.keyname;
  //       gifs.url = req.body.url || gifs.url;
  //       gifs.description = req.body.description || gifs.description;
  //
  //
  //       gifs.save(function(err){
  //         if(err){
  //           console.log(err)
  //         } else {
  //           res.json({title: "gifs updated"})
  //         }
  //       })
  //     }
  //   })
  // })
  // .delete(function(req, res){
  //   Gifs.remove({_id: req.params.gif_id}, function(err, gifs){
  //     if(err){
  //       console.log(err)
  //     } else {
  //       res.json({title: 'gifs was successfully deleted!'})
  //     }
  //   })
  // });

module.exports = router;
