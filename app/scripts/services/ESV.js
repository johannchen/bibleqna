'use strict';

bibleqnaApp.factory('ESV', ['$resource', function($resource) {
/*
  var ESV = $resource('http://www.esvapi.org/v2/rest/passageQuery',
    { key: 'IP',  passage: 'John 1'} 
  );
*/
	return $resource('/bible/:passage', {passage:'@passage'});
}]);
