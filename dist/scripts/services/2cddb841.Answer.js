'use strict';

bibleqnaApp.factory('Answer', ['$resource', function($resource) {
  var Answer = $resource('http://www.gracedimension.com/esvqna/answer/:id',
    {},
    { update: { method: 'PUT' } } 
  );
  
  Answer.prototype.update = function(cb) {
    return Answer.update({id: this.id},
      angular.extend({}, this, {id:undefined}), cb);
  };
  return Answer;
}]);  

