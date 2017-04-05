//加载 express 模块（第三方模块）
var express = require('express');
//原生模块
var path = require('path');
//加载 body-parser 中间件（第三方模块）
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var sql = require('./sql.js');

exports.router = function(app){
  app.use(express.static(path.join(__dirname, '/')));
  //详情页获取数据部分
  app.get('/detail', function(request, response){
  sql.get({'DatabaseName':'fanlestreet','Condition':"SELECT * FROM room_hotel_info LEFT JOIN goods ON goods.goodsid=room_hotel_info.goodsid "},function(err,data){
    response.send(data);
  });
});
//更多加载内容
app.get('/more', function(request, response){
sql.get({'DatabaseName':'fanlestreet','Condition':"SELECT * FROM room_hotel_info LEFT JOIN goods ON goods.goodsid=room_hotel_info.goodsid "},function(err,data){
    response.send(data);
  });
});



  //写数据到数据库
  app.post("/insert",urlencodedParser,function(request,response){
    sql.insert({
      "DatabaseName":"fanlestreet",
      "TableName":"relation",
      "data":{
        "room_id":request.body.room_id,
        "userid":request.body.userid,
        "buynum":request.body.buynum,
        "time":request.body.time
      }
    },function(err,data){})
  })

  //购物车数据部分
  app.post('/car', urlencodedParser, function(request, response){

    sql.get({'DatabaseName':'fanlestreet','Condition':'SELECT goods.`name`,goods.goodsid,room_hotel_info.room_img,room_hotel_info.room_id,room_hotel_info.room_type,room_hotel_info.room_breakfast,room_hotel_info.room_price,relation.time FROM relation INNER JOIN room_hotel_info ON room_hotel_info.room_id=relation.room_id INNER JOIN goods ON goods.goodsid=room_hotel_info.goodsid WHERE relation.userid='+request.body.userid+''},function(err,data){
      response.send(data)
    });
  });
  //购物车删除数据
    app.post("/delAll_car",urlencodedParser,function(request,response){
      // console.log()
      // console.log(request.body);
        sql.delete({'DatabaseName':'fanlestreet','TableName':'relation','Condition':'userid='+request.body.userid+''},function(res,data){
          response.send('1')
        })
    })
    //购物车删除单挑数据
    app.post("/del_one",urlencodedParser,function(request,response){
        sql.delete({'DatabaseName':'fanlestreet','TableName':'relation','Condition':'userid='+request.body.userid+' and room_id='+request.body.room_id+' limit 1'},function(res,data){
          response.send('1')
        })
    })
};
