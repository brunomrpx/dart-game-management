'use strict';

const express = require('express');
const router = express.Router();

const usersService = require('../../services/users');
const matchesService = require('../../services/matches');

router.get('/', (req, res, next) => {
  let parameters = {
    finishedMatches: [],
    currentMatches: []
  };

  matchesService.getAll().then(matches => {
    let matchesType;

    matches.forEach(m => {
      matchesType = m.finished ? 'finishedMatches' : 'currentMatches';
      parameters[matchesType].push(m);
    });

    res.render('matches/index', parameters);
  });
});

router.get('/new', (req, res, next) => {
  let parameters = {
    match: {},
    users: {}
  };

  usersService.getAll().then(users => {
    parameters.users = users;
    res.render('matches/form', parameters);
  });
});

router.post('/new', (req, res, next) => {
  let matchData = {
    players: req.body.players,
  };

  matchesService.create(matchData).then(match => {
    res.redirect('/matches/');
  });
});

router.get('/delete/:id?', (req, res, next) => {
  let matchId = req.params.id;

  console.log('deleting match: ', matchId);

  matchesService.delete(matchId).then(() => {
    res.redirect('/matches/');
  });
});

router.get('/continue/:id', (req, res, next) => {
  let matchId = req.params.id;
  let parameters = {};

  matchesService.getById(matchId).then(match => {
    parameters.match = match;
    console.log('-> match: ', match);
    res.render('matches/continue', parameters);
  });
});

module.exports = router;
