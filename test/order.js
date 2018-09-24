import chai from 'chai';
import 'babel-polyfill';
import chaiHttp from 'chai-http';

import app from '../src/app';

chai.should();
chai.use(chaiHttp);

let token = '';
const order = {
  foodItems: [
    { foodId: '5d5f3ead-f5e8-41df-b997-a71171506f48', quantity: 3 },
    { foodId: '5d5f3ead-f5e8-41df-b997-a71171506f48', quantity: 2 },
    { foodId: '5d5f3ead-f5e8-41df-b997-a71171506f48', quantity: 1 }
  ]
};

describe('Fast-Food-Fast orders test', () => {
    it('it should successfully login user when user provides valid login information', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          token = res.body.data.token;
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('data');
          done();
        });
    });
  describe('Test endpoint to place order', () => {
    it('it should reject user\'s order when user has no access token', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          res.should.have.status(401);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'No token provided.');
          done();
        });
    });
    it('it should reject users order when user authentication fails', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        .end((err, res) => {
          res.should.have.status(401);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'authentication failed');
          done();
        });
    });
    it('it should successfully place user\'s order when user provides order information', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('x-access-token', token)
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('message', 'Order placed');
          res.body.should.have.property('data');
          done();
        });
    });
    it('it should reject order when user doesn\'t provides food Items', (done) => {
      delete order.foodItems;
      chai.request(app)
        .post('/api/v1/orders')
        .set('x-access-token', token)
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'No food items');
          done();
        });
    });
    it('it should reject order when user provides invalid food Items', (done) => {
      order.foodItems = [
        { foodId: '5d5f3ead-f5e8-41df-b997-a71171506f48', quantity: '243' }
      ];
      chai.request(app)
        .post('/api/v1/orders')
        .set('x-access-token', token)
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Invalid quantity type in cart');
          done();
        });
    });
    it('it should reject order when user provides incomplete food Item data', (done) => {
      order.foodItems = [
        { foodId: '5d5f3ead-f5e8-41df-b997-a71171506f48' }
      ];
      chai.request(app)
        .post('/api/v1/orders')
        .set('x-access-token', token)
        .send(order)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Please provide all fields');
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
          res.should.have.status(422);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Invalid order Id');
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
    it('it should reject invalid ID when user provide invalid ID', (done) => {
      chai.request(app)
        .get('/api/v1/users/4/orders')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(422);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Invalid user Id');
          done();
        });
    });
    it('it should return user order list when user provide valid user ID', (done) => {
      chai.request(app)
        .get('/api/v1/users/5d5f3ead-f5e8-41df-b997-a71171506f48/orders')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('data');
          done();
        });
    });
  });
});
