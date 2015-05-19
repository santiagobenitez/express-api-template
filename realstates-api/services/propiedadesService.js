'use strict';

var propiedadesRepository = require('../repositories/propiedadesRepository');

function crear(newPropiedad, cb) {
  propiedadesRepository.crear(newPropiedad, function(e, obj) {
    if (!e) {
      return cb(e, null);
    }

    return cb(null, obj);
  });
}

module.exports.crear = crear;
