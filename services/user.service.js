'use strict';

var userRepository = require('../data/user.repository');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird'); //jshint ignore:line

function create(newObj) {
	return hashAsync(newObj.password).then(function(hash){
		newObj.passwordHash = hash;
		return userRepository.create(newObj);
	});
}

function getAll() {
	return userRepository.getAll();
}

function get(id) {
	return userRepository.get(id); 
}

function remove(id) {
	return userRepository.remove(id);
}

function update(id, objToUpdate) {
	return hashAsync(objToUpdate.password).then(function(hash){
		objToUpdate.passwordHash = hash;
		return userRepository.update(id, objToUpdate);
	});
}

function getByCredentials(userName, password) {
	return userRepository.getByUserName(userName).then(function(user){
		if (!user){
			return null;
		}

		return compareAsync(password, user.passwordHash).then(function(result){
			if(!result){
				return null;
			}
			return user;
		});
	});
}

function hashAsync(pass){
	return new Promise(function(resolve, reject){
		bcrypt.hash(pass, 8, function(err, hash) {
			if (err) {
				return reject(err);
			}
			resolve(hash);
		});
	});
}

function compareAsync(password, passwordHash){
	return new Promise(function(resolve, reject){
		bcrypt.compare(password, passwordHash, function (e, result) {
			if(e){
				return reject(e);
			}
			resolve(result);
		});
	});
}

module.exports = {
	create: create,
	getAll: getAll,
	get: get,
	remove: remove,
	update: update,
	getByCredentials: getByCredentials
}


