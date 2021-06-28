import 'chai-http';
import * as chai from 'chai';
import { app } from '../../../src/index';

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
chai.use(require('chai-http'));

describe('test GET /api/revoke-token', () => {
  const path = '/api/revoke-token';
  it('Should return error on missing cookie', (done) => {
    chai
      .request(app)
      .get(path)
      .end((error, response) => {
        if (error) done(error);

        should.exist(response.body);
        response.should.have.status(401);
        response.body.should.have.property('errors');
        response.body.success.should.be.eql('false');
        done();
      });
  });
});
