'use strict';

var GenericRepository = require('./generic.repository');
var Pago =  require('./schemas/pago.model');

function PagoRepository(model) {
  GenericRepository.call(this, model);
}

PagoRepository.prototype = Object.create(GenericRepository.prototype);


module.exports = new PagoRepository(Pago);
