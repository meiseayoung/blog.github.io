import Date from "./DateExtend";
let data = [
	["15Minutes",
		"Area Type",
		"Area",
		"Access Type",
		"Mobile Originated Calls Attempts",
		"Mobile Originated Call Alerting",
		"Call Answered",
		"Perceived Call Drops",
		"Perceived Call Success Rate(%)",
		"E2E Call Connection Delay(ms)",
		"Perceived Call Drop Rate(%)"
	],
	[
		"2016-04-18 23:45:00~2016-04-19 00:00:00",
		"State",
		"all",
		"all",
		1133773,
		1097743,
		1020871,
		4409,
		96.82,
		5886,
		0.44
	],
	[
		"2016-04-18 23:30:00~2016-04-18 23:45:00",
		"State",
		"all",
		"2G",
		1269075,
		1228558,
		1148538,
		4540,
		96.81,
		5902,
		0.4
	],
	[
		"2016-04-18 23:15:00~2016-04-18 23:30:00",
		"State",
		"all",
		"3G",
		1269075,
		1228558,
		1148538,
		4540,
		96.81,
		5902,
		0.4
	]
];
const defaultOptions = {
	data: data,
	dateFormat: "YYYY-MM-DD hh:mm:ss~YYYY-MM-DD hh:mm:ss",
	connectSymbol: "~", //日期连接符(如-，~，至等等)
	time: {
		from: new Date("2000/01/01 00:00").getTime(),
		to: new Date("2087/05/09 00:00").getTime()
	},
	filters: [{
		filterKey: "Access Type",
		filterValue: "ALL"
	}],
	granularity: "hh",
	rules: []
}
const QueryService = class {
	constructor(opt) {
			this.config = Object.assign({}, defaultOptions, opt);
			this._originalData = null; //原始数据
			this._validData = null; //开始和结束时间筛选后的数据
			this._dataJson = null; //开始和结束时间筛选后的二维数据转成的JSON格式数据
			this._mix = null; //执行mixData方法筛选后的数据
			this.cache = {}; //各时间粒度下的整合数据
			this._cloneBaseData();
			this._filterDataByTime();
			this._format2JSON();
			this.mixData(this.config.filters);
			this.mergeTime(this._mix, this.granularity);
		}
		/**
		 *拷贝原始数据
		 */
	_cloneBaseData() {
			this._originalData = this.config.data.concat([]);
		}
		/**
		 *通过开始和结束时间筛选数据
		 */
	_filterDataByTime() {
			var data = this._originalData;
			var _validData = [];
			var startTime = this.config.time.from;
			var endTime = this.config.time.to;
			for (var i = 1; i < data.length; i++) {
				if (startTime <= new Date(data[i][0].split("~")[0].replace(/-/gi, "/")).getTime() && new Date(data[i][0].split("~")[0].replace(/-/gi, "/")).getTime() < endTime) {
					_validData.push(data[i])
				}
			}
			_validData.splice(0, 0, data[0]);
			this._validData = _validData;
		}
		/**
		 *获取表头信息
		 */
	_getSheetTitles() {
			var titles = this._originalData[0];
			for (var i = 0; i < titles.length; i++) {
				titles[i] = titles[i].trim();
			}
			return titles;
		}
		/**
		 *二维数组转JSON
		 *@return JSON
		 */
	_format2JSON(array) {
			var data;
			data = this._validData;
			if (array instanceof Array) {
				data = array
			}
			var keys = data[0];
			var result = {};
			if (keys instanceof Array) {
				for (var i = 0; i < keys.length; i++) {
					if (!result[keys[i]]) {
						result[keys[i]] = [];
						for (var j = 1; j < data.length; j++) {
							result[keys[i]].push(data[j][i])
						}
					}
				};
				this._dataJson = result;
				return result;
			} else {
				console.error("表头格式错误,请检查")
			}
		}
		/**
		 *根据指定维度或指标过滤数据
		 *@return JSON
		 */
	_filterData(filterKey, filterValue) {
			var data = this._dataJson;
			var filterValueIndex = null;
			var tempArray = [];
			if (data[filterKey] == null) {
				console.warn("没有找到对应过滤指标名:" + filterKey);
				for (var i = 1; i < this._validData.length; i++) {
					tempArray.push(i)
				}
				return tempArray;
			} else {
				filterValueIndex = this._getValueIndexsInArray(filterValue, data[filterKey]);
				return filterValueIndex;
			}
		}
		/**
		 *混合数据
		 *@param {Array} [filters] [混合字段的key和value集合]
		 *@return JSON
		 */
	mixData(filters) { //[{filterKey:filterKey1,filterValue:filterValue1},{filterKey:filterKey2,filterValue:filterValue2},...]	
			var allIndex = [];
			var resultData = [];
			var resultIndexs;
			for (let i = 0; i < filters.length; i++) {
				allIndex = allIndex.concat(this._filterData(filters[i].filterKey, filters[i].filterValue));
			}
			if (filters.length > 1) {
				resultIndexs = allIndex.getRepeat();
				for (let i = 0; i < resultIndexs.length; i++) {
					resultData.push(this._validData[resultIndexs[i] + 1]);
				};
			} else {
				resultData = this._validData.slice(1);
			}

			this._mix = resultData;
			return resultData;
		}
		/**
		 *获取指定值在数组中的所有索引值
		 *@param {String} [value] [值]
		 *@param {Array} [array] [数组]
		 *@return Aarry
		 */
	_getValueIndexsInArray(value, array) {
			var tempArray = array.concat([]);
			var result = [];
			for (let i = 0; i < tempArray.length; i++) {
				// if (tempArray[i] === value) {
				if (tempArray[i].toLowerCase() === value.toLowerCase()) { //此段代码是为了处理原数据中字段大小写不一致的问题
					result.push(i)
				}
			}
			return result;
		}
		/**
		 *获取原始数据
		 *@return 原始数据对象
		 */
	getBaseData() {
			if (this.hasData == true) {
				return this._originalData;
			}
		}
		/**
		 *时间向下归整 
		 *@param date 需要归整的时间           type:Date
		 *@param interval 归整粒度(单位-秒)    type:Number
		 *@return  归整后的时间毫秒数          type:Number
		 */
	_fixTime(date, interval) { //interval间隔秒数
			var minutes = date.format("mm");
			var latelyMin = minutes - (minutes % (interval / 60));
			latelyMin < 10 ? (latelyMin = "0" + latelyMin) : latelyMin;
			var latelyTime = new Date(date).format("YYYY/MM/DD hh:" + latelyMin)
			return new Date(latelyTime).getTime();
		}
		/**              
		 *时间粒度合并
		 *@param source 需要合并的时间List                                        type:Array
		 *@param interval 时间粒度标识 "hh:mm"代表15分钟、hh代表小时、""代表天    type:String
		 *@return  归整后二维数组                                                 type:Array
		 */
	mergeTime(source, interval) {
			var dis = {};
			for (var i = 0; i < source.length; i++) {
				if (dis[new Date(source[i][0].split("~")[0].replace(/-/gi, "/")).format("YYYY-MM-DD " + interval)] == null) {
					dis[new Date(source[i][0].split("~")[0].replace(/-/gi, "/")).format("YYYY-MM-DD " + interval)] = [];
				}
				dis[new Date(source[i][0].split("~")[0].replace(/-/gi, "/")).format("YYYY-MM-DD " + interval)].push(source[i]);
			}
			var result = [];
			for (let j in dis) {
				result.push(dis[j])
			};
			switch (interval) {
				case "hh:mm":
					this.cache.min = result;
					break;
				case "hh":
					this.cache.hour = result;
					break;
				case "":
					this.cache.day = result;
					break;
				default:
					console.warn("时间粒度标识传入错误,请核对!");
			}
			return result;
		}
		/**
		 *合并二维数组中的各一维数组数据
		 *@param data 需要合并的数据                 type:Array
		 *@param colIdx 需要合并的一维数组索引       type:Number
		 *@param isAverage (可选)是否取平均          type:Boolean
		 *@return  归整后数组                        type:Array
		 */
	_mergeData(data, colIdx, isAverage) {
		var result = [];
		if (data[0][0][0] == undefined) {
			return data;
		}
		if (isAverage === true) {
			for (let i = 0; i < data.length; i++) {
				let sum = 0;
				var itemSize = 0;
				for (let j = 0; j < data[i].length; j++) {
					sum += (data[i][j][colIdx] - 0);
					itemSize = j + 1
				}
				result.push(sum / itemSize);
			}
		} else {
			for (let i = 0; i < data.length; i++) {
				let sum = 0;
				var jLength = data[i].length;
				for (let j = 0; j < data[i].length; j++) {
					sum += (data[i][j][colIdx] - 0);
				}
				result.push(sum);
			};
		}
		return result;
	}
}
export default QueryService;
