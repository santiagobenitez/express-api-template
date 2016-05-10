'use strict';

var GenericRepository = require('./generic.repository');
var Cliente = require('./schemas/cliente.model');
var util = require('util');

function ClienteRepository(model) {
  GenericRepository.call(this, model);
}

util.inherits(ClienteRepository, GenericRepository);

ClienteRepository.prototype.create = function(newObj) {
  var newCliente = mapFromCliente(newObj);
  return this.model.create(newCliente).then(function(obj) {
    //return a plain js object
    return mapToCliente(obj.toObject());
  });
};

ClienteRepository.prototype.get = function(id) {
  return this.model.findById(id).exec().then(function(doc) {
		if (!doc){
			return null;
		}
		return mapToCliente(doc.toObject());
  });
};

ClienteRepository.prototype.getAll = function() {
  return this.model.find().lean().exec().then(function(objs) {
    return objs.map(mapToCliente);
  });
};

ClienteRepository.prototype.update = function(id, obj) {
  var clienteToUpdate = mapFromCliente(obj);
  delete obj._id;
  return this.model.findById(id).exec().then(function(doc) {
    doc.set(clienteToUpdate);
    return doc.save().then(function(updated_doc) {
      //return a plain js object
      return mapToCliente(updated_doc.toObject());
    });
  });
};

function mapToCliente(item) {
  item.direccion = item.direccion ? item.direccion[0] : {};
  return item;
}

function mapFromCliente(item) {
  var direccion = [];
  if (item.direccion) {
    direccion.push(item.direccion);
  }
  item.direccion = direccion;

  return item;
}

module.exports = new ClienteRepository(Cliente);
