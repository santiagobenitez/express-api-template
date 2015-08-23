'use strict';

var routes = require('./root.routes');
var express = require('express');
var router = express.Router();

router.get('/', routes.getRoot);
router.get('/api', routes.getRootApi);
router.post('/api/token', routes.authenticate);

module.exports = router;
