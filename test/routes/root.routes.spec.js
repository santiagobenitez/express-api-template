// jshint ignore: start
var userService = require('../../services/user.service');
var rootRoutes = require('../../routes/root/root.routes');
var logger = require('../../helpers/logger');
var tokenHelper = require('../../helpers/token.helper');
var Promise = require('bluebird');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('rootRoutes', function() {
  before(function() {
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
  });

  after(function() {
    logger.error.restore();
    logger.info.restore();
  });

  describe('authenticate', function() {

    afterEach(function() {
      if (userService.getByCredentials.restore) userService.getByCredentials.restore();
      if (tokenHelper.verify.restore) tokenHelper.verify.restore();
    });

    it('should call next with the error when the grant_type is null/undefined', function(done) {

      var _cb;
      var nextSpy = sinon.spy();

      var req = {
        body: {
          username: 'santiago',
          password: 'password'
        }
      };

      var result = rootRoutes.authenticate(req, null, nextSpy);

			result.then(function(){
				expect(nextSpy.calledOnce).to.be.true;
				done();
			});
    });

    it('should call next with the error when the grant_type is refresh_token but the refresh token is not present in the request', function(done) {

      var _cb;
      var nextSpy = sinon.spy();

      var req = {
        body: {
          grant_type: 'refresh_token'
        }
      };

			var result = rootRoutes.authenticate(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.calledOnce).to.be.true;
				done();
			});
		});

    it('should call next with the error when the grant_type is not password nor refresh_token', function(done) {
      var _cb;
      var nextSpy = sinon.spy();

      var req = {
        body: {
          grant_type: 'false_grant'
        }
      };

			var result = rootRoutes.authenticate(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.calledOnce).to.be.true;
				done();
			});
		});

		it('should call next with the error given by the userService when there is an error in the get call', function(done) {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {
          username: 'test',
          password: 'password',
          grant_type: 'password'
        }
      };
			
			stub.returns(Promise.reject(error));
			var result = rootRoutes.authenticate(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.withArgs(error).calledOnce).to.be.true;
				done();
			});
    });

    it('should call next with the error of not found 400 when the object return by the userService is null', function(done) {
      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
      var nextSpy = sinon.spy();

      var req = {
        body: {
          username: 'test',
          password: 'password',
          grant_type: 'password'
        }
      };
			stub.returns(Promise.resolve(null));
      var result = rootRoutes.authenticate(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.getCall(0).args[0].status).to.eql(400);
				done();
			});
    });

    it('should return a json with an access_token in the body when the user was returned successfuly', function(done) {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
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
        body: {
          username: 'test',
          password: 'password',
          grant_type: 'password'
        }
      };
			stub.returns(Promise.resolve({
        _id: '123',
        username: 'test'
			}));
			var result = rootRoutes.authenticate(req, resObj, null);
			result.then(function(){
				expect(jsonSpy.getCall(0).args[0].access_token).to.not.be.empty;
				done();
			});
		});

    it('should return a json with an refresh_token in the body when the user was returned successfuly', function(done) {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
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
        body: {
          username: 'test',
          password: 'password',
          grant_type: 'password'
        }
      };
			stub.returns(Promise.resolve({
        _id: '123',
        username: 'test'
      }));
      var result = rootRoutes.authenticate(req, resObj, null);
			result.then(function(){
				expect(jsonSpy.getCall(0).args[0].refresh_token).to.not.be.empty;
				done();
			});
    });

    it('should return a json with with the scopes of the user in the body when the user was returned successfuly', function(done) {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
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
        body: {
          username: 'test',
          password: 'password',
          grant_type: 'password'
        }
      };

			stub.returns(Promise.resolve({
        _id: '123',
        username: 'santiago'
      }));

			var result = rootRoutes.authenticate(req, resObj, null);
			result.then(function(){
				expect(jsonSpy.getCall(0).args[0].scopes).to.not.be.empty;
				done();
			});
    });

    it('should call next with an error of invalid_token when tokenHelper fails to verify the token', function(done) {

      var tokenHelperStub = sinon.stub(tokenHelper, 'verify');

      var req = {
        body: {
          grant_type: 'refresh_token',
          refresh_token: 'faketoken'
        }
      };

      var nextSpy = sinon.spy();
			tokenHelperStub.returns(Promise.reject(new Error('error while decoding')));
      var result = rootRoutes.authenticate(req, null, nextSpy);
			result.then(function(){
				expect(nextSpy.getCall(0).args[0].message).to.not.be.empty;
				done();
			});
		});

    it('should return a json with an access_token in the body when the token was refreshed successfuly', function(done) {

      var _cb;

      var tokenHelperStub = sinon.stub(tokenHelper, 'verify');

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
        body: {
          refresh_token: 'fake token',
          grant_type: 'refresh_token'
        }
      };
			tokenHelperStub.returns(Promise.resolve({username: 'test'}));

			var result = rootRoutes.authenticate(req, resObj, null);
			result.then(function(){
				expect(jsonSpy.getCall(0).args[0].access_token).to.not.be.empty;
				done();
			});
    });

  });
});
