const Partner = require("../models/partner");
const { Router } = require("express");
const router = Router();
const authenticate = require("../authenticate");

router.get("/", (req, res) => {
  Partner.find()
    .then(partners => {
      res.send(partners);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post("/", authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  Partner.create(req.body)
    .then(partner => {
      res.send(partner);
    })
    .catch(err => res.status(400).send(err));
});

router.put("/", authenticate.verifyUser, (req, res) => {
  res.statusCode = 403;
  res.end("put not supported");
});

router.delete("/", authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  Partner.deleteMany()
    .then(response => {
      res.send(response);
    })
    .catch(err => res.status(400).send(err));
});

router.get("/:partnerId", (req, res) => {
  Partner.findById(req.params.partnerId)
    .then(partner => {
      res.send(partner);
    })
    .catch(err => res.status(400).send(err));
});

router.post("/:partnerId", authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res
    .status(403)
    .send(`POST operation not supported on /partners/${req.params.partnerId}`);
});

router.put("/:partnerId", authenticate.verifyUser, (req, res) => {
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
});

router.delete("/:partnerId", authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  Partner.findByIdAndDelete(req.params.partnerId)
    .then(partner => {
      res.send(partner);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
