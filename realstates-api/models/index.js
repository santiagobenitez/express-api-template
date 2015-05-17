'use strict';

var mongoose = require('mongoose');
var PropiedadSchema = require('./schemas/propiedad');

function crearModelos() {
  mongoose.model('propiedades', PropiedadSchema);
}

module.exports = crearModelos;
