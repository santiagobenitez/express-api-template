'use strict';

var clienteRepository = require('../data/cliente.repository');

function create(newObj, cb) {
  clienteRepository.create(newObj, function(e, obj) {
    if (e) {
      return cb(e, null);
    }

    cb(null, obj);
  });
}

function getAll(cb) {
  clienteRepository.getAll(function(e, objs) {

    if (e) {
      return cb(e, null);
    }

    cb(null, objs);
  });
}

function get(id, cb) {
  clienteRepository.get(id, function(e, obj) {

    if (e) {
      return cb(e, null);
    }
    cb(null, obj);
  });
}

function remove(id, cb) {
  clienteRepository.remove(id, function(e) {

    if (e) {
      return cb(e);
    }

    cb(null);
  });
}

function update(id, objToUpdate, cb) {
  clienteRepository.update(id, objToUpdate, function(e, obj) {

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
