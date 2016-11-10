'use strict';

const express = require('express');

const User = require('../../models/user');
const usersService = require('../../services/users');

const router = express.Router();

router.get('/', (req, res, next) => {
  let parameters = {};

  res.render('index');
});

module.exports = router;
