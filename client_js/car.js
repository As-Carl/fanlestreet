var myApp = angular.module('myApp',['globalapp','lazyload']);

// myApp.directive('empty', function () {
//   return {
//     restrict: 'AE',
//     template: '<li class="tips"><h2 ng-bind="name"></h2></li>',
//     replace: true
//   };
// })
myApp.controller('myController', ['$scope', '$http','baseUrl',function($scope,$http,baseUrl){
    $('.other').hide()
    var url=new Search({
     // linkUrl:'http://localhost:555/login.html',
     needID:["userid"]
    })
    var _data = {
          userid:url.init()[0]
      };
    $http({
      url:baseUrl + 'car',
      method:'post',
      data:_data
    }).success(function(response){
      $scope.CarData = response;
      // console.log($scope.CarData.length);
      //判断购物车为空的时候显示为空
        if($scope.CarData.length == 0){
          // console.log(123);
          $('.empty').html('您的购物车空了！');
        }else{$('.empty_car').html('');}
    })
    $scope.more = function(){
      $('.more_mume').css({'display':'block'})
    }
    // del
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
      // location.href = 'http://localhost:555/html/index.html'
      history.go(-1)
    }
    //cancel
    $scope.cancel = function(){
      $('.more_mume').css({'display':'none'})
    }
    //logOff
    $scope.logoff = function(){
      //为完成
    }
    //滑动删除
    $scope.repeatFinish=function(){
      var target = $('.detail')
        $.each(target,function(index,obj){
            touch.on($(obj), 'touchstart', function(ev) {
               ev.preventDefault();
            });
            touch.on($(obj), 'swipeleft', function(ev) {
               obj.lastElementChild.style.display='block';
               $(obj).css({'webkitTransform':'translate3d(-13%,0,0)','webkitTransition':'all ease 0.5s'});
                 $scope.right_del=function(){
                    $http({
                      url:baseUrl + 'del_one',
                      method:'post',
                      data:data = {'room_id':$(this).get(0).value.room_id,'userid':url.init()[0]}
                    }).success(function(response){
                        if(response=='1'){
                          location.reload()
                        }
                    })
                }
                touch.on($(obj), 'swiperight', function(ev) {
                   $(obj).css({'webkitTransform':'translate3d(0,0,0)','webkitTransition':'all ease 0.2s'});
                   obj.lastElementChild.webkitTransition = 'all ease 0.3s';
                    obj.lastElementChild.style.display='none';
               });
            });

        })
    }
    //其他模块
  $('.nav').on('click','li:not(:first-child)',function(){
    $(this).parent().children().css({'border-bottom':'0px solid #12f7e3'});
    $(this).css({'border-bottom':'2px solid #12f7e3'})
    $('.mz_content').hide();
    $('.other').show();
  })
  //第一个li的处理
  $('.nav').on('click','li:first-child',function(){
    $(this).parent().children().css({'border-bottom':'0px solid #12f7e3'});
    $(this).css({'border-bottom':'2px solid #12f7e3'})
    $('.mz_content').show();
    $('.other').hide();
  })
}])
