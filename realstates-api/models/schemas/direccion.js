'use strict';

var mongoose = require('mongoose');

var DireccionSchema = new mongoose.Schema({
  direccion: String,
  codigoPostal: String
});

module.exports = DireccionSchema;
