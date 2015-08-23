'use strict';

var jwt = require('jsonwebtoken');

var config = require('../../config');
var userService = require('../../services/user.service');


function getRoot(req, res, next) {
  res.send('<h1>Hello World</h1>');
}

function getRootApi(req, res, next) {
  res.send('<h1>Hello World</h1>');
}

function authenticate(req, res, next) {

  userService.getByCredentials(req.body.userName, req.body.password, function(e, user) {

    if(e){
      return next(e);
    }

    if(!user){
      var error = new Error('Nombre de usuario o password invalido');
      error.status = 400;
      return next(error);
    }

    var scopes = 'user:read user:write'

    var claims = {
      userName: user.userName,
      scopes: scopes
    }

    var token = jwt.sign(claims, config.secret, {
      expiresInMinutes: 15
    });

    var refreshToken = jwt.sign(claims, config.secret, {
      expiresInMinutes: 60
    });

    res.status(200).json({
      userName: user.userName,
      scopes: scopes,
      access_token: token,
      refresh_token: refreshToken,
    });
  });
}

module.exports = {
  getRoot: getRoot,
  getRootApi: getRootApi,
  authenticate: authenticate
};
