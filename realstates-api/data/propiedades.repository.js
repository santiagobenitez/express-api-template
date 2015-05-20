'use strict';

var mongoose = require('mongoose');
var PropiedadSchema = require('./schemas/propiedad.schema');
var Propiedad = mongoose.model('propiedades', PropiedadSchema);

function crear(newPropiedad, cb) {
  Propiedad.create(newPropiedad, function(e, obj) {
    if (e) {
      return cb(e.errors, null);
    }

    //return a plain js object
    cb(null, obj.toObject());
  });
}

module.exports = {
  crear :crear
};

