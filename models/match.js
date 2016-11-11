'use strict';

const mongoose = require('mongoose');

let MatchSchema = new mongoose.Schema({
  startDate: Date,
  finishDate: Date,
  category: Number,
  players: [{
    data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    moves: [{
      firstMove: Number,
      secondMove: Number,
      thirdMove: Number
    }]
  }]
});

let Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
