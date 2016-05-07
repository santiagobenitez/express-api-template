var jwt = require('jsonwebtoken');
var config = require('../config');
var Promise = require('bluebird'); //jshint ignore:line

function verify(token) {
	return new Promise(function(resolve, reject) {
		jwt.verify(token, config.secret, function(err, decoded) {

			if (err) {
				return reject(err);
			}

			resolve(decoded);
		});
	});
}

function generateAccessToken(claims) {
  return jwt.sign(claims, config.secret, {
    expiresInMinutes: 15
  });
}

function generateRefreshToken(claims) {
  return jwt.sign(claims, config.secret, {
    expiresInMinutes: 60
  });
}

module.exports = {
  verify: verify,
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken
}
