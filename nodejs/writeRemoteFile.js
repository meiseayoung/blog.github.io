var http = require('http');
var fs = require('fs');
//地图瓦片x,y,z文件夹组织
var x = {
	min: 1,
	max: 240
};
var y = {
	min: 1,
	max: 240
};
var z = {
	min: 1,
	max: 16
};

var tilesFileName = "map" + new Date().getTime();
fs.mkdir(tilesFileName);

function createXYZFile(x,y,z){
	//创建ZOOM级(z)
	for (var i = z.min; i <= z.max; i++) {
		fs.mkdir(tilesFileName + "/" + i);
	};
	//创建Y级
	fs.readdir((__dirname+"/"+tilesFileName), function(err, files) {
		if (err) {
			// throws(err);
			console.log(err);
		}else{
			console.log("files", files);
			files.forEach(function(value,index){
				for(var i=y.min;i<=y.max;i++){
					fs.mkdir((__dirname+"/"+tilesFileName+"/"+value+"/"+i));
					getRemoteTile(value,i,1);
				}
				
			});
			
		}
		
	});
};
//远程获取资源并写入本地
function getRemoteTile(x,y,z){
	http.get("http://api1.map.bdimg.com/customimage/tile?&x="+x+"&y="+y+"&z="+z+"&udt=20170107&scale=1&customid=dark", function(res) {
		var writeStream = fs.createWriteStream(  (__dirname+"/"+tilesFileName+ "/"+ x +"/" + y+"/"+z)+".png");
		res.on("data", function(chunk) {
			writeStream.write(chunk);
		});
		res.on("end", function() {
			writeStream = null;
		});
	});
};


createXYZFile(x,y,z);
