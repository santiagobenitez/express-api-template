(function() {
  'use strict';

  angular.module('app', [
    'app.core',
    /* Application areas */
    'app.navbar',
    'app.propiedades',
    'app.common',
    'app.clientes',
    'app.contratos',
    'app.helpers',
    'app.pagos',
    'app.components.contrato',
    'app.shared'
  ]);

}());
