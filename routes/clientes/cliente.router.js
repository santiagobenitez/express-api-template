'use strict';

var routes = require('./cliente.routes');
var express = require('express');
var clienteValidator = require('./cliente.validators');
var bearerToken = require('../../middlewares/bearer-token.middleware');

var router = express.Router();

router.use(bearerToken());

router.get('/', routes.getAll);
router.get('/:id', routes.get);
router.post('/', clienteValidator.editValidator, routes.post);
router.put('/:id', clienteValidator.editValidator, routes.update);
router.delete('/:id', routes.remove);

module.exports = router;
