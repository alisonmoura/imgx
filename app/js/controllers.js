angular.module('ImgxApp.controllers',[])
.controller('GalleryController', function($scope, $rootScope, GalleryService){

	$rootScope.pageTitle = 'Gallery';
	$scope.galleries = [];

	GalleryService.all((err, data) => {
		$scope.galleries = data;
	});

	$scope.getFormatedDate = (date) => {
		if(date != "")
			return new Date(date).toLocaleDateString();
		else return "";
	}

	$scope.selectMainImage = function (gallery) {
		for (var i = 0; i < gallery.images.length; i++) {
			if (gallery.images[i].main) {
				return gallery.images[i].image;
			}
		}
	}

})
.controller('LoginController', function($scope, $rootScope, LoginService){
	$scope.login = function(email, password){
		LoginService.login(email, password, (err, result) => {
			if(!err){
				$rootScope.logedUser = result;
				location.href = "/gallery";
				localStorage.setItem("logedUser",JSON.stringify(result));
			}
			else alert(err);
		})
	}
})