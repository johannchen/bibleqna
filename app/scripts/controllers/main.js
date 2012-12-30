'use strict';

bibleqnaApp.controller('MainCtrl', function($scope, Verse) {
  $scope.verses = Verse.query();

  $scope.submitQuestion = function() {
    // save in mongo
    Verse.save($scope.verse, function(verse) {
      $scope.verses.unshift(verse);
    });
    $scope.verse = {};
    $scope.questionFormShowed = false;
  };

  $scope.updateQuestion = function() {
    var verse = this.verse;
    verse.update(function() {
      console.log("update question");
    });
    this.editMode = false;
  };

  $scope.submitAnswer = function() {
    var verse = this.verse;
    if (verse.answers === undefined) {verse.answers = [];}
    verse.answers.push(this.newAnswer);
    verse.update(function() {
      console.log("answer question");
    });
    this.newAnswer = "";
    this.answerFormShowed = false;

   // save in mongo
   //console.log("id: " + verse._id.$oid);
   //var dbVerse = Verse.get({id: verse._id.$oid});
   //dbVerse.update(); 
   //console.log(dbVerse);
  };

  $scope.removeAnswer = function() {
    if (confirm("Are you sure to remove this answer?")) {
      // get verse from parent scope.
      var verse = this.$parent.verse;
      var index = verse.answers.indexOf(this.answer);
      // console.log("answer index: " + index);
      verse.answers.splice(index, 1);
      verse.update(function() {
        console.log("remove answer");
      });
    };
  };

  $scope.updateAnswer = function() {
    // get verse from parent scope.
    var verse = this.$parent.verse;
    
    var index = verse.answers.indexOf(this.answer);    
    verse.answers[index] = this.editedAnswer;
    //this.answer = this.editedAnswer;
    
    verse.update(function() {
      console.log("update answer");
    });

    this.editAnswerMode = false;
  };

});
