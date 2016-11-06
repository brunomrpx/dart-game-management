'use strict';

const express = require('express');
const router = express.Router();

let matches = [
  {
    id: 1,
    date: new Date(),
    category: 'individual',
    finished: false,
    players: {
      player1: 1,
      player2: 2,
    },
    stages: [
      {
        number: 1,
        player1: { firstMove: 10, secondMove: 20, thirdMove: 15 },
        player2: { firstMove: 7, secondMove: 0, thirdMove: 0 }
      },
      {
        number: 1,
        player1: { firstMove: 10, secondMove: 20, thirdMove: 15 },
        player2: { firstMove: 7, secondMove: 0, thirdMove: 0 }
      },
      {
        number: 1,
        player1: { firstMove: 10, secondMove: 20, thirdMove: 15 },
        player2: { firstMove: 7, secondMove: 0, thirdMove: 0 }
      }
    ]
  },
  {
    id: 2,
    date: new Date(),
    category: 'individual',
    finished: true,
    players: {
      player1: 2,
      player2: 3,
    },
    stages: [
      {
        number: 1,
        player1: { firstMove: 28, secondMove: 5, thirdMove: 12 },
        player2: { firstMove: 100, secondMove: 100, thirdMove: 50 }
      },
      {
        number: 1,
        player1: { firstMove: 10, secondMove: 15, thirdMove: 1 },
        player2: { firstMove: 50, secondMove: 0, thirdMove: 0 }
      }
    ]
  }
];

router.get('/', (req, res, next) => {
  let finishedMatches = [];
  let currentMatches = [];

  matches.forEach(m => {
      (m.finished ? finishedMatches : currentMatches).push(m);
  });

  let parameters = {
    finishedMatches: finishedMatches,
    currentMatches: currentMatches
  };

  res.render('matches/index', parameters);
});

router.get('/new', (req, res, next) => {
  let parameters = {
    match: {}
  };

  res.render('matches/form', parameters);
});

router.post('/new', (req, res, next) => {
  let bodyData = req.body;

  let match = {
    date: new Date(),
    finished: false,
    players: {},
    stages: []
  };

  // adding players
  bodyData.players.forEach((p, i) => match.players[`player${i+1}`] = p);
  let nextId = Math.max.apply(null, matches.map(m => m.id));
  match.id = ++nextId;

  matches.push(match);

  console.log('match: ', match);
  console.log('matches: ', matches);

  res.redirect('/matches/');
});

router.get('/continue/:id', (req, res, next) => {
  let matchId = parseInt(req.params.id, 10);
  let match = matches.find(m => m.id === matchId);
  let parameters = {
    match: match
  };

  res.render('matches/continue', parameters);
});

module.exports = router;
