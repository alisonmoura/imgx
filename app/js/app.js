angular.module('ImgxApp', ['ImgxApp.routes','ImgxApp.services','ImgxApp.controllers'])
	.run(function($rootScope, $location){

		$rootScope.logedUser = JSON.parse(localStorage.getItem("logedUser"));

		if($location.path() != '/login.html' && ($rootScope.logedUser == undefined || $rootScope.logedUser == null || $rootScope.logedUser == {} || $rootScope.logedUser == ''))
			window.location.href = "/login.html"
		else{
			if($location.path() != '/login.html')
				document.body.style.display = "block";
		}
	})