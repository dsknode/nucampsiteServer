const Favorite = require("../models/favorite");
const { Router } = require("express");
const router = Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

router.route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id }).populate("user").populate("campsites")
    .then(favorite => {
      res.json(favorite);
    })
    .catch(err => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
      (req, res) => {
        // check if thre is a favorite document
        // if no document create it
        // submit array of favorites
        // if so check if favorite already exists and add it
        Favorite.findOne({ user: req.user._id })
        .then( favorite => {
          if(favorite){
            // example of data sent in req.body:
            // [{"_id":"campsite ObjectId"},  . . . , {"_id":"campsite ObjectId"}]
            req.body.forEach( fav => {
              if(!favorite.campsites.includes(fav._id)){
                favorite.campsites.push(fav._id)
              }
            })// end for each
            favorite.save()
            .then(favorite => {
              res.send(favorite);
            })
            .catch(err => next(err));
          } else {
            Favorite.create(req.body)
            .then(favorite => {
              res.send(favorite);
            })
            .catch(err => next(err));
          }
        })
  })
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
      (req, res) => {
    res.statusCode = 403;
    res.end("put not supported");
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    (req, res) => {
      //check for document, delete it if there is one
      Favorite.findOne({ user: req.user._id })
      .then(response => {
        if (response){
          response.remove()
          .then( favorite => {
            res.send(favorite);
          })
          .catch(err => next(err));
        }else{
          res.statusCode = 403;
          res.send("no favorites to delete: ", response);
        }
      })
      .catch(err => next(err));
  });


router.route('/:campsiteId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end("get not supported");
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    (req, res) => {
    // check for favorite document
    // only add campsite if not already there
    // if no document, add one and add campsite
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
      if(favorite){
        if(!favorite.campsites.includes(req.params.campsiteId)){
          favorite.campsites.push(req.params.campsiteId)
          favorite.save()
          .then(favorite => {
            res.send(favorite);
          })
          .catch(err => next(err));
        } else {
          res.send("campsite already favorited");
        }
      } else {
        Favorite.create({
          user: req.user._id,
          campsites: [req.params.campsiteId]
        })
        .then(favorite => {
          res.send(favorite);
        })
        .catch(err => next(err));
      }//end favorite check
    })// end first then
    .catch(err => next(err));
  })
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    (req, res) => {
      res.statusCode = 403;
      res.end("put not supported");
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
      (req, res) => {
    // check for document
    Favorite.findOne({ user: req.user._id })
    // check if document has campsite id
    .then(favorite => {
      if(favorite){
        if(favorite.campsites.includes(req.params.campsiteId)){
          let i = favorite.campsites.indexOf(req.params.campsiteId);
          favorite.campsites.splice(i,1);
        }else{
          res.send(`error: cannot find campsite to delete in favorites ${favorite}`);
        }
      }else{
        res.send(`error: no favorites ${favorite}`);
      }
    })
    .catch(err => next(err));
    // if so delete it
  });


module.exports = router;