describe('PagoHelper', function() {
  var pagoHelper;

  beforeEach(module('app'));

  afterEach(function() {
    pagoHelper = null;
  });

  describe('functions definition', function() {

    beforeEach(inject(function(_pagoHelper_) {
      pagoHelper = _pagoHelper_;
    }));

    afterEach(function() {
      pagoHelper = null;
    });

    it('should have alquilerVencido defined', function() {
      expect(pagoHelper.alquilerVencido).toBeDefined();
    });


    it('should have alquilerAPuntoDeVencer defined', function() {
      expect(pagoHelper.alquilerAPuntoDeVencer).toBeDefined();
    });

    it('should have alquilerAlDia defined', function() {
      expect(pagoHelper.alquilerAlDia).toBeDefined();
    });
  });

  describe('alquilerVencido', function() {

    beforeEach(inject(function(_pagoHelper_) {
      pagoHelper = _pagoHelper_;
    }));

    it('should return true when the expire day is 10th, the current day is the 11th and the last payment was a month before', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment = new Date(2015, 6, 8);
      var expireDay = 10;

      var rentExpired = pagoHelper.alquilerVencido(expireDay, lastPayment, currentDate);

      expect(rentExpired).toBeTruthy();
    });

    it('should return false when the expire day is 10th, the current day is the 11th and the last payment was a done the 3rd of the currentDate', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment = new Date(2015, 7, 3);
      var expireDay = 10;

      var rentExpired = pagoHelper.alquilerVencido(expireDay, lastPayment, currentDate);

      expect(rentExpired).toBeFalsy();
    });

    it('should return false when the expire day is 10th, the current day is the 4th and the last payment was the provious month', function() {
      var currentDate = new Date(2015, 7, 4);
      var lastPayment = new Date(2015, 6, 4);
      var expireDay = 10;

      var rentExpired = pagoHelper.alquilerVencido(expireDay, lastPayment, currentDate);

      expect(rentExpired).toBeFalsy();
    });
  });


  describe('alquilerAPuntoDeVencer', function() {

    beforeEach(inject(function(_pagoHelper_) {
      pagoHelper = _pagoHelper_;
    }));

    it('should return false when the expire day is 10th, the current day is the 11th and the last payment was a month before', function() {
      var currentDate = new Date(2015, 7, 11);
      var lastPayment = new Date(2015, 6, 8);
      var expireDay = 10;

      var rentAlmostExpired = pagoHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeFalsy();
    });

    it('should return false when the expire day is 10th, the current day is the 2nd and the last payment was a month before', function() {
      var currentDate = new Date(2015, 7, 2);
      var lastPayment = new Date(2015, 6, 3);
      var expireDay = 10;

      var rentAlmostExpired = pagoHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeFalsy();
    });

    it('should return false when the expire day is 10th, the current day is the 8th and the last payment was the 4th of the current month', function() {
      var currentDate = new Date(2015, 7, 8);
      var lastPayment = new Date(2015, 7, 4);
      var expireDay = 10;

      var rentAlmostExpired = pagoHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeFalsy();
    });

    it('should return true when the expire day is 10th, the current day is the 8th and the last payment was done a month before of the current one', function() {
      var currentDate = new Date(2015, 7, 8);
      var lastPayment = new Date(2015, 6, 4);
      var expireDay = 10;

      var rentAlmostExpired = pagoHelper.alquilerAPuntoDeVencer(expireDay, lastPayment, currentDate);

      expect(rentAlmostExpired).toBeTruthy();
    });
  });



});
