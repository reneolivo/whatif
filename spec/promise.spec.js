'use strict';

const WhatIfPromise = require('../src/promise');

describe('WhatIfPromise', () => {
  const value = { result: 123 };
  let whatIf;
  let callMe;

  beforeEach(() => {
    whatIf = new WhatIfPromise(value);
    callMe = jasmine.createSpy('callMe');
  });

  it('should define a .then method', () => {
    expect(typeof whatIf.then).toBeDefined();
  });

  describe('To Promise', () => {
    it('should define a .toPromise method', () => {
      expect(typeof whatIf.toPromise).toBe('function');
    });

    it('should return a promise', () => {
      const result = whatIf.toPromise();

      expect(result instanceof Promise).toBe(true);
    });
  });

  describe('statement parameter', () => {
    function expectPromiseToResolveToValue(done) {
      whatIf.then(result => {
        expect(result).toBe(value);
        done();
      });
    }

    it('should accept and execute a function', (done) => {
      whatIf = new WhatIfPromise(done);
    });

    it('should accept and resolve a promise', (done) => {
      const myPromise = Promise.resolve(value);

      whatIf = new WhatIfPromise(myPromise);

      expectPromiseToResolveToValue(done);
    });

    it('should accept an arbitrary value', (done) => {
      expectPromiseToResolveToValue(done);
    });
  });

  describe('.then behaviour', () => {
    it('should return itself, not the promise', () => {
      const result = whatIf.then(null);
      expect(result).toBe(whatIf);
    });

    it('should return the last chain of the promise', (done) => {
      return whatIf.then((result) => {
        expect(result).toBe(value);
        return 'ABC';
      }).then((result) => {
        expect(result).toBe('ABC');
        done();
      });
    });
  });

  describe('.butWhatIf', () => {
    it('should define a .butWhatIf method', () => {
      expect(typeof whatIf.butWhatIf).toBe('function');
    });

    it(`should not execute .then if the original statement is falsy`, (done) => {
      whatIf = new WhatIfPromise(false);

      whatIf.then(done.fail);

      setTimeout(() => done(), 0);
    });

    it('should execute .butWhatIf if the original statement is falsy', (done) => {
      whatIf = new WhatIfPromise(false);

      whatIf.then(done.fail)
      .butWhatIf(done);
    });

    it('should not execute .butWhatIf if the original statement is truthy', (done) => {
      whatIf = new WhatIfPromise(true);

      whatIf.then(done)
      .butWhatIf(done.fail);
    });

    it('should execute the .then of the .butWhatIf when the .butWhatIf is truthy', (done) => {
      whatIf = new WhatIfPromise(false);

      whatIf.then(done.fail)
      .butWhatIf(true)
      .then(done);
    });

    it('should only execute the appropiate .butWhatIf even if there are many', (done) => {
      const dontCallMe1 = jasmine.createSpy('dontCallMe1');
      const dontCallMe2 = jasmine.createSpy('dontCallMe2');
      const dontCallMe4 = jasmine.createSpy('dontCallMe4');
      const dontCallMe5 = jasmine.createSpy('dontCallMe5');
      const dontCallMe6 = jasmine.createSpy('dontCallMe6');

      whatIf = new WhatIfPromise(false);

      whatIf.then(dontCallMe1)

      .butWhatIf(false)
      .then(dontCallMe2)

      .butWhatIf(true)
      .then(callMe)

      .butWhatIf(false)
      .then(dontCallMe4)

      .butWhatIf(true)
      .then(dontCallMe5)

      .butWhatIf(false)
      .then(dontCallMe5);

      setTimeout(() => {
        expect(callMe).toHaveBeenCalled();
        expect(dontCallMe1).not.toHaveBeenCalled();
        expect(dontCallMe2).not.toHaveBeenCalled();
        expect(dontCallMe4).not.toHaveBeenCalled();
        expect(dontCallMe5).not.toHaveBeenCalled();
        expect(dontCallMe6).not.toHaveBeenCalled();
        done();
      }, 0);
    });

  });

  describe('.otherwise', () => {
    it('should define a .otherwise method', () => {
      expect(typeof whatIf.otherwise).toBe('function');
    });

    it('should be called when the other statements are falsy', (done) => {
      whatIf = new WhatIfPromise(false);

      whatIf.then(done.fail)
      .otherwise(callMe);

      setTimeout(() => {
        expect(callMe).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should not be called if there is a truthy statement', (done) => {
      whatIf = new WhatIfPromise(true);

      whatIf.then(callMe)
      .butWhatIf(false)
      .then(done.fail)
      .otherwise(done.fail);

      setTimeout(() => {
        expect(callMe).toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  describe('handling errors', () => {
    const errorMessage = 'Some Error';
    let callError;

    beforeEach(() => {
      callError = jasmine.createSpy('callError').and.throwError(errorMessage);
    });

    it('should define a .catch method', () => {
      expect(typeof whatIf.catch).toBe('function');
    });

    it('should count errors as falsy values on whatIf statements', (done) => {
      whatIf = new WhatIfPromise(callError);

      whatIf.then(done.fail)
      .catch(done.fail)
      .butWhatIf(callError)
      .then(done.fail)
      .catch(done.fail)
      .butWhatIf(true)
      .then(callMe);

      setTimeout(() => {
        expect(callMe).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should treat erros as falsy values and not execute any catches', (done) => {
      whatIf = new WhatIfPromise(callError);
      whatIf.then(done.fail)
      .catch(done.fail);

      setTimeout(() => {
        done();
      }, 0);
    });

    it('should not execute catch if no error were thrown', (done) => {
      whatIf.then(callMe)
      .catch(done.fail);

      setTimeout(() => {
        expect(callMe).toHaveBeenCalled();
        done();
      }, 0);
    });

    it('should only catch errors for the valid WhatIf block', (done) => {
      whatIf = new WhatIfPromise(false);

      whatIf.then(done.fail)
      .catch(done.fail)
      .butWhatIf(true)
      .then(callError)
      .catch(callMe)
      .butWhatIf(false)
      .then(done.fail)
      .catch(done.fail)
      .otherwise(done.fail);

      setTimeout(() => {
        expect(callMe).toHaveBeenCalled();
        done();
      }, 0);
    });
  });
});
