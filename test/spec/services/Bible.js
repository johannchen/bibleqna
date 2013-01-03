'use strict';

describe('Service: Bible', function () {

  // load the service's module
  beforeEach(module('bibleqnaApp'));

  // instantiate service
  var Bible;
  beforeEach(inject(function(_Bible_) {
    Bible = _Bible_;
  }));

  it('should do something', function () {
    expect(!!Bible).toBe(true);
  });

});
