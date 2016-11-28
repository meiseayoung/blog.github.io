import Handle from './Handle'
import util from './util'
import $ from 'jquery'
import './style/Select.css'
class Select extends Handle{
	constructor(opts) {
			super(opts);
			this.store = [];
			this.values = [];
			this.uid = util.createUID(6);
			this.handlers = {}
			this.config = {
				renderTo:"body",
				multiple:false,
				data:[]         //[{value:"1",text:"测试数据1"},{value:"2",text:"测试数据2"}]
			};
			this.config = $.extend({}, this.config, opts);			
			this._cacheData(this.config.data);
			this.createDOM(this.store);
			this._initListContainerSize();
			this._initMenuClick();
			this._initShowClick();
			this._initInputMatch();
			$(document).on("click",(e)=>{
				this.hideList();
			});
	}
	/**
	 *功能说明 : 储存数据
	 */	
	_cacheData(data){
		this.store = data.concat([]);
	}
	/**
	 *功能说明 ：创建DOM
	 **/
	createDOM(data){
		var uid = this.uid;
		$("div.z9-select[data-select-uid='"+uid+"']").remove();
		function createList(list){
			var listHTML = "";
			for(var i=0;i<list.length;i++){
				listHTML += ("<li data-value='" + list[i].value+"'><i class='z9-icon-select-multiple'></i><span title='"+ list[i].text +"'>" + list[i].text + "</span></li>")
			}
			return listHTML;
		}
		var htmlTemp = `<div class="z9-select" data-select-uid=${uid}>
							<ul>
								${createList(data)}
							</ul>
						</div>`;
		$("body").append(htmlTemp);
		$(this.config.renderTo).attr("data-select-uid",uid);
	}
	/**
	 *初始化下拉列表大小
	 *
	 */
	_initListContainerSize(){
		var uid = this.uid;
		var height = $(this.config.renderTo).height();
		var width = $(this.config.renderTo).width();
		var top = $(this.config.renderTo).position().top + height + 5;
		var left = $(this.config.renderTo).position().left;
		$("div.z9-select[data-select-uid='"+uid+"']").css({
			width:width,
			top:top,
			left:left
		});
	}
	/**
	 *点击输入框展现下拉
     */
    _initShowClick(){
    	var me = this;
    	var uid = me.uid;
    	$(this.config.renderTo).on("click",function(e){
    		console.log(1);
    		e.stopPropagation();
    		$("body").find("div[data-select-uid='"+uid+"']").toggleClass('show');
    		me.on("beforeShowList",null)
    	})
    }
    /**
	 *点击输入框展现下拉
     */
    showList(){
    	var uid = this.uid;
    	$("body").find("div[data-select-uid='"+uid+"']").addClass('show');
    }
    /**
	 *点击列表项隐藏列表
     */
	hideList(){
		var uid = this.uid;
		$("body").find("div[data-select-uid='"+uid+"']").removeClass('show');
	}
	/**
	 *注册下拉列表点击事件
	 */
	_initMenuClick(){
		var me = this;
		var uid = me.uid;
		$("body").find("div[data-select-uid='"+uid+"']").on("click",function(e){
			e.stopPropagation();
		});
		$("body").find("div[data-select-uid='"+uid+"']").on("click","li",function(e){
			e.stopPropagation();
			var opts = {
				value : $(this).attr("data-value"),
				text: $(this).text() 
			};
			var values = [];
			var indexs = [];
			if(me.config.multiple === true){
				$(this).toggleClass("selected");
				$("div[data-select-uid='"+uid+"'] li.selected").each(function(index,item){
					values.push($(item).text());
					indexs.push(index);
				});
				$(me.config.renderTo).val(values.join(", "));
				//重置组件值
				me.values = [];
				me.values = me.store.filter(function(item,index){
						 return item.value == values[i]
				});
				for(var i=0;i<values.length;i++){
					let v = me.store.filter(function(item,index){
									 return item.text == values[i]
					})[0];
					me.values.push(v)
				}
			}
			else{
				$(this).addClass("selected").siblings("li").removeClass("selected");
				$(me.config.renderTo).val(opts.text);
				//重置组件值
				me.values = [];
				for(let i=0;i<me.store.length;i++){
					if(me.store[i].text == opts.text )
					me.values.push( me.store[i] )
				}
				me.hideList();
			}
			me.on("menuClick",opts)
		})
	}
	/**
	 *输入模糊匹配
	 *
	 */
	_initInputMatch(){
		var me = this;
		$(this.config.renderTo).on("input",function(e){
			var value = e.target.value;
			if(value.trim() === ""){
				me.createDOM(me.store);
			}
			var matchs = me.store.filter(function(item,index){
				return (item.text+"").indexOf(value) !==-1
			});
			
			me.createDOM(matchs);
    		me._initListContainerSize();
    		me._initMenuClick();
    		me.showList();
			console.log(matchs);
			me.on("beforeSearch")
		});
	}
	/**
	 *获取组件唯一标识
     */
    getUID(){
    	return this.uid;
    }
    /**
     *获取组件数据
     *return Array
     */
    getData(){
    	return this.store;
    }
    /**
     *设置组件数据
     *参数 data [Array[{value,text},{value,text}...]]
     */
    setData(data){
    	var uid = this.getUID();
    	if(data instanceof Array){
    		this.store = data;
    		$("div[data-select-uid='"+uid+"']").remove();
    		this._cacheData(data);
    		this.createDOM(data);
    		this._initListContainerSize();
    		this._initMenuClick();
    		this.showList();
    	}
    	else{
    		console.warn("数据格式要求为数组，请检查传入的数据")
    	}
    }
    /**
     *获取组件值
     *return Object
     */
    getValue(){
    	return this.values;
    }
    /**
     *设置组件值
     *参数 value [Object{value,text}]
     */
    setValue(value){
    	var uid = this.getUID();
    	if(this.config.multiple === true){
    		this.values = value;
    		$("body").find("div[data-select-uid='"+uid+"'] li").removeClass("selected");
    		for(let i=0;i<value.length;i++){
    			$("body").find("div[data-select-uid='"+uid+"'] li").filter(function(index,item){
	    			return $(item).attr("data-value") == value[i].value;
	    		}).addClass("selected");
    		}
    		$(this.config.renderTo).val(value.map(function(value,index){
    			return value.text
    		}).join(", "));
    	}else{
    		if( $.type(value) !== "object" ){
    			console.warn("单选下拉组件设置值value参数类型为{value,text}的对象,请检查输入的数据类型")
    			return;
    		}
    		this.values = [value];
    		$("body").find("div[data-select-uid='"+uid+"'] li").filter(function(index,item){
    			return $(item).attr("data-value") == value.value;
    		}).addClass("selected").siblings('li').removeClass('selected');
    		$(this.config.renderTo).val(value.text);
    	}
    }
}
export default Select;
