(function() {
  'use strict';
  angular.module('app.clientes').controller('ClienteListController', ClienteListController);

  ClienteListController.$inject = ['clientes'];

  function ClienteListController(clientes) {
    var vm = this;
    vm.clientes = clientes;
  }

}());
