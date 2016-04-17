'use strict';

var logger = require('../../helpers/logger');

function editValidator(req, res, next) {

  req.checkBody('fecha', 'Ingrese una fecha valida').notEmpty().isDate();
  req.checkBody('importe', 'El importe debe ser un valor numerico y es requerido').notEmpty().isNumeric();
  req.checkBody('contrato', 'El contrato debe ser un contrato valido y es requerido').notEmpty().isMongoId();

  var errors = req.validationErrors(true);

  if (errors) {
    var error = new Error('Han ocurrido errores de validacion al crear/modificar un pago. Verifique los datos enviados.');
    logger.warn({validationErrors: errors}, error);
    return res.status(400).json({
      message: error.message,
      error: errors
    });
  }

  return next();
}

module.exports.editValidator = editValidator;

