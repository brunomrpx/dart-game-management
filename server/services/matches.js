'use strict';

const mongoose = require('mongoose');

const Match = require('../models/match');

let matchesService = {
  create: (matchData) => {
    let newMatch = new Match(formatData(matchData));
    return newMatch.save();
  },

  getAll: () => {
    return Match.find().lean().populate('players.data').exec();
  },

  getById: (id) => {
    let query = { _id: id };
    return Match.findOne(query).lean().populate('players.data').exec();
  },

  delete: (id) => {
    let query = { _id: id };
    return Match.remove(query).exec();
  },

  update: (id, newData) => {
    let query = { _id: id };
    let options = { new: true };

    return Match.findOneAndUpdate(query, newData, options).exec();
  },

  updateMoves: (matchId, playerId, moves) => {
    let query = { '_id': matchId, 'players.data': playerId };
    let operations = {
      $set: { 'players.$.moves': moves }
    };

    return Match.update(query, operations);
  }
};

function formatData(matchData) {
  let defaultData = {
    startDate: new Date(),
    finishDate: null,
    finished: false,
  };

  matchData.players = matchData.players.map(p => mongoose.Types.ObjectId(p));

  // adding default moves for each player
  matchData.players = matchData.players.map((p, i) => {
    return {
      data: p,
      moves: [{
        firstMove: 0,
        secondMove: 0,
        thirdMove: 0
      }]
    }
  });

  matchData = Object.assign({}, matchData, defaultData);

  return matchData;
}

module.exports = matchesService;
