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
});
