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

router.put('/:matchId/player/:playerId/moves', (req, res, next) => {
  let matchId = req.params.matchId;
  let playerId = req.params.playerId;
  let moves = req.body.moves;

  matchesService.updateMoves(matchId, playerId, moves).then(r => {
    res.json({ message: 'success' });
  });
});

module.exports = router;
