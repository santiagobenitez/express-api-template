(function() {
  'use strict';
  angular.module('app.propiedades').controller('PropiedadCrearController', PropiedadCrearController);

  PropiedadCrearController.$inject = ['propiedadService'];

  function PropiedadCrearController(propiedadService) {
    var vm = this;
  }
}());
