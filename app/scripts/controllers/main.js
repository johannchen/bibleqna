'use strict';

bibleqnaApp.controller('MainCtrl', ['$scope', 'Question', 'Answer', 'Bible', 'ESV', 'Storage', 'Util', function($scope, Question, Answer, Bible, ESV, Storage, Util) {
  
  $scope.bible = Bible.getBooks();
  
  var bookIndex = Util.findIndexByKeyValue($scope.bible, 'name', Storage.getObject('book'));
  $scope.book = $scope.bible[bookIndex];
  $scope.chapter = Storage.getObject('chapter');
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
  $scope.passage = ESV.get({ref:$scope.bookChapter});
  $scope.commentaries = [];

  $scope.startVerseNumber = function(question) {
    var verseNumber = null;
    if( question.verse != undefined ) {
      verseNumber = question.verse.match(/:(\d+)/);
    }
    if( verseNumber == null ) {
      return 0;
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
    $scope.passage = ESV.get({ref:$scope.bookChapter});
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
      var newVerse = $scope.bookChapter + ":";
    } else {
      var newVerse = $scope.bookChapter + ":" + $scope.verseNumbers;
    }
    var newQuestion = {
      verse: newVerse,
      question: $scope.question 
    }
    Question.save(newQuestion, function(question) {
      $scope.questions.unshift(question);
    });
    $scope.verseNumbers = "";
    $scope.question = "";
    $scope.questionFormShowed = false;
  };

  $scope.updateQuestion = function() {
    var editedVerse = this.editedVerse;
    var editedQuestion = this.editedQuestion;
    var question = this.question;

    question.verse = editedVerse;
    question.question = editedQuestion;
    delete question.answers;
    question.update(function() {
      console.log("updated question");
    });
    
    this.question.verse = editedVerse;
    this.question.question = editedQuestion;
    this.editMode = false;
  };

  $scope.submitAnswer = function() {
    var question = this.question;
    if (question.answers === undefined) {question.answers = [];}
    var newAnswer = this.newAnswer;
    newAnswer.question_id = question.id;
    Answer.save(newAnswer, function(answer) {
      question.answers.push(answer);
      console.log("answer question");
    });
    this.newAnswer = {};
    this.answerFormShowed = false;

  };

  $scope.removeAnswer = function() {
    if (confirm("Are you sure to remove this answer?")) {
      var answer = this.answer;
      // get question from parent scope.
      var question = this.$parent.question;
      var index = question.answers.indexOf(answer);
      // console.log("answer index: " + index);
      question.answers.splice(index, 1);
      Answer.delete(answer, function() {
        console.log("remove answer");
      });
    };
  };

  $scope.updateAnswer = function() {
    /*
    var answer = this.answer;
    answer.answer = this.editedAnswer;
    answer.update(function() {
      console.log("update answer");
    });
  */
    var editedAnswer = this.editedAnswer;
    var answer = Answer.get({id:this.answer.id}, function() {
      answer.answer = editedAnswer;
      answer.update(function() {
        console.log("update answer");
      });
    });
    this.answer.answer = editedAnswer;
    this.editAnswerMode = false;
  };

  $scope.submitCommentary = function() {
    if ($scope.commentaryVerseNumbers === undefined) {
      var newVerse = $scope.bookChapter + ":";
    } else {
      var newVerse = $scope.bookChapter + ":" + $scope.commentaryVerseNumbers;
    }
    var newCommentary = {
      verse: newVerse,
      commentary: $scope.commentaryContent,
      source: $scope.commentarySource 
    }
    console.log(newCommentary);
    $scope.commentaries.unshift(newCommentary);
    /*
    Question.save(newCommentary, function(commentary) {
      $scope.commentaries.unshift(commentary);
    });
*/
$scope.commentaryVerseNumbers = "";
$scope.commentaryContent = "";
$scope.commentarySource = "";
    $scope.commentaryFormShowed = false;
  };
}]);
