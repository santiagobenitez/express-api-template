(function() {
  'use strict';
  angular.module('app.navbar').controller('NavbarController', NavbarController);

  NavbarController.$inject = ['authenticationService', '$state'];

  function NavbarController(authenticationService, $state) {
    var vm = this;
    vm.date = new Date();
    vm.authentication = authenticationService.authentication;
    vm.logOut = function() {
      authenticationService.logOut();
      $state.go('login');
    };

  }
}());
