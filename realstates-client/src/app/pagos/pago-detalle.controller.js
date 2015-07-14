(function() {
  'use strict';
  angular.module('app.pagos').controller('PagoDetalleController', PagoDetalleController);

  PagoDetalleController.$inject = ['contrato', 'pagos', 'pagoHelper'];

  function PagoDetalleController(contrato, pagos, pagoHelper) {
    var vm = this;
    vm.contrato = contrato;
    vm.pagos = pagos || [];
    vm.pagos.sort(sortPagosAsc);
    var fechaUltimoPago = vm.pagos.length > 0 ? new Date(vm.pagos[0].fecha) : undefined;
    var today = new Date();
    vm.userIsDelayed = pagoHelper.alquilerVencido(contrato.diaDeVencimiento, fechaUltimoPago, today) || false;
    vm.userIsAlmostDelayed = pagoHelper.alquilerAPuntoDeVencer(contrato.diaDeVencimiento, fechaUltimoPago, today) || false;
    vm.userIsUpToDate = pagoHelper.alquilerAlDia(contrato.diaDeVencimiento, fechaUltimoPago, today) || false;

    function sortPagosAsc(a, b) {
      return new Date(b.fecha) - new Date(a.fecha);
    }
  }

}());
