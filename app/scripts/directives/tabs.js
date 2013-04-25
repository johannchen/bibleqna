'use strict';

angular.module('bibleqnaApp')
  .directive('tabs', function () {
    return {
      template: 
	      '<div class="tabbable">' +
	      	'<ul class="nav nav-tabs">' + 
	      		'<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
	      			'<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
	      		'</li>' +
	      	'</ul>' +
	      	'<div class="tab-content" ng-transclude></div>' +
	      '</div>',
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
      	var panes = $scope.panes = [];
      	$scope.select = function(pane) {
      		angular.forEach(panes, function(pane) {
      			pane.selected = false;
      		});
      		pane.selected = true;
      	}

      	this.addPane = function(pane) {
      		if (panes.length == 0) $scope.select(pane);
      		panes.push(pane);
      	}
      },
      replace: true
    };
  }).
  directive('pane', function() {
  	return {
  		template:
  			'<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>',
  		require: '^tabs',
  		restrict: 'E',
  		transclude: true,
  		scope: {title: '@'},
  		link: function(scope, element, attrs, tabsCtrl) {
  			tabsCtrl.addPane(scope);
  		},
  		replace: true
  	};
  });
