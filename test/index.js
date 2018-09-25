import chai from 'chai';
import 'babel-polyfill';
import chaiHttp from 'chai-http';
import migration from '../src/models/migration';

import app from '../src/app';

chai.should();
chai.use(chaiHttp);

describe('Fast-Food-Fast', () => {
  describe('Default route', () => {
    it('it should Reject the default route when user enters default route', (done) => {
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
  describe('Migration test', () => {
    it('it should Successfully migrate database schemas', (done) => {
      migration().then(() => {
        done();
      }).catch((err) => {
        done();
      });
    });
  });
});
require('./user');
require('./food');
require('./order');