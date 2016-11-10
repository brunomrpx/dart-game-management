'use strict';

const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
