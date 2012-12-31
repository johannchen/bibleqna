'use strict';

describe('Service: ESV', function () {

  // load the service's module
  beforeEach(module('bibleqnaApp'));

  // instantiate service
  var ESV;
  beforeEach(inject(function(_ESV_) {
    ESV = _ESV_;
  }));

  it('should do something', function () {
    expect(!!ESV).toBe(true);
  });

});
