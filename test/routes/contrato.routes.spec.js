// jshint ignore: start

var contratoService = require('../../services/contrato.service');
var contratoRoutes = require('../../routes/contratos/contrato.routes');
var sinon = require('sinon');
var expect = require('chai').expect;
var logger = require('../../helpers/logger');
var Promise = require('Bluebird');

describe('contratoRoutes', function() {
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
      if (contratoService.create.restore) {
        contratoService.create.restore();
      }
    });

    it('should call next with the error given by the contratoService when there is an error in the creation of a contract', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'create');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };
			stub.returns(Promise.reject(error));

      contratoRoutes.post(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call res with status 200 and the id provided when the contract was successfuly created', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'create');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.returns(jsonObj);
			stub.returns(Promise.resolve({_id: '123'}));
      var req = {};
      contratoRoutes.post(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql("123");
				done();
			});
    });

  });

  describe('getAll', function() {

    afterEach(function() {
      if (contratoService.getAll.restore) contratoService.getAll.restore();
    });

		it('should call next with the error given by the contratoService when there is an error in the getAll call', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'getAll');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };
			stub.returns(Promise.reject(error));

      contratoRoutes.getAll(req, null, nextSpy);
			setTimeout(function(){
      	expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call res with status 200 and the items provided when the contracts were returned successfuly', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'getAll');
      var jsonObj = {
        json: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var jsonSpy = sinon.spy(jsonObj, 'json');
      var statusStub = sinon.stub(resObj, 'status');

      var req = {};
      var items = [{
        _id: '123'
      }];
      
			statusStub.returns(jsonObj);
			stub.returns(Promise.resolve(items));
      contratoRoutes.getAll(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0].items).to.eql(items);
				done();
			});
		});

  });

  describe('get', function() {
    afterEach(function() {
      if (contratoService.get.restore) contratoService.get.restore();
    });

		it('should call next with the error given by the contratoService when there is an error in the get call', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'get');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };
			stub.returns(Promise.reject(error));
      contratoRoutes.get(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call next with the error of not found 404 when the object return by the contratoService is null', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'get');
      var nextSpy = sinon.spy();
      var req = {
        params: {
          id: '123'
        }
      };
			stub.returns(Promise.resolve(null));
			contratoRoutes.get(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.getCall(0).args[0].status).to.eql(404);
				done();
			});
		});

    it('should call res with status 200 and the contract when the contract was returned successfuly', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'get');
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
        }
      }
			var item = {
        _id: '123'
      };
		  stub.returns(Promise.resolve(item));
			contratoRoutes.get(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
				done();
			});
		});

  });

  describe('remove', function() {

    afterEach(function() {
      if (contratoService.remove.restore) contratoService.remove.restore();
    });

		it('should call next with the error given by the contratoService when there is an error in the remove call', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'remove');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };
			stub.returns(Promise.reject(error));

      contratoRoutes.remove(req, null, nextSpy);

			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

    it('should call res with status 200 when the contract was removed successfuly', function(done) {

      var _cb;
      var stub = sinon.stub(contratoService, 'remove');
      var endfn = {
        end: function() {}
      }
      var resObj = {
        status: function() {}
      }
      var endSpy = sinon.spy(endfn, 'end');
      var statusStub = sinon.stub(resObj, 'status');

      statusStub.returns(endfn);
      var req = {
        params: {
          id: '123'
        }
      };
			stub.returns(Promise.resolve());
			contratoRoutes.remove(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(endSpy.calledOnce).to.be.true;
				done();
			});
		});
  });
  describe('update', function() {
    afterEach(function() {
      if (contratoService.update.restore) contratoService.update.restore();
    });

		it('should call next with the error given by the contratoService when there is an error in the update call', function(done) {
      var _cb;
      var stub = sinon.stub(contratoService, 'update');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        },
        body: {
          nombre:'santiago'
        }
      };
			stub.returns(Promise.reject(error));
			contratoRoutes.update(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

    it('should call res with status 200 and the contract when the contrato was updated successfuly', function(done) {

      var _cb;
      var stub = sinon.stub(contratoService, 'update');
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
        },
        body: {
          nombre:'santiago'
        }
      };
      var item = {
        _id: '123'
      };
			stub.returns(Promise.resolve(item));
			contratoRoutes.update(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
				done();
			});
		});
  });
});
