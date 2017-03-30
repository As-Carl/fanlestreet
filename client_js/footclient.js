var footapp = angular.module('footapp',['commonApp']);
footapp.controller('footcontroller',['$scope','$http',function($scope,$http){
	$http({
		url: common.baseurl + 'foot',
		method:'get',
	}).success(function(res){
		console.log(res);
		$scope.data = res;
	})
}])
