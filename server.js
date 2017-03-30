//加载 express 模块（第三方模块）
var express = require('express');
var path = require('path');
var zbrouter = require('./nodeServer/zbrouter');
var twrouter = require('./nodeServer/twrouter');
var ywrouter = require('./nodeServer/ywrouter');
var dzrouter = require('./nodeServer/dzrouter');

//调用 express 模块
var app = express();
//zb
zbrouter.router(app);
//tw很帅
twrouter.router(app);
//yw
ywrouter.router(app);
//
dzrouter.router(app);

app.listen(555,function(){
	// console.log(555);
});





