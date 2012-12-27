'use strict';

bibleqnaApp.factory('Verse', function($resource) {
  var Verse = $resource('https://api.mongolab.com/api/1/databases/bible/collections/verses/:id',
    { apiKey: '50983e52e4b0200e9ba50a55' }, {
      update: { method: 'PUT' }
    }
  );

  Verse.prototype.update = function(cb) {
    return Verse.update({id: this._id.$oid},
      angular.extend({}, this, {_id:undefined}), cb);
  };
  return Verse;
});
