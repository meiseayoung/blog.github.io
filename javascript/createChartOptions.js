/**
 * 获取主副指标(y轴左右侧)所在索引
 * param legend type:Array []   
   格式 [
	        {
	            "name": "Server Side TCP_HS Round Trip Time(MS)", //指标名
	            "isMain": true                                    //是否是主指标
	        }
    ]
 * param isMain                                                   //是否是主指标
 * return []   type:Array
 **/
function _getIndicatorIndexes(legend, isMain) {
	var indexs = [];
	var temp = legend.map(function(value, index) {
		value.index = index;
		return value;
	}).filter(function(value, index) {
		return value.isMain === isMain;
	});
	temp.forEach(function(value, index) {
		indexs.push(value.index);
	});
	return indexs;
};
/**
 * 获取主副指标(y轴左右侧)的极值
 * param series type:Array 一个二维数组 
 * param indexes type:Array 主副指标索引
 * return {
	         min,
	         max
   }
 **/
function _getIndicatorExtremes(series, indexes) {
	var result = [];
	for (var i = 0; i < indexes.length; i++) {
		result = result.concat(series[indexes[i]])
	};

	var min = Math.min.apply(null, result);
	var max = Math.max.apply(null, result);
	return {
		min,
		max
	};
};



/**
 * 创建柱状图和折线图配置项
 * param {
 *       title : "2017年",                 //图表标题
 *       type : "bar" || "line",           //图表类型
 *       units : ["%","times"],            //主副指标单位
 *       legend : [],                      //图例名称及所在Y轴左右侧(主副指标)
 *       isUTC : false,                    //X轴是否为utc时间格式(UTC需要转换为对应的字符串显示)
 *       interval : 900 || 3600 || 86400,  //显示时间粒度 (isUTC为false时这里的值无意义)
 *       xAxis : [],                       //X轴数据
 *       series : [[],[],[]....]
 *
 *
 * }
 * return {}echarts图表配置项
 *
 **/
function createChartOptions(opts) {
	/**
	 * 动态创建series
	 *
	 **/
	function _createSeries() {
		var series = [];
		for (var i = 0; i < opts.series.length; i++) {
			series.push({
				name: opts.legend[i].name,
				type: (function() {
					if (opts.type instanceof Array) {
						return opts.type[i]
					} else {
						if (opts.type) {
							return opts.type
						} else {
							return "line"
						}
					}
				})(),
				data: opts.series[i],
				yAxisIndex: opts.legend[i].isMain === true ? 0 : 1,
				barWidth: 10,
				barGap: "2%",
				barCategoryGap: "2%",
				symbol: "emptyCircle",
				barMinHeight: 10,
				symbolSize: 10,
			})
		};
		return series;
	};
	/**
	 * UTC时间格式
	 * param interval type : Number 时间粒度
	 * return ""      type : String 格式化后的字符串
	 **/
	function _tipFormat(interval) {
		function createColorSymbol(color) {
			var symbol = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${color}"></span>`;
			return symbol;
		};
		switch (interval - 0) {
			case 900:
				tempIn = "hh:mm";
				break;
			case 3600:
				tempIn = "hh:00";
				break;
			case 86400:
				tempIn = "MM:DD";
				break;
			default:
				tempIn = "hh:mm"
		};
		return function(params) {
			var tips = params.map(function(value, index) {
				return value.value;
			});
			var axises = params.map(function(value, index) {
				return value.seriesName
			});
			var names = params.map(function(value, index) {
				return value.name;
			});
			var colors = params.map(function(value, index) {
				return value.color;
			});
			var result = new Date(names[0] * 1000).format(tempIn) + "</br>";
			for (var i = 0; i < params.length; i++) {
				result += (createColorSymbol([i]) + axises[i] + " : " + tips[i] + "<br/>")
			}
			return result;
		};
	};
	var option = {
		backgroundColor: "#ffffff",
		color: opts.color || ["#74DEED", "#FFC57A", "#A3E06A", "#379CF8", "#52C8C4", "#7FBD46", "#F585EF"],
		title: {
			text: opts.title,
			top: "12%",
			left: 20,
			textStyle: {
				fontSize: 12,
				color: "#595959"
			}
		},
		tooltip: {
			trigger: 'axis',
			formatter: opts.isUTC ? _tipFormat(opts.interval) : null,
			confine: true
		},
		legend: {
			data: opts.legend,
			top: opts.legendTop || "10%",
			right: 80,
			textStyle: {
				fontSize: 12,
				color: "#36383C",
				fontWeight: 400,
				fontFamily: "MicrosoftYaHei"
			},
			formatter: function(value) {
				if (opts.legend.length > 2) {
					return value.length > 25 ? (value.slice(0, 25) + "...") : value;
				}
				return value;
			},
			tooltip: {
				show: true
			}
		},
		grid: {
			top: opts.gridTop || "25%",
			left: '3%',
			right: '8%',
			bottom: '8%',
			containLabel: true
		},
		toolbox: {
			show: false
		},
		xAxis: {
			type: 'category',
			axisLabel: {
				formatter: opts.isUTC ? function(name) {
					return util.string.dealMoreChars(name, 6);
				} : function(name) {
					return util.utc2string(name, opts.interval || "900");
				},
				textStyle: {
					fontSize: opts._fontSize ? opts._fontSize : 10,
					fontFamily: "MicrosoftYaHei",
					color: "#666666",
					fontWeight: 500
				},
				interval: 0,
				rotate: 45
			},
			boundaryGap: ["2%", "2%"],
			axisLine: {
				show: true,
				lineStyle: {
					color: ['#ddd'],
					width: 1
				}
			},
			axisTick: {
				show: true
			},
			data: opts.xAxis
		},
		yAxis: [{
			type: 'value',
			min: _getIndicatorExtremes(opts.series, _getIndicatorIndexes(opts.legend, true)).min,
			max: _getIndicatorExtremes(opts.series, _getIndicatorIndexes(opts.legend, true)).max,
			name: opts.units[0] || "",
			axisTick: {
				show: false
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: ['#ddd'],
					width: 1
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#999',
					type: 'dashed'
				}
			},
			axisLabel: {
				textStyle: {
					color: "#36383C",
					fontFamily: "MicrosoftYaHei",
					fontSize: 12,
					fontWeight: 400
				}
			}
		}, {
			show: (function() {
				if (opts.units instanceof Array && opts.units.length > 1) {
					return true;
				} else {
					return false;
				}
			})(),
			type: 'value',
			min: _getIndicatorExtremes(opts.series, _getIndicatorIndexes(opts.legend, false)).min,
			max: _getIndicatorExtremes(opts.series, _getIndicatorIndexes(opts.legend, false)).max,
			name: opts.units[1] || "",
			axisTick: {
				show: false
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: ['#ddd'],
					width: 1
				}
			},
			splitLine: {
				show: false,
				lineStyle: {
					color: '#999',
					type: 'dashed'
				}
			},
			axisLabel: {
				textStyle: {
					color: "#36383C",
					fontFamily: "MicrosoftYaHei",
					fontSize: 12,
					fontWeight: 400
				},
			}
		}],
		series: _createSeries()
	};
	return option;
};

export default createChartOptions;


/*****************************************************
var opts = createChartOptions({
	title : "2017年",
    type : "bar" || "line",
    units : ["%","times"],
    legend : [{name:"a",isMain:true},{name:"b",isMain:false}],
    isUTC : true,
    interval : 900,
    xAxis : [123,456,789,123],
    series : [[1,2,3,4],[2,3,4,5]] 
});
******************************************************/
