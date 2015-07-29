'use strict';

var userService = require('../../services/user.service');
var logger = require('../../helpers/logger');

function getAll(req, res, next) {
  userService.getAll(function(e, objs) {
    if (e) {
      return next(e);
    }

    res.status(200).json({
      items: objs
    });
  });
}

function post(req, res, next) {

  userService.create(req.body, function(e, obj) {
    if (e) {
      return next(e);
    }

    res.status(200).json({
      _id: obj._id
    });

    logger.info({res: res}, 'Creacion exitosa del usuario: %s', obj._id);
  });
}

function get(req, res, next) {

  userService.get(req.params.id, function(e, obj) {
    if (e) {
      return next(e);
    }

    if (!obj) {
      var error = new Error('not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json(obj);
  });
}

function remove(req, res, next) {
  userService.remove(req.params.id, function(e) {
    if (e) {
      return next(e);
    }
    res.status(200).end();
    logger.info({res: res}, 'Eliminacion exitosa del usuario: %s', req.params.id);
  });
}

function update(req, res, next) {
  delete req.body._id;

  userService.update(req.params.id, req.body, function(e, obj) {
    if (e) {
      return next(e);
    }

    res.status(200).json(obj);
    logger.info({res: res, updatedObj: obj}, 'Actualizacion exitosa del usuario: %s', obj._id);
  });
}

module.exports = {
  post: post,
  getAll: getAll,
  get: get,
  remove: remove,
  update: update
};
