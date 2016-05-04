// jshint ignore: start

var propiedadesService = require('../../services/propiedades.service');
var propiedadesRoutes = require('../../routes/propiedades/propiedades.routes');
var sinon = require('sinon');
var expect = require('chai').expect;
var logger = require('../../helpers/logger');
var Promise = require('bluebird');

describe('propiedadesRoutes', function() {
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
			if (propiedadesService.create.restore) {
				propiedadesService.create.restore();
			}
		});

		it('should call next with the error given by the propiedadesService when there is an error in the creation of a propiedad', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'create');
			var nextSpy = sinon.spy();

			var error = new Error('test error');
			var req = {
				body: {}
			};
			var rejectedPromise = Promise.reject(error);
			stub.returns(rejectedPromise);
			var result = propiedadesRoutes.post(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

		it('should call res with status 200 and the id provided when the propiedad was successfuly created', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'create');
			var jsonObj = {
				json: function() {}
			}
			var resObj = {
				status: function() {}
			}
			var jsonSpy = sinon.spy(jsonObj, 'json');
			var statusStub = sinon.stub(resObj, 'status');

			statusStub.onFirstCall().returns(jsonObj);
			var req = {};
			stub.returns(Promise.resolve({_id: '123'}));
			var result = propiedadesRoutes.post(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql("123");
				done();
			});
		});

	});

	describe('getAll', function() {

		afterEach(function() {
			if (propiedadesService.getAll.restore) propiedadesService.getAll.restore();
		});

		it('should call next with the error given by the propiedadesService when there is an error in the getAll call', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'getAll');
			var nextSpy = sinon.spy();

			var error = new Error('test error');
			var req = {
				body: {}
			};

			stub.returns(Promise.reject(error));
			var result = propiedadesRoutes.getAll(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

		it('should call res with status 200 and the items provided when the propidades were returned successfuly', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'getAll');
			var jsonObj = {
				json: function() {}
			}
			var resObj = {
				status: function() {}
			}
			var jsonSpy = sinon.spy(jsonObj, 'json');
			var statusStub = sinon.stub(resObj, 'status');

			statusStub.onFirstCall().returns(jsonObj);
			var req = {};
			var items = [{_id: '123'}];
			stub.returns(Promise.resolve(items));
			var result = propiedadesRoutes.getAll(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0].items).to.eql(items);
				done();
			});
		});
	});

	describe('get', function() {

		afterEach(function() {
			if (propiedadesService.get.restore) propiedadesService.get.restore();
		});

		it('should call next with the error given by the propiedadesService when there is an error in the get call', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'get');
			var nextSpy = sinon.spy();

			var error = new Error('test error');
			var req = {
				params: {
					id: '123'
				}
			};
			stub.returns(Promise.reject(error));
			var result = propiedadesRoutes.get(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

		it('should call next with the error of not found 404 when the object return by the propiedadService is null', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'get');
			var nextSpy = sinon.spy();

			var req = {
				params: {
					id: '123'
				}
			};
			stub.returns(Promise.resolve(null));
			var result = propiedadesRoutes.get(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.getCall(0).args[0].status).to.eql(404);
				done();
			});
		});

		it('should call res with status 200 and the propiedad when the real estate was returned successfuly', function(done) {

			var _cb;
			var stub = sinon.stub(propiedadesService, 'get');
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
			var item = {_id: '123'};
			stub.returns(Promise.resolve(item));
			var result = propiedadesRoutes.get(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
				done();
			});
		});
	});

	describe('remove', function() {

		afterEach(function() {
			if (propiedadesService.remove.restore) propiedadesService.remove.restore();
		});

		it('should call next with the error given by the propiedadesService when there is an error in the remove call', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'remove');
			var nextSpy = sinon.spy();

			var error = new Error('test error');
			var req = {
				params: {
					id: '123'
				}
			};
			stub.returns(Promise.reject(error));

			var result = propiedadesRoutes.remove(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

		it('should call res with status 200 when the real estate was removed successfuly', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'remove');
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
			var result = propiedadesRoutes.remove(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(endSpy.calledOnce).to.be.true;
				done();
			});
		});
	});

	describe('update', function() {

		afterEach(function() {
			if (propiedadesService.update.restore) propiedadesService.update.restore();
		});

		it('should call next with the error given by the propiedadesService when there is an error in the update call', function(done) {
			var _cb;
			var stub = sinon.stub(propiedadesService, 'update');
			var nextSpy = sinon.spy();

			var error = new Error('test error');
			var req = {
				params: {
					id: '123'
				},
				body: {
					ambientes: 1
				}
			};
			stub.returns(Promise.reject(error));

			var result = propiedadesRoutes.update(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

		it('should call res with status 200 and the propiedad when the real estate was updated successfuly', function(done) {

			var _cb;
			var stub = sinon.stub(propiedadesService, 'update');
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
					ambientes: 1
				}
			};
			var item = {
				_id: '123'
			};
			stub.returns(Promise.resolve(item));
			var result = propiedadesRoutes.update(req, resObj, null);
			result.then(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
				done();
			});
		});
	});
});
