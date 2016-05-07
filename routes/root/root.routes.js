'use strict';

var tokenHelper = require('../../helpers/token.helper');
var userService = require('../../services/user.service');
var Promise = require('bluebird'); //jshint ignore:line
function getRoot(req, res, next) {
	res.render('index.html');
}

function getRootApi(req, res, next) {
	res.send('<h1>Hello World</h1>');
}

function authenticate(req, res, next) {
	var authenticateAsyncWrapper = Promise.method(authenticateAsync);
	return authenticateAsyncWrapper(req, res, next).catch(function(e){
		next(e);
	});
}

function authenticateAsync(req, res, next){
	var error;
	if (!req.body.grant_type || (req.body.grant_type === 'refresh_token' && !req.body.refresh_token)) {
		error = new Error('Invalid request');
		error.status = 400;
		throw error;
	}

	if (req.body.grant_type !== 'password' && req.body.grant_type !== 'refresh_token') {
		error = new Error('invalid_grant');
		error.status = 400;
		throw error;
	}

	if (req.body.grant_type === 'refresh_token') {
		return tokenHelper.verify(req.body.refresh_token).then(function(decoded) {
			var token = tokenHelper.generateAccessToken(decoded);
			var refreshToken = tokenHelper.generateRefreshToken(decoded);

			res.status(200).json({
				username: decoded.username,
				scopes: decoded.scopes,
				access_token: token,
				refresh_token: refreshToken,
				token_type: 'Bearer'
			});
		});
	} else {
		//password grant
		return getUserByCredentials(req, res, next);
	}
}

function getUserByCredentials(req, res){
	return userService.getByCredentials(req.body.username, req.body.password).then(function(user) {
		if (!user) {
			var error = new Error('Nombre de usuario o password invalido');
			error.status = 400;
			throw error;
		}

		var scopes = 'user:read user:write';

		var claims = {
			username: user.username,
			scopes: scopes
		};

		var token = tokenHelper.generateAccessToken(claims);

		var refreshToken = tokenHelper.generateRefreshToken(claims);

		res.status(200).json({
			username: user.username,
			scopes: scopes,
			access_token: token,
			refresh_token: refreshToken,
			token_type: 'Bearer'
		});
	});
}

module.exports = {
	getRoot: getRoot,
	getRootApi: getRootApi,
	authenticate: authenticate
};
