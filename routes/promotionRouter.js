const Promotion = require("../models/promotion");
const express = require("express");
const router = express.Router();
const authenticate = require("../authenticate");

router.get("/", (req, res) => {
  Promotion.find()
    .then(promotions => {
      res.send(promotions);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post("/", authenticate.verifyUser, (req, res) => {
  Promotion.create(req.body)
    .then(promotion => {
      res.send(promotion);
    })
    .catch(err => res.status(400).send(err));
});

router.put("/", authenticate.verifyUser, (req, res) => {
  res.status(403).send("Put not supported");
});

router.delete("/", authenticate.verifyUser, (req, res) => {
  Promotion.deleteMany()
    .then(response => {
      res.send(response);
    })
    .catch(err => res.status(400).send(err));
});

router.get("/:promotionId", (req, res) => {
  Promotion.findById(req.params.promotionId, (err, promotion) => {
    if (err) {
      res.status(400).send(err);
    }
    res.send(promotion);
  });
});

router.post("/:promotionId", authenticate.verifyUser, (req, res) => {
  res
    .status(403)
    .send(
      `POST operation not supported on /promotions/${req.params.promotionId}`
    );
});

router.put("/:promotionId", authenticate.verifyUser, (req, res) => {
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
});

router.delete("/:promotionId", authenticate.verifyUser, (req, res) => {
  Promotion.findByIdAndDelete(req.params.promotionId)
    .then(promotion => {
      res.send(promotion);
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
