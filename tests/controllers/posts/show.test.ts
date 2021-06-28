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
const expect = chai.expect;
chai.use(require('chai-http'));

describe('It Should test SHOW Posts', () => {
  it('Should Show all posts by GET /api/posts/all', (done) => {
    const path = '/api/posts/all';

    chai
      .request(app)
      .get(path)
      .end((error: any, response: any) => {
        if (error) done(error);
        should.exist(response.body);
        response.should.have.status(200);
        response.body.success.should.be.eql('true');
        response.body.should.have.property('data');
        expect(response.body.data).to.be.an('array');
        done();
      });
  });

  it('Should Show one post by GET /api/posts/:postId', (done) => {
    const path = '/api/posts/:postId';

    chai
      .request(app)
      .get(path)
      .end((error: any, response: any) => {
        if (error) done(error);
        should.exist(response.body);
        response.should.have.status(200);
        response.body.success.should.be.eql('true');
        response.body.should.have.property('data');
        expect(response.body.data).to.not.be.an('array');
        done();
      });
  });

  it('Should Show all posts by user (Author) by GET /api/users/:userId/posts', (done) => {
    const path = '/api/users/:userId/posts';

    chai
      .request(app)
      .get(path)
      .end((error: any, response: any) => {
        if (error) done(error);
        should.exist(response.body);
        response.should.have.status(200);
        response.body.success.should.be.eql('true');
        response.body.should.have.property('data');
        expect(response.body.data).to.be.an('array');
        done();
      });
  });

  it('Should Show all posts filtered by tag by GET /api/posts?tag=":tag"', (done) => {
    const path = '/api/posts?tag=":tag"';

    chai
      .request(app)
      .get(path)
      .end((error: any, response: any) => {
        if (error) done(error);
        should.exist(response.body);
        response.should.have.status(200);
        response.body.success.should.be.eql('true');
        response.body.should.have.property('data');
        expect(response.body.data).to.be.an('array');
        done();
      });
  });
});
