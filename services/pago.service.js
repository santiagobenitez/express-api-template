'use strict';

var pagoRepository = require('../data/pago.repository');

function create(newObj, cb) {
  pagoRepository.create(newObj, function(e, obj) {
    if (e) {
      return cb(e, null);
    }

    cb(null, obj);
  });
}

function getAll(cb) {
  pagoRepository.getAll(function(e, objs) {

    if (e) {
      return cb(e, null);
    }

    cb(null, objs);
  });
}

function get(id, cb) {
  pagoRepository.get(id, function(e, obj) {

    if (e) {
      return cb(e, null);
    }
    cb(null, obj);
  });
}

function remove(id, cb) {
  pagoRepository.remove(id, function(e) {

    if (e) {
      return cb(e);
    }

    cb(null);
  });
}

function update(id, objToUpdate, cb) {
  pagoRepository.update(id, objToUpdate, function(e, obj) {

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
