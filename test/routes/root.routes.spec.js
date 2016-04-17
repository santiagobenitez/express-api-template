var userService = require('../../services/user.service');
var rootRoutes = require('../../routes/root/root.routes');
var logger = require('../../helpers/logger');
var tokenHelper = require('../../helpers/token.helper');


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

    it('should call next with the error when the grant_type is null/undefined', function() {

      var _cb;
      var nextSpy = sinon.spy();

      var req = {
        body: {
          username: 'santiago',
          password: 'password'
        }
      };

      rootRoutes.authenticate(req, null, nextSpy);

      expect(nextSpy.calledOnce).to.be.true;
    });

    it('should call next with the error when the grant_type is refresh_token but the refresh token is not present in the request', function() {

      var _cb;
      var nextSpy = sinon.spy();

      var req = {
        body: {
          grant_type: 'refresh_token'
        }
      };

      rootRoutes.authenticate(req, null, nextSpy);

      expect(nextSpy.calledOnce).to.be.true;
    });

    it('should call next with the error when the grant_type is not password nor refresh_token', function() {

      var _cb;
      var nextSpy = sinon.spy();

      var req = {
        body: {
          grant_type: 'false_grant'
        }
      };

      rootRoutes.authenticate(req, null, nextSpy);

      expect(nextSpy.calledOnce).to.be.true;
    });

    it('should call userService to get the user with the username specified in the params', function() {
      var mock = sinon.mock(userService);
      var req = {
        body: {
          username: 'santiago',
          password: 'password',
          grant_type: 'password'
        }
      };

      mock.expects('getByCredentials').exactly(1).withArgs(req.body.username, req.body.password);

      rootRoutes.authenticate(req, null, null);
      mock.verify();
    });

    it('should call next with the error given by the userService when there is an error in the get call', function() {

      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
      var nextSpy = sinon.spy();

      var error = new Error('test error');
      var req = {
        body: {
          username: 'santiago',
          password: 'password',
          grant_type: 'password'
        }
      };

      rootRoutes.authenticate(req, null, nextSpy);
      stub.getCall(0).args[2](error, null);

      expect(nextSpy.withArgs(error).calledOnce).to.be.true;
    });

    it('should call next with the error of not found 400 when the object return by the userService is null', function() {
      var _cb;
      var stub = sinon.stub(userService, 'getByCredentials');
      var nextSpy = sinon.spy();

      var req = {
        body: {
          username: 'santiago',
          password: 'password',
          grant_type: 'password'
        }
      };

      rootRoutes.authenticate(req, null, nextSpy);
      _cb = stub.getCall(0).args[2](null, null);

      expect(nextSpy.getCall(0).args[0].status).to.eql(400);
    });

    it('should return a json with an access_token in the body when the user was returned successfuly', function() {

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
          username: 'santiago',
          password: 'password',
          grant_type: 'password'
        }
      };

      rootRoutes.authenticate(req, resObj, null);
      _cb = stub.getCall(0).args[2](null, {
        _id: '123',
        username: 'santiago'
      });

      expect(jsonSpy.getCall(0).args[0].access_token).to.not.be.empty;
    });

    it('should return a json with an refresh_token in the body when the user was returned successfuly', function() {

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
          username: 'santiago',
          password: 'password',
          grant_type: 'password'
        }
      };

      rootRoutes.authenticate(req, resObj, null);
      _cb = stub.getCall(0).args[2](null, {
        _id: '123',
        username: 'santiago'
      });

      expect(jsonSpy.getCall(0).args[0].refresh_token).to.not.be.empty;
    });

    it('should return a json with with the scopes of the user in the body when the user was returned successfuly', function() {

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
          username: 'santiago',
          password: 'password',
          grant_type: 'password'
        }
      };

      rootRoutes.authenticate(req, resObj, null);
      _cb = stub.getCall(0).args[2](null, {
        _id: '123',
        username: 'santiago'
      });

      expect(jsonSpy.getCall(0).args[0].scopes).to.not.be.empty;
    });

    it('should call next with an error of invalid_token when tokenHelper fails to verify the token', function() {

      var tokenHelperStub = sinon.stub(tokenHelper, 'verify');

      var req = {
        body: {
          grant_type: 'refresh_token',
          refresh_token: 'faketoken'
        }
      };

      var nextSpy = sinon.spy();

      rootRoutes.authenticate(req, null, nextSpy);

      tokenHelperStub.getCall(0).args[1](new Error('error while decoding'), null);

      expect(nextSpy.getCall(0).args[0]).to.not.be.empty;
    });

    it('should return a json with an access_token in the body when the token was refreshed successfuly', function() {

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

      statusStub.onFirstCall().returns(jsonObj);

      var req = {
        body: {
          refresh_token: 'fake token',
          grant_type: 'refresh_token'
        }
      };

      rootRoutes.authenticate(req, resObj, null);

      tokenHelperStub.getCall(0).args[1](null, {username: 'test'});

      expect(jsonSpy.getCall(0).args[0].access_token).to.not.be.empty;
    });

  });
});
