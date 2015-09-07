var tokenHelper = require('../helpers/token.helper');

function bearerToken() {

  return function(req, res, next) {

    var error;

    if (!req.headers.authorization || req.headers.authorization.split(' ')[0] != 'Bearer') {
      error = new Error('Usuario no autorizado para acceder al recurso')
      error.status = 403;
      return next(error);
    }

    var token = req.headers.authorization.split(' ')[1];
    tokenHelper.verify(token, function(err, decoded) {

      if (err) {
        error = new Error('invalid_token');
        error.status = 401;
        return next(error);
      }

      req.user = decoded;
      next();
    });
  }
}

module.exports = bearerToken;
