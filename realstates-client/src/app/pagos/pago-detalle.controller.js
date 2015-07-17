(function() {
  'use strict';
  angular.module('app.pagos').controller('PagoDetalleController', PagoDetalleController);

  PagoDetalleController.$inject = ['contrato', 'pagos', 'alquilerHelper', '$modal', 'messageService', 'pagoService', '$scope'];

  function PagoDetalleController(contrato, pagos, alquilerHelper, $modal, messageService, pagoService, $scope) {
    var vm = this;
    vm.contrato = contrato;
    vm.pagos = pagos || [];
    vm.deletePago = deletePago;
    vm.userIsDelayed = false;
    vm.userIsAlmostDelayed = false;
    vm.userIsUpToDate = false;

    $scope.$watchCollection('vm.pagos', watchPagos);

    /*
      function definitions
    */

    function deletePago(pago) {

      var pagoid = pago._id;

      var modalInstance = $modal.open({
        templateUrl: 'app/shared/confirmation-modal.html',
        controller: 'ConfirmationModalController',
        size: 'sm',
        controllerAs: 'vm',
        resolve: {
          title: function() {
            return 'Confirmacion';
          },
          body: function() {
            return 'Esta seguro que desea eliminar el pago?';
          }
        }
      });

      modalInstance.result.then(function() {
        pagoService.remove(vm.contrato._id, pagoid).then(function() {
          var index = vm.pagos.indexOf(pago);
          vm.pagos.splice(index, 1);
          messageService.success('El pago ha sido eliminado exitosamente');
        }, function(msg) {
          messageService.error(msg);
        });

      });
    }

    function watchPagos() {
      vm.pagos.sort(sortPagosAsc);
      var fechaUltimoPago = vm.pagos.length > 0 ? new Date(vm.pagos[0].fecha) : undefined;
      var today = new Date();

      vm.userIsDelayed = alquilerHelper.alquilerVencido(contrato.diaDeVencimiento, fechaUltimoPago, today);
      vm.userIsAlmostDelayed = alquilerHelper.alquilerAPuntoDeVencer(contrato.diaDeVencimiento, fechaUltimoPago, today);
      vm.userIsUpToDate = alquilerHelper.alquilerAlDia(contrato.diaDeVencimiento, fechaUltimoPago, today);
    }

    function sortPagosAsc(a, b) {
      return new Date(b.fecha) - new Date(a.fecha);
    }
  }

}());
