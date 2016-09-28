'use strict';

module.exports = class WhatIfPromise {
  constructor(statement) {
    this.isPristine = true;
    this.isResolved = false;

    if (typeof statement === 'function') {
      this.promise = this._createPromiseFromFunction(statement);
    } else {
      this.isPristine = !!statement;
      this.promise = Promise.resolve(statement);
    }
  }

  then(action) {
    if (this.isPristine && !this.isResolved) {
      this.promise = this.promise.then(action);
    }

    return this;
  }

  butWhatIf(statement) {
    if (this.isPristine) {
      this.isResolved = true;
      return this;
    }

    return new WhatIfPromise(statement);
  }

  otherwise(action) {
    if (!this.isPristine) action();

    return this;
  }

  _createPromiseFromFunction(action) {
    return new Promise((resolve, reject) => {
      const result = action();

      resolve(result);
    });
  }
}
