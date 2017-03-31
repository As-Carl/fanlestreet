var app = angular.module("myapp", ['commonApp']);
app.controller("mycontroller", ["$scope", "$http", function($scope, $http) {
//	console.log($scope.user, $scope.code);
	
	$scope.log = function() {
		if ($scope.user == undefined || $scope.code == undefined) {
			return alert("亲,请登录");
		}
		var _data = {
			user: $scope.user,
			code: $scope.code
		};
		var isoff = false;
		console.log(common.baseurl);
		$http({
			url: common.baseurl + 'login1',
			method: 'get',
		}).success(function(res) {

			for(var i = 0; i < res.length; i++) {
				//				console.log(res[i].user,res[i].pwd)
				//				console.log($scope.user,$scope.code)
				if(res[i].user == $scope.user && res[i].pwd == $scope.code) {
					self.location.href = "index.html?userid=" + res[i].userid;
					isoff = true;
					return;
				}
			}

			if(!isoff) {
				console.log(_data);
				$http({
					url: common.baseurl + 'loginccc',
					method: 'post',
					data: _data
				}).success(function(res) {
					console.log(res);
					//					self.location.href = "index.html?id="+res[i].userid;
					$http({
						url: common.baseurl + 'login1',
						method: 'get'
					}).success(function(res) {
						for(var i = 0; i < res.length; i++) {
							//				console.log(res[i].user,res[i].pwd)
							//				console.log($scope.user,$scope.code)
							if(res[i].user == $scope.user && res[i].pwd == $scope.code) {
								self.location.href = "index.html?userid=" + res[i].userid;
								return;
							}
						}
					})
				})
			}
		});

	};
}])