var twApp = angular.module('twApp',['lazyload']);
var twController = twApp.controller('twController',['$scope', '$http',function($scope,$http){

  document.getElementsByClassName('mask')[0].style.display = 'block';
     $http.get('http://localhost:555/index').success(function(data){
        console.log(data)
        $scope.datas=data;
        document.getElementsByClassName('mask')[0].style.display = 'none';
        $scope.twhref = location.search;
        console.log($scope.twhref)
        if(!$scope.twhref){
         $scope.twhref = '';
        }
        $('.s1').on('touchstart','li',function(){
          console.log(111);
          location.href =  "http://localhost:555/html/list.html"+$scope.twhref ;
        })
     })


  // 手势
  var i=0;
  var twtouch = new TWTouch( {
       toLeft:function(){
        i++;
        $('.s1').eq(i).css({'display':'block',
          'left':0,'top':0
        }).siblings().css({
          'display':'none',
          'left':'5rem',
          'top':0
        })

         if(i >= $('.s1').length){
          i = $('.s1').length-1;
         }
         $('.sb').find('span').eq(i).attr('class','active').siblings().removeAttr('class')
         // console.log(i);
      },
     toRight  :function(){
      i--;
      if(i <= 0){
          i =0;
         }
      $('.s1').eq(i).css({'display':'block',
         'left':0,'top':0
         }).siblings().css({
         'display':'none',
         'left':'5rem',
         'top':0
     })
     $('.sb').find('span').eq(i).attr('class','active').siblings().removeAttr('class')

         console.log(i);
      },
    });

    // 透明的轮播
    var index = 0;
    var aLi = $('#list').find('li');
    var timer = null;
    function move(){
      index++;
      for(var i=0;i<aLi.length;i++){
          if( i== index%aLi.length ){
            aLi.eq(i).css({'opacity':1,'transition':'2s'})
             // startMove(aLi[i],{'opacity':1})
          }else{
            aLi.eq(i).css({'opacity':0,'transition':'2s'})
               // startMove(aLi[i],{'opacity':0})
          }
      }
    }
    timer = setInterval(move,5000);
}])





