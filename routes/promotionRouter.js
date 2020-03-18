const express = require('express');
const bodyParser = require('body-parser');
const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());



//these below are all chained together to the route '/'
promotionRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain'); // why plain text?
  next();
})
.get((req, res) => {
  res.end('will send promotions to you');
})
.post((req, res) => {
  res.end(`will add promotions:${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
  res.end('deleting all promotions');
});



promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); // why plain text?
    next();
})
.get((req, res) => {
    res.end(`will send details of the promotion: ${req.params.promotionId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions`);
})
.put((req, res) => {
    res.write(`updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion:${req.body.name} with the description:${req.body.description}`);
})
.delete((req, res) => {
    res.end(`deleting promotion: ${req.params.promotionId}`);
});



module.exports = promotionRouter;