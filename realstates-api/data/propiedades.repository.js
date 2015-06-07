'use strict';

var GenericRepository = require('./generic.repository');
var Propiedad =  require('./schemas/propiedad.model');

function PropiedadRepository(model) {
  GenericRepository.call(this, model);
}

PropiedadRepository.prototype = Object.create(GenericRepository.prototype);
PropiedadRepository.prototype.constructor = PropiedadRepository;

PropiedadRepository.prototype.create = function(newObj, cb) {
  var newPropiedad = mapFromPropiedad(newObj);
  this.model.create(newPropiedad, function(e, obj) {
    if (e) {
      return cb(e.errors, null);
    }

    //return a plain js object
    cb(null, mapToPropiedad(obj.toObject()));
  });
};

PropiedadRepository.prototype.get = function(id, cb) {
  this.model.findById(id, function(e, doc) {
    if (e) {
      return cb(e, null);
    }
    cb(null, doc ? mapToPropiedad(doc.toObject()) : null);
  });
};

PropiedadRepository.prototype.getAll = function(cb) {
  this.model.find().populate('propietario').lean().exec(function(e, objs) {
    if (e) {
      return cb(e, null);
    }

    cb(null, objs.map(mapToPropiedad));
  });
};

PropiedadRepository.prototype.update = function(id, obj, cb) {
  var propiedadToUpdate = mapFromPropiedad(obj);
  delete obj._id;
  this.model.findById(id, function(e, doc) {
    if (e) {
      return cb(e, null);
    }
    doc.set(propiedadToUpdate);
    doc.save(function(err) {
      if (e) {
        return cb(err, null);
      }

      //return a plain js object
      cb(null, mapToPropiedad(doc.toObject()));
    });
  });
};

function mapToPropiedad(item) {
  item.direccion = item.direccion ? item.direccion[0] : {};
  return item;
}

function mapFromPropiedad(item) {
  var direccion = [];
  if (item.direccion) {
    direccion.push(item.direccion);
  }
  item.direccion = direccion;

  return item;
}


module.exports = new PropiedadRepository(Propiedad);
