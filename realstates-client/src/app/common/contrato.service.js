(function() {
  'use strict';
  angular.module('app.common').factory('contratoService', contratoService);

  contratoService.$inject = ['$q', '$http', 'URL'];

  function contratoService($q, $http, URL) {

    return {
      get: get,
      getAll: getAll,
      create: create,
      update: update
    };

    function get(id) {

      return $http.get(URL.api + 'contratos/' + id).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function getAll() {

      return $http.get(URL.api + 'contratos').then(function(response) {
        return response.data.items;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function create(newContrato) {

      return $http.post(URL.api + 'contratos', newContrato).then(function(response) {
        return response.data._id;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function update(contrato) {
      return $http.put(URL.api + 'contratos/' + contrato._id, contrato).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

  }
}());
