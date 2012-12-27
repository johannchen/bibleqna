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
    if (verse.answers === undefined) {verse.answers = [];}
    verse.answers.push(this.newAnswer);
    verse.update(function() {
      console.log("answer question");
    });
    this.newAnswer = "";

   // save in mongo
   //console.log("id: " + verse._id.$oid);
   //var dbVerse = Verse.get({id: verse._id.$oid});
   //dbVerse.update(); 
   //console.log(dbVerse);
  };
});
