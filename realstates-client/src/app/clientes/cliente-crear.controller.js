(function() {
  'use strict';
  angular.module('app.clientes').controller('ClienteCrearController', ClienteCrearController);

  ClienteCrearController.$inject = ['clienteService', '$state', 'messageService'];

  function ClienteCrearController(clienteService, $state, messageService) {
    var vm = this;
    vm.saveCliente = function() {

      clienteService.create(vm.cliente).then(function(id) {
        messageService.success('El cliente ha sido creado exitosamente');
        $state.go('cliente-details', {
          id: id
        });
      }, function(err) {
        messageService.error(err);
      });
    };
  }
}());
