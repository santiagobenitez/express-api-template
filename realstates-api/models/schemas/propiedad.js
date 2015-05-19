'use strict';

var mongoose = require('mongoose');
var DireccionSchema = require('./direccion');
var PropiedadSchema = new mongoose.Schema({
  direccion: [DireccionSchema],
  ambientes: {
    type: Number,
    required: true
  },
  banios: {
    type: Number,
    required: true
  },
  expensas: {
    type: Number,
    required: true
  },
  metrosCuadrados: {
    type: Number,
    required: true
  }
});

module.exports = PropiedadSchema;
