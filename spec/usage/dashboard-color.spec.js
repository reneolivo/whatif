'use strict';

const whatIf = require('../../src/whatif');

describe('Use Case: Dashboard Color', () => {
  let displayTheRedDashboard;
  let displayTheBlueDashboard;
  let displayTheGreenDashboard;

  beforeEach(() => {
    displayTheRedDashboard = jasmine.createSpy('redSpy');
    displayTheBlueDashboard = jasmine.createSpy('blueSpy');
    displayTheGreenDashboard = jasmine.createSpy('greenSpy');
  });

  function runSpec(theThemeColor) {
    whatIf(theThemeColor === 'red')
    .then(displayTheRedDashboard)
    .butWhatIf(theThemeColor === 'blue')
    .then(displayTheBlueDashboard)
    .otherwise(displayTheGreenDashboard);
  }

  it('should only run displayTheRedDashboard when the color is red', (done) => {
    runSpec('red');

    setTimeout(() =>  {
      expect(displayTheRedDashboard).toHaveBeenCalledWith(true);
      expect(displayTheBlueDashboard).not.toHaveBeenCalled();
      expect(displayTheGreenDashboard).not.toHaveBeenCalled();
      done();
    }, 0);

  });

  it('should only run displayTheBlueDashboard when the color is blue', (done) => {
    runSpec('blue');

    setTimeout(() =>  {
      expect(displayTheRedDashboard).not.toHaveBeenCalled();
      expect(displayTheBlueDashboard).toHaveBeenCalledWith(true);
      expect(displayTheGreenDashboard).not.toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should only run displayTheGreenDashboard when passing any other color', (done) => {
    runSpec('gold');

    setTimeout(() =>  {
      expect(displayTheRedDashboard).not.toHaveBeenCalled();
      expect(displayTheBlueDashboard).not.toHaveBeenCalled();
      expect(displayTheGreenDashboard).toHaveBeenCalled();
      done();
    }, 0);
  });
});
