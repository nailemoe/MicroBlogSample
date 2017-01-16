const express = require('express');
var crypto = require('crypto');
var router = express.Router();
var user = require('../models/users');

function checkLogin(req, res, next) {
  if(req.session.user) {
    req.flash('error', '以登入');
    return res.redirect('/')
  }
  next();
}

router.get('/', checkLogin);

router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/',function (req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  user.get(req.body.username, function (err, user) {
    if(!user) {
      req.flash('error', '该用户不存在');
      return res.redirect('/login');
    }
    if(user.password != password) {
      req.flash('error', '密码输入错误');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登入成功');
    return res.redirect('/');
  });
});

module.exports = router;
