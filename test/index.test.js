/* eslint no-unused-expressions:0 */

var bugsnagApiWrapper = require('../lib/index.js');
var request = require('request');
var expect = require('chai').expect;
var sinon = require('sinon');

var testVars = require('./testVars.js');

describe('bugsnag api wrapper', function() {
  describe('unit testing', function() {
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

    it('api should exist', function(done) {
      expect(bugsnagApiWrapper).to.exist;
      done();
    });

    it('methods should exist', function(done) {
      expect(bugsnagApiWrapper.getErrors).to.exist;
      expect(bugsnagApiWrapper.getEvents).to.exist;
      done();
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
          expect(data).to.equal(testVars.errorsOutput[dataCounter]);
          dataCounter++;
        });
        res.on('end', function() {
          done();
        });
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
          expect(data).to.equal(testVars.eventsOutput[dataCounter]);
          dataCounter++;
        });
        res.on('end', function() {
          done();
        });
      });
    });
  });
  describe('functional testing', function() {
    it('getErrors with querystring should return a stream', function(done) {
      var querystring = {
        'release_stages': 'production',
        'app_versions': 'eq1.0.1',
        'severity': 'error',
        'status': 'fixed',
        'per_page': 50
      };

      bugsnagApiWrapper.getErrors(querystring, function(err, res) {
        if (err) return done(err);
        expect(res).to.be.an('object');
        expect(res.__HighlandStream__).to.be.true;
        res.on('data', function(data) {
          expect(data).to.include.keys('id');
          expect(data).to.include.keys('last_message');
          expect(data.severity).to.equal('error');
        });
        res.on('end', function() {
          done();
        });
      });
    });

    it('getEvents with querystring should return a stream', function(done) {
      var querystring = {
        'per_page': 20,
        'start_time': '2016-07-01T12:00:00Z',
        'end_time': '2016-07-01T12:15:00Z'
      };

      bugsnagApiWrapper.getEvents(querystring, function(err, res) {
        if (err) return done(err);
        expect(res).to.be.an('object');
        expect(res.__HighlandStream__).to.be.true;
        res.on('data', function(data) {
          expect(data).to.include.keys('id');
          expect(data.received_at).to.match(/2016-07-01T12:/);
        });
        res.on('end', function() {
          done();
        });
      });
    });
  });
});
