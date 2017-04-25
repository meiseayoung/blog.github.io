import Date from "./DateExtend.js";
const util = {
	string: {
		/**
		 *重复生成某段字符串N次
		 * @param string 原字符串 type:String
		 * @param times 生成次数  type:Number
		 **/
		repeat: function(string, times) {
			var temp = [];
			for (var i = 0; i < times; i++) {
				temp.push(string);
			}
			return temp.join("");
		},
		/**
		 * [处理超出指定长度文本]
		 * @param  {[String]}   string   [指定文本]
		 * @param  {[type]}   n        [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		dealMoreChars: function(string, n, sign) {
			var tempArr = (string + "").split("");
			var arr = tempArr.concat([]);
			var tempStr = "";
			var toLength = 0;
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].replace(/[\u4E00-\u9FFF]/gi, "00");
			}
			for (var i = 0; i < arr.length; i++) {
				toLength += arr[i].length;
				tempStr += tempArr[i];
				if (toLength > (n || 8)) {
					return tempStr.slice(0, -1) + (sign || "...");
					break;
				}
			}
			return tempStr;
		}
	},
	cookie: {
		/**
		 * 设置cookie值
		 * @param key 键 type:String
		 * @param value 值 type:String
		 * @param expiredays 有效时间，单位：天 type:Number
		 */
		set: function(key, value, expiredays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			document.cookie = key +
				"=" + escape(value) + ((null === expiredays) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
		},
		/**
		 * 获取指定键的cookie值
		 * @param  key 键 type:String
		 */
		get: function(key) {
			if (document.cookie.length > 0) {
				var start = document.cookie.indexOf(key + "="),
					end;
				if (-1 !== start) {
					start = start + key.length + 1;
					end = document.cookie.indexOf(";", start);
					if (-1 === end) {
						end = document.cookie.length;
					}
					return unescape(document.cookie.substring(start, end));
				}
			}
			return;
		}
	},
	color: {
		/**
		 * 将16进制的颜色值转换为[255, 222, 12]rgb通道的颜色值
		 * @param color 16进制的颜色值 type:String
		 * @return  返回rgb的颜色值    type:Array
		 */
		color2rgb: function(color) {
			var r = parseInt(color.substr(1, 2), 16);
			var g = parseInt(color.substr(3, 2), 16);
			var b = parseInt(color.substr(5, 2), 16);
			return [r, g, b];
		},
		/*
		 *
		 * 将[255, 222, 12] rgb通道的颜色值转换为16进制的颜色值 * @param rgbArr rgb颜色值的数据 type: Array * @return 返回16进制的颜色值 type: String
		 *
		 **/

		rgb2color: function(rgbArr) {
			var s = "";
			for (var i = 0; i < rgbArr.length; i++) {
				var c = Math.round(rgbArr[i]).toString(16);
				if (c.length === 1) {
					c = "0" + c;
				}
				s += c;
			}

			return "0x" + s.toUpperCase();
		},
	},
	/**
	 * 解析请求URL参数
	 * @param s 需要解析的url字符串             type:String
	 * @return {param1:param1,param2:param2}    type:Object
	 **/
	parseURL: function(s) {
		if (arguments.length == 0) {
			var errorParams = 0;
			var paramsStr = window.location.search.slice(1);
			var params = paramsStr.split("&");
			var paramsObj = {};
			for (var i = 0; i < params.length; i++) {
				if (params[i].slice(0, params[i].indexOf("=")) != "") {
					paramsObj[params[i].slice(0, params[i].indexOf("="))] = decodeURI(params[i].slice(params[i].indexOf("=") + 1));
				} else {
					console.warn("存在" + (errorParams += 1) + "个无效参数对！");
				}
			}
			return paramsObj;
		} else if (typeof(s) === "string") {
			var arr,
				tempArr,
				obj = {};
			arr = s.split("&");
			for (var i = 0; i < arr.length; i++) {
				tempArr = arr[i].split("=");
				obj[tempArr[0]] = decodeURI(tempArr[1]);
			}
			return obj;
		} else if (typeof(s) !== "string") {
			console.error("Function parseURL: arguments[0] type must be string,plese check it");
		}
	},
	/**
	 * 对象转url请求参数
	 * @param  {[type]} obj [description]
	 * @return {[type]}     [description]
	 */
	object2urlParams: function(obj) {
		var string = null;
		var params = [];
		for (var key in obj) {
			params.push(key + "=" + encodeURI(obj[key]))
		}
		string = params.join("&");
		return string;
	},
	/**
	 * 数组元素位置替换
	 * @param  {[Array]} array       [被替换的目标数组]
	 * @param  {[Array]} changeIndex [{from:n,to:m},{from:n1,to:m1},{}]
	 * @return {[Array]}             [替换后的数组]
	 */
	arrayChangeIndexs: function(array, changeIndexs) {
		var result = array.concat([]);
		for (var i = 0; i < changeIndexs.length; i++) {
			result[changeIndexs[i].from] = array[changeIndexs[i].to];
			result[changeIndexs[i].to] = array[changeIndexs[i].from];
		}
		return result;
	},
	/**
	 *数字三位逗号分隔 (code from echarts.util.format)
	 *@param s 数字或纯数字的字符串                  type:Number || "Number"
	 *@return 111,111,111,00                       type:String
	 **/
	formatNumber: function(x) {
		if (isNaN(x)) {
			return '-';
		}
		x = (x + '').split('.');
		return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (x.length > 1 ? ('.' + x[1]) : '');
	},
	/**
	 * 数字三位分割
	 * @param  {[String | Number]} string [字符]
	 * @param  {[Number]} n      [分割位数]
	 * @param  {[String]} sign   [分割符号]
	 * @return {[String]}        [description]
	 */
	thousandSplit: function(string, n, sign) {
		var len = n || 3;
		var reg = new RegExp(`\\B(?=(\\d{${len}})+(?!\\d))`, "gi");
		return String(string).replace(reg, sign || ",")
	},
	/**
	 *判断是否为闰年
	 *@param   year 年             type:Number
	 *@return  true || false       type:Boolean 
	 */
	isLeapYear: function(year) {
		if ("number" !== typeof year) {
			year = parseInt(year, 10);
		}
		if (((0 === year % 4) && (0 !== year % 100)) || (0 === year % 400)) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 时间向下归整 
	 * @param date 需要归整的时间           type:Date
	 * @param interval 归整粒度(单位-秒)    type:Number
	 * @return  归整后的时间毫秒数          type:Number
	 */
	fixTime: function(date, interval) { //interval间隔秒数
		var minutes = date.format("mm");
		var latelyMin = minutes - (minutes % (interval / 60));
		latelyMin < 10 ? (latelyMin = "0" + latelyMin) : latelyMin;
		var latelyTime = new Date(date).format("YYYY/MM/DD hh:" + latelyMin)
		return new Date(latelyTime).getTime();
	},
	/**
	 *忙闲时控件值解析
	 *@param s 需要解析的字符串 type:String
	 *@return  解析后的数组 type:Array
	 */
	parseTimeSchedule: function(s) {
		s = s.replace(/\s/gi, "").slice(0, -1);
		var tmep = [];
		var arr = s.split(";");
		for (var i = 0; i < arr.length; i++) {
			tmep.push(arr[i].split("-"));
		}
		var lastArr = [];
		for (var i = 0; i < tmep.length; i++) {
			for (var j = tmep[i][0].slice(0, 2); j <= tmep[i][1].slice(0, 2); j++) {
				lastArr.push(j - 0);
			}
		}
		return lastArr;
	},
	/**
	 *获取页面所有元素最大的z-index值
	 *@param   rangeElem 获取最大z-index值的元素范围  type:DOM
	 *@return  所有元素最大的z-index值 type:Number
	 */
	// getTopZIndex: function(rangeElem) {
	// 	var allNodes;
	// 	if (arguments.length == 0) {
	// 		var allNodes = document.getElementsByTagName("*");
	// 	} else {
	// 		var allNodes = rangeElem.getElementsByTagName("*");
	// 	}
	// 	var nodesLen = allNodes.length;
	// 	var indexArray = [];
	// 	for (var i = 0; i < nodesLen; i++) {
	// 		if (allNodes[i].nodeName.toLowerCase() == "div") {
	// 			indexArray.push({
	// 				elem: allNodes[i],
	// 				zIndex: $.css(allNodes[i], "z-index")
	// 			});
	// 		}
	// 	}
	// 	var hasIndexElems = indexArray.filter(function(elem) {
	// 		return elem.zIndex !== "auto"
	// 	}).sort(function(a, b) {
	// 		return b.zIndex - a.zIndex
	// 	});
	// 	if (hasIndexElems.length > 0) {
	// 		// console.log("最大z-index元素为: ",hasIndexElems[0].elem);
	// 		return hasIndexElems[0].zIndex;
	// 	} else {
	// 		// console.warn("所有元素的z-index均为auto,没有显示声明的z-index");
	// 		return 0;
	// 	}
	// },
	/**
	 * 删除指定行内样式值
	 * @param   propertyName
	 * @return  删除后的行内样式值 type:String
	 */
	removeInnerProperty: function(jQObj, propertyName) {
		function getInnerProperties() {
			var properties = null;
			properties = jQObj.attr("style");
			return properties;
		};
		var properties = getInnerProperties();
		var propertyList = properties.split(";");
		var lastProperties = propertyList.filter(function(v) {
			return v.indexOf(propertyName) == -1;
		}).join(";");
		jQObj.attr("style", lastProperties);
	},
	/**
	 * 生成随机字符UID
	 * param lenth    随机字符的长度  type:Number
	 * return 随机字符串              type:String	
	 **/
	createUID: function(length) {
		var string = "abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ1234567890_";
		var strings = string.split("");
		strings.sort(function() {
			return Math.random() > 0.5
		});
		strings.length = length || 5;
		return strings.join("");
	},
	/**
	 * 对象深拷贝
	 * @param obj 被克隆的对象
	 * @return result 克隆后的新对象
	 **/
	cloneDeep: function(obj) {
		var result = {};
		for (var key in obj) {
			if (typeof(obj[key]) === "object") {
				switch (Object.prototype.toString.call(obj[key])) {
					case "[object Array]":
						result[key] = obj[key].concat([]);
						break;
					case "[object Object]":
						result[key] = cloneDeep(obj[key]);
						break;
						defalut:
							result = obj[key];
				}
			} else {
				result[key] = obj[key]
			}
		};
		return result;
	},
	/**
	 *数组首尾替换 JS模拟无缝轮播     (注意:此方法会改变数组本身，请谨慎使用)
	 *param array 需要轮播的DOM数组 type:Array
	 *return  新的轮播DOM数组       type:Array
	 **/
	simulateCarousel: function(array) {
		var first = array[0];
		array.shift();
		array.length = array.length + 1;
		array[array.length - 1] = first;
		return array
	},
	/**
	 * UTC时间蹉转字符串
	 * @param utc
	 * turn string || []
	 */
	utc2string: function(utc, format) {
		var result = null;
		if (utc instanceof Array) {
			result = [];
			for (var i = 0; i < utc.length; i++) {
				switch (format) {
					case "900":
						result.push(new Date(utc[i] * 1000).format("hh:mm"))
						break;
					case "3600":
						result.push(new Date(utc[i] * 1000).format("hh:00"))
						break;
					case "86400":
						result.push(new Date(utc[i] * 1000).format("MM-DD"))
						break;
					default:
						result.push(new Date(utc[i] * 1000).format("YYYY-MM-DD hh:mm"))
				}
			}
		} else if (typeof(utc) === "string") {
			switch (format) {
				case "900":
					result = new Date(utc * 1000).format("hh:mm");
					break;
				case "3600":
					result = new Date(utc * 1000).format("hh:00");
					break;
				case "86400":
					result = new Date(utc * 1000).format("MM-DD");
					break;
				default:
					result = new Date(utc * 1000).format("YYYY-MM-DD hh:mm");
			}
			return result;

		}
	},
	/**
	 * 单位自动转换
	 * @param  {[type]} bytes    [description]
	 * @param  {[type]} interval [description]
	 * @param  {[type]} unitList [description]
	 * @return {[Array]}          [description]
	 */
	unitConversion: function(bytes, interval, unitList) {
		var result = [];

		function unitConversion(bytes) {
			var temp = [];
			var units = unitList || ['byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];

			function unit2() {
				var U = [];
				for (var i = 1; i < units.length + 1; i++) {
					let nextUnit = Math.pow(interval || 1024, i);
					U.push(nextUnit);
				}
				return U;
			};
			var unit2 = unit2();
			for (var i = 0; i < unit2.length; i++) {
				if (unit2[i] > bytes) {
					temp.push({
						number: (bytes / Math.pow(interval || 1024, i)).toFixed(3),
						unit: units[i]
					})
					break;
				}
			}
			return temp;
		};
		for (var i = 0; i < bytes.length; i++) {
			result.push(unitConversion(bytes[i]));
		}
		return result;
	},
	/**
	 * 限定只能输入数字
	 * @param  {[htmlNode]} elem [DOM节点]
	 * @param  {[Number]} len  [限定数字的长度]
	 */
	limitNumber: function(elem, len) {
		elem.oninput = elem.onpropertychange = function(e) {
			e.target.value = e.target.value.replace(/[^\d\.]/g, "");
			if (len && e.target.value.length > len) {
				e.target.value = e.target.value.slice(0, len);
			}
			if (e.target.value.split('.').length - 1 > 1) { //e.target.value.split('.').length-1>1表示'.'符号出现的次数
				e.target.value = e.target.value.slice(0, '.'.indexOf(e.target.value)) + e.target.value.slice('.'.indexOf(e.target.value), -1).replace(/\./);
			}
		}
	},
	/**
	 * 用于输入字符转数字
	 * @param  {[String]} value [当前输入的字符] 
	 * @return 转换后的字符数字
	 */
	numberic(value) {
		function toNumber(string) {
			if (isNaN(string.slice(0, -1))) {
				//包含非数字及小数点的字符，直接切掉
				if (/[^\d|\.]/gi.test(string)) {
					return string.replace(/[^\d\.]/gi, "")
				}
				//第一位为小数点，直接切掉
				if (string.indexOf(".") === 0) {
					return string.slice(1)
				}
				//包含两个小数点，切掉最后一个小数点
				let lastDotIndex = string.lastIndexOf(".");
				let strings = string.split("");
				strings.splice(lastDotIndex, 1);
				return strings.join("")
			} else {
				return string.slice(0, -1)
			}
		};
		var result = (isNaN(value) ? toNumber(value) : value)
		return result.trim();
	},
	/**
	 * 函数柯里化相加
	 * @return result type:number 
	 **/
	curryAdd: function() {
		var result = 0;

		function _calc(args) {
			var temp = 0;
			for (let i = 0; i < args.length; i++) {
				temp += args[i]
			};
			return temp;
		};
		result += _calc(arguments);
		var calc = function() {
			result += _calc(arguments);
			return calc;
		};
		calc.toString = function() {
			return result;
		}
		return calc;
	},
	/**
	 * setState性能优化
	 * @param context {[reactComponentInstance]} React组件实例上下文环境 
	 * @param states  {[Object]} 需要更新的状态集合 
	 * @return undefined 无返回值
	 **/
	optimizeSetState: function(context, states) {
		var componentState = context.state;
		var newUpdateStates = {};
		for (let key in states) {
			if (!isEqule(states[key], componentState[key])) {
				newUpdateStates[key] = states[key];
			}
		};
		context.setState(newUpdateStates);
	},
	/**
	 * 类型判断
	 * @param {[any]} target [需要判断类型的对象] 
	 * @return String
	 */
	type: function(target) {
		return Object.prototype.toString.call(target).slice(7, -1).trim();
	},
	/**
	 * 使用fetch请求数据	window.fetch无法设置超时，蛋疼
	 * @param         {[Object]}  
	 * @param.url     {[String]}    url   [请求地址]
	 * @param.data    {[Object]}    data  [请求参数] {a:1,b:2}
	 * @param.done    {[Function]}  done  [成功回调] 
	 * @param.fail    {[Function]}  fail  [失败回调]
	 * @param.always  {[Function]}  always[请求发出回调]
	 */
	fetch: function(opts) {
		var method = (opts.type.toUpperCase() === "GET" || opts.type.toUpperCase() === "POST") ? opts.type.toUpperCase() : "POST";
		var me = this;
		var csrfSelector = document.querySelector("meta[name='_csrf']");
		var token = csrfSelector ? csrfSelector.getAttribute("content") : "none";
		var url = opts.url;
		var options = {
			method: method,
			credentials: 'include', //携带cookie认证信息
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				"X-CSRF-TOKEN": token
			},
			body: me.object2urlParams(opts.data)
		}
		if (method === "GET") {
			delete options.method;
			delete options.body;
			url += ("?" + me.object2urlParams(opts.data))
		}
		fetch(url, options)
			.then(function(res) {
				if (res.ok) {
					return res.json();
				} else {
					if (opts.fail && me.type(opts.fail) === "Function") {
						opts.fail(res)
					}
					return {
						errorMessage: "something was wrong when requesting"
					}
				}

			})
			.catch(function(error) {
				return {
					errorMessage: "the response data is not validity"
				};
			})
			.then(function(json) {
				opts.done(json)
			})
	},
	customFetch: function(opts) {
		var method = (opts.type.toUpperCase() === "GET" || opts.type.toUpperCase() === "POST") ? opts.type.toUpperCase() : "POST";
		var me = this;
		var csrfSelector = document.querySelector("meta[name='_csrf']");
		var token = csrfSelector ? csrfSelector.getAttribute("content") : "none";
		var url = opts.url;
		var timeout = opts.timeout || 60*1000 ; //默认一分钟超时处理
		var options = {
			method: method,
			credentials: 'include', //携带cookie认证信息
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				"X-CSRF-TOKEN": token
			},
			body: me.object2urlParams(opts.data)
		}
		if (method === "GET") {
			delete options.method;
			delete options.body;
			url += ("?" + me.object2urlParams(opts.data))
		}
		return new Promise(function(resolve, reject) {
			var fetchTimes = 0;
			fetch(url, options)
				.then(function(res) {
					if (res.ok) {
						return res.json();
					} else {
						if (opts.fail && me.type(opts.fail) === "Function") {
							reject(res);
						}
						reject({
							errorMessage: "something was wrong when requesting"
						});
					}

				})
				.catch(function(error) {
					reject(error);
				})
				.then(function(json) {
					resolve(json);
				});
			var fetchTimer = setInterval(function() {
				fetchTimes += 1;
				if (fetchTimes * 1000 >= timeout) {
					clearInterval(fetchTimer);
					reject("timeout of " + timeout + "ms");
				}
			}, 1000);
		}).then(function(res) {
			console.log("done", res);
			opts.done(res);
		}).catch(function(err) {
			console.log("err", err);
			opts.fail(err);
		})
	}
};

export default util;
