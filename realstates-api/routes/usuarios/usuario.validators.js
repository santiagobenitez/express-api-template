'use strict';

var logger = require('../../helpers/logger');

function editValidator(req, res, next) {

  req.checkBody('userName', 'El nombre de usuario es requerido').notEmpty();
  req.checkBody('password', 'El password es requerido').notEmpty();

  var errors = req.validationErrors(true);

  if (errors) {
    var error = new Error('Han ocurrido errores de validacion al crear/modificar un usuario. Verifique los datos enviados.');
    logger.warn({validationErrors: errors}, error);
    return res.status(400).json({
      message: error.message,
      error: errors
    });
  }

  return next();
}

module.exports.editValidator = editValidator;

