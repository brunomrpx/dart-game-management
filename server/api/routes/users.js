'use strict';

const express = require('express');

const User = require('../../models/user');
const usersService = require('../../services/users');

const router = express.Router();

function handleError(next) {
  return (e) => {
    return next(e);
  }
}

router.get('/', (req, res, next) => {
  usersService.getAll().then(users => {
    res.json({ users: users });
  }).catch(handleError(next));
});

router.get('/:id', (req, res, next) => {
  let userId = req.params.id;

  usersService.getById(userId).then(user => {
    res.json({ user: user });
  }).catch(handleError(next));
});

router.post('/', (req, res, next) => {
  let postData = req.body;

  usersService.create(postData).then(user => {
    res.json({ user: user });
  }).catch(handleError(next));
});

router.delete('/:ids', (req, res, next) => {
  let ids = req.params.ids.split(',');

  usersService.delete(ids).then(() => {
    res.json({ ids: ids });
  }).catch(handleError(next));
});

router.put('/:id', (req, res, next) => {
  let userId = req.params.id;
  let newData = req.body;

  usersService.update(userId, newData).then(user => {
    res.json({ user: user });
  }).catch(handleError(next));
});

module.exports = router;
