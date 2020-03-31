// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const usersRouter = require("./users");
const campsiteRouter = require("./campsiteRouter");
const partnerRouter = require("./partnerRouter");
const promotionRouter = require("./promotionRouter");

module.exports = { usersRouter, campsiteRouter, partnerRouter, promotionRouter }