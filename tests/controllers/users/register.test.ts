import 'chai-http';
import * as chai from 'chai';
import { app } from '../../../src/index';
import User from '../../../src/models/user';

import 'express';
require('dotenv').config();

declare module 'express' {
  interface Request {
    userData?: any;
    accessToken?: string;
    refreshToken?: string;
    confirmationToken?: string;
    passwordResetToken?: string;
  }
}

// Assertion
const should = chai.should();
const expect = chai.expect;
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

    it('Should return success on Register', (done) => {
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

    it('Should test password hashing', (done) => {
      try {
        const user = User.findOne(
          { email: 'mocha@email.com' },
          (error: any, user: any) => {
            if (error) done(error);
            if (user) {
              expect(user.password).not.equal('mochaChai123');
              done();
            }
          },
        );
      } catch (error) {
        done(error);
      }
    });
  });
});
