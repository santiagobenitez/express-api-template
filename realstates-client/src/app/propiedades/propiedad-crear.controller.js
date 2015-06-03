(function() {
  'use strict';
  angular.module('app.propiedades').controller('PropiedadCrearController', PropiedadCrearController);

  PropiedadCrearController.$inject = ['propiedadService', 'clientes', '$scope'];

  function PropiedadCrearController(propiedadService, clientes, $scope) {
    var vm = this;
    vm.clientes = clientes;
    $scope.$watch('vm.propiedad.propietario', function(val) {
      console.log(val);
    });
  }
}());
