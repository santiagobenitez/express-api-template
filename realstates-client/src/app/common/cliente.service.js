(function() {
  'use strict';
  angular.module('app.common').factory('clienteService', clienteService);

  clienteService.$inject = ['$q', '$http', 'URL'];

  function clienteService($q, $http, URL) {

    return {
      get: get,
      getAll: getAll,
      create: create
    };

    function get(id) {

      return $http.get(URL.api + 'clientes/' + id).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function getAll() {

      return $http.get(URL.api + 'clientes').then(function(response) {
        return response.data.items;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function create(newCliente) {

      return $http.post(URL.api + 'clientes', newCliente).then(function(response) {
        return response.data._id;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

  }
}());
