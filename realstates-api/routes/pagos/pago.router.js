'use strict';

var routes = require('./pago.routes');
var express = require('express');
var router = express.Router();

router.get('/:contratoid/pagos/', routes.getAll);
router.get('/:contratoid/pagos/:id', routes.get);
router.post('/:contratoid/pagos/', routes.post);
router.delete('/:contratoid/pagos/:id', routes.remove);
router.put('/:contratoid/pagos/:id', routes.update);

module.exports = router;
