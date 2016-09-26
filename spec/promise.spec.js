'use strict';

let WhatIfPromise = require('../src/promise');

describe('WhatIfPromise', () => {
  let whatIf;
  let promise;

  beforeEach(() => {
    whatIf = new WhatIfPromise(() => {});
    promise = WhatIfPromise.resolve('ok');
  });

  it('should be an extension of Promise', () => {
    expect(whatIf instanceof Promise).toBe(true);
  });

  describe('.otherwise', () => {
    beforeEach(() => spyOn(whatIf, 'then').and.returnValue(promise));

    it('should define a .otherwise method', () => {
      expect(typeof whatIf.otherwise).toBe('function');
    });

    it('should call .then(null, condition)', () => {
      whatIf.otherwise(123);
      expect(whatIf.then).toHaveBeenCalledWith(null, 123);
    });

    it('should return a promise', () => {
      const result = whatIf.otherwise(123);
      expect(result).toBe(promise);
    });
  });

  describe('.butWhatIf', () => {
    beforeEach(() => spyOn(WhatIfPromise, 'whatIf').and.returnValue(promise));

    it('should define a .butWhatIf method', () => {
      expect(typeof whatIf.butWhatIf).toBe('function');
    });

    it('should call WhatIfPromise.whatIf()', () => {
      whatIf.butWhatIf(123);
      expect(WhatIfPromise.whatIf).toHaveBeenCalledWith(123);
    });

    it('should return a promise', () => {
      const result = whatIf.butWhatIf(123);
      expect(result).toBe(promise);
    });
  });

  describe('.whatIf', () => {
    it('should define a static whatIf method', () => {
      expect(typeof WhatIfPromise.whatIf).toBe('function');
    });

    describe('passing a function', () => {
      let myAction;
      let result;

      beforeEach(() => {
        myAction = jasmine.createSpy('myAction');
        result = WhatIfPromise.whatIf(myAction);
      });

      it('should execute myAction', () => {
        expect(myAction).toHaveBeenCalled();
      });

      it('should return a promise', () => {
        expect(result instanceof Promise);
      });
    });

    describe('passing a value', () => {
      beforeEach(() => {
        spyOn(WhatIfPromise, 'resolve').and.returnValue(promise);
        spyOn(WhatIfPromise, 'reject').and.returnValue(promise);
      });

      describe('truthty value', () => {
        it('should be resolved', () => {
          WhatIfPromise.whatIf(123);
          expect(WhatIfPromise.resolve).toHaveBeenCalledWith(123);
          expect(WhatIfPromise.reject).not.toHaveBeenCalled();
        });

        it('should return a promise', () => {
          const result = WhatIfPromise.whatIf(123);
          expect(result).toBe(promise);
        });
      });

      describe('falsy value', () => {
        it('should be rejected', () => {
          WhatIfPromise.whatIf(false);
          expect(WhatIfPromise.resolve).not.toHaveBeenCalled();
          expect(WhatIfPromise.reject).toHaveBeenCalledWith(false);
        });

        it('should return a promise', () => {
          const result = WhatIfPromise.whatIf(false);
          expect(result).toBe(promise);
        });
      });
    });
  });
});
