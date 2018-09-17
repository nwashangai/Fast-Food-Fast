import chai from 'chai';
import 'babel-polyfill';
import chaiHttp from 'chai-http';

import app from '../src/app';

chai.should();
chai.use(chaiHttp);

describe('Fast-Food-Fast', () => {
  /*
  * Test the /GET route
  */
  describe('/GET /', () => {
    it('it should Reject default', (done) => {
      chai.request(app)
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
