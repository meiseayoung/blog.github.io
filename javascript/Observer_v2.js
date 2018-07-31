/*************************************************************
@author 杨尚波
@email meiseayoung@163.com 
@description 为多个对象的属性添加监听函数
@date 2018/07/30
@version 0.02

@example
	let oberver = new Observer({
		description:{
			name:"Ysb",
			job:"Front end developer",
			favourites:['eating','reading']
		}		
	})
	//单个属性变化监听
	observer.addWather(['name'],funtion(name){
		console.log("name",name)
	});
	//多个属性变化监听
	observer.addWather(['name','job'],funtion(name,job){
		console.log("name,job",name,job)
	});
	//根据条件触发监听函数
	observer.addWather(['favourites'],funtion(favourites){
		console.log("favourites",favourites)
	},function(newObserver,oldObserver,path){
		return newObserver.length > 3
	});
	//更新监听的对象
	observer.update({
		name:"YSB",
		job:"Front end developer",
		favourites:['loving','eating','reading']
	});
	observer.update({
		name:"YSB---",
		job:"jser",
		favourites:['loving','eating']
	});
	observer.update({
		name:"YSB---",
		job:"jser",
		favourites:['loving','eating','woking','swimming']
	});
*************************************************************/
import cloneDeep from 'lodash/cloneDeep.js'
import isEqual from 'lodash/isEqual.js'
import getProp from 'lodash/get.js';
import setProp from 'lodash/set.js';

const toString = Object.prototype.toString
let observerChache = {}//需要被监听的对象
let propsWatchers = []//监听列表事件
let propsWatchFns = {}//监听属性对象的监听事件
let lastFns = []      //最近一次update的监听函数


class Observer {
	/**
	 * @description 根据对象下的属性路径获取对应的值
	 * @param  {Object} object 对象
	 * @param  {String} path   属性路径 如: a.b.c[0]
	 * @return {Any}        对象下的属性路径获取对应的值
	 */
	static _get(object,path){
		return getProp(object,path)
	}
	/**
	 * @description 设置对象指定属性路径的值
	 * @param  {Object} object 对象
	 * @param  {String} path   属性路径 如: a.b.c[0]
	 * @param  {Any} value     要设置属性的值
	 * @return {undefined}     无返回值
	 */
	static _set(object,path,value){
		setProp(object,path,value)
	}
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
			this.execute(prop,value,oldVal)
		});
	}
	/**
	 * @description 添加监听
     * @param {Array<string>} dependences 依赖被监听的对象的属性列表
     * @param {Function} fn 监听函数
     * @param {?Function|Boolean} shouldExecuteWatcher (可选)是否执行监听函数
	 * @param {undefined} fn 无返回值
	 */
	addWatcher(dependences,fn,shouldExecuteWatcher){
		propsWatchers.push({
            dependences,
            fn,
            shouldExecuteWatcher
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
	 * @param  {?Object} newObserver (可选)新的监听对象
	 * @param  {?Object} oldObserver (可选)旧的监听对象
	 * @return {undefined}  无返回值
	 */
	execute(dependence,newObserver,oldObserver){
		if(propsWatchFns[dependence] && toString.call(propsWatchFns[dependence]) === "[object Array]"){
			propsWatchFns[dependence]
			.forEach(fn=>{
                let fndependences = fn.dependences.map(arg=>{
                    return getProp(observerChache,arg)
                });
				if(!lastFns.some(f=>f===fn.fn)){
					new Promise((resolve,reject)=>{
						let result = true;
						if(fn.shouldExecuteWatcher === undefined){
							result = true;
						}if(typeof fn.shouldExecuteWatcher === 'boolean'){
							result = fn.shouldExecuteWatcher
						}else if(typeof fn.shouldExecuteWatcher === 'function'){
							result = fn.shouldExecuteWatcher(newObserver,oldObserver,fn.dependences)
						}else{
							result = true;
						}
						if(result === true){
							resolve(fn,fndependences)
						}
					})
					.then(()=>{
						fn.fn(...fndependences);
					})
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
