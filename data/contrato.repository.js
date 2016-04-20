'use strict';

var GenericRepository = require('./generic.repository');
var Contrato =  require('./schemas/contrato.model');

function ContratoRepository(model) {
  GenericRepository.call(this, model);
}

ContratoRepository.prototype = Object.create(GenericRepository.prototype);


module.exports = new ContratoRepository(Contrato);