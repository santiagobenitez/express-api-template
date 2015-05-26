(function() {
  'use strict';
  angular.module('app.propiedades').controller('PropiedadListController', PropiedadListController);

  PropiedadListController.$inject = ['propiedades'];

  function PropiedadListController(propiedades) {
    var vm = this;
    vm.propiedades = propiedades;
  }

}());
