(function() {
  'use strict';
  angular.module('app.pagos').controller('PagoCrearController', PagoCrearController);

  PagoCrearController.$inject = ['pagoService', 'contrato', '$state', 'messageService', '$scope', 'pagoHelper'];

  function PagoCrearController(pagoService, contrato, $state, messageService, $scope, pagoHelper) {
    var vm = this;
    var _contrato = contrato;
    vm.pago = {
      fecha: (new Date()).toISOString()
    };
    vm.contratoId = _contrato._id;
    vm.importeSugerido = '';
    vm.save = save;
    vm.open = open;


    $scope.$watch('vm.pago.fecha', calcularImporteSegurido);

    /*
      function definitions
    */
    function save() {
      vm.pago.contrato = _contrato._id;
      pagoService.create(vm.pago).then(function(id) {
        messageService.success('El pago ha sido creado exitosamente');
        $state.go('pago-edit', {
          id: id,
          contratoid: _contrato._id
        });
      }, function(err) {
        messageService.error(err);
      });
    }

    function calcularImporteSegurido(newValue) {
      vm.importeSugerido = pagoHelper.calcularImporteSugerido(_contrato.diaDeVencimiento, new Date(), new Date(newValue), _contrato.alquiler, _contrato.multaDiaria);
    }

    function open($event, fecha) {
      $event.preventDefault();
      $event.stopPropagation();

      vm[fecha] = true;
    }
  }
}());
