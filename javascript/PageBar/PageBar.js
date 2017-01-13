var PageBar = BaseComponent.extend({
	init:function(opts){
		var config = {
			selector:"",
			pages:[],        //格式 [{value,text,disabled}]
			currentPage:0      
		}
		this.handlers = {};
		this.events = {
			beforeActivePage:"激活页签前事件",
			pageClick:"页签点击事件",
			activePage:"激活页签事件"
		};
		this.config = $.extend({},config,opts);
		this.pages = $.extend(true,config.pages,opts.pages);
		this.currentPage = this.config.currentPage;
		this._createPagesDOM(this.pages);
		this._initPageClick();
	},
	/**
	 * [创建页签DOM节点]
	 * @param  {[type]} pages [description]
	 */
	_createPagesDOM:function(pages){
		var $container = $(this.config.selector);
		var list = pages.map(function(value,index){
			return "<li data-id='"+value.value+"' data-disabled='"+Boolean(value.disabled).toString()+"'><span>"+value.text+"</span></li>";
		});
		var ul = "<ul class='navs'>"+list.join("")+"</ul>";
		$container.html(ul);
		this.setActivePage(this.currentPage); 
	},
	/**
	 * [初始化页签的点击事件]
	 */
	_initPageClick:function(){
		var me = this;		
		$(me.config.selector).on("click","li",function(e){
			var id = $(this).attr("data-id");
			var value = me.pages.filter(function(value,index) {
				return value.value == id;
			})[0];
			//激活页签前事件
			me.fire("beforeActivePage",value);
			//这下判断不写在最前面的原因是为了在页签不可用的情景下处理激活页签前事件
			if($(this).attr("data-disabled") === "true"){
				return;
			}
			me.setActivePage(id);
			//页签点击事件
			me.fire("pageClick",value);
		});
	},
	/**
	 * [通过ID查找对应的页面]
	 * @param  {[String]} id [页签ID]
	 * @return {[type]}    [description]
	 */
	getActivePage:function(id){
		var me = this;
		return me.pages.filter(function(value,index) {
			return value.value == me.currentPage
		})[0];
	},
	/**
	 * [通过ID激活指定页签]
	 * @param  {[type]} id [description]
	 */
	setActivePage:function(id){
		this.currentPage = id;
		$(this.config.selector).find("li").filter(function(index,elem){
			return $(elem).attr("data-id") == id;
		}).addClass("active").siblings('li').removeClass('active');
	},
	/**
	 * [通过ID移除指定页面]
	 * @param  {[type]} id [description]
	 */
	removePage:function(id){
		var newPages = this.pages.filter(function(value,index) {
			return value.value !== id;
		});
		this.pages = newPages;
		$(this.config.selector).find("li").filter(function(index,elem){
			return $(elem).attr("data-id") == id;
		}).remove();
	},
	/**
	 * [添加页签]
	 * @param {[String]} page    [页签对象{
	 *                           			value,
	 *                           			text,
	 *                           			disabled
	 * }]
	 * @param {[String]} url   [页面URL]
	 * @param {[String]} title [页签显示名称]
	 */
	addPage:function(page,url,title){
		this.pages.push(page);
		this._createPagesDOM(this.pages);
	},
	/**
	 * [通过ID隐藏指定页签]
	 * @param  {[Strinng]} id [页签ID]
	 */
	hidePage:function(id){
		$(this.config.selector).find("li").filter(function(index,elem){
			return $(elem).attr("data-id") == id;
		}).hide();
		if(id == this.currentPage){
			this.currentPage = this.pages[0].value;
			this.setActivePage(this.currentPage);
		}
	},
	/**
	 * [通过ID显示指定页签]
	 * @param  {[ID]} id [页签ID]
	 */
	showPage:function(id){
		$(this.config.selector).find("li").filter(function(index,elem){
			return $(elem).attr("data-id") == id;
		}).show();
	},
	/**
	 * [设置页签是否可用]
	 * @param  {[String]} id [页签ID]
	 * @param  {[Boolean]} id [可用状态]
	 */
	disabledPage:function(id,disabled){
		var pages = this.pages.map(function(value,index){
				 if(value.value == id){
				 	value.disabled = disabled
				 }
				 return value;
		});
		this._createPagesDOM(pages);
	},
	/**
	 * [设置所有页签是否可用]
	 * @param  {[Boolean]} id [可用状态]
	 */
	disabledAllPage:function(disabled){
		var pages = this.pages.map(function(value,index){
			value.disabled = disabled;
			return value;
		});
		this._createPagesDOM(pages);
	}
});