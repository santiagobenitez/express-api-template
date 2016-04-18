'use strict';

var GenericRepository = require('./generic.repository');
var User = require('./schemas/user.model');
var util = require('util');

function UserRepository(model) {
  GenericRepository.call(this, model);
}

util.inherits(UserRepository, GenericRepository);

UserRepository.prototype.getByUserName = function(userName) {
  return User.findOne({
    'userName': userName
  }).exec().then(function(doc){
		if (!doc){
			return null;
		}

		return doc.toObject();
	});
}

module.exports = new UserRepository(User);
