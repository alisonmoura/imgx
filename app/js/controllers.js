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

	$scope.addGallery = function(){
		angular.element("#new-gallery-dialog")[0].style.display="block";
	}

	$scope.closeGalleryModal = function(){
		angular.element("#new-gallery-dialog")[0].style.display="none";
	}

})
.controller('LoginController', function($scope, $rootScope, LoginService, UserService){
	$scope.isToRegister = false;
	$scope.login = function(email, password){
		LoginService.login(email, password, (err, result) => {
			if(!err){
				$rootScope.logedUser = result;
				location.href = "/gallery";
				localStorage.setItem("logedUser",JSON.stringify(result));
			}
			else alert(err);
		});
	}
	$scope.register = function(name, email, password){
		UserService.insert(name, email, password, (err, result) => {
			if(!err){
				LoginService.login(email, password, (err, result) => {
					if(!err){
						$rootScope.logedUser = result;
						location.href = "/gallery";
						localStorage.setItem("logedUser",JSON.stringify(result));
					}
					else alert(JSON.stringify(err));
				});
			}
			else alert(JSON.stringify(err));
		})
	}
})
.controller('LogoutController', function($rootScope){
	function logout(){
		localStorage.setItem("logedUser","");
		window.location.href="/login.html"
	}
	logout();
});