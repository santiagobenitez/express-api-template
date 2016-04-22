'use strict';

var contratoRepository = require('../data/contrato.repository');

function create(newObj) {
  return contratoRepository.create(newObj);
}

function getAll() {
  return contratoRepository.getAll();
}

function get(id) {
  return contratoRepository.get(id);
}

function remove(id) {
  return contratoRepository.remove(id);
}

function update(id, objToUpdate) {
  return contratoRepository.update(id, objToUpdate);
}


module.exports.create = create;
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
