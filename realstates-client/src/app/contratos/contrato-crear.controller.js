(function() {
  'use strict';
  angular.module('app.contratos').controller('ContratoCrearController', ContratoCrearController);

  ContratoCrearController.$inject = ['propiedades', 'clientes', '$scope', '$state', 'alquilerHelper', 'contratoService', 'messageService'];

  function ContratoCrearController(propiedades, clientes, $scope, $state, alquilerHelper, contratoService, messageService) {
    var vm = this;
    vm.clientes = clientes;
    vm.propiedades = propiedades;
    vm.open = open;
    vm.tipoIntereses = [{
      value: 'Semestral',
      label: 'Semestral'
    }, {
      value: 'Anual',
      label: 'Anual'
    }, {
      value: undefined,
      label: 'Ninguno'
    }];
    vm.save = save;

    $scope.$watch('vm.contrato.propiedad', watchPropiedad);
    $scope.$watch('vm.contrato.garante', watchGarante);
    $scope.$watch('vm.contrato.inquilino', watchInquilino);
    $scope.$watch('vm.contrato.tipoInteres', watchTipoInteres);
    $scope.$watch('vm.contrato.interes', calcularAlquileres);
    $scope.$watch('vm.contrato.fechaDesde', calcularAlquileres);
    $scope.$watch('vm.contrato.fechaHasta', calcularAlquileres);
    $scope.$watch('vm.contrato.alquiler', calcularAlquileres);


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
      if (newValue !== oldValue && !newValue) {
        $scope.form.interes.$setPristine();
        $scope.form.interes.$setUntouched();
      }

      calcularAlquileres();
    }

    function calcularAlquileres() {
      if (vm.contrato) {
        vm.alquileresCalculados = alquilerHelper.calcularAlquileres(vm.contrato.fechaDesde, vm.contrato.fechaHasta, vm.contrato.tipoInteres, vm.contrato.interes, vm.contrato.alquiler);
      }
    }

    function open($event, fecha) {
      $event.preventDefault();
      $event.stopPropagation();

      vm[fecha] = true;
    }

    function save() {
       contratoService.create(vm.contrato).then(function(id) {
        messageService.success('El contrato ha sido creado exitosamente');
        $state.go('contrato-edit', {
          id: id
        });
      }, function(err) {
        messageService.error(err);
      });
    }
  }
}());
