var logger = require('../../helpers/logger');

var sinon = require('sinon');
var expect = require('chai').expect;

var bearerToken = require('../../middlewares/bearer-token.middleware');
var tokenHelper = require('../../helpers/token.helper');

describe('bearerToken', function() {

  afterEach(function() {
    if (tokenHelper.verify.restore) tokenHelper.verify.restore();
  });

  it('should call next with an error when authorization header is not present', function() {
    var req = {
      headers: {

      }
    }

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    expect(nextSpy.calledOnce).to.be.true;
  });

  it('should call next with an error of status 403 when authorization header is not present', function() {
    var req = {
      headers: {

      }
    }

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    expect(nextSpy.getCall(0).args[0].status).to.eql(403);
  });

  it('should call next with an error of status 403 when authorization header is present but the schema is not Bearer', function() {
    var req = {
      headers: {
        authorization: 'falsetoken'
      }
    }

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    expect(nextSpy.getCall(0).args[0].status).to.eql(403);
  });

  it('should call next with an error of status 400 when authorization header is present but the schema is not Bearer', function() {
    var req = {
      headers: {
        authorization: 'falsetoken'
      }
    }

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    expect(nextSpy.getCall(0).args[0].status).to.eql(403);
  });

  it('should call next with an error of invalid_token when tokenHelper fails to verify the token', function() {

    var jwtStub = sinon.stub(tokenHelper, 'verify');

    var req = {
      headers: {
        authorization: 'Bearer asdb1231asd21'
      }
    };

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    jwtStub.getCall(0).args[1](new Error('error while decoding'), null);

    expect(nextSpy.getCall(0).args[0]).to.not.be.empty;
  });

  it('should call next with empty args when tokenHelper verfied succesfully the token', function() {

    var jwtStub = sinon.stub(tokenHelper, 'verify');

    var req = {
      headers: {
        authorization: 'Bearer asdb1231asd21'
      }
    };

    var nextSpy = sinon.spy();

    bearerToken()(req, null, nextSpy);

    jwtStub.getCall(0).args[1](null, {});

    expect(nextSpy.getCall(0).args.length).to.eql(0);
  });

  it('should add to the req object a user object with the decoded token when tokenHelper verfied succesfully the token', function() {

    var jwtStub = sinon.stub(tokenHelper, 'verify');

    var req = {
      headers: {
        authorization: 'Bearer asdb1231asd21'
      }
    };

    bearerToken()(req, null, function() {});

    jwtStub.getCall(0).args[1](null, {userName: 'test'});

    expect(req.user.userName).to.eql('test');
  });

});
