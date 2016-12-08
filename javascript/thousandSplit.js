function thousandSplit(number,splitSymbol) {
	return number.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
		return $1 + (splitSymbol || ",");
	});
}
