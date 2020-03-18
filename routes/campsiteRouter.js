const express = require('express');
const bodyParser = require('body-parser');
const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());

//these below are all chained together to the route '/'
campsiteRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain'); // why plain text?
  next();
})
.get((req, res) => {
  res.end('will send campsites to you');
})
.post((req, res) => {
  res.end(`will add campsites:${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
  res.end('deleting all campsites');
});

campsiteRouter.route('/:campsiteId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); // why plain text?
    next();
})
.get((req, res) => {
    res.end(`will send details of the campsite: ${req.params.campsiteId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites`);
})
.put((req, res) => {
    res.write(`updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite:${req.body.name} with the description:${req.body.description}`);
})
.delete((req, res) => {
    res.end(`deleting campsite: ${req.params.campsiteId}`);
});


module.exports = campsiteRouter;