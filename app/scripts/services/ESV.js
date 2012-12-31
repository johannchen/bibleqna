'use strict';

bibleqnaApp.factory('ESV', function($resource) {
  var ESV = $resource('http://www.esvapi.org/v2/rest/passageQuery',
    { key: 'IP',  passage: 'John 1'} 
  );

  return ESV;
});
