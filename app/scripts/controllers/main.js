'use strict';

bibleqnaApp.controller('MainCtrl', function($scope, Verse) {
  $scope.verses = Verse.query();

  $scope.save = function() {
    $scope.verses.push($scope.verse);
    // save in mongo
    Verse.save($scope.verse);
    $scope.verse = {};
  };

  $scope.answer = function(verse) {
   // save in mongo
   console.log("id: " + verse._id);
   var dbVerse = Verse.get({id: verse._id});
   //verse.update(); 
   console.log(dbVerse);
  };
});
