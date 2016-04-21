'use strict';

var GenericRepository = require('./generic.repository');
var Propiedad =  require('./schemas/propiedad.model');
var util = require('util');

function PropiedadRepository(model) {
  GenericRepository.call(this, model);
}

util.inherits(PropiedadRepository, GenericRepository);

PropiedadRepository.prototype.create = function(newObj) {
  var newPropiedad = mapFromPropiedad(newObj);
  return this.model.create(newPropiedad).then(function(obj) {
    //return a plain js object
    return mapToPropiedad(obj.toObject());
  });
};

PropiedadRepository.prototype.get = function(id) {
  return this.model.findById(id).exec().then(function(doc) {
    if (!doc){
			return null;
		}
		return mapToPropiedad(doc.toObject());
  });
};

PropiedadRepository.prototype.getAll = function() {
  return this.model.find().populate('propietario').lean().exec().then(function(objs) {
    return objs.map(mapToPropiedad);
  });
};

PropiedadRepository.prototype.update = function(id, obj) {
  var propiedadToUpdate = mapFromPropiedad(obj);
  delete obj._id;
  return this.model.findById(id).exec().then(function(doc) {
    doc.set(propiedadToUpdate);
    return doc.save().then(function(updated_doc) {
      //return a plain js object
      return mapToPropiedad(updated_doc.toObject());
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
