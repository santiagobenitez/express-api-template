'use strict';

var routes = require('./contrato.routes');
var express = require('express');
var contratoValidator = require('./contrato.validators');
var bearerToken = require('../../middlewares/bearer-token.middleware');

var router = express.Router();
router.use(bearerToken());

router.get('/', routes.getAll);
router.get('/:id', routes.get);
router.post('/', contratoValidator.editValidator, routes.post);
router.put('/:id', contratoValidator.editValidator, routes.update);
router.delete('/:id', routes.remove);

module.exports = router;
