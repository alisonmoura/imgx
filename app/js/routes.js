angular.module('ImgxApp.routes',['ngRoute'])
	.config(function($routeProvider, $locationProvider){
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/gallery',{
				templateUrl:'./../templates/gallery.html',
				controller: 'GalleryController'
			})
			.otherwise({
				redirectTo: '/gallery'
			});
	});