var superagent = require('superagent');
var expect = require('chai').expect;
var app = require('../app');

var newUsuario = {
  userName: 'test2015',
  password: 'test2015',
  activo: true
};

describe('usuarios api', function() {
  before(function() {
    app.boot();
  });
  after(function() {
    app.shutdown();
  });

  describe('endpoints', function() {
    it('should create a new user when a request is made correctly', function(done) {
      superagent.post('http://localhost:3003/api/usuarios')
        .send(newUsuario)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          newUsuario._id = res.body._id;
          done();
        });
    });

    it('should return a 400 error with a message of required password when the password was not submited', function(done) {
      var invalidUsuario = {
        userName: 'test2015',
  		activo: true
      };

      superagent.post('http://localhost:3003/api/usuarios')
        .send(invalidUsuario)
        .end(function(e, res) {
          expect(res.status).to.eql(400);
          expect(res.body.error.password.msg).to.exist;
          done();
        });
    });

    it('should get the recently created usuario as part of the result set when requesting /api/usuarios', function(done) {
      superagent.get('http://localhost:3003/api/usuarios')
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body.items).to.have.length.above(0);;
          expect(res.body.items.map(function(item) {
            return item._id;
          })).to.contain(newUsuario._id);
          done();
        });
    });

    it('should get the the recently created user when requesting /api/usuarios/{id}', function(done) {

      superagent.get('http://localhost:3003/api/usuarios/' + newUsuario._id)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body._id).to.eql(newUsuario._id);
          done();
        });
    });

    it('should update the the recently created user when requesting put /api/usuarios/{id}', function(done) {
      newUsuario.activo = false;
      superagent.put('http://localhost:3003/api/usuarios/' + newUsuario._id, newUsuario)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body._id).to.eql(newUsuario._id);
          expect(res.body.activo).to.eql(false);
          newUsuario = res.body;
          done();
        });
    });

    it('should return a 400 error with a message of required password when requesting put /api/usuarios/{id} without a password', function(done) {
      var invalidUsuario = {
        userName: 'test2015',
  		activo: 1
      };
      superagent.put('http://localhost:3003/api/usuarios/' + newUsuario._id, invalidUsuario)
        .end(function(e, res) {
          expect(res.status).to.eql(400);
          expect(res.body.error.password.msg).to.exist;
          done();
        });
    });

    it('should remove the the recently created propiedad when requesting delete /api/usuarios/{id}', function(done) {

      superagent.del('http://localhost:3003/api/usuarios/' + newUsuario._id)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.ok).to.be.true;
          done();
        });
    });

    it('should return an error when requesting the recently removed user', function(done) {
      superagent.get('http://localhost:3003/api/usuarios/' + newUsuario._id)
        .end(function(e, res) {
          expect(e).to.exist;
          expect(e.status).to.eql(404);
          done();
        });
    });
  });
});
