// jshint ignore: start

var userRepository = require('../../data/user.repository');
var userService = require('../../services/user.service');
var bcrypt = require('bcryptjs');
var expect = require('chai').expect;
var sinon = require('sinon');
var Promise = require('bluebird');

describe('userService', function() {

	describe('create', function() {

		afterEach(function() {
			if (bcrypt.hash.restore) bcrypt.hash.restore();
			if (userRepository.create.restore) userRepository.create.restore();
		});

		it('should call bscrypt with the users password when it is called', function() {
			var user = {
				userName: 'testname',
				password: 'test'
			};

			var bcryptMock = sinon.mock(bcrypt);

			bcryptMock.expects('hash').withArgs('test').exactly(1);

			userService.create(user);

			bcryptMock.verify();
		});

		it('should return a rejected promise with an error when there was an error while encrypting the password', function(done) {
			var user = {
				userName: 'testname',
				password: 'test'
			};

			var error = 'unexpected error';

			var bcryptStub = sinon.stub(bcrypt, 'hash');

			var promise = userService.create(user);
			bcryptStub.getCall(0).args[2]('unexpected error', null);
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
		});

		it('should return a rejected promise with an error when there was an while creating the user', function(done) {
			var user = {
				userName: 'testname',
				password: 'test'
			};

			var error = 'unexpected error';

			var bcryptStub = sinon.stub(bcrypt, 'hash');
			var userRepoStub = sinon.stub(userRepository, 'create');
			userRepoStub.returns(Promise.reject('unexpected error'));

			var promise = userService.create(user)

			bcryptStub.getCall(0).args[2](null, 'test');
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
		});

		it('should return a fulfilled promise with the created user when the user was created successfully', function(done) {
			var user = {
				userName: 'testname',
				password: 'test'
			};
			var bcryptStub = sinon.stub(bcrypt, 'hash');
			var userRepoStub = sinon.stub(userRepository, 'create');
			userRepoStub.returns(Promise.resolve({
				_id: 1
			}));

			var promise = userService.create(user);
			bcryptStub.getCall(0).args[2](null, 'test');
			promise.then(function(newuser){
				expect(1).to.eql(newuser._id);
				done();
			});
		});
	});

	describe('getAll', function() {
		afterEach(function() {
			if (userRepository.getAll.restore) userRepository.getAll.restore();
		});

		it('should call getAll of the userRepository when it is called ', function() {

			var mock = sinon.mock(userRepository);
			mock.expects('getAll').exactly(1);

			userService.getAll();

			mock.verify();
		});

		it('should return a rejected a promise with an error when getAll returns an error', function(done) {

			var stub = sinon.stub(userRepository, 'getAll');
			var error = new Error('unexpected error');
			var inputCallbackSpy = sinon.spy();
			stub.returns(Promise.reject(error));

			var promise = userService.getAll(inputCallbackSpy);
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
		});

		it('should restun a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
			var stub = sinon.stub(userRepository, 'getAll');
			var objs = [{
				_id: '123'
			}];

			stub.returns(Promise.resolve(objs));
			var promise = userService.getAll();
			promise.then(function(o){
				expect(o).to.eql(objs);
				done();
			});
		});
	});

	describe('get', function() {
		afterEach(function() {
			if (userRepository.get.restore) userRepository.get.restore();
		});

		it('should call get of the userRepository', function() {
			var id = 1;
			var mock = sinon.mock(userRepository);
			mock.expects('get').exactly(1).withArgs(id);

			userService.get(id);

			mock.verify();
		});

		it('should return a rejected promise with an error when get returns an error', function(done) {
			var id = 1;

			var stub = sinon.stub(userRepository, 'get');
			var error = new Error('unexpected error');
			stub.returns(Promise.reject(error));

			var promise = userService.get(id);
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
		});

		it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
			var id = 1;

			var stub = sinon.stub(userRepository, 'get');
			var obj = {
				_id: '123'
			};
			stub.returns(Promise.resolve(obj));

			var promise = userService.get(id);
			promise.then(function(o){
				expect(o).to.eql(obj);
				done();
			});
		});
	});

	describe('remove', function() {
		afterEach(function() {
			if (userRepository.remove.restore) userRepository.remove.restore();
		});

		it('should call remove of the userRepository', function() {
			var id = 1;
			var mock = sinon.mock(userRepository);
			mock.expects('remove').exactly(1).withArgs(id);

			userService.remove(id);

			mock.verify();
		});

		it('should return a rejected promise with an error when remove returns an error', function(done) {
			var id = 1;

			var stub = sinon.stub(userRepository, 'remove');
			var error = new Error('unexpected error');
			stub.returns(Promise.reject(error));

			var promise = userService.remove(id);
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
		});

		it('should return a fulfilled promise with a null error when there are no errors while removing the user', function(done) {
			var id = 1;

			var stub = sinon.stub(userRepository, 'remove');
			var obj = {
				_id: '123'
			};
			stub.returns(Promise.resolve(obj));

			var promise = userService.remove(id);
			promise.then(function(){
				expect(true).to.be.ok;
				done();
			});
		});
	});

	describe('update', function() {
		afterEach(function() {
			if (bcrypt.hash.restore) bcrypt.hash.restore();
			if (userRepository.update.restore) userRepository.update.restore();
		});

		it('should call bcrypt with the users password when it is called', function() {
			var user = {
				userName: 'testname',
				password: 'test'
			};

			var bcryptMock = sinon.mock(bcrypt);
			bcryptMock.expects('hash').withArgs('test').exactly(1);
			userService.update(1, user);
			bcryptMock.verify();
		});

		it('should return a rejected promise with an error when there was an error while encrypting the password', function(done) {
			var user = {
				userName: 'testname',
				password: 'test'
			};

			var error = 'unexpected error';
			var bcryptStub = sinon.stub(bcrypt, 'hash');

			var promise = userService.update(1, user);
			bcryptStub.getCall(0).args[2]('unexpected error', null);
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
		});

		it('should return a rejected promise with an error when there was an while updating the user', function(done) {
			var user = {
				userName: 'testname',
				password: 'test'
			};

			var error = 'unexpected error';

			var bcryptStub = sinon.stub(bcrypt, 'hash');
			var userRepoStub = sinon.stub(userRepository, 'update');
			userRepoStub.returns(Promise.reject(error));

			var promise = userService.update(1, user);
			bcryptStub.getCall(0).args[2](null, 'test');
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
		});

		it('should return a fulfilled promise with the updated user when the user was updated successfully', function(done) {
			var user = {
				userName: 'testname',
				password: 'test'
			};

			var updatedUser;

			var bcryptStub = sinon.stub(bcrypt, 'hash');
			var userRepoStub = sinon.stub(userRepository, 'update');
			userRepoStub.returns(Promise.resolve({ _id: 1 }));
			var promise = userService.update(1, user);

			bcryptStub.getCall(0).args[2](null, 'test');
			promise.then(function(us){
				expect(us._id).to.eql(1);
				done();
			});      
		});
	});

	describe('getByCredentials', function() {

		afterEach(function() {
			if (bcrypt.compare.restore) bcrypt.compare.restore();
			if (userRepository.getByUserName.restore) userRepository.getByUserName.restore();
		});


		it('should return a rejected promise with an error when getByUserName returns an error', function(done) {
			var id = 1;

			var stub = sinon.stub(userRepository, 'getByUserName');
			var error = new Error('unexpected error');
			stub.returns(Promise.reject(error));

			var promise = userService.getByCredentials('test','pass');
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
		});

		it('should return null when there are no users in the db with the specified userName', function(done) {
			var _user;
			var getByUserNameStub = sinon.stub(userRepository, 'getByUserName');
			getByUserNameStub.returns(Promise.resolve(null));

			var promise = userService.getByCredentials('test', 'pass');
			promise.then(function(user){
				expect(user).to.be.null;
				done();
			});
		});

		it('should return null when comparison of password and passwordHash returns false', function(done) {
			var _user;
			var getByUserNameStub = sinon.stub(userRepository, 'getByUserName');
			var compareStub = sinon.stub(bcrypt, 'compare');
			var getUserByNameResult = Promise.resolve({password: 'test'});
			getByUserNameStub.returns(getUserByNameResult);

			var promise = userService.getByCredentials('test', 'pass');
			getUserByNameResult.then(function(){
				compareStub.getCall(0).args[2](null, false);
				promise.then(function(user){
					expect(user).to.be.null;
					done();
				});
			});
		});

		it('should return the user when comparison of password and passwordHash returns true', function(done) {
			var _user;
			var getByUserNameStub = sinon.stub(userRepository, 'getByUserName');
			var compareStub = sinon.stub(bcrypt, 'compare');
			var getUserByNameResult = Promise.resolve({password: 'test'});
			getByUserNameStub.returns(getUserByNameResult);

			var promise = userService.getByCredentials('test', 'pass');
			getUserByNameResult.then(function(){
				compareStub.getCall(0).args[2](null, true);
				promise.then(function(user){
					expect('test').to.eql(user.password);
					done();
				});
			});
		});
	});
});
