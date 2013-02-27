'use strict';

bibleqnaApp.factory('Question', ['$resource', function($resource) {
  var Question = $resource('http://www.gracedimension.com/api/bibleqna/question/:id',
    {},
    { update: { method: 'PUT' } } 
  );
  
  Question.prototype.update = function(cb) {
    return Question.update({id: this.id},
      angular.extend({}, this, {id:undefined}), cb);
  };
  return Question;
}]);
