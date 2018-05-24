/**
 * [对象转url请求参数]
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
 * [创建脚本标签并在]
 * @param  {[String]} url         [请求地址]
 * @param  {[Object} params       [请求参数]
 * @param  {[Function]} doneFn    [成功回调]
 * @param  {[Function]} errorFn   [失败回调]
 * @return {[undefined]}          [无返回值]
 */
function scripting(url, params, doneFn, errorFn) {
	var jsonpCallBackName = "jsonp_" + Math.random().toString(16).slice(2);
	window[jsonpCallBackName] = function(data) {
		doneFn(data);
		delete window[jsonpCallBackName];
	};
	var script = document.createElement("script");
	script.setAttribute("src", `${url}?callback=${jsonpCallBackName}&${object2urlParams(params)}`);
	document.body.appendChild(script);
	script.onload = function() {
		document.body.removeChild(script);
	};
	script.onerror = function(err) {
		document.body.removeChild(script);
		errorFn(err);
	}
};
/**
 * [jsonp请求]
 * @param  {[type]} args [description]
 * @param {[String]} args.url             [请求地址]
 * @param {[Object]} args.data            [请求参数]
 * @param {[Function]} args.doneFn        [成功回调]
 * @param {[Function]} args.errorFn       [失败回调]
 * @return {[Object]}                     [无返回值]
 */
const jsonp = function(args) {
	try {
		let validateURL = new URL(args.url);
	} catch (err) {
		console.error("jsonp请求url为无效地址,请检查");
	}
	scripting(args.url, args.data, args.doneFn, args.errorFn)
};
