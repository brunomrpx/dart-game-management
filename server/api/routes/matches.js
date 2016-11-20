'use strict';

const express = require('express');
const matchesService = require('../../services/matches');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  let matchId = req.params.id;

  matchesService.getById(matchId).then(match => {
    res.json({ match: match });
  });
});

router.get('/', (req, res, next) => {
  matchesService.getAll().then(matches => {
    res.json({ matches: matches });
  });
});

router.put('/:matchId/player/:playerId/moves', (req, res, next) => {
  let matchId = req.params.matchId;
  let playerId = req.params.playerId;
  let moves = req.body.moves;

  matchesService.updateMoves(matchId, playerId, moves).then(r => {
    res.json({ message: 'success' });
  });
});

router.post('/:id/finish', (req, res, next) => {
  let matchId = req.params.id;
  let postData = req.body;
  let newData = { finishDate: new Date() };
  let promises;

  promises = postData.players.map(p => {
    return matchesService.updateMoves(matchId, p.id, p.moves);
  });

  Promise.all(promises).then(() => {
    matchesService.update(matchId, newData).then(m => {
      res.json({ match: m });
    });
  })
});

module.exports = router;
