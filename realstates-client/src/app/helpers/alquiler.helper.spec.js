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
    })
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

      var result = alquilerHelper.calcularAlquileres(fechaDesde, fechaHasta, 'Semestral', 10, 30);

      expect(result.length).toBe(2);
      expect(result[1].fechaDesde.toDateString()).toBe(fechaDesdeExpected.toDateString());
      expect(result[1].fechaHasta.toDateString()).toBe(fechaHasta.toDateString());
    });
  });
});
