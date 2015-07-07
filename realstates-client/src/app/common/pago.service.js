(function() {
  'use strict';
  angular.module('app.common').factory('pagoService', pagoService);

  pagoService.$inject = ['$q', '$http', 'URL'];

  function pagoService($q, $http, URL) {

    return {
      get: get,
      getAll: getAll,
      create: create,
      update: update
    };

    function get(contratoId, pagoId) {

      return $http.get(URL.api + 'contratos/' + contratoId + '/pagos/' + pagoId).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function getAll(contratoId) {

      return $http.get(URL.api + 'contratos/' + contratoId + '/pagos').then(function(response) {
        return response.data.items;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function create(newPago) {

      return $http.post(URL.api + 'contratos/' + newPago.contrato + '/pagos', newPago).then(function(response) {
        return response.data._id;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

    function update(pago) {
      return $http.put(URL.api + 'contratos/' + pago.contrato + '/pagos/' + pago._id, pago).then(function(response) {
        return response.data;
      }, function(err) {
        return $q.reject(err.data.message);
      });
    }

  }
}());
