(function() {
  'use strict';

  angular.module('app.common')
    .constant('alertify', alertify)
    .factory('messageService', messageService);

  messageService.$inject = ['alertify'];

  function messageService(alertify) {


    return {
      success: success,
      error: error,
      log: log
    };

    /* ---------
      Function declarations
    --------- */
    function success(message) {
      alertify.success(message);
    }

    function error(message) {
      alertify.error(message);
    }

    function log(message) {
      alertify.log(message);
    }
  }
}());
