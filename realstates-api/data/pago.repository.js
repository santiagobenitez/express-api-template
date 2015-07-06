'use strict';

var GenericRepository = require('./generic.repository');
var Pago =  require('./schemas/pago.model');

function PagoRepository(model) {
  GenericRepository.call(this, model);
}

PagoRepository.prototype = Object.create(GenericRepository.prototype);
PagoRepository.prototype.constructor = PagoRepository;

module.exports = new PagoRepository(Pago);
