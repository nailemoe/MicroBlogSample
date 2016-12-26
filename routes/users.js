var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/name/:username', function(req, res) {
  res.send('user is ' + req.params.username);
});

module.exports = router;
