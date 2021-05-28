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
  }
}

// Assertion
const should = chai.should();
chai.use(require('chai-http'));

describe('test POST /api/revoke', () => {
  const path = '/api/revoke';
  it('Should return error on missing params', (done) => {
    const params = {};

    chai
      .request(app)
      .post(path)
      .send(params)
      .end((error, response) => {
        if (error) done(error);

        should.exist(response.body);
        response.should.have.status(401);
        response.body.should.have.property('errors');
        response.body.success.should.be.eql('false');
        done();
      });
  });

  it('Should return error on wrong jwt token params', (done) => {
    const params = {
      token: 'fafsfgagsaf.fqwffFff.GASAASASAGS',
    };

    chai
      .request(app)
      .post(path)
      .send(params)
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
