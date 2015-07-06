'use strict';

var pagoService = require('../../services/pago.service');

function getAll(req, res, next) {

  pagoService.getAll(function(e, objs) {
    if (e) {
      return next(e);
    }

    var pagosDelContrato = objs.filter(function(item) {
      return item.contrato.toString() === req.params.contratoid;
    });

    res.status(200).json({
      items: pagosDelContrato
    });

  });
}

function post(req, res, next) {
  pagoService.create(req.body, function(e, obj) {
    if (e) {
      return next(e);
    }

    res.status(200).json({
      _id: obj._id
    });
  });
}

function get(req, res, next) {

  pagoService.get(req.params.id, function(e, obj) {
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
  pagoService.remove(req.params.id, function(e) {
    if (e) {
      return next(e);
    }
    res.status(200).end();
  });
}

function update(req, res, next) {
  delete req.body._id;

  pagoService.update(req.params.id, req.body, function(e, obj) {
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
