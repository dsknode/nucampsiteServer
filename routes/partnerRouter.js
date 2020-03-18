const express = require('express');
const bodyParser = require('body-parser');
const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());



//these below are all chained together to the route '/'
partnerRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain'); // why plain text?
  next();
})
.get((req, res) => {
  res.end('will send partners to you');
})
.post((req, res) => {
  res.end(`will add partners:${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
  res.end('deleting all partners');
});



partnerRouter.route('/:partnerId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); // why plain text?
    next();
})
.get((req, res) => {
    res.end(`will send details of the partner: ${req.params.partnerId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partners`);
})
.put((req, res) => {
    res.write(`updating the partner: ${req.params.partnerId}\n`);
    res.end(`Will update the partner:${req.body.name} with the description:${req.body.description}`);
})
.delete((req, res) => {
    res.end(`deleting partner: ${req.params.partnerId}`);
});



module.exports = partnerRouter;