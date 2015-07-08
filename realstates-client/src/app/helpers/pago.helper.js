(function() {
  'use strict';
  angular.module('app.helpers').factory('pagoHelper', pagoHelper);

  function pagoHelper() {

    return {
      alquilerVencido: alquilerVencido,
      alquilerAPuntoDeVencer: alquilerAPuntoDeVencer,
      alquilerAlDia: alquilerAlDia
    };

    function alquilerVencido(diaDeVencimiento, fechaUltimoPago, fechaActual) {
     var fechaVencimiento = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), diaDeVencimiento);
     var fechaActualSinTiempo = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
     return fechaVencimiento < fechaActualSinTiempo && fechaActual.getMonth() !== fechaUltimoPago.getMonth();
    }

    function alquilerAPuntoDeVencer(diaDeVencimiento, fechaUltimoPago, fechaActual) {
     var fechaVencimientoTecho = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), diaDeVencimiento);
     var fechaVencimientoPiso = new Date(fechaVencimientoTecho.valueOf());
     fechaVencimientoPiso.setDate(fechaVencimientoPiso.getDate() - 3);
     var fechaActualSinTiempo = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

     return (fechaVencimientoTecho >= fechaActualSinTiempo || fechaVencimientoPiso <= fechaActualSinTiempo)  && fechaActual.getMonth() !== fechaUltimoPago.getMonth();
    }

    function alquilerAlDia(diaDeVencimiento, fechaUltimoPago, fechaActual) {
     return true;
    }

  }
}());
