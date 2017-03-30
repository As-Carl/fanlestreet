var footapp = angular.module('footapp', ['commonApp']);
footapp.controller('footcontroller', ['$scope', '$http', function($scope, $http) {
	
			$http({
				url: common.baseurl + 'foot',
				method: 'post',
				data: {page: 5}
			}).success(function(res) {
				console.log(res);
				$scope.data = res;

			})
		var i = 1;
		$(window).scroll(function() {
		console.log(scrollY);
		console.log($('.banner').clientTop)
		console.log($('.banner').offsetY);
		var y = parseInt(scrollY /150)
		if(y == 1*i) {
			console.log(i);
			i++;
			$http({
				url: common.baseurl + 'foot',
				method: 'post',
				data: {page: i*5}
			}).success(function(res) {
				console.log(res);
				$scope.data = res;

			})
		}
	})

}])