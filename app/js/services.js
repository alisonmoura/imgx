angular.module('ImgxApp.services',[])
.factory('GalleryService', function($http){
	return {
		all: function(callback){
			$http.get("./js/galleries.json")
			.then(
				function success(resp){
					callback(null, resp.data);
				},
				function err(err){
					callback(err, null);
				}
			);
		}
	}
})
.factory('LoginService', function($http){
	return {
		login: function(email, password, callback){
			$http.post("http://localhost:3000/login", {email: email, password: password})
			.then(
				function success(resp){
					callback(null, resp.data);
				},
				function err(err){
					callback(err, null);
				}
			);
		}
	}
});