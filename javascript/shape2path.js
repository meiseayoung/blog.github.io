/**
 * @description 圆转path
 * @param  {HTMLElement nodeType='circle'} <circle cx="10" cy="10" r="2" fill="red"/>
 * @return {String} 转换后的path
 */
export function circle(shape) {
	const cx = shape.getAttribute('cx') || 0,
		cy = shape.getAttribute('cy') || 0,
		r = shape.getAttribute('r') || 0,
		fill = shape.getAttribute('fill') || 'rgba(0,0,0,0)',
		stroke = shape.getAttribute('stroke') || 'rgba(0,0,0,0)',
		strokeWidth = shape.getAttribute('stroke-width') || 0,
		path = `M${cx-r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0 a${r} ${r} 0 1 0 ${-2*r} 0z`;
	return {
		fill,
		stroke,
		strokeWidth,
		path
	}
}
/**
 * @description 椭圆转path
 * @param  {HTMLElement nodeType='ellipse'} <ellipse cx="240" cy="100" rx="220" ry="30" fill="purple" />
 * @return {String} 转换后的path
 */
export function ellipse(shape) {
	const cx = shape.getAttribute('cx') || 0,
		cy = shape.getAttribute('cy') || 0,
		rx = shape.getAttribute('rx') || 0,
		ry = shape.getAttribute('ry') || 0,
		r = shape.getAttribute('r') || 0,
		fill = shape.getAttribute('fill') || 'rgba(0,0,0,0)',
		stroke = shape.getAttribute('stroke') || 'rgba(0,0,0,0)',
		strokeWidth = shape.getAttribute('stroke-width') || 0,
		path = `M${cx-rx} ${cy}a${rx} ${ry} 0 1 0 ${2*rx} 0a${rx} ${ry} 0 1 0 ${-2*rx} 0z`;
	return {
		fill,
		stroke,
		strokeWidth,
		path
	}
}
/**
 * @description 矩形(圆角矩形)转path
 * @param  {HTMLElement nodeType='rect'} <rect x='0' y='0' rx='5' ry='5' rect width="300" height="100" fill='rgb(0,0,255,1)';stroke-width:1; stroke:rgb(0,0,0,1)"/>
 * @return {String} 转换后的path
 */
export function rect(shape) {
	const x = shape.getAttribute('x') || 0,
		y = shape.getAttribute('y') || 0,
		width = shape.getAttribute('width') || 0,
		height = shape.getAttribute('height') || 0,
		rx = shape.getAttribute('rx') || 0,
		ry = shape.getAttribute('ry') || 0,
		fill = shape.getAttribute('fill') || 'rgba(0,0,0,0)',
		stroke = shape.getAttribute('stroke') || 'rgba(0,0,0,0)',
		strokeWidth = shape.getAttribute('stroke-width') || 0,
		path = `M${x} ${y+ry}a${rx} ${ry} 0 0 1 ${rx} ${-ry}h${width-rx-rx}a${rx} ${ry} 0 0 1 ${rx} ${ry}v${height-ry-ry}a${rx} ${ry} 0 0 1 ${-rx} ${ry}h${rx+rx-width}a${rx} ${ry} 0 0 1 ${-ry}z`;
	return {
		fill,
		stroke,
		strokeWidth,
		path
	}
}
/**
 * @description 线条转path
 * @param  {HTMLElement nodeType='line'} <line x1="0" y1="0" x2="300" y2="300" stroke="rgb(99,99,99)" stroke-width="2"/>
 * @return {String} 转换后的path
 */
export function line(shape) {
	const x1 = shape.getAttribute('x1') || 0,
		y1 = shape.getAttribute('y1') || 0,
		x2 = shape.getAttribute('x2') || 0,
		y2 = shape.getAttribute('y2') || 0,
		fill = shape.getAttribute('fill') || 'rgba(0,0,0,0)',
		stroke = shape.getAttribute('stroke') || 'rgba(0,0,0,0)',
		strokeWidth = shape.getAttribute('stroke-width') || 0,
		path = 'M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2;
		path = `M${x1} ${y1}L${x2}`
	return {
		fill,
		stroke,
		strokeWidth,
		path
	}
}
/**
 * @description 折线转path
 * @param  {HTMLElement nodeType='polyline'} <polyline points="0,0 0,20 20,20 20,40 40,40 40,60" fill="white" stroke="red" stroke-width="2"/>
 * @return {String} 转换后的path
 */
export function polyline(shape) {
	const points = shape.getAttribute('points'),
		fill = shape.getAttribute('fill') || 'rgba(0,0,0,0)',
		stroke = shape.getAttribute('stroke') || 'rgba(0,0,0,0)',
		strokeWidth = shape.getAttribute('stroke-width') || 0,
		path = 'M' + points.slice(0, 2).join(' ') + 'L' + points.slice(2).join(' ');
	return {
		fill,
		stroke,
		strokeWidth,
		path
	}
}
/**
 * @description 多边形转path
 * @param  {HTMLElement nodeType='polygon'} <polygon points="220,100 300,210 170,250" fill="#cccccc" stroke="#000000" stroke-width="1"/>
 * @return {String} 转换后的path
 */
export function polygon(shape) {
	const points = shape.getAttribute('points'),
		fill = shape.getAttribute('fill') || 'rgba(0,0,0,0)',
		stroke = shape.getAttribute('stroke') || 'rgba(0,0,0,0)',
		strokeWidth = shape.getAttribute('stroke-width') || 0,
		path = 'M' + points.slice(0, 2).join(' ') + 'L' + points.slice(2).join(' ') + 'z';
	return {
		fill,
		stroke,
		strokeWidth,
		path
	}
}
