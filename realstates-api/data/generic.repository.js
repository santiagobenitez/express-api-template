'use strict';

function GenericRepository(model) {
  this.model = model;
}

GenericRepository.prototype.create = function(newObj, cb) {
  this.model.create(newObj, function(e, obj) {
    if (e) {
      return cb(e.errors, null);
    }

    //return a plain js object
    cb(null, obj.toObject());
  });
};

GenericRepository.prototype.get = function(id, cb) {
  this.model.findById(id, function(e, obj) {
    if (e) {
      return cb(e, null);
    }
    cb(null, obj);
  });
};

GenericRepository.prototype.getAll = function(cb) {
  this.model.find().lean().exec(function(e, objs) {
    if (e) {
      return cb(e, null);
    }

    cb(null, objs);
  });
};

GenericRepository.prototype.remove = function remove(id, cb) {
  this.model.findByIdAndRemove(id, function(e, result) {
    if (e) {
      return cb(e);
    }
    return cb(null);
  });
};

module.exports = GenericRepository;
