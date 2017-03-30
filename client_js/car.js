var myApp = angular.module('myApp',['globalapp','lazyload']);
// <span class="fa fa-cart-plus" ></span>
myApp.directive('empty', function () {
  return {
    restrict: 'AEC',
    template: '<li class="tips"><h2 ng-bind="name"></h2></li>',
    replace: true
  };
})
myApp.controller('myController', ['$scope', '$http','baseUrl',function($scope,$http,baseUrl){
    var url=new Search({
     linkUrl:'http://localhost:5555/login.html',
     needID:["userid"]
    })
    // var data = url.init()[0]
    var _data = {
          userid:url.init()[0]
      };
    // console.log(data)
    $http({
      url:baseUrl + 'car',
      method:'post',
      data:_data
    }).success(function(response){
      // console.log(response[0]);
      $scope.CarData = response;
      //判断购物车为空的时候显示为空
        if($scope.CarData.length == 0){
          // console.log(12434)
          $scope.name = '您的购物车空了！';
        }
    })
    $scope.more = function(){
      console.log(123)
      $('.more_mume').css({'display':'block'})
    }
    //del
    $scope.del=function(){
      $http({
        url:baseUrl + 'delAll_car',
        method:'post',
        data:data = _data
      }).success(function(response){
          if(response=='1'){
            location.reload()
          }
      })
    }
    //back
    $scope.back = function(){
      location.href = 'http://localhost:555/html/index.html'
    }
    //cancel
    $scope.cancel = function(){
      $('.more_mume').css({'display':'none'})
    }

}])
