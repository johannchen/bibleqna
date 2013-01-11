'use strict';

bibleqnaApp.controller('MainCtrl', ['$scope', 'Verse', 'Bible', 'ESV', 'Storage', 'Util', function($scope, Verse, Bible, ESV, Storage, Util) {
  
  //$scope.passage = ESV.query();
  $scope.bible = Bible.getBooks();
  // default book and chapter
  //$scope.book = {name: "John", chapter: 21};
  //$scope.book = $scope.bible[42];
  var bookIndex = Util.findIndexByKeyValue($scope.bible, 'name', Storage.getObject('book'));
  $scope.book = $scope.bible[bookIndex];
  $scope.chapter = Storage.getObject('chapter');
  console.log("storage book: " + $scope.book);
  if($scope.book === undefined) {
    $scope.book = $scope.bible[42];
    $scope.chapter = 1;
    Storage.saveObject($scope.book.name, 'book');
    Storage.saveObject(1, 'chapter');
  }  
  $scope.bookChapter = $scope.book.name + " " + $scope.chapter;;
  $scope.verses = Verse.query(
    {q: '{"verse": {$regex: "^' + $scope.bookChapter + '.*", $options: "i"}}'}
  );
  $scope.passage = ESV.get({passage:$scope.bookChapter});

  $scope.startVerseNumber = function(question) {
    var verseNumber = question.verse.match(/:(\d+)/);
    if( verseNumber == null ) {
      return 1;
    } else {      
      return parseInt(verseNumber[1]);
    }
  }
  
  $scope.getQuestions = function() {
    $scope.bookChapter = $scope.book.name + " " + $scope.chapter;
    $scope.verses = Verse.query(
      {q: '{"verse": {$regex: "^' + $scope.bookChapter + '.*", $options: "i"}}'}
    );
    $scope.passage = ESV.get({passage:$scope.bookChapter});
    Storage.saveObject($scope.chapter, 'chapter');
  };

  $scope.changeBook = function() {
    $scope.chapter = 1;
    $scope.getQuestions();
    Storage.saveObject($scope.book.name, 'book');
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

}]);
