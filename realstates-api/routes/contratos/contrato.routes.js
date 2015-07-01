'use strict';

var contratoService = require('../../services/contrato.service');

function getAll(req, res, next) {

  contratoService.getAll(function(e, objs) {
    if (e) {
      return next(e);
    }

    res.status(200).json({
      items: objs
    });
  });
}

function post(req, res, next) {
  contratoService.create(req.body, function(e, obj) {
    if (e) {
      return next(e);
    }

    res.status(200).json({
      _id: obj._id
    });
  });
}

function get(req, res, next) {

  contratoService.get(req.params.id, function(e, obj) {
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
  contratoService.remove(req.params.id, function(e) {
    if (e) {
      return next(e);
    }
    res.status(200).end();
  });
}

function update(req, res, next) {
  delete req.body._id;

  contratoService.update(req.params.id, req.body, function(e, obj) {
    if (e) {
      return next(e);
    }

    res.status(200).json(obj);
  });
}

module.exports = {
  post: post,
  getAll: getAll,
  get: get,
  remove: remove,
  update: update
};
