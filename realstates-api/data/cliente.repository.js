'use strict';

var mongoose = require('mongoose');
var GenericRepository = require('./generic.repository');
var ClienteSchema = require('./schemas/cliente.schema');
var Cliente = mongoose.model('clientes', ClienteSchema);

function ClienteRepository(model) {
  GenericRepository.call(this, model);
}

ClienteRepository.prototype = Object.create(GenericRepository.prototype);
ClienteRepository.prototype.constructor = ClienteRepository;

module.exports = new ClienteRepository(Cliente);
