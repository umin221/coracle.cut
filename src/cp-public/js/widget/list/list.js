/**
 * @author 			umin
 * @since			2016-08-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		List
 * @description
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.List 列表组件.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		List: {
	 *			// 组件唯一标识 (required).
	 *			id: 'list',
	 *			// 组件订阅.
	 *			subId: 'list_dc',
	 *			// 数据过滤键值
	 *			dbData: 'list',
	 *			// dom 添加模式 push/unshift 默认为 push
	 *			appendMode: 'push',
	 *			// 数据格式化方法
	 *			format: function(data) {
	 *				return {
	 *					labels:[{title:data.title, cls:'item-title', after:data.summary}, {title:data.pubTime, cls:'item-subtitle'}],
	 *					href:'', cls:'tttt', id: data.id
 	 *				}
 	 *			},
 	 *			// 当行被点击时触发
 	 *			clickFn: function( data ) {}
 	 *		}
	 *
	 * **Note:**
	 */
	var List = Klass.define(KND.BasicPlug, {
    	init: function() {
    		this.Vdata = {rows:[], empty:false, id:this.componentId};
            this.initOp();
    	},
		clearData: function() {
			this.Vdata.rows = [];
		},
		/**
		 * @property {Object} data
		 * 组件 data 结构.
		 * @property {String} data.href
		 * 路由指向
		 * @property {Array} data.rows
		 * @property {Array} data.rows.labels
		 * 显示字段
		 * @property {String} data.rows.labels.title
		 * 行title
		 * @property {String} data.rows.labels.after
		 * 行after
		 * @property {String} data.rows.labels.cls
		 * 行样式绑定
		 * @property {String} data.rows.href
		 * 路由指向
		 * @property {String} data.rows.cls
		 * 样式绑定
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
				template: require('./list.tpl'),
				appendMode: 'push',
	            data: function() {
	            	return me.Vdata;
	            },
	    		methods: {
					/**
					 * @event clickFn
					 * 行点击时触发.
					 * @param {Object} data 当前点击行data.
					 */
	    			clickFn: function( data ) {
						me._data = data;
	    				var sData = me.sData = $.extend(true, {}, data);
						KND.Publisher.publish('setParam', sData, me);
	    				tools.invoke(me, me.VueOpts.clickFn, sData, data);
	    			}
	    		}
	    	}
    	},
    	format: function() {
    		var me = this
				, data = KND.Util.parseArray(me.data)
				, format = me.VueOpts.format
				, maxlen = me.VueOpts.maxlen || 10
				, appendMode = me.VueOpts.appendMode
				, flag = data.length >= maxlen
				, hasLoad = flag ? 'hasload' : 'noload'
				, unLoadMore = me.state != 'loadmore'
				;
			me.Vdata.empty = false;
			if (unLoadMore) { // 非加载历史记录则清空当前数据
				me.Vdata.rows = [];
				if (me.lastScrollHeight) me.lastScrollHeight = 0;
			}
			for (var i = 0; i < data.length; i++) {
				if(data[i]) {
					var row = format(data[i], i);
					if (row) me.Vdata.rows[appendMode](row);
				}
			};
			if (unLoadMore && !me.Vdata.rows.length) me.Vdata.empty = true;
			KND.Publisher.publish(hasLoad, flag, me); // 是否有更多数据
    	},
		/**
		 * @method
		 * 返回点击行 data.
		 */
    	getData: function() {
            return this.sData;
    	},
		compiled: function() {
			// 内容往上添加时，滚动到最后标记位置
			if (this.VueOpts.appendMode == 'unshift') this.scrollToLastPosition();
		},
		/**
		 * 内容往上添加时，滚动到最后标记位置
		 * 仅当 appendMode 为 unshift 时触发
		 */
		scrollToLastPosition: function() {
			var me = this;
			if (!me.$container) me.$container = $('#'+ me.Vdata.id).parents('.pull-to-refresh-content');
			var lastScrollHeight = me.lastScrollHeight
				, scrollHeight = me.$container[0].scrollHeight
				;
			if (lastScrollHeight != scrollHeight) {
				me.$container.scrollTop(lastScrollHeight ? (scrollHeight - lastScrollHeight) : scrollHeight);
				me.lastScrollHeight = scrollHeight;
			}
		}
    });

	KND.List = List;
})