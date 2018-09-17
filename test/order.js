import chai from 'chai';
import 'babel-polyfill';
import chaiHttp from 'chai-http';

import app from '../src/app';

chai.should();
chai.use(chaiHttp);

const order = {
  id: '1',
  userId: '2',
  fooItems: [
    { foodId: '1', qty: 3 },
    { foodId: '2', qty: 2 },
    { foodId: '3', qty: 1 },
  ],
};

describe('Fast-Food-Fast', () => {
  /*
  * Test the /GET route
  */
  describe('Test endpoint to place order', () => {
    it('it should Reject default', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('message', 'Order placed');
          res.body.should.have.property('entry');
          done();
        });
    });
  });
});
