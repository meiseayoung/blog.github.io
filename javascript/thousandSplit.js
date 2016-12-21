//此方法要求第一个参数必须为小数
function thousandSplit(number,splitSymbol) {
	return (number+"").replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
		return $1 + (splitSymbol || ",");
	});
};
//此方法最佳
function formatNumber(string) {
	if (isNaN(string)) {
		return '-';
	}
	string = (string + '').split('.');
	return string[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (string.length > 1 ? ('.' + string[1]) : '');
};

/**
 * 数字三位分割
 * @param  {[String | Number]} string [字符]
 * @param  {[Number]} n      [分割位数]
 * @param  {[String]} sign   [分割符号]
 * @return {[String]}        [description]
 */
function formatNumber(string, n, sign) {
	var symbol = sign || ",";
	var splitNumber = n || 3;
	var numbers = string.split("."),
		numberInt = numbers[0],
		numberFloat = (numbers.length <= 1 ? "" : ("." + numbers[1]));
	var result = "";
	var rest = numberInt.slice(0, numberInt.length % splitNumber);
	var divide = numberInt.slice(numberInt.length % splitNumber).split("");
	if (divide === "") {
		result = rest;
	} else {
		result = (rest === "" ? rest : (rest + symbol)) + divide.map(function(value, index) {
			if ((index + 1) % splitNumber === 0 && (index + 1) !== divide.length) {
				return value + symbol
			} else {
				return value;
			}
		}).join("");
	}
	return result + numberFloat;
}
