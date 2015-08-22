describe('AlquilerHelper', function() {
  var alquilerHelper;

  beforeEach(module('app'));

  afterEach(function() {
    alquilerHelper = null;
  });

  describe('functions definition', function() {

    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));

    afterEach(function() {
      alquilerHelper = null;
    });

    it('should have calcularAlquilres defined', function() {
      expect(alquilerHelper.calcularAlquileres).toBeDefined();
    });

    it('should have getAlquilerActual defined', function() {
      expect(alquilerHelper.getAlquilerActual).toBeDefined();
    });

    it('should have alquilerVencido defined', function() {
      expect(alquilerHelper.alquilerVencido).toBeDefined();
    });

    it('should have alquilerAPuntoDeVencer defined', function() {
      expect(alquilerHelper.alquilerAPuntoDeVencer).toBeDefined();
    });

    it('should have alquilerAlDia defined', function() {
      expect(alquilerHelper.alquilerAlDia).toBeDefined();
    });

    it('should have calcularImporteSugerido defined', function() {
      expect(alquilerHelper.calcularImporteSugerido).toBeDefined();
    });

  });

  describe('calcularAlquileres', function() {
    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));

    afterEach(function() {
      alquilerHelper = null;
    });

    it('should return an empty array when any of the dates are not defined', function() {

      var result = alquilerHelper.calcularAlquileres();

      expect(result.length).toBe(0);
    });

    it('should return one alquiler of valor 30 when the tipoInteres is undefined and alquiler is 30', function() {

      var fechaDesde = new Date(2015, 6, 3);
      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setDate(fechaDesde.getDate() + 1);

      var result = alquilerHelper.calcularAlquileres(fechaDesde, fechaHasta, undefined, undefined, 30);

      expect(result.length).toBe(1);
      expect(result[0].fechaDesde.toDateString()).toBe(fechaDesde.toDateString());
      expect(result[0].fechaHasta.toDateString()).toBe(fechaHasta.toDateString());
      expect(result[0].valor).toBe(30);

    });

    it('should return one alquiler of 30 when the tipoInteres is Semestral and the difference between fechaDesde and fechaHasta is less than 6 month', function() {
      var fechaDesde = new Date(2015, 6, 3);
      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setMonth(fechaDesde.getMonth() + 5);

      var result = alquilerHelper.calcularAlquileres(fechaDesde, fechaHasta, 'Semestral', undefined, 30);

      expect(result.length).toBe(1);
      expect(result[0].fechaDesde.toDateString()).toBe(fechaDesde.toDateString());
      expect(result[0].fechaHasta.toDateString()).toBe(fechaHasta.toDateString());
      expect(result[0].valor).toBe(30);
    });

    it('should return two alquileres of 30 and 30 when the tipoInteres is Semestral and the interes is undefined', function() {
      var fechaDesde = new Date();
      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setMonth(fechaDesde.getMonth() + 12);

      var result = alquilerHelper.calcularAlquileres(fechaDesde, fechaHasta, 'Semestral', undefined, 30);

      expect(result.length).toBe(2);
      expect(result[0].valor).toBe(30);
      expect(result[1].valor).toBe(30);
    });

    it('should return two alquileres of 30 and 33 when the tipoInteres is Semestral and the interes is 10%', function() {
      var fechaDesde = new Date();
      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setMonth(fechaDesde.getMonth() + 12);

      var result = alquilerHelper.calcularAlquileres(fechaDesde, fechaHasta, 'Semestral', 10, 30);

      expect(result.length).toBe(2);
      expect(result[0].valor).toBe(30);
      expect(result[1].valor).toBe(33);
    });

    it('should return two alquileres with dates having difference of 6 month when the tipoInteres is Semestral', function() {
      var fechaDesde = new Date(2015, 6, 3);
      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setMonth(fechaDesde.getMonth() + 12);
      var fechaDesdeExpected = new Date(fechaDesde);
      fechaDesdeExpected.setMonth(fechaDesde.getMonth() + 6);
      fechaDesdeExpected.setDate(fechaDesde.getDate() + 1);


      var result = alquilerHelper.calcularAlquileres(fechaDesde, fechaHasta, 'Semestral', 10, 30);

      expect(result.length).toBe(2);
      expect(result[0].fechaDesde.toDateString()).toBe(fechaDesde.toDateString());
      expect(result[1].fechaDesde.toDateString()).toBe(fechaDesdeExpected.toDateString());
    });

    it('should return two alquileres with the second one having a fechaHasta equal to the one provided when the tipoInteres is Semestral and the difference between the dates is 9 month', function() {
      var fechaDesde = new Date(2015, 6, 3);
      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setMonth(fechaDesde.getMonth() + 9);
      var fechaDesdeExpected = new Date(fechaDesde);
      fechaDesdeExpected.setMonth(fechaDesde.getMonth() + 6);
      fechaDesdeExpected.setDate(fechaDesde.getDate() + 1);

      var result = alquilerHelper.calcularAlquileres(fechaDesde, fechaHasta, 'Semestral', 10, 30);

      expect(result.length).toBe(2);
      expect(result[1].fechaDesde.toDateString()).toBe(fechaDesdeExpected.toDateString());
      expect(result[1].fechaHasta.toDateString()).toBe(fechaHasta.toDateString());
    });
  });

  describe('getAlquilerActual', function() {
    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));

    afterEach(function() {
      alquilerHelper = null;
    });

    it('should return the alquiler when the date is before the contrato start date', function() {
      var fechaDesde = new Date(),
        interes = 10,
        tipoInteres = 'Semestral',
        alquiler = 1000;
      fechaDesde.setDate(fechaDesde.getDate() + 2);
      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setMonth(fechaHasta.getMonth() + 6);

      var alquilerActual = alquilerHelper.getAlquilerActual(fechaDesde, fechaHasta, tipoInteres, interes, alquiler);
      expect(alquilerActual).toBe(1000);
    });

    it('should return the alquiler plus an interes of 10% when the date is after contract finished', function() {
      var fechaDesde = new Date(),
        interes = 10,
        tipoInteres = 'Semestral',
        alquiler = 1000;

      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setDate(fechaHasta.getDate() - 2);
      fechaDesde.setFullYear(fechaDesde.getFullYear() - 1);

      var alquilerActual = alquilerHelper.getAlquilerActual(fechaDesde, fechaHasta, tipoInteres, interes, alquiler);
      expect(alquilerActual).toBe(1100);
    });

    it('should return the alquiler without interest when date is in the first semester of the contract', function() {
      var fechaDesde = new Date(),
        interes = 10,
        tipoInteres = 'Semestral',
        alquiler = 1000;

      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setFullYear(fechaHasta.getFullYear() + 1);
      fechaDesde.setMonth(fechaDesde.getMonth() - 2);

      var alquilerActual = alquilerHelper.getAlquilerActual(fechaDesde, fechaHasta, tipoInteres, interes, alquiler);
      expect(alquilerActual).toBe(1000);
    });


    it('should return the alquiler plus an interes of 10% without interest when date is in the first semester of the contract', function() {
      var fechaDesde = new Date(),
        interes = 10,
        tipoInteres = 'Semestral',
        alquiler = 1000;

      var fechaHasta = new Date(fechaDesde);
      fechaHasta.setFullYear(fechaHasta.getFullYear() + 1);
      fechaDesde.setMonth(fechaDesde.getMonth() - 7);

      var alquilerActual = alquilerHelper.getAlquilerActual(fechaDesde, fechaHasta, tipoInteres, interes, alquiler);
      expect(alquilerActual).toBe(1100);
    });


  });

