'use strict';

function editValidator(req, res, next) {

  req.checkBody('expensas', 'Las expensas deben ser un valor numerico y es requerido').notEmpty().isNumeric();
  req.checkBody('propietario', 'El propietario debe ser un propietario valido').notEmpty().isMongoId();
  req.checkBody('ambientes', 'El numero de ambientes debe ser un valor entero y es requerido').notEmpty().isInt();
  req.checkBody('banios', 'El numero de banios debe ser un valor entero y es requerido').notEmpty().isInt();
  req.checkBody('metrosCuadrados', 'Los metros cuadrados deben ser un valor numerico y es requerido').notEmpty().isNumeric();

  var errors = req.validationErrors(true);
  if (errors) {
    return res.status(400).json({
      message: 'Han ocurrido errores de validacion. Verifique los datos enviados.',
      error: errors
    });
  }

  return next();
}

module.exports.editValidator = editValidator;
