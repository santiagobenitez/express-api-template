var superagent = require('superagent');
var expect = require('chai').expect;
var app = require('../app');

var propiedad1  = {

}

describe('propiedades api', function() {
  beforeEach(function () {
    app.boot();
  });
  afterEach(function () {
    app.shutdown();
  });

  describe('endpoints', function() {
    it('deberia crear una nueva propiedad cuando una solicitud post es realizada correctamente', function(done) {
      superagent.post('http://localhost:3003/api/propiedades')
      .send(propiedad1)
      .end(function(e, res) {
        console.log(e);
        console.log(res.body);
        expect(e).to.be.null;
        expect(res.body.length).to.eql(1);
        expect(res.body[0]._id.length).to.eql(24);
        propiedad1.id = res.body[0]._id;
        done();
      });
    });
  });

});
