(function() {
  'use strict';
  angular.module('app.contratos').controller('ContratoListController', ContratoListController);

  ContratoListController.$inject = ['contratos'];

  function ContratoListController(contratos) {
    var vm = this;
    vm.contratos = contratos;
  }

}());
