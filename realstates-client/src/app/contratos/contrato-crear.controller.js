(function() {
  'use strict';
  angular.module('app.contratos').controller('ContratoCrearController', ContratoCrearController);

  ContratoCrearController.$inject = ['propiedades', 'clientes', '$scope', '$state'];

  function ContratoCrearController(propiedades, clientes, $scope, $state) {
    var vm = this;
    vm.clientes = clientes;
    vm.propiedades = propiedades;
    vm.open = open;
    vm.tipoIntereses = [{value:'Semestral', label: 'Semestral'}, {value:'Anual', label:'Anual'}, {value: undefined, label: 'Ninguno'}];

    $scope.$watch('vm.contrato.propiedad', watchPropiedad);
    $scope.$watch('vm.contrato.garante', watchGarante);
    $scope.$watch('vm.contrato.inquilino', watchInquilino);
    $scope.$watch('vm.contrato.tipoInteres', watchTipoInteres);


    /* ----------------------
    Function declarations
    -------------------------*/
    function watchPropiedad(newValue, oldValue) {
      if (newValue !== oldValue) {
        var prop = vm.propiedades.filter(function(item) {
          return item._id === newValue;
        });

        vm.propietarioSeleccionado = prop.length ? prop[0].propietario.nombre + ' ' + prop[0].propietario.apellido : '';
        vm.contrato.propiedadDireccion = prop.length ? prop[0].direccion.direccion : '';
      }
    }

    function watchGarante(newValue, oldValue) {
      if (newValue !== oldValue) {
        var cliente = vm.clientes.filter(function(item) {
          return item._id === newValue;
        });
        vm.contrato.garanteNombreCompleto = cliente.length ? cliente[0].nombre + ' ' + cliente[0].apellido : '';
      }
    }

    function watchInquilino(newValue, oldValue) {
      if (newValue !== oldValue) {
        var cliente = vm.clientes.filter(function(item) {
          return item._id === newValue;
        });
        vm.contrato.inquilinoNombreCompleto = cliente.length ? cliente[0].nombre + ' ' + cliente[0].apellido : '';
      }
    }

    function watchTipoInteres(newValue, oldValue) {
      if(newValue !== oldValue && !newValue){
        $scope.form.interes.$setPristine();
        $scope.form.interes.$setUntouched();
      }
    }

    function open($event, fecha) {
      $event.preventDefault();
      $event.stopPropagation();

      vm[fecha] = true;
    }
  }
}());
