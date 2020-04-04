const Promotion = require("../models/promotion");
const express = require("express");
const router = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

router
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.find()
      .then(promotions => {
        res.send(promotions);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      Promotion.create(req.body)
        .then(promotion => {
          res.send(promotion);
        })
        .catch(err => res.status(400).send(err));
    }
  )
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.status(403).send("Put not supported");
  })
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      Promotion.deleteMany()
        .then(response => {
          res.send(response);
        })
        .catch(err => res.status(400).send(err));
    }
  );

router
  .route("/:promotionId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId, (err, promotion) => {
      if (err) {
        res.status(400).send(err);
      }
      res.send(promotion);
    });
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res
        .status(403)
        .send(
          `POST operation not supported on /promotions/${req.params.promotionId}`
        );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      Promotion.findByIdAndUpdate(
        req.params.promotionId,
        {
          $set: req.body
        },
        { new: true }
      )
        .then(promotion => {
          res.send(promotion);
        })
        .catch(err => res.status(400).send(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      Promotion.findByIdAndDelete(req.params.promotionId)
        .then(promotion => {
          res.send(promotion);
        })
        .catch(err => res.status(400).send(err));
    }
  );

module.exports = router;
