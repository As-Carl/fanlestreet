var express = require('express');
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
})
var db = require('./zzbsql');


exports.router = function(app) {
	app.use(express.static(path.join(__dirname, '/')))
	app.get('/login1', function(req, res) {
		console.log(req.url);
		db.chart({
			"host": "localhost",
			"user": "root",
			"password":'',
			"database": "fanlestreet",
			"table": "login",
			"selected": "*",
			"where": "",
			"equ": ""
		}, function(err,_data) {
				res.send(_data);
				console.log(_data);
		})
	});
	app.get('/foot',function(req,res){
		db.chart({
			"host": "localhost",
			"user": "root",
			"password":'',
			"database": "fanlestreet",
			"table": "goods",
			"selected": "*",
			"where": "",
			"equ": ""
		}, function(err,_data) {
				res.send(_data);
				console.log(_data);
		})
	})
		app.post('/loginccc',urlencodedParser, function(req, res) {
//		console.log(res);
		var postuser = req.body.user;
		var postcode = req.body.code;
		console.log(postuser);
		db.inser({
			"host": "localhost",
			"user": "root",
			"password": "",
			"database": "fanlestreet",
			"table": "login",
			"username":postuser,
			"code":postcode,
			"status":"ture",
			"selected": "*",
			"where": "",
			"equ": ""
		}, function(err,_data) {
				res.send(_data);
				console.log(_data);
		})
	})
}