describe('alquilerVencido', function() {

    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));

    it('should return true when the expire day is 10th, the current day is the 11th and the last payment was a month before', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment = new Date(2015, 6, 8);
      var expireDay = 10;

      var rentExpired = alquilerHelper.alquilerVencido(expireDay, lastPayment, currentDate);

      expect(rentExpired).toBeTruthy();
    });

    it('should return true when the expire day is 10th, the current day is the 11th and there is not a previous payment', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment;
      var expireDay = 10;

      var rentExpired = alquilerHelper.alquilerVencido(expireDay, lastPayment, currentDate);

      expect(rentExpired).toBeTruthy();
    });

    it('should return false when the expire day is 10th, the current day is the 11th and the last payment was a done the 3rd of the currentDate', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment = new Date(2015, 7, 3);
      var expireDay = 10;

      var rentExpired = alquilerHelper.alquilerVencido(expireDay, lastPayment, currentDate);

      expect(rentExpired).toBeFalsy();
    });

    it('should return false when the expire day is 10th, the current day is the 4th and the last payment was the provious month', function() {
      var currentDate = new Date(2015, 7, 4);
      var lastPayment = new Date(2015, 6, 4);
      var expireDay = 10;

      var rentExpired = alquilerHelper.alquilerVencido(expireDay, lastPayment, currentDate);

      expect(rentExpired).toBeFalsy();
    });
  });

  describe('alquilerAPuntoDeVencer', function() {

    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));

    it('should return false when the expire day is 10th, the current day is the 11th and the last payment was a month before', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment = new Date(2015, 6, 8);
      var expireDay = 10;

      var rentAlmostExpired = alquilerHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeFalsy();
    });

    it('should return false when the expire day is 10th, the current day is the 2nd and the last payment was a month before', function() {
      var currentDate = new Date(2015, 7, 2);
      var lastPayment = new Date(2015, 6, 3);
      var expireDay = 10;

      var rentAlmostExpired = alquilerHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeFalsy();
    });

    it('should return false when the expire day is 10th, the current day is the 8th and the last payment was the 4th of the current month', function() {
      var currentDate = new Date(2015, 7, 8);
      var lastPayment = new Date(2015, 7, 4);
      var expireDay = 10;

      var rentAlmostExpired = alquilerHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeFalsy();
    });

    it('should return true when the expire day is 10th, the current day is the 8th and the last payment was done a month before of the current one', function() {
      var currentDate = new Date(2015, 7, 8);
      var lastPayment = new Date(2015, 6, 4);
      var expireDay = 10;

      var rentAlmostExpired = alquilerHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeTruthy();
    });

    it('should return true when the expire day is 10th, the current day is the 8th and there is not a payment', function() {
      var currentDate = new Date(2015, 7, 8);
      var lastPayment;
      var expireDay = 10;

      var rentAlmostExpired = alquilerHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeTruthy();
    });
  });

  describe('alquilerAlDia', function() {

    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));

    it('should return false when the expire day is 10th, the current day is the 11th and the last payment was a month before', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment = new Date(2015, 6, 8);
      var expireDay = 10;

      var rentUpToDate = alquilerHelper.alquilerAlDia(expireDay, lastPayment, currentDate);

      expect(rentUpToDate).toBeFalsy();
    });

    it('should return false when the expire day is 10th, the current day is the 11th and there is not a payment', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment;
      var expireDay = 10;

      var rentUpToDate = alquilerHelper.alquilerAlDia(expireDay, lastPayment, currentDate);

      expect(rentUpToDate).toBeFalsy();
    });

    it('should return true when the expire day is 10th, the current day is the 2nd and the last payment was a month before', function() {
      var currentDate = new Date(2015, 7, 2);
      var lastPayment = new Date(2015, 6, 3);
      var expireDay = 10;

      var rentUpToDate = alquilerHelper.alquilerAlDia(expireDay, lastPayment, currentDate);

      expect(rentUpToDate).toBeTruthy();
    });

    it('should return true when the expire day is 10th, the current day is the 8th and the last payment was the 4th of the current month', function() {
      var currentDate = new Date(2015, 7, 8);
      var lastPayment = new Date(2015, 7, 4);
      var expireDay = 10;

      var rentUpToDate = alquilerHelper.alquilerAlDia(expireDay, lastPayment, currentDate);

      expect(rentUpToDate).toBeTruthy();
    });

    it('should return true when the expire day is 10th, the current day is the 8th and the last payment was done a month before of the current one', function() {
      var currentDate = new Date(2015, 7, 8);
      var lastPayment = new Date(2015, 6, 4);
      var expireDay = 10;

      var rentUpToDate = alquilerHelper.alquilerAlDia(expireDay, lastPayment, currentDate);

      expect(rentUpToDate).toBeFalsy();
    });
  });

