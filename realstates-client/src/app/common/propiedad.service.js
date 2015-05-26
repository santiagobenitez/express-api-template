(function() {
  'use strict';
  angular.module('app.common').factory('propiedadService', propiedadService);

  propiedadService.$inject = ['$q', '$http', 'URL'];

  function propiedadService($q, $http, URL) {

    return {
      get: get,
      getAll: getAll
    };

    function get(id) {
      return {};
    }

    function getAll() {

      return $http.get(URL.api + 'propiedades').then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data);
      });
    }

  }
}());
