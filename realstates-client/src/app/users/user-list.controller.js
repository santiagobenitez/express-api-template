(function() {
  'use strict';
  angular.module('app.users').controller('UserListController', UserListController);

  UserListController.$inject = ['users'];

  function UserListController(users) {
    var vm = this;
    vm.users = users;
  }

}());
