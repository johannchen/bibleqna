'use strict';

describe('Directive: tabs', function () {
  beforeEach(module('bibleqnaApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<tabs></tabs>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the tabs directive');
  }));
});
