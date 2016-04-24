'use strict';

var propiedadesRepository = require('../data/propiedades.repository');

function create(newPropiedad) {
  return propiedadesRepository.create(newPropiedad);
}

function getAll() {
  return propiedadesRepository.getAll();
}

function get(id) {
  return propiedadesRepository.get(id);
}

function remove(id) {
  return propiedadesRepository.remove(id);
}

function update(id, objToUpdate) {
  return propiedadesRepository.update(id, objToUpdate);
}


module.exports.create = create;
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
