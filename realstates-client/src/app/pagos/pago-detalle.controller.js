(function() {
  'use strict';
  angular.module('app.contratos').controller('PagoDetalleController', PagoDetalleController);

  PagoDetalleController.$inject = ['contrato', 'pagos'];

  function PagoDetalleController(contrato, pagos) {
    var vm = this;
    vm.contrato = contrato;
    vm.pagos = pagos;
    vm.userIsDelayed = true;
  }

}());
