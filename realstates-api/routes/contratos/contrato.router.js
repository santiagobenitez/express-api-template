'use strict';

var routes = require('./contrato.routes');
var express = require('express');
var router = express.Router();
var contratoValidator = require('./contrato.validators');

router.get('/', routes.getAll);
router.get('/:id', routes.get);
router.post('/', contratoValidator.editValidator, routes.post);
router.put('/:id', contratoValidator.editValidator, routes.update);
router.delete('/:id', routes.remove);

module.exports = router;
