'use strict';

function GenericRepository(model) {
  this.model = model;
}

GenericRepository.prototype.create = function(newObj, cb) {
  this.model.create(newObj, function(e, doc) {
    if (e) {
      return cb(e.errors, null);
    }

    //return a plain js object
    cb(null, doc.toObject());
  });
};

GenericRepository.prototype.get = function(id, cb) {
  this.model.findById(id, function(e, doc) {
    if (e) {
      return cb(e, null);
    }
    cb(null, doc ? doc.toObject() : null);
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
  this.model.findByIdAndRemove(id, function(e) {
    if (e) {
      return cb(e);
    }
    return cb(null);
  });
};

GenericRepository.prototype.update = function(id, obj, cb) {

  delete obj._id;
  this.model.findById(id, function(e, doc) {
    if (e) {
      return cb(e, null);
    }
    doc.set(obj);
    doc.save(function(err) {
      if (e) {
        return cb(err, null);
      }

      //return a plain js object
      cb(null, doc.toObject());
    });
  });
};

module.exports = GenericRepository;
