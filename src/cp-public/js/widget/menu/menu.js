/**
 * @author 			umin
 * @since			2016-10-21
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		Menu
 * @description
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.Menu Menu 组件.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Menu: {
	 *			// 组件唯一标识 (required).
	 *			id: 'menu',
	 *			// 组件订阅.
	 *			subId: 'menu_dc',
	 *			// 数据过滤键值
	 *			dbData: 'list'
	 *			data: function() {
	 *				return {
	 *					show: false,
	 *					rows: [{
	 *						text:'系统通知', icon:icon
	 *					}]
	 *				}
	 *			}
 	 *		}
	 *
	 * **Note:**
	 */
	var Menu = Klass.define(KND.BasicPlug, {
    	init: function( options ) {
    		this.Vdata = { rows:[], show:false, id:this.componentId };
            this.initOp();
    	},
		clearData: function() {
			this.Vdata.rows = [];
		},
		/**
		 * @property {Boolean} show
		 * 是否显示菜单menu
		 * @property {Object} data
		 * 组件 data 结构.
		 * @property {Array} data.rows
		 * @property {Array} data.rows.text
		 * 显示字段
		 * @property {String} data.rows.icon
		 * 行 icon
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
	            template: require('./menu.tpl'),
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
						tools.invoke(me, me.VueOpts.clickFn, sData, data);
					},
					toggle: function() {
						me.toggle();
					}
				}
	    	}
    	},
    	format: function() {
    		var me = this
				, data = me.data
				, format = me.VueOpts.format
				;
			for (var i = 0; i < data.length; i++) {
				if(data[i]) {
					var row = format(data[i], i);
					if (row) me.Vdata.rows.push(row);
				}
			};
    	},
		/**
		 * @method
		 * 获取组件 data
		 */
    	getData: function() {
            return $.extend(true, {}, this.Vdata.data);
    	},
		/**
		 * 显示/隐藏切换
		 */
		toggle: function() {
			var data = this.vue._data;
			data.show = !data.show;
		}
    });

	KND.Menu = Menu;
})