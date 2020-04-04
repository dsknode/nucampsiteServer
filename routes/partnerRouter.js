const Partner = require("../models/partner");
const { Router } = require("express");
const router = Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

router
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Partner.find()
      .then(partners => {
        res.send(partners);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }).post(
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    Partner.create(req.body)
      .then(partner => {
        res.send(partner);
      })
      .catch(err => res.status(400).send(err));
  }
).put(
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    res.statusCode = 403;
    res.end("put not supported");
  }
).delete(
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    Partner.deleteMany()
      .then(response => {
        res.send(response);
      })
      .catch(err => res.status(400).send(err));
  }
);

router
  .route("/:partnerId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Partner.findById(req.params.partnerId)
      .then(partner => {
        res.send(partner);
      })
      .catch(err => res.status(400).send(err));
  }).post(
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    res
      .status(403)
      .send(
        `POST operation not supported on /partners/${req.params.partnerId}`
      );
  }
).put(
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    Partner.findByIdAndUpdate(
      req.params.partnerId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(partner => {
        res.send(partner);
      })
      .catch(err => res.status(400).send(err));
  }
).delete(
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then(partner => {
        res.send(partner);
      })
      .catch(err => res.status(400).send(err));
  }
);

module.exports = router;
