(function() {
  'use strict';
  angular.module('app.clientes').controller('ClienteEditarController', ClienteEditarController);

  ClienteEditarController.$inject = ['cliente', 'clienteService', 'messageService', '$scope'];

  function ClienteEditarController(cliente, clienteService, messageService, $scope) {
    var vm = this;
    vm.cliente = cliente;
    vm.saveCliente = function() {
      clienteService.update(vm.cliente).then(function() {
        messageService.success('El cliente ha sido actualizado exitosamente');
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
      }, function(err) {
        messageService.error(err);
      });
    };
  }
}());
