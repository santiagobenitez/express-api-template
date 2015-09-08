'use strict';

var tokenHelper = require('../../helpers/token.helper');
var userService = require('../../services/user.service');


function getRoot(req, res, next) {
  res.send('<h1>Hello World</h1>');
}

function getRootApi(req, res, next) {
  res.send('<h1>Hello World</h1>');
}

function authenticate(req, res, next) {
  var error;

  if (!req.body.grant_type || (req.body.grant_type === 'refresh_token' && !req.body.refresh_token)) {
    error = new Error('Invalid request');
    error.status = 400;
    return next(error);
  }

  if (req.body.grant_type !== 'password' && req.body.grant_type !== 'refresh_token') {
    error = new Error('invalid_grant');
    error.status = 400;
    return next(error);
  }

  if (req.body.grant_type === 'refresh_token') {
    tokenHelper.verify(req.body.refresh_token, function(err, decoded) {

      if (err) {
        error = new Error('invalid_grant');
        error.status = 400;
        return next(error);
      }

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
    userService.getByCredentials(req.body.username, req.body.password, function(e, user) {

      if (e) {
        return next(e);
      }

      if (!user) {
        var error = new Error('Nombre de usuario o password invalido');
        error.status = 400;
        return next(error);
      }

      var scopes = 'user:read user:write'

      var claims = {
        username: user.username,
        scopes: scopes
      }

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
}

module.exports = {
  getRoot: getRoot,
  getRootApi: getRootApi,
  authenticate: authenticate
};
