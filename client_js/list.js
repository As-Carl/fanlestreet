var ywApp = angular.module('ywApp',['lazyload']);
var ywController = ywApp.controller('ywController',['$scope', '$http',function($scope,$http){
	$http({
		method:"get",
		url:'http://localhost:555/list'
	}
	).success(function(data){
		console.log(data)
		$scope.datas=data;
	})
	var twtouch=new TWTouch({
		toBottom:function(){
			var shadow = $('#shadow').css('display','block')
			$http({
				method:"get",
				url:'http://localhost:555/list'
			}
			).success(function(data){
				console.log(data)
				$scope.datas=data;
				shadow = $('#shadow').css('display','none')
			})
		}
	});
   $scope.click=function(){
     $('.box').css('display','block');
     var self = this;
   	 setTimeout(function(){
      var userid =  location.search;
      console.log(userid);
   	 	var goodsid = $scope.datas[self.$index].goodsid
      if(!userid){
        console.log(111);
        window.open("/html/detail.html?goodsid="+goodsid,'_self');
      }else{
          console.log(222)
         window.open("/html/detail.html"+userid+"&goodsid="+goodsid,'_self');
      }
   	 },500)
   }

}]).directive('box', function () {
  return {
    restrict: 'C',
    template: '<i class="fa fa-spinner fa-spin fa-3x fa-fw" id="go"></i>',
    replace:false
  };
})
