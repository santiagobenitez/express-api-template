'use strict';

var pagoRepository = require('../data/pago.repository');

function create(newObj) {
  return pagoRepository.create(newObj);
}

function getAll() {
  return pagoRepository.getAll();
}

function get(id) {
  return pagoRepository.get(id);
}

function remove(id){
  return pagoRepository.remove(id);
}

function update(id, objToUpdate) {
  return pagoRepository.update(id, objToUpdate);
}


module.exports.create = create;
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
