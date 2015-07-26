'use strict';

var logger = require('../../helpers/logger');

function editValidator(req, res, next) {

  req.checkBody('nombre', 'El nombre es requerido').notEmpty();
  req.checkBody('apellido', 'El apellido es requerido').notEmpty();
  req.checkBody('email', 'El email es invalido').optional().isEmail();
  req.checkBody('nroTelefonoCasa', 'El numero es invalido').optional().isInt();
  req.checkBody('nroTelefonoCelular', 'El numero es invalido').optional().isInt();

  var errors = req.validationErrors(true);

  if (errors) {
    var error = new Error('Han ocurrido errores de validacion al crear/modificar un cliente. Verifique los datos enviados.');
    logger.warn({validationErrors: errors}, error);
    return res.status(400).json({
      message: error.message,
      error: errors
    });
  }

  return next();
}

module.exports.editValidator = editValidator;

