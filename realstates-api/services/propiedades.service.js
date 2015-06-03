'use strict';

var propiedadesRepository = require('../data/propiedades.repository');

function create(newPropiedad, cb) {
  propiedadesRepository.create(newPropiedad, function(e, obj) {
    if (e) {
      return cb(e, null);
    }

    cb(null, obj);
  });
}

function getAll(cb) {
  propiedadesRepository.getAll(function(e, objs) {

    if (e) {
      return cb(e, null);
    }

    cb(null, objs);
  });
}

function get(id, cb) {
  propiedadesRepository.get(id, function(e, obj) {

    if (e) {
      return cb(e, null);
    }

    cb(null, obj);
  });
}

function remove(id, cb) {
  propiedadesRepository.remove(id, function(e) {

    if (e) {
      return cb(e);
    }

    cb(null);
  });
}

function update(id, objToUpdate, cb) {
  propiedadesRepository.update(id, objToUpdate, function(e, obj) {

    if (e) {
      return cb(e, null);
    }

    cb(null, obj);
  });
}


module.exports.create = create;
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
