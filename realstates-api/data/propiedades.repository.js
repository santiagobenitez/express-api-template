'use strict';

var mongoose = require('mongoose');
var GenericRepository = require('./generic.repository');
var PropiedadSchema = require('./schemas/propiedad.schema');
var Propiedad = mongoose.model('propiedades', PropiedadSchema);

function PropiedadRepository(model) {
  GenericRepository.call(this, model);
}

PropiedadRepository.prototype = Object.create(GenericRepository.prototype);
PropiedadRepository.prototype.constructor = PropiedadRepository;

module.exports = new PropiedadRepository(Propiedad);
