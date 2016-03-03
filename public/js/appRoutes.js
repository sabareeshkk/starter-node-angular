angular.module('appRoutes', ['ui.router'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'MainController'
		})

		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'NerdController'
		})

		.when('/chat', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'	
		});

	$locationProvider.html5Mode(true);

}])
.run(function ($rootScope, $location, $window) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      if (!$window.sessionStorage.token){
        $location.path('/')
      }
    });
  });
/*.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html",
      controller: 'MainController'
    })
    .state('nerd', {
      url: "/nerds",
      templateUrl: "views/nerd.html",
      controller: 'NerdController'
    })
    .state('geek', {
      url: "/geeks",
      templateUrl: "views/geek.html",
      controller: 'GeekController'
    });
});*/