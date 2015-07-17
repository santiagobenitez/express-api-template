(function() {
  'use strict';
  angular.module('app.shared').controller('ConfirmationModalController', ConfirmationModalController);

  ConfirmationModalController.$inject = ['title', 'body', '$modalInstance'];

  function ConfirmationModalController(title, body, $modalInstance) {
    var vm = this;
    vm.title = title;
    vm.body = body;

    vm.ok = function() {
      $modalInstance.close();
    };

    vm.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }

}());
