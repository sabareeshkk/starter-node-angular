angular.module('MainCtrl', [])
.controller('MainController',function($scope, $http, $location, $window) {
	$scope.user = {};
	$scope.login = function() {
		$http.post('/auth/login', $scope.user)
		.success(function (data, status, headers, config) {
        	console.log('haiiii', data);
            $scope.message = 'Welcome';
            $window.sessionStorage.token = data.token;
            $location.path('/chat');
        })
        .error(function (data, status, headers, config) {
            delete $window.sessionStorage.token;
            $scope.message = 'Error: Invalid user or password';
        });
	}
});