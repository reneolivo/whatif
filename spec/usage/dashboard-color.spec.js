'use strict';

const whatIf = require('../../src/whatif');

describe('Use Case: Dashboard Color', () => {
  let displayTheRedDashboard = jasmine.createSpy('redSpy');
  let displayTheBlueDashboard = jasmine.createSpy('blueSpy');
  let displayTheGreenDashboard = jasmine.createSpy('greenSpy');

  function runSpec(theThemeColor) {
    whatIf(theThemeColor === 'red')
    .then(displayTheRedDashboard)
    .butWhatIf(theThemeColor === 'blue')
    .then(displayTheBlueDashboard)
    .otherwise(displayTheGreenDashboard);
  }

  it('should only run displayTheRedDashboard when the color is red', (next) => {
    runSpec('red');

    setTimeout(() => {
      expect(displayTheRedDashboard).toHaveBeenCalledWith(true);
      expect(displayTheBlueDashboard).not.toHaveBeenCalled();
      expect(displayTheGreenDashboard).not.toHaveBeenCalled();
      next();
    }, 0);
  });

  it('should only run displayTheBlueDashboard when the color is blue', () => {
    runSpec('blue');

    expect(displayTheRedDashboard).not.toHaveBeenCalled();
    expect(displayTheBlueDashboard).not.toHaveBeenCalledWith(true);
    expect(displayTheGreenDashboard).not.toHaveBeenCalled();
  });

  it('should only run displayTheGreenDashboard when passing any other color', () => {
    runSpec('gold');

    expect(displayTheRedDashboard).not.toHaveBeenCalled();
    expect(displayTheBlueDashboard).not.toHaveBeenCalled();
    expect(displayTheGreenDashboard).toHaveBeenCalled();
  });
});
