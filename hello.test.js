const hi = require('./hello');

describe('hi', () => {
  it('should return Hello world!', () => {
    expect(hi()).toBe("Hello world!");
  });
});
