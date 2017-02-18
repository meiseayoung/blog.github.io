app.post("*.action", function(req, res) {
		var url = req.url.slice(1,-7);
		var apis = null;
		fs.readFile("config/apis.js","utf-8",function(err,data){
			apis = JSON.parse(data);
			if(apis[url]){
				fs.readFile("mockJson/"+apis[url],"utf-8",function(err,data){
					if(err){
						console.log("没有找到模拟JSON，请检查mockJson文件夹下是否包涵此接口的模拟数据");
						res.setHeader("Content-Type", "text/json");
						res.send({
							errorMessage:"没有找到模拟JSON，请检查mockJson文件夹下是否包涵此接口的模拟数据"
						});
						return;
					}
					res.setHeader("Content-Type", "text/json");
					res.send(data);
				});
			}else{
				console.log("没有配置"+req.url+"相关接口; " + new Date());
				res.setHeader("Content-Type", "text/json");
				res.send({
					errorMessage:"没有配置相关接口"
				});
			}
		});
	}.bind(this));
