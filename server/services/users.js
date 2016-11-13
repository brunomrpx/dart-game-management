'use strict';

const mongoose = require('mongoose');

const User = require('../models/user');

let usersService = {
  getAll: () => {
    return User.find().exec();
  },

  getById: (id) => {
    let query = { _id: id };
    return User.findOne(query).exec();
  },

  create: (data) => {
    let newUser = new User(data);
    return newUser.save();
  },

  delete: (id) => {
    let query = { _id: id };
    return User.remove(query).exec();
  },

  update: (id, newData) => {
    let query = { _id: id};
    let options = { new: true };

    return User.findOneAndUpdate(query, newData, options).exec();
  }
};

module.exports = usersService;
