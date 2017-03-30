var express = require('express');
var path = require('path');
var sql = require('./sql');
exports.router = function(app) {
	app.use(express.static(path.join(path.resolve(__dirname, '../') + '/')))
	app.get('/index', function(request, response) {
		sql.get({
			'DatabaseName': 'fanlestreet',
			'TableName': 'goods'
		}, function(err, data) {
			var datas = JSON.stringify(data)
			response.send(datas);
		})
	});


}
