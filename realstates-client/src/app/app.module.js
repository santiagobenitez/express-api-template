(function() {
  'use strict';

  angular.module('app', [
    'app.core',
    /* Application areas */
    'app.navbar',
    'app.propiedades',
    'app.common',
    'app.clientes',
    'app.contratos',
    'app.helpers',
    'app.pagos',
    'app.components.contrato',
    'app.shared',
    'app.users',
    'app.login'
  ]).run(checkAuthentication)
    .run(fillAuthData);


  checkAuthentication.$inject = ['$rootScope', '$state', 'authenticationService', 'blockUI'];
  function checkAuthentication($rootScope, $state, authenticationService, blockUI) {

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (!authenticationService.isAuthenticated() && toState.name !== 'login') {
          event.preventDefault();
          $state.go('login');
        }
    });

    $rootScope.$on('oauth:error', function(event, rejection) {

      //stop loading layer
      blockUI.stop();

      // Refresh token when a `invalid_token` error occurs.
      if ('invalid_token' === rejection.data.error) {
        return authenticationService.getRefreshToken();
      }
      //Redirect to Login
      authenticationService.logOut();
      event.preventDefault();

      return $state.go('login');
    });
  }

  fillAuthData.$inject = ['authenticationService'];
  function fillAuthData(authenticationService) {
    authenticationService.fillAuthData();
  }

}());
