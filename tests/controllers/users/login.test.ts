import 'chai-http';
import * as chai from 'chai';
require('dotenv').config();
import { app } from '../../../src/index';

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
chai.use(require('chai-http'));

describe('Test POST /api/login', () => {
  const path = '/api/login';
  it('Should return error on missing params', (done) => {
    const params = {
      email: 'mocha@email.com',
    };
    chai
      .request(app)
      .post(path)
      .send(params)
      .end((error, response) => {
        if (error) done(error);

        should.exist(response.body);
        response.should.have.status(422);
        response.body.should.have.property('errors');
        response.body.success.should.be.eql('false');
        done();
      });
  });

  it('Should return error on missing user', (done) => {
    const params = {
      email: 'mocha123@email.com',
      password: 'password',
    };
    chai
      .request(app)
      .post(path)
      .send(params)
      .end((error, response) => {
        if (error) done(error);

        should.exist(response.body);
        response.should.have.status(404);
        response.body.success.should.be.eql('false');
        done();
      });
  });
});
