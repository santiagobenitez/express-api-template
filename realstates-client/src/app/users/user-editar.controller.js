(function() {
  'use strict';
  angular.module('app.users').controller('UserEditarController', UserEditarController);

  UserEditarController.$inject = ['user', 'userService', 'messageService', '$scope'];

  function UserEditarController(user, userService, messageService, $scope) {
    var vm = this;
    vm.user = user;
    vm.saveUsuario = function() {
      userService.update(vm.user).then(function() {
        messageService.success('El usuario ha sido actualizado exitosamente');
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
      }, function(err) {
        messageService.error(err);
      });
    };
  }
}());
