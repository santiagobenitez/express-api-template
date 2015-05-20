'use strict';

var propiedadesRepository = require('../data/propiedades.repository');

function crear(newPropiedad, cb) {
  propiedadesRepository.crear(newPropiedad, function(e, obj) {
    if (e) return cb(e, null)

    cb(null, obj);
  });
}

module.exports.crear = crear;
