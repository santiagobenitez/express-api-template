(function() {
  'use strict';
  angular.module('app.helpers').factory('pagoHelper', pagoHelper);

  function pagoHelper() {

    return {
      alquilerVencido: alquilerVencido,
      alquilerAPuntoDeVencer: alquilerAPuntoDeVencer,
      alquilerAlDia: alquilerAlDia,
      calcularImporteSugerido: calcularImporteSugerido
    };

    function alquilerVencido(diaDeVencimiento, fechaUltimoPago, fechaActual) {
      var fechaVencimiento = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), diaDeVencimiento);
      var fechaActualSinTiempo = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

      return fechaVencimiento < fechaActualSinTiempo && (!fechaUltimoPago || fechaActual.getMonth() !== fechaUltimoPago.getMonth());
    }

    function alquilerAPuntoDeVencer(diaDeVencimiento, fechaUltimoPago, fechaActual) {
      var fechaVencimientoTecho = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), diaDeVencimiento);
      var fechaVencimientoPiso = new Date(fechaVencimientoTecho.valueOf());
      fechaVencimientoPiso.setDate(fechaVencimientoPiso.getDate() - 3);
      var fechaActualSinTiempo = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

      return fechaVencimientoTecho >= fechaActualSinTiempo && fechaVencimientoPiso <= fechaActualSinTiempo && (!fechaUltimoPago || fechaActual.getMonth() !== fechaUltimoPago.getMonth());
    }

    function alquilerAlDia(diaDeVencimiento, fechaUltimoPago, fechaActual) {
      var fechaVencimientoTecho = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), diaDeVencimiento);
      var fechaVencimientoPiso = new Date(fechaVencimientoTecho.valueOf());
      fechaVencimientoPiso.setDate(fechaVencimientoPiso.getDate() - 3);
      var fechaActualSinTiempo = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

      return fechaActualSinTiempo < fechaVencimientoPiso || (fechaUltimoPago && fechaActual.getMonth() === fechaUltimoPago.getMonth());
    }

    function calcularImporteSugerido(diaDeVencimiento, fechaHasta, fechaDePago, alquiler, multaDiaria) {
      var fechaVencimiento = new Date(fechaDePago.getFullYear(), fechaDePago.getMonth(), diaDeVencimiento);
      var fechaActualSinTiempo = new Date(fechaHasta.getFullYear(), fechaHasta.getMonth(), fechaHasta.getDate());

      if (fechaVencimiento >= fechaActualSinTiempo) {
        return alquiler;
      }

      var diasDeDiferencia = daydiff(fechaVencimiento, fechaActualSinTiempo);
      var multaDiariaValor = (multaDiaria * alquiler)/100;
      return alquiler + (multaDiariaValor * (diasDeDiferencia - 1));
    }

    function daydiff(first, second) {
      return (second - first) / (1000 * 60 * 60 * 24);
    }

  }
}());
