'use strict';

module.exports = class WhatIfPromise extends Promise {
  otherwise(failure) {
    return this.then(null, failure);
  }

  butWhatIf(whatIfCondition) {
    return WhatIfPromise.whatIf(whatIfCondition);
  }

  static whatIf(whatIfCondition) {
    if (typeof whatIfCondition === 'function') {
      return new WhatIfPromise((resolve, reject) => {
        const result = whatIfCondition();

        result ? resolve(result) : reject(result);
      });
    } else {
      return whatIfCondition ?
      WhatIfPromise.resolve(whatIfCondition) :
      WhatIfPromise.reject(whatIfCondition);
    }
  }
}
