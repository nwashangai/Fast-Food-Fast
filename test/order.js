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

describe('Fast-Food-Fast orders test', () => {
  describe('Test endpoint to place order', () => {
    it('it should place user\'s order when user provides order information', (done) => {
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
  describe('Test endpoint get orders', () => {
    it('it should get list of orders when user visits GET /api/v1/orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('data');
          done();
        });
    });
    it('it should get a specific order when user requests for an order', (done) => {
      chai.request(app)
        .get('/api/v1/orders/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('data');
          done();
        });
    });
    it('it should get empty order when order is not found', (done) => {
      chai.request(app)
        .get('/api/v1/orders/335')
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('data');
          res.body.data.should.be.empty;
          done();
        });
    });
    it('it should successfully update order given an Id', (done) => {
      chai.request(app)
        .put('/api/v1/orders/3')
        .send({ status: 'accepted' })
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success')
          res.body.should.have.property('update');
          done();
        });
    });
    it('it should reject invalid status when user provide invalid status', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .send({ status: 'finished' })
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'invalid status');
          done();
        });
    });
    it('it should reject invalid ID when user provide invalid ID', (done) => {
      chai.request(app)
        .put('/api/v1/orders/230')
        .send({ status: 'accepted' })
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'invalid order ID');
          done();
        });
    });
  });
});
