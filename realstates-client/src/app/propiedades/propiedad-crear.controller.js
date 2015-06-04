(function() {
  'use strict';
  angular.module('app.propiedades').controller('PropiedadCrearController', PropiedadCrearController);

  PropiedadCrearController.$inject = ['propiedadService', 'clientes', 'messageService', '$state'];

  function PropiedadCrearController(propiedadService, clientes, messageService, $state) {
    var vm = this;
    vm.clientes = clientes;
    vm.save = save;

    /* ----------------------
    Function declarations
    -------------------------*/

    function save() {
      propiedadService.create(vm.propiedad).then(function(id) {
        messageService.success('La propiedad ha sido creado exitosamente');
        $state.go('propiedad-edit', {
          id: id
        });
      }, function(err) {
        messageService.error(err);
      });
    }
  }
}());
