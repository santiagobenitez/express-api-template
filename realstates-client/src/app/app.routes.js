(function() {
  'use strict';

  angular.module('app').config(configRoutes);

  configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inicio', {
        url: '/',
        templateUrl: 'app/propiedades/propiedad-list.html',
        controller: 'PropiedadListController',
        controllerAs: 'vm',
        resolve: {
          propiedades: getAllPropiedades
        }
      })
      .state('propiedades-detalle', {
        url: '/propiedades/{id}/detalle',
        templateUrl: 'app/propiedades/propiedad-detalle.html',
        controller: 'PropiedadDetalleController',
        controllerAs: 'vm',
        resolve: {
          propiedad: getPropiedad
        }
      })
      .state('propiedades-list', {
        url: '/propiedades',
        templateUrl: 'app/propiedades/propiedad-list.html',
        controller: 'PropiedadListController',
        controllerAs: 'vm',
        resolve: {
          propiedades: getAllPropiedades
        }
      })
      .state('propiedades-new', {
        url: '/propiedades/crear',
        templateUrl: 'app/propiedades/propiedad-editar.html',
        controller: 'PropiedadCrearController',
        controllerAs: 'vm',
        resolve: {
          clientes: getAllClientes
        }
      })
      .state('propiedad-edit', {
        url: '/propiedades/{id}/editar',
        templateUrl: 'app/propiedades/propiedad-editar.html',
        controller: 'PropiedadEditarController',
        controllerAs: 'vm',
        resolve: {
          clientes: getAllClientes,
          propiedad: getPropiedad
        }
      })
      .state('clientes-list', {
        url: '/clientes',
        templateUrl: 'app/clientes/cliente-list.html',
        controller: 'ClienteListController',
        controllerAs: 'vm',
        resolve: {
          clientes: getAllClientes
        }
      })
      .state('cliente-new', {
        url: '/clientes/crear',
        templateUrl: 'app/clientes/cliente-editar.html',
        controller: 'ClienteCrearController',
        controllerAs: 'vm'
      })
      .state('cliente-edit', {
        url: '/clientes/{id}/editar',
        templateUrl: 'app/clientes/cliente-editar.html',
        controller: 'ClienteEditarController',
        controllerAs: 'vm',
        resolve: {
          cliente: getCliente
        }
      })
      .state('contrato-new', {
        url: '/contratos/crear',
        templateUrl: 'app/contratos/contrato-editar.html',
        controller: 'ContratoCrearController',
        controllerAs: 'vm',
        resolve: {
          clientes: getAllClientes,
          propiedades: getAllPropiedades
        }
      });

    $urlRouterProvider.otherwise('/');

    getPropiedad.$inject = ['$stateParams', 'propiedadService'];
    function getPropiedad($stateParams, propiedadService) {
      return propiedadService.get($stateParams.id);
    }

    getAllPropiedades.$inject = ['propiedadService'];
    function getAllPropiedades(propiedadService) {
      return propiedadService.getAll();
    }

    getAllClientes.$inject = ['clienteService'];
    function getAllClientes(clienteService) {
      return clienteService.getAll();
    }

    getCliente.$inject = ['clienteService', '$stateParams'];
    function getCliente(clienteService, $stateParams) {
      return clienteService.get($stateParams.id);
    }
  }

}());
