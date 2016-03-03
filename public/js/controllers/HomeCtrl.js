angular.module('HomeCtrl', []).controller('HomeController', function($scope, $rootScope) {

	var socket = io();
	$scope.temp = {};

	$scope.chat_list = [];
	$scope.send = function (){
		console.log('$scope', $scope.chat_message);
		$scope.right = $scope.chat_message;
		socket.emit('send', $scope.chat_message);
	}

	socket.on('message', function(data) {
	  $scope.$apply(function() {
            $scope.temp.left = data;
      });
	});

});