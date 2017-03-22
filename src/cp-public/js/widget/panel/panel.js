/**
 * @author 			umin
 * @since			2016-08-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		panel
 * @description
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.Panel Panel 组件.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Panel: {
	 *			// 组件唯一标识 (required).
	 *			id: 'panel',
	 *			// 组件订阅.
	 *			subId: 'panel_dc',
	 *			// 数据过滤键值
	 *			dbData: 'panel'
 	 *		}
	 *
	 * **Note:**
	 */
	var Panel = Klass.define(KND.BasicPlug, {
    	init: function( options ) {
    		this.Vdata = { data:{}, id:this.componentId };
            this.initOp();
    	},
		clearData: function() {
			this.Vdata.data = {};
			tools.invoke.call(this, this.VueOpts.inita, this);
		},
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
	            template: require('./panel.tpl'),
	            data: function() {
	            	return me.Vdata;
	            }
	    	}
    	},
		format: function() {
			var me = this
				, format = me.VueOpts.format
				;
			me.Vdata.data = format ? format(me.data) : me.data;
		},
		/**
		 * @method
		 * 获取组件 data
		 */
    	getData: function() {
            return $.extend(true, {}, this.Vdata.data);
    	}
    });

	KND.Panel = Panel;
})