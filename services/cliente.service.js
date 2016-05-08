'use strict';

var clienteRepository = require('../data/cliente.repository');

function create(newObj) {
  return clienteRepository.create(newObj);
}

function getAll() {
  return clienteRepository.getAll();
}

function get(id) {
  return clienteRepository.get(id);
}

function remove(id) {
  return clienteRepository.remove(id);
}

function update(id, objToUpdate) {
  return clienteRepository.update(id, objToUpdate);
}


module.exports.create = create;
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
