'use strict';

var routes = require('./propiedades.routes');
var express = require('express');
var propiedadValidators = require('./propiedades.validators');
var bearerToken = require('../../middlewares/bearer-token.middleware');

var router = express.Router();
router.use(bearerToken());

router.get('/', routes.getAll);
router.get('/:id', routes.get);
router.post('/', propiedadValidators.editValidator, routes.post);
router.put('/:id', propiedadValidators.editValidator, routes.update);
router.delete('/:id', routes.remove);

module.exports = router;
