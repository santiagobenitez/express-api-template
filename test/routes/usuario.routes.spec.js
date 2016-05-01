// jshint ignore: start

var userService = require('../../services/user.service');
var userRoutes = require('../../routes/usuarios/usuario.routes');
var logger = require('../../helpers/logger');
var sinon = require('sinon');
var expect = require('chai').expect;
var Promise = require('bluebird');

describe('userRoutes', function() {

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
      if (userService.create.restore) {
        userService.create.restore();
      }
    });

    it('should call next with the error given by the userService when there is an error in the creation of a user', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'create');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };
			stub.returns(Promise.reject(error));

			userRoutes.post(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call res with status 200 and the id provided when the user was successfuly created', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'create');
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
      userRoutes.post(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql("123");
				done();
			});
    });
  });

  describe('getAll', function() {

    afterEach(function() {
      if (userService.getAll.restore) userService.getAll.restore();
    });

    it('should call next with the error given by the userService when there is an error in the getAll call', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'getAll');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {}
      };
			stub.returns(Promise.reject(error));

      userRoutes.getAll(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

    it('should call res with status 200 and the items provided when the users were returned successfuly', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'getAll');
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
      var items = [{
        _id: '123'
      }];
			stub.returns(Promise.resolve(items));
      userRoutes.getAll(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0].items).to.eql(items);
				done();
			});
		});
  });
  describe('get', function() {
    afterEach(function() {
      if (userService.get.restore) userService.get.restore();
    });

		it('should call next with the error given by the userService when there is an error in the get call', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'get');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
			};
			stub.returns(Promise.reject(error));

			userRoutes.get(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

    it('should call next with the error of not found 404 when the object return by the userService is null', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'get');
      var nextSpy = sinon.spy();

      var req = {
        params: {
          id: '123'
        }
      };
			stub.returns(Promise.resolve(null));

      userRoutes.get(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.getCall(0).args[0].status).to.eql(404);
				done();
			});
    });

    it('should call res with status 200 and the user when the user was returned successfuly', function(done) {

      var _cb;
      var stub = sinon.stub(userService, 'get');
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
			stub.returns(Promise.resolve({_id: '123'}));
			userRoutes.get(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql('123');
				done();
			});
		});

  });

  describe('remove', function() {

    afterEach(function() {
      if (userService.remove.restore) userService.remove.restore();
    });

		it('should call next with the error given by the userService when there is an error in the remove call', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'remove');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        }
      };
			
			stub.returns(Promise.reject(error));
			userRoutes.remove(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

    it('should call res with status 200 when the user was removed successfuly', function(done) {

      var _cb;
      var stub = sinon.stub(userService, 'remove');
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
      userRoutes.remove(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(endSpy.calledOnce).to.be.true;
				done();
			});
		});
  });
  
	describe('update', function() {

    afterEach(function() {
      if (userService.update.restore) userService.update.restore();
    });

		it('should call next with the error given by the userService when there is an error in the update call', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'update');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        params: {
          id: '123'
        },
        body: {
          nombre: 'test'
        }
      };
			stub.returns(Promise.reject(error));
			userRoutes.update(req, null, nextSpy);
			setTimeout(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
		});

    it('should call res with status 200 and the user when the user was updated successfuly', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'update');
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
          nombre: 'test'
        }
      };
      var item = {
        _id: '123'
      };
			stub.returns(Promise.resolve(item));
      userRoutes.update(req, resObj, null);
			setTimeout(function(){
				expect(resObj.status.getCall(0).args[0]).to.eql(200);
				expect(jsonSpy.getCall(0).args[0]._id).to.eql(item._id);
				done();
			});
		});
  });
});
