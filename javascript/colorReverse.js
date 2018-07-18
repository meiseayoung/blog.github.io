/**
 * @describtion 十进制转RGBA颜色
 * @param  {Number} color 10进制颜色值
 * @return {String}       RGBA颜色值
 */
export function color10toRGBA(color) {
	color = Number.parseInt(color);
	let r = (color & 0xFF000000) >>> 24;
	let g = (color & 0xFF0000) >> 16;
	let b = (color & 0xFF00) >> 8;
	let a = (color & 0xFF);
	return 'rgba(' + r + ',' + g + ',' + b + ',' + a / 255 + ')';
}


/**
 * @describtion RGBA颜色值转10进制
 * @param  {String} color RGBA颜色值
 * @return {Number}       10进制
 */
export function colorRGBAto10(color) {
	if (color.indexOf("rgb") !== -1 && color.indexOf("rgba") === -1) {
		let rgb = color.replace(/\b|\s/gi, "").replace("rgb", "").replace(/\(|\)/gi, "").split(",");
		let r = parseInt(rgb[0]);
		let g = parseInt(rgb[1]);
		let b = parseInt(rgb[2]);
		let a = 1;
		color = `rgba(${r},${g},${b},${a})`;
	}
	let rgba = color.replace(/\b|\s/gi, "").replace("rgba", "").replace(/\(|\)/gi, "").split(",");
	let r = parseInt(rgba[0]);
	let g = parseInt(rgba[1]);
	let b = parseInt(rgba[2]);
	let a = Math.floor(rgba[3] * 255);
	let result = ((r << 24) + (g << 16) + (b << 8) + a)

	return result;
}

export function color16to10(color) {
	return parseInt("0x" + color.replace("#", ""));
}

export function colorTo10(color) {
	if (color.indexOf("#") !== -1) {
		return color16to10(color)
	} else {
		return colorRGBAto10(color)
	}
}
