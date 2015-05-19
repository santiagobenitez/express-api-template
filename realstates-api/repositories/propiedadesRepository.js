'use strict';

var mongoose = require('mongoose');
var Propiedad = mongoose.model('propiedades');

function crear(newPropiedad, cb) {
  Propiedad.create(newPropiedad, function(e, obj) {
    if (e) {
      return cb(e, null);
    }

    return cb(null, obj._id);
  });
}

module.exports = {
  crear :crear
};

