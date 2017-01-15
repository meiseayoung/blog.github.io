var http = require('http');
var fs = require('fs');

http.get("http://img2.cache.netease.com/f2e/www/index2017/images/sprite_img.png",function(res){
	var writeStream = fs.createWriteStream("远程文件.png");

	res.on("data",function(chunk){
		writeStream.write(chunk);
	});
	res.on("end",function(){
		
	});
});
