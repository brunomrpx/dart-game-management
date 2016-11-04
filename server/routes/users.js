'use strict';

const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Bruno', username: 'brunomrpx', email: 'brunomrpx@gmail.com'},
  { id: 2, name: 'Anna', username: 'anna', email: 'anna@gmail.com'},
  { id: 3, name: 'Jairo', username: 'jax', email: 'jairo@gmail.com'}
];

router.get('/', (req, res, next) => {
  let parameters = {
    users: users
  };

  res.render('users/index', parameters);
});

router.get('/new', (req, res, next) => {
  let parameters = {
    user: {}
  };

  res.render('users/form', parameters);
});

router.post('/save/:id?', (req, res, next) => {
  let userId = req.params.id;
  let userData = req.body;

  // adding new user
  if (!userId) {
    let userIds = users.map(u => u.id);
    let nextId = Math.max.apply(null, userIds);
    userData.id = ++nextId;
    users.push(userData);
  } else {
    let user = users.find(u => u.id == userId);
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

  res.render('users/form', parameters);
});

router.get('/remove/:id', (req, res, next) => {
  let userId = req.params.id;
  let user = users.find(u => u.id == userId);
  users.splice(users.indexOf(user), 1);

  res.redirect('/users');
});

module.exports = router;
