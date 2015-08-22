(function() {
  'use strict';

  angular.module('app.login').controller('LoginController', LoginController);

  LoginController.$inject = ['authenticationService', '$state', '$rootScope'];

  function LoginController(authenticationService, $state, $rootScope) {
    var vm = this;

    vm.userName = '';
    vm.password = '';
    vm.errorMsg = '';
    vm.logIn = logIn;

    $rootScope.$on('oauth:error', function() {
      vm.errorMsg = 'Invalid Login';
    });

    //Function declarations
    function logIn() {
      if (!vm.userName || !vm.password) {
        vm.errorMsg = 'User Name and Password are required';
        return;
      }
      authenticationService.authenticate({
        username: vm.userName,
        password: vm.password
      }).then(function() {
        $state.go('inicio');
      }, function(err) {
        vm.errorMsg = err;
      });
    }

  }
}());
