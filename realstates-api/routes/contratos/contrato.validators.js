'use strict';

var logger = require('../../helpers/logger');

function editValidator(req, res, next) {
  req.checkBody('fechaDesde', 'Ingrese una fecha desde valida').notEmpty().isDate();
  req.checkBody('fechaHasta', 'Ingrese una fecha hasta valida').notEmpty().isDate();
  req.checkBody('tipoInteres', 'El tipo de interes es requerido').notEmpty();
  req.checkBody('interes', 'El interes debe ser un valor numerico y es requerido').notEmpty().isNumeric();
  req.checkBody('deposito', 'El deposito debe ser un valor numerico y es requerido').notEmpty().isNumeric();
  req.checkBody('diaDeVencimiento', 'El diaDeVencimiento debe ser un valor numerico y es requerido').notEmpty().isInt();
  req.checkBody('multaDiaria', 'La multa diaria debe ser un valor numerico y es requerido').notEmpty().isNumeric();
  req.checkBody('propiedad', 'La propiedad debe ser una propiedad valida y es requerida').notEmpty().isMongoId();
  req.checkBody('inquilino', 'El inquilino debe ser un inquilino valido y es requerido').notEmpty().isMongoId();
  req.checkBody('garante', 'El garante debe ser un garante valido y es requerido').notEmpty().isMongoId();
  req.checkBody('garanteOpcional', 'El garante opcional ser un garante valido').optional().isMongoId();

  var errors = req.validationErrors(true);

  if (errors) {
    var error = new Error('Han ocurrido errores de validacion al crear/modificar un contrato. Verifique los datos enviados.');
    logger.warn({validationErrors: errors}, error);
    return res.status(400).json({
      message: error.message,
      error: errors
    });
  }

  return next();
}

module.exports.editValidator = editValidator;

