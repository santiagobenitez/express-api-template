'use strict';

var mongoose = require('mongoose');
var PropiedadSchema = require('./schemas/propiedad.schema');
var Propiedad = mongoose.model('propiedades', PropiedadSchema);

function create(newPropiedad, cb) {
  Propiedad.create(newPropiedad, function(e, obj) {
    if (e) {
      return cb(e.errors, null);
    }

    //return a plain js object
    cb(null, obj.toObject());
  });
}

function getAll(cb) {
  Propiedad.find().lean().exec(function(e, objs) {
    if (e) {
      return cb(e, null);
    }

    cb(null, objs);
  });
}

function get(id, cb) {
  Propiedad.findById(id, function(e, obj) {
    if (e) {
      return cb(e, null);
    }

    cb(null, obj);
  });
}

module.exports = {
  create: create,
  getAll: getAll,
  get: get
};
