'use strict';

bibleqnaApp.factory('Util', function() {

  // Public API here
  return {
  	/*
	  function findIndexByKeyValue: finds "key" key inside "ob" object that equals "value" value
	  example: findIndexByKeyValue(students, 'name', "Jim");
	  object: students = [
	     {name: 'John', age: 100, profession: 'Programmer'},
	     {name: 'Jim', age: 50, profession: 'Carpenter'}
	  ];
	  would find the index of "Jim" and return 1
	  */
	   
	  findIndexByKeyValue: function(obj, key, value)
	  {
	    for (var i = 0; i < obj.length; i++) {
	      if (obj[i][key] == value) {
	        return i;
	      }
	    }
	    return null;
	  }    
  };
});
