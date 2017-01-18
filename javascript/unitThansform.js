/**
 * 单位转换
 * @param  {[Array]} bytes    [需要被转换的betye数组]
 * @param  {[Number or likeNumber]} interval [进制]
 * @param  {[Array]} unitList [配置单位]
 * @return {[Array]}          [ [{number,unit},{},...] ]   如果输入参数效验不成功。直接返回空数组
 */
function _unitConversion(bytes, interval, unitList) {
	for(var i=0;i<bytes.length;i++){
		//检查输入参数的合法性，遇到非数字的直接跳出
		if(isNaN(bytes[i])){
			console.warn("传入参数错误，第一个参数要求数组内的所有项均为数字。请检查!");
			return [];
		}
	}
	var result = [];

	//单个输入的单位转换
	function unitConversion(bytes) {
		var temp = {};
		var units = unitList || ['byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];

		//储存所有配置单位最大值
		function unit2() {
			var U = [];
			for (var i = 1; i < units.length + 1; i++) {
				var nextUnit = Math.pow(interval || 1024, i);
				U.push(nextUnit);
			}
			return U;
		};
		var unit2 = unit2();
		//遍历单位最大值对比当前byte数，并计算出当前byte所在单位在配置中的索引
		for (var i = 0; i < unit2.length; i++) {
			if (unit2[i] > bytes) {
					temp.number = (bytes / Math.pow(interval || 1024, i)).toFixed(3),
					temp.unit = units[i]
				break;
			}
		}
		return temp;
	};
	for (var i = 0; i < bytes.length; i++) {
		result.push(unitConversion(bytes[i]));
	}
	return result;
};
