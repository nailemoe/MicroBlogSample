const express = require('express');
var router = express.Router();

function checkNotLogin(req, res, next) {
  if(!req.session.user) {
    req.flash('error', '未登入');
    return res.redirect('/');
  }
  next();
}

router.get('/', checkNotLogin);

router.get('/', function (req, res, next) {
  req.session.user = null;
  req.flash('success', '登出成功');
  res.redirect('/');
});

module.exports = router;
