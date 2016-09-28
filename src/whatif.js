'use strict';

const WhatIfPromise = require('./promise');

module.exports = function whatIf(statement) {
  return new WhatIfPromise(statement);
}
