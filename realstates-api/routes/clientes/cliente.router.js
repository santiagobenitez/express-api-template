'use strict';

var routes = require('./cliente.routes');
var express = require('express');
var router = express.Router();

router.get('/', routes.getAll);
router.get('/:id', routes.get);
router.post('/', routes.post);
router.delete('/:id', routes.remove);

module.exports = router;