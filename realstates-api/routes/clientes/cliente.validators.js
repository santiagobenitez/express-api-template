'use strict';

function editValidator(req, res, next) {

  req.checkBody('nombre', 'El nombre es requerido').notEmpty();
  req.checkBody('apellido', 'El apellido es requerido').notEmpty();
  req.checkBody('email', 'El email es invalido').optional().isEmail();
  req.checkBody('nroTelefonoCasa', 'El numero es invalido').optional().isInt();
  req.checkBody('nroTelefonoCelular', 'El numero es invalido').optional().isInt();

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

