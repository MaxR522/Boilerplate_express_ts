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
    confirmationToken?: string;
    passwordResetToken?: string;
  }
}

// Assertion
const should = chai.should();
const expect = chai.expect;
chai.use(require('chai-http'));

describe('test CREATE, UPDATE AND DELETE on Posts', () => {
  before((done) => {
    const user = new User({
      fullname: 'mocha test',
      dateOfBirth: '04-30-1999',
      email: 'test_create@test.com',
      password: 'mochaChai123',
      confirmedAt: Date.now(),
    });

    user.save((error: any) => {
      if (error) done(error);

      done();
    });
  });

  it('should success login before all actions ', (done) => {
    const loginParams = {
      email: 'test_create@test.com',
      password: 'mochaChai123',
    };

    chai
      .request(app)
      .post('/api/login')
      .send(loginParams)
      .end((error: any, response: any) => {
        if (error) done(error);
        should.exist(response.body);
        done();

        describe('Test CREATE Posts by POST /api/posts', () => {
          const path = '/api/posts';
          const params = {
            title: 'Test',
            content: 'mocha chai test',
          };

          it('Should return 201 CREATED on Posts creation', (done) => {
            chai
              .request(app)
              .post(path)
              .set(
                'Authorization',
                `Barear ${response.body.tokens.accessToken}`,
              )
              .send(params)
              .end((error: any, response: any) => {
                if (error) done(error);

                should.exist(response.body);
                response.should.have.status(201);
                response.body.should.have.property('data');
                response.body.success.should.be.eql('true');
                done();
              });
          });
        });
      });
  });
});
