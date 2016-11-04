'use strict';

var express = require('express');
var router = express.Router();

var users = [
  { id: 1, name: 'Bruno', username: 'brunomrpx', email: 'brunomrpx@gmail.com'},
  { id: 2, name: 'Anna', username: 'anna', email: 'anna@gmail.com'},
  { id: 3, name: 'Jairo', username: 'jax', email: 'jairo@gmail.com'}
];

router.get('/', function(req, res, next) {
  var parameters = {
    users: users
  };

  console.log('parameters: ', parameters);

  res.render('users/index', parameters);
});

router.get('/new', function(req, res, next) {
  let parameters = {
    user: {}
  };

  res.render('users/new', parameters);
});

router.post('/new', function(req, res, next) {
  let userData = req.body;

  console.log('-> userData: ', userData);

  // adding new user
  if (!userData.id) {
    let userIds = users.map(u => u.id);
    let nextId = Math.max.apply(null, userIds);
    userData.id = ++nextId;
    users.push(userData);
  } else {
    let user = users.find(u => u.id == userData.id);
    Object.assign(user, userData);
  }

  res.redirect('/users');
});

router.get('/edit/:id', (req, res, next) => {
  let userId = req.params.id;
  let user = users.find(u => u.id == userId);

  let parameters = {
    user: user
  };

  res.render('users/new', parameters);
});

router.get('/remove/:id', (req, res, next) => {
  let userId = req.params.id;
  let user = users.find(u => u.id == userId);
  users.splice(users.indexOf(user), 1);

  res.redirect('/users');
});

module.exports = router;
