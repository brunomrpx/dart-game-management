'use strict';

const express = require('express');

const User = require('../../models/user');
const usersService = require('../../services/users');

const router = express.Router();

router.get('/', (req, res, next) => {
  let parameters = {};

  usersService.getAll().then(users => {
    parameters.users = users;
    res.render('users/index', parameters);
  });
});

router.get('/new', (req, res, next) => {
  let parameters = {
    user: {}
  };

  res.render('users/form', parameters);
});

router.get('/edit/:id?', (req, res, next) => {
  let userId = req.params.id;
  let parameters = {};

  usersService.getById(userId).then(user => {
    parameters.user = user;
    res.render('users/form', parameters);
  });
});

router.get('/delete/:id?', (req, res, next) => {
  let userId = req.params.id;

  usersService.delete(userId).then(() => {
    res.redirect('/users');
  });
});

router.post('/save/:id?', (req, res, next) => {
  let userData = req.body;
  let userId = req.params.id;
  let promise;

  if (userId) {
    promise = usersService.update(userId, userData);
  } else {
    promise = usersService.create(userData);
  }

  promise.then(user => {
    res.redirect('/users');
  });
});

module.exports = router;
