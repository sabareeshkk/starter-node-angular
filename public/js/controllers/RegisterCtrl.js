angular.module('RegCtrl', [])
.controller('RegController', function($scope, $http, $location) {
    $scope.register_user = {};
	$scope.register = function (){
		console.log('register', $scope.register_user.email);
        $http.post('/auth/register', $scope.register_user)
        .success(function (data, status, headers, config) {
        	console.log('haiiii', data);
            $scope.message = 'Welcome';
            $location.path('/');
        })
        .error(function (data, status, headers, config) {
            $scope.message = 'Error: Invalid user or password';
      });
	}
});