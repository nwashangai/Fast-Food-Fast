import chai from 'chai';
import 'babel-polyfill';
import chaiHttp from 'chai-http';

import app from '../../src/app';

chai.should();
chai.use(chaiHttp);

let token = '';
const user = {
    "name": "John",
    "email": "johndoe@gmail.com",
    "phone": "08098557965",
    "password": "12345"
};

describe('Fast-Food-Fast user test', () => {
  describe('Test endpoint to create user', () => {
    it('it should reject signup when user provides incomplete signup information', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Invalid email id');
          done();
        });
    });
    it('it should successfully create a user when user provides all signup information correctly', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'success');
          res.body.should.have.property('data');
          done();
        });
    });
    it('it should reject signup when user provides duplicate email Id', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Duplicate email address');
          done();
        });
    });
    it('it should reject signup when user provides invalid email Id', (done) => {
      user.email = 'example@gmail';
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Invalid email id');
          done();
        });
    });
    it('it should reject signup when user provides incomplete signup information', (done) => {
      delete user.name;
      user.email = 'example@gmail.com';
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Invalid name');
          done();
        });
    });
  });

  describe('Test endpoint to login user', () => {
    it('it should reject login when user provides incomplete login information', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'Invalid or no email address');
          done();
        });
    });
    it('it should reject login when user provides invalid login information', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'john@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'email address does not exist');
          done();
        });
    });
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
  });
  describe('Test endpoint to get a user', () => {
    it('it should successfully get user information when user provides valid token', (done) => {
      chai.request(app)
        .get('/api/v1/user')
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
  describe('Test endpoint to get a user', () => {
    it('it should reject request when user provides invalid token', (done) => {
      chai.request(app)
        .get('/api/v1/user')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MDUyYjk5ZS02YmE4LTQyZGEtYjc3Yi0zZGY3ZjhhNjA1ODUiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNTM4MDM4MjU5fQ.J16Cu9MpWc1-sv6bRtEucQVa6Yx2Hy5wg0MNeDDIuqc')
        .end((err, res) => {
          res.should.have.status(401);
          res.type.should.equal('application/json');
          res.body.should.have.property('status', 'error');
          res.body.should.have.property('message', 'authentication failed');
          done();
        });
    });
  });
});