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
chai.use(require('chai-http'));

describe('Test POST /api/login', () => {
  before((done) => {
    const user = new User({
      fullname: 'mocha test',
      dateOfBirth: '04-30-1999',
      email: 'test@test.com',
      password: 'mochaChai123',
      confirmedAt: Date.now(),
    });

    user.save((error: any) => {
      if (error) done(error);

      done();
    });
  });

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

  it('Should return 200 OK success login', (done) => {
    const params = {
      email: 'test@test.com',
      password: 'mochaChai123',
    };
    chai
      .request(app)
      .post(path)
      .send(params)
      .end((error, response) => {
        if (error) done(error);

        should.exist(response.body);
        response.should.have.status(200);
        response.body.should.have.property('tokens');
        response.body.success.should.be.eql('true');
        done();
      });
  });
});
