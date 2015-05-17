(function() {
  'use strict';
  angular.module('app.common').factory('propiedadService', propiedadService);

  function propiedadService() {

    return {
      get: get
    };

    function get(id) {
      return {};
    }

  }
}());
