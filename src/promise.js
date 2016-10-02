'use strict';

module.exports = class WhatIfPromise {
  constructor(statement) {
    this.isResolved = false;

    this._prepareStatement(statement);
  }

  then(action) {
    this.isPristinePromise.then((isPristine) => {
      if (isPristine && !this.isResolved) {
        this.promise = this.promise.then(action);
      }
    });

    return this;
  }

  catch(action) {
    this.isPristinePromise.then(() => {
      this.promise = this.promise.catch(action);
    });

    return this;
  }

  butWhatIf(statement) {
    this.isPristinePromise = this.isPristinePromise.then((isPristine) => {
      if (isPristine) {
        this.isResolved = true;
        return isPristine;
      } else {
        return this._prepareStatement(statement);
      }
    });

    return this;
  }

  otherwise(action) {
    this.isPristinePromise.then((isPristine) => {
      if (!isPristine) action();
    });

    return this;
  }

  toPromise() {
    return this.promise;
  }

  _prepareStatement(statement) {
    this.promise = this._reduceToPromisedValue(statement);

    this._checkIfError();

    return this._createIsPristinePromise();
  }

  _createIsPristinePromise() {
    return this.isPristinePromise = this.promise.then((value) => !!value);
  }

  _checkIfError() {
    this.promise = this.promise.catch(() => false);
  }

  _reduceToPromisedValue(statement) {
    if (typeof statement === 'function') {
      return this._reduceFunctionToPromisedValue(statement);
    } else {
      return Promise.resolve(statement);
    }
  }

  _reduceFunctionToPromisedValue(action) {
    return new Promise((resolve, reject) => {
      const result = action();
      result = this._reduceToPromisedValue(result);

      resolve(result);
    });
  }
}
