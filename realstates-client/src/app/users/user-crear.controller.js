(function() {
  'use strict';
  angular.module('app.users').controller('UserCrearController', UserCrearController);

  UserCrearController.$inject = ['userService', '$state', 'messageService'];

  function UserCrearController(userService, $state, messageService) {
    var vm = this;
    
    vm.user = {
      activo: false
    };

    vm.saveUsuario = function() {

      userService.create(vm.user).then(function(id) {
        messageService.success('El usuario ha sido creado exitosamente');
        $state.go('user-edit', {
          id: id
        });
      }, function(err) {
        messageService.error(err);
      });
    };
  }
}());
