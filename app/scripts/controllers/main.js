'use strict';

bibleqnaApp.controller('MainCtrl', function($scope, Verse) {
  $scope.verses = Verse.query();
});
