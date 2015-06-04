(function() {
  'use strict';
  angular.module('app.propiedades').controller('PropiedadEditarController', PropiedadCrearController);

  PropiedadCrearController.$inject = ['propiedad', 'clientes', 'propiedadService', 'messageService', '$scope'];

  function PropiedadCrearController(propiedad, clientes, propiedadService, messageService, $scope) {
    var vm = this;
    vm.clientes = clientes;
    vm.propiedad = propiedad;
    vm.save = save;

    /* ----------------------
    Function declarations
    -------------------------*/

    function save() {
      propiedadService.update(vm.propiedad).then(function() {
        messageService.success('La propiedad ha sido actualizada exitosamente');
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
      }, function(err) {
        messageService.error(err);
      });
    }
  }
}());
