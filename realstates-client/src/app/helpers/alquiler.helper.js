(function() {
  'use strict';
  angular.module('app.helpers').factory('alquilerHelper', alquilerHelper);

  function alquilerHelper() {

    return {
      calcularAlquileres: calcularAlquileres
    };

    function calcularAlquileres(fechaDesde, fechaHasta, tipoInteres, interes, alquiler) {

      var alquilerCalculado = alquiler || 0;
      var interesCalculado = interes || 0;

      if (!fechaDesde || !fechaHasta) {
        return [];
      }

      if(!tipoInteres){
        return [{
          fechaDesde: fechaDesde,
          fechaHasta: fechaHasta,
          valor: interesCalculado
        }];
      }

    }
  }
}());
