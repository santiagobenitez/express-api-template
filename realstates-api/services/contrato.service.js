'use strict';

var contratoRepository = require('../data/contrato.repository');

function create(newObj, cb) {
  contratoRepository.create(newObj, function(e, obj) {
    if (e) {
      return cb(e, null);
    }

    cb(null, obj);
  });
}

function getAll(cb) {
  contratoRepository.getAll(function(e, objs) {

    if (e) {
      return cb(e, null);
    }

    cb(null, objs);
  });
}

function get(id, cb) {
  contratoRepository.get(id, function(e, obj) {

    if (e) {
      return cb(e, null);
    }
    cb(null, obj);
  });
}

function remove(id, cb) {
  contratoRepository.remove(id, function(e) {

    if (e) {
      return cb(e);
    }

    cb(null);
  });
}

function update(id, objToUpdate, cb) {
  contratoRepository.update(id, objToUpdate, function(e, obj) {

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
