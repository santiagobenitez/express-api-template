'use strict';

var mongoose = require('mongoose');

var DireccionSchema = new mongoose.Schema({
  direccion: String,
  ciudad: String,
  provincia: String,
  pais: String,
  codigoPostal: String,
});

module.exports = DireccionSchema;
