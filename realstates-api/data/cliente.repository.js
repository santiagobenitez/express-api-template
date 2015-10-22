'use strict';

var GenericRepository = require('./generic.repository');
var Cliente = require('./schemas/cliente.model');

function ClienteRepository(model) {
  GenericRepository.call(this, model);
}

ClienteRepository.prototype = Object.create(GenericRepository.prototype);

ClienteRepository.prototype.create = function(newObj, cb) {
  var newCliente = mapFromCliente(newObj);
  this.model.create(newCliente, function(e, obj) {
    if (e) {
      return cb(e.errors, null);
    }

    //return a plain js object
    cb(null, mapToCliente(obj.toObject()));
  });
};

ClienteRepository.prototype.get = function(id, cb) {
  this.model.findById(id, function(e, doc) {

    if (e) {
      return cb(e, null);
    }
    cb(null, doc ? mapToCliente(doc.toObject()) : null);
  });
};

ClienteRepository.prototype.getAll = function(cb) {
  this.model.find().lean().exec(function(e, objs) {
    if (e) {
      return cb(e, null);
    }

    cb(null, objs.map(mapToCliente));
  });
};

ClienteRepository.prototype.update = function(id, obj, cb) {
  var clienteToUpdate = mapFromCliente(obj);
  delete obj._id;
  this.model.findById(id, function(e, doc) {
    if (e) {
      return cb(e, null);
    }
    doc.set(clienteToUpdate);
    doc.save(function(err) {
      if (e) {
        return cb(err, null);
      }

      //return a plain js object
      cb(null, mapToCliente(doc.toObject()));
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
