'use strict';

var userRepository = require('../data/user.repository');
var bcrypt = require('bcryptjs');

function create(newObj, cb) {
  bcrypt.hash(newObj.password, 8, function(err, hash) {
    if (err) {
      return cb(err, null);
    }
    newObj.passwordHash = hash;
    userRepository.create(newObj, function(e, obj) {
      if (e) {
        return cb(e, null);
      }

      cb(null, obj);
    });
  });
}

function getAll(cb) {
  userRepository.getAll(function(e, objs) {

    if (e) {
      return cb(e, null);
    }

    cb(null, objs);
  });
}

function get(id, cb) {
  userRepository.get(id, function(e, obj) {

    if (e) {
      return cb(e, null);
    }
    cb(null, obj);
  });
}

function remove(id, cb) {
  userRepository.remove(id, function(e) {

    if (e) {
      return cb(e);
    }

    cb(null);
  });
}

function update(id, objToUpdate, cb) {
  bcrypt.hash(objToUpdate.password, 8, function(err, hash) {
    if (err) {
      return cb(err, null);
    }
    objToUpdate.passwordHash = hash;
    userRepository.update(id, objToUpdate, function(e, obj) {

      if (e) {
        return cb(e, null);
      }

      cb(null, obj);
    });
  });
}


module.exports.create = create;
module.exports.getAll = getAll;
module.exports.get = get;
module.exports.remove = remove;
module.exports.update = update;
