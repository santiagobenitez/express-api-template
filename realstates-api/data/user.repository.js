'use strict';

var GenericRepository = require('./generic.repository');
var User =  require('./schemas/user.model');

function UserRepository(model) {
  GenericRepository.call(this, model);
}

UserRepository.prototype = Object.create(GenericRepository.prototype);
UserRepository.prototype.constructor = UserRepository;

module.exports = new UserRepository(User);
