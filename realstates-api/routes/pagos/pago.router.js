'use strict';

var routes = require('./pago.routes');
var express = require('express');
var pagoValidators = require('./pago.validators');
var bearerToken = require('../../middlewares/bearer-token.middleware');

var router = express.Router();
router.use(bearerToken());


router.get('/:contratoid/pagos/', routes.getAll);
router.get('/:contratoid/pagos/:id', routes.get);
router.post('/:contratoid/pagos/', pagoValidators.editValidator, routes.post);
router.put('/:contratoid/pagos/:id', pagoValidators.editValidator, routes.update);
router.delete('/:contratoid/pagos/:id', routes.remove);

module.exports = router;
