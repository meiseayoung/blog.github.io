var http = require('http');
var fs = require('fs');
var path = require("path");

//创建用于存放瓦片的目录
var tilesFileName = "map" + new Date().getTime();
fs.mkdir(tilesFileName);


//地图瓦片缩放层级
var zoom = {
	min: 11,
	max: 16
};
//每个缩放层级下对应的瓦片信息
var y = [{
	zoom:11,
	min: 1665,
	max: 1673,
	file:{
		min:811,
		max:816
	}
},{
	zoom:12,
	min:3330,
	max:3347,
	file:{
		min:1623,
		max:1631
	}
},{
	zoom:13,
	min:6661,
	max:6695,
	file:{
		min:3246,
		max:3262
	}
},{
	zoom:14,
	min:13322,
	max:13390,
	file:{
		min:6493,
		max:6525
	}
},{
	zoom:15,
	min:26644,
	max:26781,
	file:{
		min:12988,
		max:13047
	}
},{
	zoom:16,
	min:53289,
	max:53562,
	file:{
		min:25976,
		max:26094
	}
}];


function createXYZFile(x,y,zoom){
	//创建ZOOM级(z)
	for (var i = zoom.min; i <= zoom.max; i++) {
		var filePath = path.join(__dirname,tilesFileName,i+"");
		fs.mkdir(filePath);
	};
	// 创建Y级
	fs.readdir((__dirname+"/"+tilesFileName), function(err, files) {
		if (err) {
			// throws(err);
			console.log(err);
		}else{
			console.log("files", files);
			[11,12,13,14,15,16].forEach(function(value,index){
				var currentZoom = y.filter(function(val,idx){
					return	val.zoom == value 
				})[0];
				for(var i=currentZoom.min;i<=currentZoom.max;i++){
					var filePath = path.join(__dirname,tilesFileName,currentZoom.zoom+"",i+"")
					fs.mkdir(filePath);
					// getRemoteTile(currentZoom,)
					for(var k=currentZoom.file.min;k<=currentZoom.file.max;k++){
						requestTile(filePath,k+"",{
							x:k,
							y:i,
							z:currentZoom.zoom
						});
						if(k=== (currentZoom.file.min+3)){
							break;
						}
					}
					
				}
				// for(var i=y.min;i<=y.max;i++){
				// 	fs.mkdir((__dirname+"/"+tilesFileName+"/"+value+"/"+i));
				// 	getRemoteTile(value,i,1);
				// }				
			});
		}
	});
};

/**
 * [远程获取资源并写入本地]
 * @param  {[String]} filePath [保存至本地的路径]
 * @param  {[String]} fileName [保存至本地的文件名]
 * @param  {[Object]} tileInfo [{
 *                             		x:x轴索引
 *                             		y:y轴索引
 *                             		z:缩放层级
 * }]
 */
function requestTile(filePath,fileName,tileInfo){
	// console.log("url","http://api1.map.bdimg.com/customimage/tile?&x="+tileInfo.x+"&y="+tileInfo.y+"&z="+tileInfo.z+"&udt=20170107&scale=1&customid=dark");
	http.get("http://api1.map.bdimg.com/customimage/tile?&x="+tileInfo.x+"&y="+tileInfo.y+"&z="+tileInfo.z+"&udt=20170107&scale=2&customid=dark", function(res) {
		var writeStream = fs.createWriteStream(fileName+".png");
		res.on("data", function(chunk) {
			console.log("chunk",chunk);
			writeStream.write(chunk);
		});
		res.on("end", function() {
			
		});
	});
};


/*//远程获取资源并写入本地
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
};*/


createXYZFile(0,y,zoom);
