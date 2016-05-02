// jshint ignore: start

var pagoService = require('../../services/pago.service');
var pagoRoutes = require('../../routes/pagos/pago.routes');
var sinon = require('sinon');
var expect = require('chai').expect;
var logger = require('../../helpers/logger');
var Promise = require('bluebird');

describe('pagoRoutes', function() {
 before(function() {
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
  });

  after(function() {
    logger.error.restore();
    logger.info.restore();
  });

  describe('post', function() {

    afterEach(function() {
      if (pagoService.create.restore) {
        pagoService.create.restore();
      }
    });

		it('should call next with the error given by the pagoService when there is an error in the creation of a payment', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'create');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };
			stub.returns(Promise.reject(error));

			var result = pagoRoutes.post(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call res with status 200 and the id provided when the pago was successfuly created', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'create');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.returns(jsonObj);
      var req = {};
			stub.returns(Promise.resolve({_id: '123'}))
			var result = pagoRoutes.post(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql("123");
				done();
			});
    });
  });

  describe('getAll', function() {

    afterEach(function() {
      if (pagoService.getAll.restore) pagoService.getAll.restore();
    });

		it('should call next with the error given by the pagoService when there is an error in the getAll call', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'getAll');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };
			stub.returns(Promise.reject(error));

      var result = pagoRoutes.getAll(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call res with status 200 and the items provided when the payments were returned successfuly', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'getAll');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.returns(jsonObj);
      var req = {
        params: {
          contratoid: '1'
        }
      };
      var items = [{
        _id: '123',
        contrato: '1'
      }];
			stub.returns(Promise.resolve(items));
      var result = pagoRoutes.getAll(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0].items).to.eql(items);
				done();
			});
    });
    
		it('should only returns the payments associated with the contrato that is part of the request', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'getAll');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.onFirstCall().returns(jsonObj);
      var req = {
        params: {
          contratoid: '1'
        }
      };
      var items = [{
        _id: '123',
        contrato: '2'
      }, {
        _id: '124',
        contrato: '1'
      }];
			stub.returns(Promise.resolve(items));
			var result = pagoRoutes.getAll(req, resObj, null);
			result.then(function(){
				expect(jsonSpy.getCall(0).args[0].items.length).to.eql(1);
				expect(jsonSpy.getCall(0).args[0].items[0]._id).to.eql('124');
				done();
			});
		});
	});

  describe('get', function() {
    afterEach(function() {
      if (pagoService.get.restore) pagoService.get.restore();
    });

		it('should call next with the error given by the pagoService when there is an error in the get call', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'get');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };
			
			stub.returns(Promise.reject(error));
      var result = pagoRoutes.get(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call next with the error of not found 404 when the object return by the pagoService is null', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'get');
      var nextSpy = sinon.spy();

      var req = {
        params: {
          id: '123'
        }
      };

			stub.returns(Promise.resolve(null));
			var result = pagoRoutes.get(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.getCall(0).args[0].status).to.eql(404);
				done();
			});
		});

    it('should call res with status 200 and the payment  when the pago was returned successfuly', function(done) {

      var _cb;
      var stub = sinon.stub(pagoService, 'get');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.returns(jsonObj);
      var req = {
        params: {
          id: '123'
        }
      };
      var item = {
        _id: '123'
      };
			stub.returns(Promise.resolve(item));
      var result = pagoRoutes.get(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
				done();
			});
		});
  });

  describe('remove', function() {
    afterEach(function() {
      if (pagoService.remove.restore) pagoService.remove.restore();
    });

		it('should call next with the error given by the pagoService when there is an error in the remove call', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'remove');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };
			stub.returns(Promise.reject(error));
			var result = pagoRoutes.remove(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call res with status 200 when the pago was removed successfuly', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'remove');
      var endfn = {
        end: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var endSpy = sinon.spy(endfn, 'end');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.onFirstCall().returns(endfn);
      var req = {
        params: {
          id: '123'
        }
      };
			stub.returns(Promise.resolve());
      var result = pagoRoutes.remove(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(endSpy.calledOnce).to.be.true;
				done();
			});
    });

  });
  describe('update', function() {
    afterEach(function() {
      if (pagoService.update.restore) pagoService.update.restore();
    });
		it('should call next with the error given by the pagoService when there is an error in the update call', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'update');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        },
        body: {
          importe: 123
        }
			};

			stub.returns(Promise.reject(error));
			var result = pagoRoutes.update(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			}); 
		});

    it('should call res with status 200 and the pago when the pago was updated successfuly', function(done) {
      var _cb;
      var stub = sinon.stub(pagoService, 'update');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.onFirstCall().returns(jsonObj);
      var req = {
        params: {
          id: '123'
        },
        body: {
          importe: 123
        }
      };
      var item = {
        _id: '123'
      };
			stub.returns(Promise.resolve(item));
      var result = pagoRoutes.update(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
				done();
			});
		});
  });
});
