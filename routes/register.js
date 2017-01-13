var express = require('express');
var crypto = require('crypto');
var User = require('../models/users.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res) {
  var userName = req.body.username.trim();
  var password = req.body['password-repeat'].trim();
  var repeatPassword = req.body['password'].trim();
  var isCorrect = true;
  var errMsg = '';

  if(userName == '') {
    isCorrect = false;
    errMsg = '用户名不能为空';
  }
  if(password != repeatPassword) {
    isCorrect = false;
    errMsg = '两次输入的密码不一致';
  }
  if(false == isCorrect) {
    req.flash('error', errMsg);
    console.log('error:' + errMsg);
    return res.redirect('/register');
  }

  var md5 = crypto.createHash('md5');
  var md5Password = md5.update(password).digest('base64');
  var newUser = new User({ name: userName, password: md5Password });
  User.get(newUser.name, function(err, user) {
    if (user) {
      err = 'Username already exists.';
      req.flash('error', err);
      return res.redirect('/register');
    }

    newUser.save(function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/register');
      }
      req.session.user = newUser;
      req.flash('success', '注册成功');
      res.redirect('/');
    });
  });
});

module.exports = router;
