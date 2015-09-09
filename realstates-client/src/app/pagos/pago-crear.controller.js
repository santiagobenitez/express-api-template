(function() {
  'use strict';

  angular.module('app.pagos').controller('PagoCrearController', PagoCrearController);

  PagoCrearController.$inject = ['pagoService', 'contrato', '$state', 'messageService', '$scope', 'alquilerHelper'];

  function PagoCrearController(pagoService, contrato, $state, messageService, $scope, alquilerHelper) {
    
    var vm = this,
        alquilerActual =  alquilerHelper.getAlquilerActual(new Date(contrato.fechaDesde), new Date(contrato.fechaHasta), contrato.tipoInteres, contrato.interes, contrato.alquiler);

    vm.pago = {
      fecha: (new Date()).toISOString()
    };

    vm.contrato = contrato;
    vm.importeSugerido = '';
    vm.save = save;
    vm.open = open;


    $scope.$watch('vm.pago.fecha', calcularImporteSegurido);

    /*
      function definitions
    */
    function save() {
      vm.pago.contrato = vm.contrato._id;
      pagoService.create(vm.pago).then(function(id) {
        messageService.success('El pago ha sido creado exitosamente');
        $state.go('pago-edit', {
          pagoid: id,
          id: vm.contrato._id
        });
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
