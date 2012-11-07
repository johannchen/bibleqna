'use strict';

bibleqnaApp.factory('Verse', function($resource) {
  return $resource('https://api.mongolab.com/api/1/databases/bible/collections/verses/:id',
    { apiKey: '50983e52e4b0200e9ba50a55' }
  );
});
