'use strict';

var propiedadesService = require('../../services/propiedades.service');

function getAllPropiedades(req, res, next) {
    res.send('<h1>Hello World</h1>');
}

function postPropiedades(req, res, next) {
  debugger;
  propiedadesService.crear(req.body, function(e, obj) {
    if (e) return next(e);

    return res.status(200).json({
      _id: obj._id
    });
  });
}

module.exports = {
  postPropiedades: postPropiedades,
  getAllPropiedades: getAllPropiedades
};
