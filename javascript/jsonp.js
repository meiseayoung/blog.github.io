
/**
 * @description 对象转url请求参数
 * @param  {[Object]} obj [请求参数对象]
 * @return {[String]}     [请求参数字符串]
 */
function object2urlParams(obj) {
	var string = null;
	var params = [];
	for (var key in obj) {
		params.push(key + "=" + encodeURIComponent(obj[key]))
	}
	string = params.join("&");
	return string;
};

/**
 * @description 生成jsonp的名称
 * @return {String} [jsonp的名称]
 */
function createJsonpCallBackName(){
	return "jsonp_" + Math.random().toString(16).slice(2);
}
/**
 * @description 生成jsonp回调函数
 * @param  {String} name    jsonp的名称
 * @param  {Function} resolve promise的resolve
 * @return {undefined}        无返回值
 */
function createJsonpCallBack(name,resolve){
	window[name] = function(data) {
		resolve(data);
		delete window[name];
	};
}
/**
 * @description 生成jsonp的script标签
 * @param  {String} url    jsonp请求地址
 * @param  {String} name   jsonp的名称
 * @param  {Object} params jsonp的请求参数
 * @return {HTMLScriptElement}  生成的script标签
 */
function createJsonpScript(url,name,params){
	var script = document.createElement("script");
	script.setAttribute("src", `${url}?callback=${name}&${object2urlParams(params)}`);
	document.body.appendChild(script);
	return script;
}
/**
 * @description jsonp服务主函数
 * @param  {String} url    jsonp请求地址
 * @param  {Object} params jsonp的请求参数
 * @return {Promise}    jsonp promise
 */
function jsonp(url="",params={}){
	return new Promise((resolve,reject)=>{
		let jsonpName = createJsonpCallBackName();
		createJsonpCallBack(jsonpName,resolve);
		let script = createJsonpScript(url,jsonpName,params);
		script.onload = function() {
			document.body.removeChild(script);
		};
		script.onerror = function(err) {
			document.body.removeChild(script);
			delete window[jsonpName];
			reject(err);
		}
	});
}

export default jsonp;