describe('calcularImporteSegurido', function () {
    beforeEach(inject(function(_alquilerHelper_) {
      alquilerHelper = _alquilerHelper_;
    }));
    afterEach(function () {
      alquilerHelper = null;
    });

    it('should return the alquiler when inquilino is up to date with the payments', function() {
      var fecha = new Date(2015, 3, 5),
        diaDeVencimiento = 10,
        fechaDePago = new Date(2015, 3, 5),
        multaDiaria = 10,
        alquiler = 100;

      var value = alquilerHelper.calcularImporteSugerido(diaDeVencimiento, fecha, fechaDePago, alquiler, multaDiaria);

      expect(value).toBe(alquiler);
    });

    it('should return the alquiler plus one fine of 10% when the payment has experired by two days', function() {
      var fecha = new Date(2015, 3, 12),
        diaDeVencimiento = 10,
        fechaDePago = new Date(2015, 3, 12),
        multaDiaria = 10,
        alquiler = 1000;

      var alquilerUnDiaDemorado = alquiler + (alquiler * 0.1);

      var value = alquilerHelper.calcularImporteSugerido(diaDeVencimiento, fecha, fechaDePago, alquiler, multaDiaria);

      expect(value).toBe(alquilerUnDiaDemorado);
    });

    it('should return the alquiler when the payment has experired by one day', function() {
      var fecha = new Date(2015, 3, 11),
        diaDeVencimiento = 10,
        fechaDePago = new Date(2015, 3, 11),
        multaDiaria = 10,
        alquiler = 1000;

      var value = alquilerHelper.calcularImporteSugerido(diaDeVencimiento, fecha, fechaDePago, alquiler, multaDiaria);

      expect(value).toBe(alquiler);
    });
  });

});
