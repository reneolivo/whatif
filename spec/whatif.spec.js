'use strict';

let whatIf = require('../src/whatif');
let WhatIfPromise = require('../src/promise');

describe('WhatIf', () => {
  let whatIfSpy;

  beforeEach(() => {
    const wrapper = { WhatIfPromise: WhatIfPromise };

    whatIfSpy = spyOn(wrapper, 'WhatIfPromise').and.callThrough();
  });

  it('should be defined', () => {
    expect(typeof whatIf).toBe('function');
  });

  it('should return a WhatIfPromise', () => {
    const result = whatIf(true);

    expect(result instanceof WhatIfPromise).toBe(true);
  });
});
