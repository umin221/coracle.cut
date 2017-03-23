/**
 * @author 			umin
 * @since			2016-08-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		header
 * @description
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.Header 标题栏.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Header: {
	 *			// 组件唯一标识 (required).
	 *			id: 'header',
	 *			data: function() {
 	 *				return {
 	 *					// 标题
 	 *					title:'FootBar',
 	 *					buttons: [
 	 *						{text:'返回', icon:'icon-left', cls:'back pull-left', clickFn:function() {
 	 *							page.back();
 	 *						}}
 	 *					]
 	 *				}
 	 *			}
 	 *		}
	 *
	 * **Note:**
	 */
	var Header = Klass.define(KND.BasicPlug, {
    	init: function() {
            this.initOp();
    	},
		/**
		 * @property {Object} data
		 * 组件 data 结构.
		 * @property {String} data.title
		 * 标题
		 * @property {Array} data.buttons
		 * 按钮集
		 * @property {String} data.buttons.text
		 * 显示的文字
		 * @property {String} data.buttons.icon
		 * icon 样式绑定
		 * @property {String} data.buttons.cls
		 * 按钮样式绑定 左侧按钮需包含cls [pull-left] 右侧按钮需包含cls [pull-right]
		 * @property {String} data.buttons.clickFn
		 * 按钮 handler
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
	            template: require('./header.tpl'),
	            data: function () {
	                return {
	                	title:'公共组件',
	                	buttons: [{ text:'返回', icon:'icon-left', cls:'back pull-left', clickFn:function() {
	                			console.log('back');
	                			history.back();
	                		}
	                	},{
	                		text:'编辑', icon:'', cls:'edit pull-right', clickFn:function() {
	                			console.log('edit');
	                		}
	                	}]
	                };
	            }
	    	}
    	},
		compiled: function() {
			$('#ktc_temp_header').remove();
		}
    });

	KND.Header = Header;
})