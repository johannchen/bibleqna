'use strict';

describe('Service: Verse', function () {

  // load the service's module
  beforeEach(module('bibleqnaApp'));

  // instantiate service
  var Verse;
  beforeEach(inject(function(_Verse_) {
    Verse = _Verse_;
  }));

  it('should do something', function () {
    expect(!!Verse).toBe(true);
  });

});
