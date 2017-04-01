
    function Search(_obj){
      var obj={
       linkUrl:'10.7.135.25:555/detail/detail.html',
       pathUrl:'10.7.135.25:555/detail/detail.html?userid=123&goodsid=10001&roomid=80001',
       needID:["userid","goodsid","roomid","place"]
     }
     this.obj=_obj;
     this.obj.pathUrl=location.href;
}
//初始化，分隔搜索路径中需要的字段，方便与数据库对比，然后取出自己需要的数据
Search.prototype.init=function(){
  var firstArr=[], result=[], secondArr=[],string='';
  if(this.obj.pathUrl.indexOf('?')> 0 & this.obj.pathUrl.indexOf('=') > 0 ){
    firstArr=this.obj.pathUrl.split("?");//截取？后面的字段
    if(this.obj.pathUrl.indexOf('&') < 0){
      result=firstArr[1];
    }else if(this.obj.pathUrl.indexOf('&') > 0){
      string=firstArr[1] + '';
      secondArr=string.split('&');//["userid=123","goodsid=10001","roomid=80001"]
      for (var i = 0; i < secondArr.length; i++) {
        for (var j = 0; j < this.obj.needID.length; j++) {
          if (secondArr[i].indexOf(this.obj.needID[j]) > 0) {
          }
        }
        result.push(secondArr[i]);
      }
    }
  }

 return  this.show(result)
}
  Search.prototype.show=function(result){
    var numArr=[], resArr=[];
    if(typeof result=='string'){
      numArr= result.split('=');
      resArr.push(numArr[1]);
    }else if(result instanceof Array){
      for (var i = 0; i < result.length; i++) {
        resArr.push(result[i].split('=')[1]);
      }
    }
    return resArr;
  }


