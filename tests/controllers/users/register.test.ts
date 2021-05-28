import 'chai-http';
import * as chai from 'chai';
require('dotenv').config();
import { app } from '../../../src/index';
import User from '../../../src/models/user';

import 'express';

declare module 'express' {
  interface Request {
    userData?: any;
    accessToken?: string;
    refreshToken?: string;
  }
}

// Assertion
const should = chai.should();
chai.use(require('chai-http'));

describe('Test Register', () => {
  /**
   * Remove all user in database before test
   */

  before((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  const path = '/api/register';

  describe('test POST /auth/register', () => {
    /**
     * Test wrong params (missing params and wrong params)
     */

    it('Should return error on wrong params & missing params', (done) => {
      const params = {
        dateOfBirth: '04-30-1999',
        email: 'mochaemailcom',
        password: 'mochaChai123',
      };

      chai
        .request(app)
        .post(path)
        .send(params)
        .end((err: any, response: any) => {
          if (err) {
            done(err);
          }
          should.exist(response.body);
          response.should.have.status(422);
          response.body.should.have.property('errors');
          response.body.errors.length.should.be.eql(2);
          done();
        });
    });

    /**
     * Test Good params
     */

    it('Should return success', (done) => {
      const params = {
        fullname: 'mocha test',
        dateOfBirth: '04-30-1999',
        email: 'mocha@email.com',
        password: 'mochaChai123',
      };

      chai
        .request(app)
        .post(path)
        .send(params)
        .end((err: any, response: any) => {
          if (err) {
            done(err);
          }
          should.exist(response.body);
          response.should.have.status(201);
          response.body.should.not.have.property('errors');
          response.body.should.have.property('data');
          done();
        });
    });
  });
});
