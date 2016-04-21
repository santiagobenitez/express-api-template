'use strict';

var GenericRepository = require('./generic.repository');
var Contrato =  require('./schemas/contrato.model');
var util = require('util');

function ContratoRepository(model) {
  GenericRepository.call(this, model);
}

util.inherits(ContratoRepository, GenericRepository);

module.exports = new ContratoRepository(Contrato);
