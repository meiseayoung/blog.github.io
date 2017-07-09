
var BaseComponent = Class.extend({
	/**
	 * 功能说明： 消毁组件		* 参数说明：
	 *无参数
	 **/
	destroy: function() {
		var me = this;
		$(me.config.renderTo).find("*").unbind();
		$(me.config.renderTo).empty();
	},
	/**
	 *功能说明 ：添加自定义事件
	 *参数说明 ：
	 *参数type-自定义事件类型(名称)
	 *参数hander-自定义事件类型对应的事件执行函数
	 **/
	on: function(type, handler) {
		var me = this;
		if ( this.handlers === undefined ){
			this.handlers = {};
		} 
		if (typeof me.handlers[type] == "undefined") {
			me.handlers[type] = [];
		}
		me.handlers[type].push(handler);
	},
	/**
	 *功能说明 ：触发自定义事件
	 *参数说明 ：
	 *参数type-自定义事件类型(名称)
	 *参数data-自定义事件类型对应的事件执行函数的参数
	 **/
	fire: function(type, data) {
		var me = this;
		if (me.handlers[type] instanceof Array) {
			var handlers = me.handlers[type];
			for (var i = 0; i < handlers.length; i++) {
				handlers[i](data);
			}
		}
	},
	/**
	 *功能说明 ：移除事件
	 *参数说明 ：
	 *参数type-事件类型(名称)
	 **/
	off: function(type, handler) {
		var me = this;
		var handlers = this.handlers[type];
		if (me.handlers[type] instanceof Array) {
			for (var i = 0; i < handlers.length; i++) {
				if (handlers[i] === handler) {
					break;
				}
			}
		}
		handlers.splice(i, 1);
	},
	/**
	 *功能说明 : 显示组件UI
	 *参数说明 ：
	 *参数isAnimate-是否开启动画效果
	 **/
	show: function(isAnimate) {
		var me = this;
		if (isAnimate === true) {
			$(me.config.renderTo).slideDown(400)
		} else {
			$(me.config.renderTo).show();
		}
	},
	/**
	 *功能说明 : 隐藏组件UI
	 *参数说明 ：
	 *参数isAnimate-是否开户动画效果
	 **/
	hide: function(isAnimate) {
		var me = this;
		if (isAnimate === true) {
			$(me.config.renderTo).slideUp(400);
		} else {
			$(me.config.renderTo).hide();
		}
	},
	/**
	 *功能说明 : 设置组件UI高度
	 *参数说明 ：
	 *参数height-高度
	 **/
	setHeight: function(height) {
		var me = this;
		$(me.config.renderTo).css({
			height: height
		});
	},
	/**
	 *功能说明 : 设置组件UI高度
	 *参数说明 ：
	 *参数width-宽度
	 **/
	setWidth: function(width) {
		var me = this;
		$(me.config.renderTo).css({
			width: width
		});
	},
	/**
	 *功能说明 : 设置组件UI高度
	 *参数说明 ：
	 *无参数
	 **/
	getHeight: function() {
		var me = this;
		var height = $(me.config.renderTo).height();
		return height;
	},
	/**
	 *功能说明 : 设置组件UI高度
	 *参数说明 ：
	 *无参数
	 **/
	getWidth: function() {
		var me = this;
		var width = $(me.config.renderTo).width();
		return width;
	},
	/**
	 *功能说明 : 重新
	 *参数说明 ：
	 *无参数
	 **/
	_resize: function() {
		var me = this;
	},
	/**
	 *功能说明 : 初始化组件名
	 *参数说明 ：
	 *无参数
	 **/
	_setWidgetClass: function() {
		var me = this;
	}
});
