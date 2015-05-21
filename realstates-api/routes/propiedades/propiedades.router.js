'use strict';

var routes = require('./propiedades.routes');
var express = require('express');
var router = express.Router();

router.get('/', routes.getAllPropiedades);
router.get('/:id', routes.getPropiedad);
router.post('/', routes.postPropiedades);

module.exports = router;
