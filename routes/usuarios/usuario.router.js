'use strict';

var routes = require('./usuario.routes');
var express = require('express');
var usuarioValidator = require('./usuario.validators');
var bearerToken = require('../../middlewares/bearer-token.middleware');

var router = express.Router();

router.use(bearerToken());

router.get('/', routes.getAll);
router.get('/:id', routes.get);
router.post('/', usuarioValidator.editValidator, routes.post);
router.put('/:id', usuarioValidator.editValidator, routes.update);
router.delete('/:id', routes.remove);

module.exports = router;
