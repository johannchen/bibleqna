'use strict';

bibleqnaApp.controller('MainCtrl', function($scope, Verse, ESV) {
  //$scope.passage = ESV.query();
  $scope.bible = [
    {name:"Genesis", chapter:50},
    {name:"Exodus", chapter:40 },
    {name:"Leviticus", chapter:27 },
    {name:"Numbers", chapter:36 },
    {name:"Deuteronomy", chapter:34 },
    {name:"Joshua", chapter:24 },
    {name:"Judges", chapter:21 },
    {name:"Ruth", chapter:4 },
    {name:"1 Samuel", chapter:31 },
    {name:"2 Samuel", chapter:24 },
    {name:"1 Kings", chapter:22 },
    {name:"2 Kings", chapter:25 },
    {name:"1 Chronicles", chapter:29 },
    {name:"2 Chronicles", chapter:36 },
    {name:"Ezra", chapter:10 },
    {name:"Nehemiah", chapter:13 },
    {name:"Esther", chapter:10 },
    {name:"Job", chapter:42 },
    {name:"Psalm", chapter:150 },
    {name:"Proverbs", chapter:31 },
    {name:"Ecclesiastes", chapter:12 },
    {name:"Song of Songs", chapter:8 },
    {name:"Isaiah", chapter:66 },
    {name:"Jeremiah", chapter:52 },
    {name:"Lamentations", chapter:5 },
    {name:"Ezekiel", chapter:48 },
    {name:"Daniel", chapter:12 },
    {name:"Hosea", chapter:14 },
    {name:"Joel", chapter:3 },
    {name:"Amos", chapter:9 },
    {name:"Obadiah", chapter:1 },
    {name:"Jonah", chapter:4 },
    {name:"Micah", chapter:7 },
    {name:"Nahum", chapter:3 },
    {name:"Habakkuk", chapter:3 },
    {name:"Zephaniah", chapter:3 },
    {name:"Haggai", chapter:2 },
    {name:"Zechariah", chapter:14 },
    {name:"Malachi", chapter:4 },
    {name:"Matthew", chapter:28 },
    {name:"Mark", chapter:16 },
    {name:"Luke", chapter:24 },
    {name:"John", chapter:21 },
    {name:"Acts", chapter:28 },
    {name:"Romans", chapter:16 },
    {name:"1 Corinthians", chapter:16 },
    {name:"2 Corinthians", chapter:13 },
    {name:"Galatians", chapter:6 },
    {name:"Ephesians", chapter:6 },
    {name:"Philippians", chapter:4 },
    {name:"Colossians", chapter:4 },
    {name:"1 Thessalonians", chapter:5 },
    {name:"2 Thessalonians", chapter:3 },
    {name:"1 Timothy", chapter:6 },
    {name:"2 Timothy", chapter:4 },
    {name:"Titus", chapter:3 },
    {name:"Philemon", chapter:1 },
    {name:"Hebrews", chapter:13 },
    {name:"James", chapter:5 },
    {name:"1 Peter", chapter:5 },
    {name:"2 Peter", chapter:3 },
    {name:"1 John", chapter:5 },
    {name:"2 John", chapter:1 },
    {name:"3 John", chapter:1 },
    {name:"Jude", chapter:1 },
    {name:"Revelation",chapter:22 }
  ];
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
