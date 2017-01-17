var http = require('http');
var fs = require('fs');
var path = require("path");

//创建用于存放瓦片的目录
var tilesFileName = "map" + new Date().getTime();
fs.mkdir(tilesFileName);

//自定义瓦片样式查询条件字符串
var STYLE = "t%3Awater%7Ce%3Aall%7Cc%3A%23021019%2Ct%3Ahighway%7Ce%3Ag.f%7Cc%3A%23000000%2Ct%3Ahighway%7Ce%3Ag.s%7Cc%3A%23147a92%2Ct%3Aarterial%7Ce%3Ag.f%7Cc%3A%23000000%2Ct%3Aarterial%7Ce%3Ag.s%7Cc%3A%230b3d51%2Ct%3Alocal%7Ce%3Ag%7Cc%3A%23000000%2Ct%3Aland%7Ce%3Aall%7Cc%3A%2308304b%2Ct%3Arailway%7Ce%3Ag.f%7Cc%3A%23000000%2Ct%3Arailway%7Ce%3Ag.s%7Cc%3A%2308304b%2Ct%3Asubway%7Ce%3Ag%7Cl%3A-70%2Ct%3Abuilding%7Ce%3Ag.f%7Cc%3A%23000000%2Ct%3Aall%7Ce%3Al.t.f%7Cc%3A%23857f7f%2Ct%3Aall%7Ce%3Al.t.s%7Cc%3A%23000000%2Ct%3Abuilding%7Ce%3Ag%7Cc%3A%23022338%2Ct%3Agreen%7Ce%3Ag%7Cc%3A%23062032%2Ct%3Aboundary%7Ce%3Aall%7Cc%3A%231e1c1c%2Ct%3Amanmade%7Ce%3Aall%7Cc%3A%23022338";


//地图瓦片缩放层级
var zoom = {
	min: 11,
	max: 16
};
//每个缩放层级下对应的瓦片信息
var y = [{
	zoom: 11,
	min: 123,
	max: 126,
	file: {
		min: 382,
		max: 388
	}
}, {
	zoom: 12,
	min: 247,
	max: 252,
	file: {
		min: 765,
		max: 776
	}
}, {
	zoom: 13,
	min: 495,
	max: 504,
	file: {
		min: 1531,
		max: 1552
	}
}, {
	zoom: 14,
	min: 990,
	max: 1009,
	file: {
		min: 3063,
		max: 3104
	}
}, {
	zoom: 15,
	min: 1980,
	max: 2016,
	file: {
		min: 6127,
		max: 6209
	}
}, {
	zoom: 16,
	min: 3963,
	max: 4032,
	file: {
		min: 12254,
		max: 12418
	}
}];

//用于存放请求。只有上一个请求结束才开始下一个请求，防止TCP连接过多引起的连接资源耗尽
var stack = [];


function createXYZFile(y, zoom) {
	//创建ZOOM级文件夹
	for (var i = zoom.min; i <= zoom.max; i++) {
		var filePath = path.join(__dirname, tilesFileName, i + "");
		fs.mkdir(filePath);
	};
	// 创建Y级文件夹并生成对应的瓦片
	fs.readdir((__dirname + "/" + tilesFileName), function(err, files) {
		if (err) {
			console.log(err);
		} else {
			var zooms = [];
			for(var i=zoom.min;i<=zoom.max;i++){
				zooms.push(i);
			};
			zooms.forEach(function(value, index) {
				var currentZoom = y.filter(function(val, idx) {
					return val.zoom == value
				})[0];
				for (var i = currentZoom.min; i <= currentZoom.max; i++) {
					var filePath = path.join(__dirname, tilesFileName, currentZoom.zoom + "", i + "")
					fs.mkdir(filePath);
					for (var k = currentZoom.file.min; k <= currentZoom.file.max; k++) {
						stack.push({
							filePath: filePath,
							fileName: k + "",
							tileInfo: {
								x: k,
								y: i,
								z: currentZoom.zoom
							},
							fn: requestTile
						});
					};
					stack[0].fn(stack[0].filePath, stack[0].fileName, stack[0].tileInfo);
				}
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
function requestTile(filePath, fileName, tileInfo) {
	http.get("http://api1.map.bdimg.com/customimage/tile?&x=" + tileInfo.x + "&y=" + tileInfo.y + "&z=" + tileInfo.z + "&udt=20170107&scale=2&styles="+STYLE, function(res) {
		var writeStream = fs.createWriteStream(filePath + "/" + fileName + ".png");
		writeStream.on("error", function(err) {
			writeStream.close();
			stack.shift();
			if (stack.length > 0) {
				stack[0].fn(stack[0].filePath, stack[0].fileName, stack[0].tileInfo);
			} else {
				console.log("所有资源请求完毕！");
				return;
			}
		});
		res.on("data", function(chunk) {
			writeStream.write(chunk);
		});
		res.on("end", function(err) {
			writeStream.close();
			stack.shift();
			if (stack.length > 0) {
				stack[0].fn(stack[0].filePath, stack[0].fileName, stack[0].tileInfo);
			} else {
				console.log("所有资源请求完毕！");
				return;
			}
		});
	});
};

createXYZFile(y, zoom);
