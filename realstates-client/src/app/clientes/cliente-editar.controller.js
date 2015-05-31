(function() {
  'use strict';
  angular.module('app.clientes').controller('ClienteEditarController', ClienteEditarController);

  ClienteEditarController.$inject = ['cliente','clienteService', 'messageService'];

  function ClienteEditarController(cliente, clienteService, messageService) {
    var vm = this;
    vm.cliente = cliente;
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
