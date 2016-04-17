var jwt = require('jsonwebtoken');
var config = require('../config');

function verify(token, cb) {

  jwt.verify(token, config.secret, function(err, decoded) {

    if (err) {
      return cb(err, null);
    }

    cb(null, decoded);
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
