'use strict';

var routes = require('./propiedades.routes');
var express = require('express');
var propiedadValidators = require('./propiedad.validators');
var router = express.Router();

router.get('/', routes.getAll);
router.get('/:id', routes.get);
router.post('/', propiedadValidators.editValidator, routes.post);
router.put('/:id', propiedadValidators.editValidator, routes.update);
router.delete('/:id', routes.remove);

module.exports = router;
