/*
2017年3月25日
使用提示:
引入模块
var sql = require('./sql');
默认数据库用户名和密码
host: 'localhost',
		  user: 'root',
		  password: ''

-----get获取数据库数据(用户名和密码可以不填)------
默认查询所有：sql.get({'host':'localhost','user':'root','password':'','DatabaseName':'数据库名称','TableName':'表名称'},function(err,data){
	console.log(data);
})
传入属性中有Condition字段则支持条件查询（可以不写'TableName':'表名称'）：sql.get({'DatabaseName':'phoneproject','Condition':"select * from goods where id = 10002"},function(err,data){
      console.log(data);
    })
返回值是数组
格式：可以输入对象或者json格式的字符串

-----insert插入数据(用户名和密码可以不填)-----
sql.insert(`{"DatabaseName":"数据库名称",
  "TableName":"表名称",
  "data":{'host':'localhost',
			  'user':'root',
			  'password':'',
			  "name":"xdh",
        "price":11,
        "discount":1,
        "map":1,
        "phone":1231,
        "star":1,
        "message":2,
        "src":1,
        "status":"true"
        }
      }`)
格式：可以输入对象或者json格式的字符串

----删除符合条件数据(用户名和密码可以不填)-----
sql.delete({'DatabaseName':'phoneproject','TableName':'goods','Condition':'id="10010"'},function(res,data){})
格式：可以输入对象或者json格式的字符串

----修改符合条件数据(用户名和密码可以不填)-----
sql.updata({'DatabaseName':'phoneproject','Condition':'UPDATE goods SET price=998 WHERE id=10003'},function(err,data){})
Condition：sql语句
 */
var mysql = require('mysql');
module.exports = {
	 get: function(data,_callback){
	 	if(typeof data == 'object'){
			var obj = data
		}else if(typeof data == 'string'){
			var obj = JSON.parse(data)
		}else{console.log('请输入对象或者json格式的字符串')}
		var sqlconnect = mysql.createConnection({
		  host: obj.host ? obj.host : 'localhost',
		  user: obj.user ? obj.user : 'root',
		  password: obj.password ? obj.password : '',
		  database: data.DatabaseName
		});
		sqlconnect.connect();
    if(!data.Condition && data.TableName){
      var select = 'select * from '+ data.TableName +''
    }else if(data.Condition){var select = data.Condition}
    sqlconnect.query(select, function(err, rows, fields) {
      console.log(15678)
	    if(err) throw err;
      _callback(err,rows)
    });
	  sqlconnect.end();
	},

	insert: function(data, _callback){
		if(typeof data == 'object'){
			var obj = data
		}else if(typeof data == 'string'){
			var obj = JSON.parse(data)
		}
    var arr=[],arr1 = [],str='',str1='';
    for(k in obj.data){
      arr.push("`"+k+"`")
      arr1.push(typeof obj.data[k] == 'number' ? obj.data[k] : "'"+obj.data[k]+"'")
    }
    str = arr.join(',')
    str1 = arr1.join(',')
    var strResult = 'INSERT INTO ' + obj.TableName + '('+ str +') VALUES ' + '('+ str1 + ')'
    console.log(strResult)
    var sqlconnect = mysql.createConnection({
      host: obj.host ? obj.host : 'localhost',
		  user: obj.user ? obj.user : 'root',
		  password: obj.password ? obj.password : '',
      database: obj.DatabaseName
    });
    sqlconnect.connect();
    sqlconnect.query(strResult, function(err, rows, fields) {
      var message = {}
      if(err){throw err;message.status=0}
      else{message.status=1}
      _callback(message)
       // console.log('插入数据成功');
    });
    sqlconnect.end();
  },

  delete: function(data,_callback){
	 	if(typeof data == 'object'){
			var obj = data
		}else if(typeof data == 'string'){
			var obj = JSON.parse(data)
		}else{console.log('请输入对象或者json格式的字符串')}
		var sqlconnect = mysql.createConnection({
		  host: obj.host ? obj.host : 'localhost',
		  user: obj.user ? obj.user : 'root',
		  password: obj.password ? obj.password : '',
		  database: data.DatabaseName
		});
		sqlconnect.connect();
	  sqlconnect.query('delete from '+ data.TableName +' where ' + obj.Condition, function(err, rows, fields) {
	    var message = {}
      if(err){throw err;message.status=0}
      else{message.status=1}
      _callback(message)
	  });
	  sqlconnect.end();
	},
  updata:function(data,_callback){
    if(typeof data == 'object'){
      var obj = data
    }else if(typeof data == 'string'){
      var obj = JSON.parse(data)
    }else{console.log('请输入对象或者json格式的字符串')}
    var sqlconnect = mysql.createConnection({
      host: obj.host ? obj.host : 'localhost',
      user: obj.user ? obj.user : 'root',
      password: obj.password ? obj.password : '',
      database: data.DatabaseName
    });
    sqlconnect.connect();
    sqlconnect.query(data.Condition, function(err, rows, fields) {
      if(err) throw err;
      _callback(err,rows)
    });
    sqlconnect.end();
  }
}





