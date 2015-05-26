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
        url: '/propiedades/{id:int}',
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
        url: '/propiedades/new',
        templateUrl: 'app/propiedades/propiedad-editar.html',
        controller: 'PropiedadCrearController',
        controllerAs: 'vm'
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
  }

}());
