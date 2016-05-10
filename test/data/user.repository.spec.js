/*jshint ignore: start */
var expect = require('chai').expect;
var userRepository = require('../../data/user.repository');
var userModel = require('../../data/schemas/user.model');
var Promise = require('bluebird');
var sinon = require('sinon');
var mongooseMockHelper = require('./mongoose-mock.helper');

var newUser = {
  userName: 'test',
  password: 'test2',
  passwordHash: 'asdasdasdasdasd',
  activo: true
};

describe('userRepository', function() {

  describe('create', function() {
		afterEach(function(){
			if (userModel.create.restore) userModel.create.restore();
		});
    it('should return a fulfilled promise with the created user when a user is created sucessfully', function(done) {
			var userModelStub = sinon.stub(userModel, 'create');
			var user = mongooseMockHelper.getDocMock(newUser); 
			userModelStub.returns(Promise.resolve(user));

			userRepository.create(newUser).then(function(obj) {
				expect(obj).to.exist;
				done();
			})
    });

    it('should return a rejected promise with an error object when there is an error while creating the user', function(done) {
			var userModelStub = sinon.stub(userModel, 'create');
			var error = new Error('error while creating the user');
			userModelStub.returns(Promise.reject(error));

      userRepository.create(newUser).catch(function(e) {
        expect(e).not.to.be.null;
        done();
      });
    });
  });

  describe('getAll', function() {
		afterEach(function(){
			if (userModel.find.restore) userModel.find.restore();
		});
    it('should return a fulfilled promise with all of the users created when there are no errors', function(done) {
			var modelStub = sinon.stub(userModel, 'find');
			var queryMock = {
				lean: function(){
					return mongooseMockHelper.getQueryMock(Promise.resolve([{_id: '123'}]));				
				}
			};
			
			modelStub.returns(queryMock);
      userRepository.getAll().then(function(objs) {
        expect(objs[0]._id).to.eql('123');
        done();
      });
    });
  });

  describe('get', function() {
		afterEach(function(){
			if (userModel.findById.restore) userModel.findById.restore();
		});

		it('should return a fulfilled promise with the user as part of the result', function(done) {
			var userDoc = mongooseMockHelper.getDocMock({_id: '123'});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(userDoc));
			var userStub = sinon.stub(userModel, 'findById');
			userStub.returns(queryMock);
			userRepository.get(newUser._id).then(function(obj) {
        expect(obj._id).to.eql('123');
        done();
      });
    });

    it('should return a rejected promise with an error when there was an error while getting the user', function(done) {
			var error = new Error('unexpected error');
			var userStub = sinon.stub(userModel, 'findById');
      var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(error));
			userStub.returns(queryMock);

      userRepository.get("bad id").catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });

    it('should return a fulfilled promise with null when the the user was not found', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var userStub = sinon.stub(userModel, 'findById');
			userStub.returns(queryMock);
      userRepository.get('556c217f3bb8bc6017a8f2e5').then(function(obj) {
        expect(obj).to.be.null;
        done();
      });
    });
  });

  describe('getByUserName', function() {
		afterEach(function(){
			if (userModel.findOne.restore) userModel.findOne.restore();
		})
    it('should return a user object when it is found successfully', function(done) {
			var userDoc = mongooseMockHelper.getDocMock({_id: '123'});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(userDoc));
			var userStub = sinon.stub(userModel, 'findOne');
			userStub.returns(queryMock);

      userRepository.getByUserName(newUser.userName).then(function(obj) {
        expect(obj._id).to.eql('123');
        done();
      });
    });

    it('should return null when the there is not a user with such a userName', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var userStub = sinon.stub(userModel, 'findOne');
			userStub.returns(queryMock);
      
			userRepository.getByUserName('test123').then(function(obj) {
        expect(obj).to.be.null;
        done();
      });
    });
  });

  describe('update', function() {
    afterEach(function(){
			if (userModel.findById.restore) userModel.findById.restore();
		});
		it('should return an updated user when the user is updated successfully', function(done) {
			var userDoc = mongooseMockHelper.getDocMock({passwordHash: 'testEdit'});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(userDoc));
			var userStub = sinon.stub(userModel, 'findById');
			userStub.returns(queryMock);
			var userDocStub = sinon.stub(userDoc, "save");
			userDocStub.returns(Promise.resolve(userDoc));
      
			userRepository.update(newUser._id, newUser).then(function(obj) {
        newUser = obj;
        expect(newUser.passwordHash).to.eql('testEdit');
        done();
      });
    });

    it('should return an error when there was an error while updating the user', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var userStub = sinon.stub(userModel, 'findById');
			userStub.returns(queryMock);

			userRepository.update(newUser._id + 'a', newUser).catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });
  });


  describe('remove', function() {
		afterEach(function(){
			if (userModel.findByIdAndRemove.restore) userModel.findByIdAndRemove.restore();
		});
    it('should return an error when the object was not removed', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var userStub = sinon.stub(userModel, 'findByIdAndRemove');
			userStub.returns(queryMock);

			userRepository.remove(newUser._id + "a").catch(function(e) {
        expect(e).to.exist;
        done();
      });
    })

    it('should return a null error when the recently created user was removed successfuly', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve());
			var userStub = sinon.stub(userModel, 'findByIdAndRemove');
			userStub.returns(queryMock);

			userRepository.remove('123').then(function(e) {
        expect(e).not.to.exist;
        done();
      });
    });
  });
});
