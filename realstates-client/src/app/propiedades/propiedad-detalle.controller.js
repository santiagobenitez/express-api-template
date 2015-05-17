(function() {
  'use strict';
  angular.module('app.propiedades').controller('PropiedadDetalleController', PropiedadDetalleController);

  PropiedadDetalleController.$inject = ['propiedad'];

  function PropiedadDetalleController(propiedad) {
    var vm = this;
    vm.propiedad = propiedad;
  }
}());
