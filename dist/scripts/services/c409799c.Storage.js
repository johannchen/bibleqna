'use strict';

bibleqnaApp.factory('Storage', function() {
  var myStorage = {};

	myStorage.getObject = function(key) {
		var data = [];
		var json_object = localStorage[key];
		if (json_object) {
			data = JSON.parse(json_object);
		}
		return data;
	};

  myStorage.getString = function(key) {
    return localStorage[key];
  };

	myStorage.saveObject = function(objectToSave, key) {
		localStorage[key] = JSON.stringify(objectToSave);
	};

	myStorage.supported = function() {
		return 'localStorage' in window && window['localStorage'] !== null;
	};

	return myStorage;
});
