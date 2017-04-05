
var detailapp=angular.module('detailapp',['lazyload']);

detailapp.config(["$httpProvider", function ($httpProvider) {
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

detailapp.controller('detailCtrll',['$scope','$http',function($scope,$http){

  //事件
 $('.shadow').hide();
 $('.shadow-bototm').hide()
 var bool=true;
 $scope.hide=function(){
  bool=!bool;
  if(!bool){
    setTimeout( this.show(),1000)
  }
  else{
   $('.shadow').hide();
   $('.shadow-bototm').hide()
 }
}
//分享
$scope.show=function(){
 $('.shadow').show();
 $('.shadow-bototm').show();
}
//上一页
$scope.golink=function(){
 setTimeout(function(){
  location.href="http://localhost:555/html/list.html"
},400)
}
//轮播图
  var mySwiper = new Swiper(".swiper-container",{
    direction:"horizontal",/*横向滑动*/
    loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/
    autoplay:3000/*每隔3秒自动播放*/
  })



//点击预定功能
var _data={};
$scope.touch=function(){
    var url=new Search({
     needID:["userid","goodsid","roomid"]
   })
    var room_id="&room_id="+$(this).get(0).value.room_id;

  if(location.search.indexOf('userid') < 0){
     location.href='http://localhost:555/html/login.html';
     }
  else{
      setTimeout(function(){
      location.href="http://localhost:555/html/car.html?userid="+url.init()[0]+room_id;
    },1000)
  //传参
  var time = new Date();
  var now = time.getFullYear()+"-"+time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
  //写入数据库
  _data = {
    "userid":url.init()[0],
    "room_id":$(this).get(0).value.room_id,
    "buynum":"1",
    "time":now
     };
  $http({
    url:"http://localhost:555/insert",
    method:'post',
    data:_data
  }).success(function(){
    console.log('数据写入成功');
    })
  }
}

 //页面请求渲染
 $http({
      url:"http://localhost:555/detail",
      method:'get',
      data:{}
    }).success(function(response){
     var str=location.search;
     if(str.indexOf('goodsid') < 0){
      location.href="http://localhost:555/html/list.html"
     }
      if(str.indexOf('goodsid') > 0 & str.indexOf('userid') <0){
       var url=new Search({
         needID:["goodsid"]
       })
       var arr=url.init();
       var dataArr=[];
       var limitArr=[];
       for (var i = 0; i < response.length; i++) {
        if(arr[0]==response[i].goodsid){
          dataArr.push(response[i])
        }
      }
      for (var j = 0; j < dataArr.length-5; j++) {
        limitArr.push(dataArr[j])
      }
     $scope.showdata=limitArr;
     $scope.num=(dataArr.length-limitArr.length);

   $('.hotel--more').click(function(){
      $http({
        url:"http://localhost:555/more",
        method:'get',
        data:{}
      }).success(function(response){
        var str=location.search;
        if (str.indexOf('goodsid') > 0) {
         var url=new Search({
           needID:["goodsid"]
         })
         var arr=url.init();
         var dataArr=[];
         console.log(response);
         for (var i = 0; i < response.length; i++) {
          if(arr[0]==response[i].goodsid){
            dataArr.push(response[i])
          }
        }
        $scope.showdata=dataArr;
        $('.hotel--more-text').html(" ")
      }
    })
    })
 }


     if (str.indexOf('userid') > 0 & str.indexOf('goodsid') >0) {
       var url=new Search({
         needID:["userid","goodsid"]
       })
       var arr=url.init();
       var dataArr=[];
       var limitArr=[];
      for (var i = 0; i < response.length; i++) {
        if(arr[1]==response[i].goodsid){
          console.log(response[i]);
          dataArr.push(response[i])
          console.log(dataArr);
        }
      }
      for (var j = 0; j < dataArr.length-5; j++) {
        limitArr.push(dataArr[j])
      }
      console.log(limitArr);
     $scope.showdata=limitArr;

     $scope.num=(dataArr.length-limitArr.length);

$('.hotel--more').click(function(){
      $http({
        url:"http://localhost:555/more",
        method:'get',
        data:{}
      }).success(function(response){
        var str=location.search;
        if (str.indexOf('userid') > 0) {
         var url=new Search({
           needID:["userid","goodsid"]
         })
         var arr=url.init();
         var dataArr=[];
         for (var i = 0; i < response.length; i++) {
          if(arr[1]==response[i].goodsid){
            dataArr.push(response[i])
          }
        }
        $scope.showdata=dataArr;
        $('.hotel--more-text').html(" ")
      }
    })
    })
    }
  })

//评论按钮开关
var flg=true;
$scope.toggle=function(){
  flg=!flg;
  if(!flg){
    $('.bottomMore').show();
  }
  else{
    $('.bottomMore').hide()
  }
 }
//发送文本框内容到数据库
$scope.send=function(){
   $('.bottomMore').hide()
   flg=true;
}
}])


