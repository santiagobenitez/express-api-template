'use strict';

var GenericRepository = require('./generic.repository');
var Pago =  require('./schemas/pago.model');
var util = require('util');

function PagoRepository(model) {
  GenericRepository.call(this, model);
}

util.inherits(PagoRepository, GenericRepository);

module.exports = new PagoRepository(Pago);
