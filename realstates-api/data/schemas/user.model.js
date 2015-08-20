'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  }
  passwordHash: {
    type: String,
    required: true
  },
  activo: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('users', UserSchema);
