/* eslint no-unused-expressions:0 */

var bugsnagApiWrapper = require('../lib/index.js');
var request = require('request');
var expect = require('chai').expect;
var sinon = require('sinon');

var testVars = require('./testVars.js');

describe('bugsnag api wrapper testing', function() {
  before(function(done) {
    var stub = sinon.stub(request, 'get');
    stub.withArgs(testVars.errorsOptions).yields(null, { statusCode: '200' }, testVars.errorsOutput);
    stub.withArgs(testVars.eventsOptions).yields(null, { statusCode: '200' }, testVars.eventsOutput);
    done();
  });

  after(function(done) {
    request.get.restore();
    done();
  });

  it('api should exist', function() {
    expect(bugsnagApiWrapper).to.exist;
  });

  it('getErrors with no querystring should return error', function(done) {
    bugsnagApiWrapper.getErrors(null, function(err, res) {
      expect(err).to.equal('NO QUERYSTRING PROVIDED');
      expect(res).to.be.undefined;
      done();
    });
  });

  it('getErrors with querystring should return a stream', function(done) {
    bugsnagApiWrapper.getErrors({}, function(err, res) {
      if (err) return done(err);
      expect(res).to.be.an('object');
      expect(res.__HighlandStream__).to.be.true;
      var dataCounter = 0;
      res.on('data', function(data) {
        data.to.equal(testVars.errorsOutput[dataCounter]);
        dataCounter++;
      });
      done();
    });
  });

  it('getEvents with no querystring should return error', function(done) {
    bugsnagApiWrapper.getEvents(null, function(err, res) {
      expect(err).to.equal('NO QUERYSTRING PROVIDED');
      expect(res).to.be.undefined;
      done();
    });
  });

  it('getEvents with querystring should return a stream', function(done) {
    bugsnagApiWrapper.getEvents({}, function(err, res) {
      if (err) return done(err);
      expect(res).to.be.an('object');
      expect(res.__HighlandStream__).to.be.true;
      var dataCounter = 0;
      res.on('data', function(data) {
        data.to.equal(testVars.eventsOutput[dataCounter]);
        dataCounter++;
      });
      done();
    });
  });
});
