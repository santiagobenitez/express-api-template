(function() {
  'use strict';
  angular.module('app.common').factory('clienteService', clienteService);

  clienteService.$inject = ['$q', '$http', 'URL'];
  function clienteService($q, $http, URL) {

    return {
      get: get,
      getAll: getAll
    };

    function get(id) {
      return {};
    }

    function getAll() {

      return $http.get(URL.api + 'clientes').then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data);
      });
    }

  }
}());
