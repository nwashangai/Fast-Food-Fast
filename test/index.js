const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const should = chai.should();

chai.use(chaiHttp);

describe('Diary', () => {
  /*
  * Test the /GET route
  */
  describe('/GET /', () => {
    it('it should Reject default', (done) => {
      chai.request('http://localhost:3000')
        .get('/')
        .end((err, res) => {
          res.should.have.status(404);
          res.type.should.equal('application/json');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
