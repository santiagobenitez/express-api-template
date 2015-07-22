'use strict';

function editValidator(req, res, next) {

  req.checkBody('fecha', 'Ingrese una fecha valida').notEmpty().isDate();
  req.checkBody('importe', 'El importe debe ser un valor numerico y es requerido').notEmpty().isNumeric();
  req.checkBody('contrato', 'El contrato debe ser un contrato valido y es requerido').notEmpty().isMongoId();

  var errors = req.validationErrors(true);
  if (errors) {
    return res.status(400).json({errors: errors });
  }

  return next();
}

module.exports.editValidator = editValidator;

