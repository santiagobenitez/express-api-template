'use strict';

var mongoose = require('mongoose');
var DireccionSchema = require('./direccion.schema');
var ClienteSchema = new mongoose.Schema({
  direccion: [DireccionSchema],
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  nroTelefonoCasa: {
    type: Number
  },
  nroTelefonoCelular: {
    type: Number
  }
});

module.exports = ClienteSchema;
