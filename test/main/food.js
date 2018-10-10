import chai from 'chai';
import 'babel-polyfill';
import chaiHttp from 'chai-http';

import app from '../../src/app';

chai.should();
chai.use(chaiHttp);

let token = '', menuId = '';
const food = {};

describe('Fast-Food-Fast orders test', () => {
  describe('Test endpoint to add Foods', () => {
    it('it should successfully login user when user provides valid login information', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('token');
          done();
        });
    });
    it('it should reject food when user provides no food name', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', token)
        .send(food)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'you must provide name for the item');
          done();
        });
    });
    it('it should reject food when user provides no food category', (done) => {
      food.name = 'plantain chips';
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', token)
        .send(food)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'you must provide category for the item');
          done();
        });
    });
    it('it should reject food when user provides no food description', (done) => {
      food.category = 'vegetables';
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', token)
        .send(food)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'you must provide description for the item');
          done();
        });
    });
    it('it should reject food when user provides no food price', (done) => {
      food.description = 'taste great';
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', token)
        .send(food)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'you must provide price for the item');
          done();
        });
    });
    it('it should reject food when user provides invalid food price', (done) => {
      food.price = 'fifty';
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', token)
        .send(food)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'invalid price for the item');
          done();
        });
    });
    it('it should successfully add food when user provides all food data', (done) => {
      food.price = 200;
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', token)
        .send(food)
        .end((err, res) => {
          menuId = res.body.data.id;
          res.should.have.status(201);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('data');
          done();
        });
    });
  });
  describe('Test endpoint to get Foods', () => {
    it('it should successfully get food menu when user is authenticated', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
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
  describe('Test endpoint to update Foods', () => {
    it('it should reject update when user provides invalid menu ID', (done) => {
      chai.request(app)
        .put(`/api/v1/menu/32`)
        .set('x-access-token', token)
        .send(food)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Invalid menu ID');
          done();
        });
    });
    it('it should successfully update food menu when user provides all valid data', (done) => {
      chai.request(app)
        .put(`/api/v1/menu/${menuId}`)
        .set('x-access-token', token)
        .send(food)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('update');
          done();
        });
    });
    it('it should successfully delete food menu when user provides valid menu Id', (done) => {
      chai.request(app)
        .delete(`/api/v1/menu/${menuId}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('deleted');
          done();
        });
    });
    it('it should reject delete food menu when user provides invalid menu Id', (done) => {
      chai.request(app)
        .delete(`/api/v1/menu/${menuId}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('deleted');
          done();
        });
    });
  });
});
