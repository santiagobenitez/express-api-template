(function() {
  'use strict';
  angular.module('app.clientes').controller('ClienteCrearController', ClienteCrearController);

  ClienteCrearController.$inject = ['clienteService'];

  function ClienteCrearController(clienteService) {
    var vm = this;
  }
}());
