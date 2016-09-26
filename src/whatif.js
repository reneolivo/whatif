'use strict';

let WhatIfPromise = require('./promise');

module.exports = function whatIf(whatIfCondition) {
  return WhatIfPromise.whatIf(whatIfCondition);
}
