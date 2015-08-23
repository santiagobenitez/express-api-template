'use strict';

var GenericRepository = require('./generic.repository');
var User = require('./schemas/user.model');

function UserRepository(model) {
  GenericRepository.call(this, model);
}

UserRepository.prototype = Object.create(GenericRepository.prototype);
UserRepository.prototype.constructor = UserRepository;

UserRepository.prototype.getByUserName = function(userName, cb) {
  User.findOne({
    'userName': userName
  }, function(e, doc) {

    if (!doc) {
      return cb(e, null);
    }

    cb(null, doc.toObject());
  });
}

module.exports = new UserRepository(User);
