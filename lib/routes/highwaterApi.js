/*
 == BSD2 LICENSE ==
 Copyright (c) 2014, Tidepool Project
 
 This program is free software; you can redistribute it and/or modify it under
 the terms of the associated License, which is identical to the BSD 2-Clause
 License as published by the Open Source Initiative at opensource.org.
 
 This program is distributed in the hope that it will be useful, but WITHOUT
 ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the License for more details.
 
 You should have received a copy of the License along with this program; if
 not, you can obtain one from Tidepool Project at tidepool.org.
 == BSD2 LICENSE ==
 */

'use strict';

var _ = require('lodash');
var crypto = require('crypto-js');
var log = require('../log.js')('highwaterApi.js');
var metric = require('../metric.js')('highwaterApi.js');
var config = require('../../env.js');

/*
 Http interface for group-api
 */
module.exports = function (userApiClient, kissClient, salt) {

  /*
   HELPERS
   */
  function hash_id(userid, len) {
    var hash = crypto.algo.SHA1.create();
    hash.update(salt);
    hash.update(userid);
    return hash.finalize().toString().substr(0, len);
  }

  function sendMetrics(req, user, hash = true) {
    log.debug('req[%s], user[%s], hash[%s]', req, user, hash);
    if((config.metrics == 'all') || (config.metrics == 'file')) {
      // include patient ID that can be different than user when data are shared
      metric.info(
        'method[%s], url[%s], user[%s], patient[%s], event[%s]',
        req.method, 
        req.url, 
        user, 
        req.params.patientID, 
        req.params.eventname);
    }
    if((config.metrics == 'all') || (config.metrics == 'kiss')) {
      // userid is hashed for Kiss
      kissClient.submit(hash_id(user, 10), req.params.eventname, req.query);
    }
  }

  return {
    /** HEALTH CHECK **/
    status: function (req, res, next) {
      log.debug('status: params[%j], url[%s], method[%s]', req.params, req.url, req.method);
      res.send(200, '"OK"');
    },

    /*
     IMPLEMENTATIONS OF METHODS
     */
    named_user: function (req, res, next) {
      res.send(200);
      next();

      log.debug('named_user: params[%j], url[%s], method[%s]', req.params, req.url, req.method);
      sendMetrics(req, req.params.userid);
    },

    token_user: function (req, res, next) {
      res.send(200);
      next();

      log.debug('token_user: params[%j], url[%s], method[%s]', req.params, req.url, req.method);
      sendMetrics(req, req._tokendata.userid, false);
    },

    server_user: function (req, res, next) {
      res.send(200);
      next();

      log.debug('server_user: params[%j], url[%s], method[%s]', req.params, req.url, req.method);
      sendMetrics(req, req.params.servername);
    }

  };
};
