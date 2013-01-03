'use strict';

bibleqnaApp.controller('MainCtrl', function($scope, Verse, Bible, ESV) {
  //$scope.passage = ESV.query();
  $scope.bible = Bible.getBooks();
  // default book and chapter
  //$scope.book = {name: "John", chapter: 21};
  $scope.book = $scope.bible[42];
  $scope.chapter = 1;
  $scope.bookChapter = "John 1";
  $scope.verses = Verse.query(
    {q: '{"verse": {$regex: "^John 1", $options: "i"}}'}
  );

  $scope.getQuestions = function() {
    $scope.bookChapter = $scope.book.name + " " + $scope.chapter;
    $scope.verses = Verse.query(
      {q: '{"verse": {$regex: "^' + $scope.bookChapter + '.*", $options: "i"}}'}
    );
  };

  $scope.changeBook = function() {
    $scope.chapter = 1;
    $scope.getQuestions();
  };

  $scope.prevChapter = function() {
    $scope.chapter--;
    $scope.getQuestions();
  };

  $scope.nextChapter = function() {
    $scope.chapter++;
    $scope.getQuestions();
  };

  $scope.submitQuestion = function() {
    if ($scope.verseNumbers === undefined) {
      var newVerse = $scope.bookChapter;
    } else {
      var newVerse = $scope.bookChapter + ":" + $scope.verseNumbers;
    }
    var newQuestion = {
      verse: newVerse,
      question: $scope.question
    }
    // save in mongo
    Verse.save(newQuestion, function(verse) {
      $scope.verses.unshift(verse);
    });
    $scope.verseNumbers = "";
    $scope.question = "";
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
