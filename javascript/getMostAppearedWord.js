var string = "The officials say tougher legislation is needed because some telecommunications companies in recent years have begun new services and made system upgrades that create technical obstacles to surveillance. They want to increase legal incentives and penalties aimed at pushing carriers like Verizon, AT&T, and Comcast to ensure that any network changes will not disrupt their ability to conduct wiretaps.An Obama administration task force that includes officials from the Justice and Commerce Departments, the F.B.I. and other agencies recently began working on draft legislation to strengthen and expand a 1994 law requiring carriers to make sure their systems can be wiretapped. There is not yet agreement over the details, according to officials familiar with the deliberations, but they said the administration intends to submit a package to Congress next year.To bolster their case, security agencies are citing two previously undisclosed episodes in which major carriers were stymied for weeks or even months when they tried to comply with court-approved wiretap orders in criminal or terrorism investigations, the officials said.";

function getMostAppearedWord(string) {
	var preTime = new Date().getTime();
	//取得所有单词匹配项
	var matchs = string.match(/\s*\w+\s*/gi);
	//数组转对象，用于统计单词出现的次数
	var o = {};
	for (var i = 0; i < matchs.length; i++) {
		if (o[matchs[i].trim()] === undefined) {
			o[matchs[i].trim()] = 1;
		} else {
			o[matchs[i].trim()] += 1;
		}
	};
	//对象转数组，方便调用数组的高级方法
	var array = [];
	for (key in o) {
		array.push({
			key: key,
			value: o[key]
		})
	};
	//找到最大值
	var result = array.reduce(function(pre, next) {
		if (next.value > pre.value) {
			return next
		} else {
			return pre
		}
	});
	var nextTime = new Date().getTime();
	console.log("找到字符串中出现最多的单词为:" + result.key + "，最多出现:" + result.value + "次;\n用时:" + (nextTime - preTime) + "毫秒")
	return result
}
