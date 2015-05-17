(function() {
  'use strict';

  angular.module('app').config(configRoutes);

  configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inicio', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('propiedades-detalle', {
        url: '/propiedades/:id',
        templateUrl: 'app/propiedades/propiedad-detalle.html',
        controller: 'PropiedadDetalleController',
        controllerAs: 'vm',
        resolve: {
          propiedad: getPropiedad
        }
      });

    $urlRouterProvider.otherwise('/');

    getPropiedad.$inject = ['$stateParams', 'propiedadService'];
    function getPropiedad($stateParams, propiedadService) {
      return propiedadService.get($stateParams.id);
    }
  }

}());
