(function() {
  'use strict';
  angular.module('app.navbar').controller('NavbarController', NavbarController);

  NavbarController.$inject = ['authenticationService'];

  function NavbarController(authenticationService) {
    var vm = this;
    vm.date = new Date();
    vm.isUserAuthenticated = isUserAuthenticated;

    /*
      Function definitions
    */
    function isUserAuthenticated() {
      return authenticationService.isAuthenticated();
    }
  }
}());
