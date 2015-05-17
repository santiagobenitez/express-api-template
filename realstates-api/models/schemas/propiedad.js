'use strict';

var mongoose = require('mongoose');
var DireccionSchema = require('./direccion');
var PropiedadSchema = new mongoose.Schema ({
  direccion: [DireccionSchema]
});

module.exports = PropiedadSchema;
