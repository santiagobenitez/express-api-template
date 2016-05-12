/*jshint ignore: start */
var expect = require('chai').expect;
var repository = require('../../data/pago.repository');
var Promise = require('bluebird');
var paymentModel = require('../../data/schemas/pago.model');
var sinon = require('sinon');
var mongooseMockHelper = require('./mongoose-mock.helper');

var newpayment = {
  fecha: new Date(2015, 6, 18),
  realizadoPor: 'new tenant',
  importe: 1000
}

describe('pagoRepository', function() {
	afterEach(function(){
		if (paymentModel.create.restore) paymentModel.create.restore();
	});
	describe('create', function() {
    it('should return the recently created payment when there are not errors', function(done) {
      var paymentModelStub = sinon.stub(paymentModel, 'create');
			var paymentMock = mongooseMockHelper.getDocMock(newpayment); 
			paymentModelStub.returns(Promise.resolve(paymentMock));
			repository.create(newpayment).then(function(obj) {
        expect(obj).to.exist;
        done();
      })
    });

    it('should return an error object when there was an error while creating the payment ', function(done) {
      var paymentModelStub = sinon.stub(paymentModel, 'create');
			paymentModelStub.returns(Promise.reject(new Error('error')));
      
			repository.create(newpayment).catch(function(e) {
				expect(e).not.to.be.null;
        done();
      });
    });
  });

  describe('getAll', function() {
		afterEach(function(){
			if (paymentModel.find.restore) paymentModel.find.restore();
		});
    it('should return all of payments as part of the result when there are not errors', function(done) {
			var paymentModelStub = sinon.stub(paymentModel, 'find');
			var queryMock = mongooseMockHelper.getLeanQueryMock(Promise.resolve([{_id: '123'}]));
			paymentModelStub.returns(queryMock);
      
			repository.getAll().then(function(objs) {
        expect(objs).to.have.length.above(0);
        done();
      });
    });
  });

  describe('get', function() {
		afterEach(function(){
			if (paymentModel.findById.restore) paymentModel.findById.restore();
		});

    it('should return a payment when there are not erros', function(done) {
			var paymentDoc = mongooseMockHelper.getDocMock({_id: '123'});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(paymentDoc));
			var paymentStub = sinon.stub(paymentModel, 'findById');
			paymentStub.returns(queryMock);
      repository.get('123').then(function(obj) {
        expect(obj._id).to.eql('123');
        done();
      });
    });

    it('should return an error when there was an error while getting the payment', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('123')));
			var paymentStub = sinon.stub(paymentModel, 'findById');
			paymentStub.returns(queryMock);
      repository.get('123').catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });
		it('should return null when the id is valid but the object was not found', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var paymentStub = sinon.stub(paymentModel, 'findById');
			paymentStub.returns(queryMock);
      
			repository.get('123').then(function(obj) {
        expect(obj).to.be.null;
        done();
      });
    })
  
  });

  describe('update', function() {
		afterEach(function(){
			if (paymentModel.findById.restore) paymentModel.findById.restore();
		});
    it('should return the updated payment when the it was updated successfully', function(done) {
			var paymentDoc = mongooseMockHelper.getDocMock({importe: 2000});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(paymentDoc));
			var paymentStub = sinon.stub(paymentModel, 'findById');
			paymentStub.returns(queryMock);
			var paymentDocStub = sinon.stub(paymentDoc, "save");
			paymentDocStub.returns(Promise.resolve(paymentDoc));

      repository.update('123', newpayment).then(function(obj) {
        expect(obj.importe).to.eql(2000);
        done();
      });
    });

    it('should return an error when the id doest exist', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var paymentStub = sinon.stub(paymentModel, 'findById');
			paymentStub.returns(queryMock);
			repository.update('123', newpayment).catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });
  });

  describe('remove', function() {
		afterEach(function(){
			if (paymentModel.findByIdAndRemove.restore) paymentModel.findByIdAndRemove.restore();
		});
    it('should return an error when there was an error while removing the object', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var paymentStub = sinon.stub(paymentModel, 'findByIdAndRemove');
			paymentStub.returns(queryMock);
      repository.remove("123").catch(function(e) {
        expect(e).to.exist;
        done();
      });
    })

    it('should return a null error when a payment was removed successfuly', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var paymentStub = sinon.stub(paymentModel, 'findByIdAndRemove');
			paymentStub.returns(queryMock);
			repository.remove('123').then(function(e) {
        expect(e).not.to.exist;
        done();
      });
    });
  });
});
