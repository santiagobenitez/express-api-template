(function() {
  'use strict';
  angular.module('app.contratos').controller('ContratoEditarController', ContratoEditarController);

  ContratoEditarController.$inject = ['propiedades', 'clientes', 'contrato', '$scope', '$state', 'alquilerHelper', 'contratoService', 'messageService'];

  function ContratoEditarController(propiedades, clientes, contrato, $scope, $state, alquilerHelper, contratoService, messageService) {
    var vm = this;
    vm.clientes = clientes;
    vm.propiedades = propiedades;
    vm.contrato = contrato;
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
    vm.diasDeVencimiento = getDiasDeVencimiento();

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
    function watchPropiedad(newValue) {
      var prop = vm.propiedades.filter(function(item) {
        return item._id === newValue;
      });

      vm.propietarioSeleccionado = prop.length ? prop[0].propietario.nombre + ' ' + prop[0].propietario.apellido : '';
      vm.contrato.propiedadDireccion = prop.length ? prop[0].direccion.direccion : '';
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
      contratoService.update(vm.contrato).then(function() {
        messageService.success('El contrato ha sido creado exitosamente');
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
      }, function(err) {
        messageService.error(err);
      });
    }

    function getDiasDeVencimiento() {
      var dias = [];

      for (var i = 2; i <= 20; i++) {
        dias.push({
          value: i,
          label: i
        });
      }

      dias.push({value: undefined, label: 'Seleccionar'});
      return dias;
    }
  }
}());
