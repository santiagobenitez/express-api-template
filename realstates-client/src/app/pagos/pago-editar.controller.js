(function() {
  'use strict';

  angular.module('app.pagos').controller('PagoEditarController', PagoEditarController);

  PagoEditarController.$inject = ['pagoService', 'contrato', 'pago', '$state', 'messageService', '$scope', 'alquilerHelper'];

  function PagoEditarController(pagoService, contrato, pago, $state, messageService, $scope, alquilerHelper) {
    
    var vm = this,
        alquilerActual =  alquilerHelper.getAlquilerActual(new Date(contrato.fechaDesde), new Date(contrato.fechaHasta), contrato.tipoInteres, contrato.interes, contrato.alquiler);

    vm.pago = pago;
    vm.contrato = contrato;
    vm.importeSugerido = '';
    vm.save = save;
    vm.open = open;

    $scope.$watch('vm.pago.fecha', calcularImporteSegurido);

    /*
      function definitions
    */
    function save() {
      pagoService.update(vm.pago).then(function() {
        messageService.success('El pago ha sido guardado exitosamente');
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
      }, function(err) {
        messageService.error(err);
      });
    }

    function calcularImporteSegurido(newValue) {
      vm.importeSugerido = alquilerHelper.calcularImporteSugerido(vm.contrato.diaDeVencimiento, new Date(), new Date(newValue), alquilerActual, vm.contrato.multaDiaria);
    }

    function open($event, fecha) {
      $event.preventDefault();
      $event.stopPropagation();

      vm[fecha] = true;
    }
  }
}());
