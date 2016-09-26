'use strict';

let whatIf = require('../src/whatif');
let WhatIfPromise = require('../src/promise');

describe('WhatIf', () => {
  it('should be defined', () => {
    expect(typeof whatIf).toBe('function');
  });

  it('should call WhatIfPromise.whatIf', () => {
    spyOn(WhatIfPromise, 'whatIf').and.returnValue()
    whatIf(123);
    expect(WhatIfPromise.whatIf).toHaveBeenCalledWith(123);
  });

  it('should return a WhatIfPromise', () => {
    const result = whatIf(true);

    expect(result instanceof WhatIfPromise).toBe(true);
  });

  describe('use cases', () => {
    describe('loging in', () => {
      let user;
      let theUserLogins;
      let redirectTheUserToTheDashboard;
      let displayAnErrorMessage;

      beforeEach(() => {
        user = { id: 1, name: 'Jon Snow' };

        theUserLogins = jasmine.createSpy('theUserLogins');
        redirectTheUserToTheDashboard = jasmine.createSpy('redirectTheUserToTheDashboard');
        displayAnErrorMessage = jasmine.createSpy('displayAnErrorMessage');
      });

      describe('happy case', () => {
        beforeEach(() => {
          theUserLogins.and.returnValue(user);
          redirectTheUserToTheDashboard.and.returnValue(true);

          whatIf(theUserLogins)
          .then(redirectTheUserToTheDashboard)
          .otherwise(displayAnErrorMessage);
        });

        it('should call theUserLogins', () => {
          expect(theUserLogins).toHaveBeenCalled();
        });

        it('should call redirectTheUserToTheDashboard', (next) => {
          setTimeout(() => {
            expect(redirectTheUserToTheDashboard).toHaveBeenCalledWith(user);
            next();
          }, 0);
        });

        it('should not call displayAnErrorMessage', (next) => {
          setTimeout(() => {
            expect(displayAnErrorMessage).not.toHaveBeenCalled();
            next();
          }, 0);
        });
      });

      describe('login failure', () => {
        const failureMessage = 'Login failure';

        beforeEach(() => {
          theUserLogins.and.throwError(failureMessage);
          redirectTheUserToTheDashboard.and.returnValue(true);

          whatIf(theUserLogins)
          .then(redirectTheUserToTheDashboard)
          .otherwise(displayAnErrorMessage);
        });

        it('should not call redirectTheUserToTheDashboard', (next) => {
          setTimeout(() => {
            expect(redirectTheUserToTheDashboard).not.toHaveBeenCalled();
            next();
          }, 0);
        });

        it('should call displayAnErrorMessage', (next) => {
          setTimeout(() => {
            expect(displayAnErrorMessage)
            .toHaveBeenCalledWith(new Error(failureMessage));
            next();
          }, 0);
        });
      });

      describe('login success, redirect to dashboard failure', () => {
        const failureMessage = 'Could not redirect';

        beforeEach(() => {
          theUserLogins.and.returnValue(user);
          redirectTheUserToTheDashboard.and.throwError(failureMessage);

          whatIf(theUserLogins)
          .then(redirectTheUserToTheDashboard)
          .otherwise(displayAnErrorMessage);
        });

        it('should call redirectTheUserToTheDashboard', (next) => {
          setTimeout(() => {
            expect(redirectTheUserToTheDashboard).toHaveBeenCalledWith(user);
            next();
          }, 0);
        });

        it('should call displayAnErrorMessage', (next) => {
          setTimeout(() => {
            expect(displayAnErrorMessage)
            .toHaveBeenCalledWith(new Error(failureMessage));
            next();
          }, 0);
        });
      });
    })
  });
});
