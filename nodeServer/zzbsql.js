var mysql = require('mysql');
//var $ = require('jquery');
//chart(data,callback)
var defaults = {
	"host": "localhost",
	"user": "root",
	"password": "",
	"database": "fanlestree",
	"table": "goods",
	"select": "*",
	"where": ""
}
module.exports = {
	chart: function(data, callback) {
		var defaults = {
			"host": "localhost",
			"user": "root",
			"password": "",
			"database": "fanlestree",
			"table": "goods",
			"selected": "*", //按需查询 id/name/...
			"where": "", //条件id/name/sprice
			"equ": "" //d等于值
		}
		if(typeof data == "object") {
			var obj = data;
		} else if(typeof data == "string") {
			var obj = JSON.parse(data);
		} else {
			return "输入string或obj";
		}
		for(var key in obj) {
			obj[key] ? obj[key] : defaults[key];
		}
		//		console.log(obj.where)
		var sqlconnect = mysql.createConnection({
			host: obj.host || 'localhost',
			user: obj.user || 'root',
			password: obj.password ||'',
			database: obj.database || 'fanlestreet'
		});
		sqlconnect.connect();
		//"select '"+obj.selected+"' from '"+obj.table+"'where'"+obj.where ?obj.where : "'"
		sqlconnect.query("select " + obj.selected + " from " + obj.table, function(err, rows, fields) {
			if(err) throw err;
			//			console.log(rows.length);
			//			var then = obj.where;
			//			console.log(rows);
			//			for (var i=0;i<rows.length;i++) {
			//				if (obj.where =="" || obj.equ=="") {
			////					console.log('查询结果为:', rows);
			//					callback(err, rows);
			//					break;
			//				}else if (rows[i][then]== obj.equ) {
			////					console.log('查询结果为:'+then+'=', rows[i]);
			//					callback(err, rows[i]);
			//					break;
			//				}
			//			}
			callback(err, rows);
		});
		sqlconnect.end();
	},
	inser: function(data, callback) {
		var defaults = {
			"host": "localhost",
			"user": "root",
			"password": "",
			"database": "fanlestreet",
			"table": "login",
		}
		if(typeof data == "object") {
			var obj = data;
		} else if(typeof data == "string") {
			var obj = JSON.parse(data);
		} else {
			return "输入string或obj";
		}
		for(var key in obj) {
			obj[key] ? obj[key] : defaults[key];
		}
		console.log(obj);
		console.log(obj.user, obj.code, obj.status);
		var sqlconnect = mysql.createConnection({
			host: obj.host || 'localhost',
			user: obj.user || 'root',
			password: obj.password || '',
			database: obj.database || 'fanlestreet'
		});
		sqlconnect.connect();
		//		var strResult = 'INSERT INTO ' + obj.TableName + '('+ str +') VALUES ' + '('+ str1 + ')'
		//		INSERT INTO login(userid,user,pwd,status)VALUES(null,'ddd','ddd','false')
		var insertstr = "INSERT INTO  login(user,pwd,status)VALUES('" + obj.username + "','" + obj.code + "','" + obj.status + "')";
		console.log(insertstr);
		sqlconnect.query(insertstr, function(err, rows, fileds) {
			if(err) throw err;
			console.log(rows);
			callback(err, rows);
		})
	}
}
