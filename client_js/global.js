var globalapp = angular.module('globalapp', []);

globalapp.value('baseUrl', 'http://localhost:555/');

globalapp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.transformRequest=function(obj){
        var str=[];
        for(var p in obj){
            str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };
    $httpProvider.defaults.headers.post={
        'Content-Type':'application/x-www-form-urlencoded'
    }

}]);

globalapp.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);


globalapp.filter('range', function(){
	return function(array, range){
		if(!(array instanceof Array)){
			array = [];
		}
		if(typeof range != 'number' || parseInt(range) < 1){
			range = 1;
		}
		for(var i = 0; i < range; i++){
			array.push(i);
		}
		return array;
	}
});

//循环完毕后执行
globalapp.directive('repeatFinish', function () {
    return {
    	restrict: 'A',
        link: function (scope, element, attrs) {
        	// console.log(scope.$last);
            if (scope.$last === true) {
                scope.repeatFinish();
            }
        }
    }
})
