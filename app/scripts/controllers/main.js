'use strict';

bibleqnaApp.controller('MainCtrl', ['$scope', 'Question', 'Bible', 'ESV', 'Storage', 'Util', function($scope, Question, Bible, ESV, Storage, Util) {
  
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
  /*
  $scope.questions = Question.query(
    {q: '{"question": {$regex: "^' + $scope.bookChapter + '.*", $options: "i"}}'}
  );
  */
  $scope.questions = Question.query({id: $scope.bookChapter});
  //$scope.passage = ESV.get({passage:$scope.bookChapter});

  $scope.startVerseNumber = function(question) {
    var verseNumber = null;
    if( question.verse != undefined ) {
      verseNumber = question.verse.match(/:(\d+)/);
    }
    if( verseNumber == null ) {
      return 1;
    } else {      
      return parseInt(verseNumber[1]);
    }
  }
  
  $scope.getQuestions = function() {
    $scope.bookChapter = $scope.book.name + " " + $scope.chapter;
    /*
    $scope.questions = Question.query(
      {q: '{"question": {$regex: "^' + $scope.bookChapter + '.*", $options: "i"}}'}
    );
   */
    $scope.questions = Question.query({id: $scope.bookChapter});
    //$scope.passage = ESV.get({passage:$scope.bookChapter});
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
      var newQuestion = $scope.bookChapter;
    } else {
      var newQuestion = $scope.bookChapter + ":" + $scope.verseNumbers;
    }
    var newQuestion = {
      question: newQuestion,
      verse: $scope.verse
    }
    Question.save(newQuestion, function(question) {
      $scope.questions.unshift(question);
    });
    $scope.verseNumbers = "";
    $scope.question = "";
    $scope.questionFormShowed = false;
  };

  $scope.updateQuestion = function() {
    var question = this.question;
    question.update(function() {
      console.log("updated question");
    });
    this.editMode = false;
  };

  $scope.submitAnswer = function() {
    var question = this.question;
    if (question.answers === undefined) {question.answers = [];}
    question.answers.push(this.newAnswer);
    question.update(function() {
      console.log("answer question");
    });
    this.newAnswer = "";
    this.answerFormShowed = false;

   // save in mongo
   //console.log("id: " + question._id.$oid);
   //var dbQuestion = Question.get({id: question._id.$oid});
   //dbQuestion.update(); 
   //console.log(dbQuestion);
  };

  $scope.removeAnswer = function() {
    if (confirm("Are you sure to remove this answer?")) {
      // get question from parent scope.
      var question = this.$parent.question;
      var index = question.answers.indexOf(this.answer);
      // console.log("answer index: " + index);
      question.answers.splice(index, 1);
      question.update(function() {
        console.log("remove answer");
      });
    };
  };

  $scope.updateAnswer = function() {
    // get question from parent scope.
    var question = this.$parent.question;
    
    var index = question.answers.indexOf(this.answer);    
    question.answers[index] = this.editedAnswer;
    //this.answer = this.editedAnswer;
    
    question.update(function() {
      console.log("update answer");
    });

    this.editAnswerMode = false;
  };

}]);
