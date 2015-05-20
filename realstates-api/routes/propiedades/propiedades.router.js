'use strict';

var routes = require('./propiedades.routes');
var express = require('express');
var router = express.Router();

router.get('/', routes.getAllPropiedades);
router.post('/', routes.postPropiedades);

module.exports = router;
