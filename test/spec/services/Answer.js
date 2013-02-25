'use strict';

describe('Service: Answer', function () {

  // load the service's module
  beforeEach(module('bibleqnaApp'));

  // instantiate service
  var Answer;
  beforeEach(inject(function(_Answer_) {
    Answer = _Answer_;
  }));

  it('should do something', function () {
    expect(!!Answer).toBe(true);
  });

});
