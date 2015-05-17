(function() {
  'use strict';
  angular.module('app.navbar').controller('NavbarController', NavbarController);

  function NavbarController() {
    var vm = this;
    vm.date = new Date();

  }
}());
