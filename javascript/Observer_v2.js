import cloneDeep from 'lodash/cloneDeep.js'
import isEqual from 'lodash/isEqual.js'
import getProp from 'lodash/get.js';

const toString = Object.prototype.toString
let observerChache = {}//需要被监听的对象
let propsWatchers = []//监听列表事件
let propsWatchFns = {}//监听属性对象的监听事件
let lastFns = []      //最近一次update的监听函数
/**
 * @description 获取函数的参数列表
 * @param  {String} fnstring function.toString()字符串
 * @return {Number<string>} 函数的参数列表
 */
function getArguments(fnstring){
	var start = fnstring.indexOf("(");
	var end = fnstring.indexOf(")");
	var args = fnstring.slice(start+1, end).split(",").map(item=>item.trim());
	return args
}

/**
 * 获取扁平化对象字符串下的对象KEY对应的值 
 * @param {object} object 对象
 * @param {string} prop 扁平化对象字符串的KEY  数组下标使用.符号获取
 * @return type:Any
 **/
// function getProp(object, prop) {
// 	if (typeof prop !== "string") {
// 		console.error("参数错误 : \n 第二个参数类型为字符串,请检查");
// 		return;
// 	}
// 	if (prop === "") {
// 		return object;
// 	}
// 	var keys = prop.split(".");
// 	try {
// 		return (keys.reduce((p, n) => {
// 			if (p[n]) {
// 				return p[n];
// 			}
// 		}, object));
// 	} catch (err) {
// 		return (err);
// 	}
// }



class Observer {
	/**
	 * @description 初始化
	 * @param {Object} observer 被监听的对象
	 * @return {undefined} 无返回值
	 */
	constructor(observer){
		if(!this._checkObserver(observer)){
			return
		}
		observerChache = observer
		this._collectionDependence()
	}
	/**
	 * @description 设置被监听对象
	 * @param {Object} observer 监听对象
	 * @return {undefined} 无返回值
	 */
	setObserver(observer){
		observerChache =  observer
	}
	/**
	 * @description 获取监听对象
	 * @return {Object} 被监听的对象
	 */
	getObserver(){
		return cloneDeep(observerChache)
	}
	_checkObserver(observer){
		if(toString.call(observer) === "[object Object]"){
			observerChache = observer
			return true
		}else{
			throw Error("只接受对象形式的监听对象,请检查传入的参数是否为对象！");
			return false
		}
	}
	/**
	 * @description 收集依赖
	 * @return {undefined} 无返回值
	 */
	_collectionDependence(){
		propsWatchFns = propsWatchers.map((watcher,index)=>{
			return watcher.dependences;
		}).reduce((p,n,i,a)=>{
			n.forEach(item=>{
				if(p[item] === undefined){
					p[item] = [propsWatchers[i]]
		        }else{
					p[item].push(propsWatchers[i])}
		    });
		    return p;
		},{})
	}
	/**
	 * @description 脏值检测
	 * @param  {Object} value  新值
	 * @param  {Object} oldVal 旧值
	 * @return {undefined}     无返回值
	 */
	_diff(value){
		let oldVal = this.getObserver();
		//搜集发生变化的依赖
		let needUpdateProps = [];
		Object.keys(propsWatchFns).forEach(prop=>{
			let newValue = getProp(value,prop);
			let oldValue = getProp(oldVal,prop);
			if( !isEqual(newValue,oldValue) ){
				needUpdateProps.push(prop);
			}
		});
		this.setObserver(value);
		needUpdateProps.forEach(prop=>{
			this.execute(prop)
		});
	}
	/**
	 * @description 添加监听
     * @param {Array<string>} dependences 依赖被监听的对象的属性列表
	 * @param {undefined} fn 无返回值
	 */
	addWatcher(dependences,fn){
		propsWatchers.push({
            dependences,
            fn
        });
		this._collectionDependence();
	}
	/**
	 * @description  通过函数引用移除监听
	 * @param  {Function} fn 函数引用
	 * @return {undefined}   无返回值
	 */
	removeWatcherByFn(fn){
		for(let i=0;i<propsWatchers.length;i++){
			if(propsWatchers[i].fn === fn){
				propsWatchers.splice(i,1);
				this._collectionDependence();
				break;
			}
		}
	}
	/**
	 * @description 通过监听属性移除监听
	 * @param  {String} prop 被监听对象的属性
	 * @return {undefined}   无返回值
	 */
	removeWatcherByProp(prop){
		for(let i=propsWatchers.length-1;i>=0;i--){
			if(propsWatchers[i].dependences.some(dependence=>dependence === prop)){
				propsWatchers.splice(i,1);
			}
		}
		this._collectionDependence();
	}
	/**
	 * @description 执行依赖对应的函数
	 * @param  {String} dependence 依赖属性
	 * @return {undefined}  无返回值
	 */
	execute(dependence){
		if(propsWatchFns[dependence] && toString.call(propsWatchFns[dependence]) === "[object Array]"){
			propsWatchFns[dependence].forEach(fn=>{
                let fndependences = fn.dependences.map(arg=>{
                    return getProp(observerChache,arg)
                });
				if(!lastFns.some(f=>f===fn.fn)){
					fn.fn(...fndependences);
					lastFns.push(fn.fn)
				}else{

				}
			})
		}
	}
	/**
	 * @description 更新监听对象
	 * @param {Object} observer 新的监听对象
	 * @return {undefined} 无返回值
	 **/
	update(observer){
		console.time();
		lastFns = [];
		this._diff(observer)
		lastFns = [];
		console.timeEnd();
	}

}

export default Observer
