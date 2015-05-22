'use strict';

var propiedadesService = require('../../services/propiedades.service');

function getAllPropiedades(req, res, next) {

  propiedadesService.getAll(function(e, objs) {
    if (e) {
      return next(e);
    }

    res.status(200).json({
      items: objs
    });
  });
}

function postPropiedades(req, res, next) {
  propiedadesService.create(req.body, function(e, obj) {
    if (e) {
      return next(e);
    }

    res.status(200).json({
      _id: obj._id
    });
  });
}

function getPropiedad(req, res, next) {

  propiedadesService.get(req.params.id, function(e, obj) {
    if (e) {
      return next(e);
    }

    res.status(200).json(obj);
  });
}

function deletePropiedad(req, res, next) {
  propiedadesService.remove(req.params.id, function(e) {
    if (e) {
      return next(e);
    }
    res.status(200).end();
  });
}

module.exports = {
  postPropiedades: postPropiedades,
  getAllPropiedades: getAllPropiedades,
  getPropiedad: getPropiedad,
  deletePropiedad: deletePropiedad
};
