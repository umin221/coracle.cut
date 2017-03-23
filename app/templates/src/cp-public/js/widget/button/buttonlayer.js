/**
 * @author 			umin
 * @since			2016-08-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		buttonlayer
 * @description
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.Buttonlayer 按钮.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Buttonlayer: {
	 *			// 组件唯一标识 (required).
	 *			id: 'buttonlayer',
	 *			data: function() {
 	 *				return {
 	 *					buttons: [{
 	 *						text:'取消', cls:'button-big button-fill button-danger', clickFn:function() {
 	 *							page.$router.go('/');
 	 *						}
 	 *					},{
 	 *						text:'提交', icon:'', cls:'button-big button-fill button-success', clickFn:function() {
 	 *							page.$router.go('/');
 	 *						}
 	 *					}]
 	 *
 	 *				}
 	 *			}
 	 *		}
	 *
	 * **Note:**
	 */
	var Buttonlayer = Klass.define(KND.BasicPlug, {
    	init: function() {
            this.initOp();
    	},
		/**
		 * @property {Object} data
		 * 组件 data 结构.
		 * @property {Array} data.buttons.
		 * 按钮集
		 * @property {String} data.buttons.text.
		 * 显示的文字
		 * @property {String} data.buttons.cls.
		 * 按钮 class
		 * @property {String} data.buttons.clickFn.
		 * 按钮 handler
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
		        template: require('./buttonlayer.tpl'),
		        data: function () {
		        	return {
		            	buttons: [{
		            		text:'取消', cls:'button-big button-fill button-danger', clickFn: function() {
		            			console.log('cancle');
		            		}
		            	},{
		            		text:'提交', icon:'', cls:'button-big button-fill button-success',
		            		clickFn: function() {
		            			console.log('submit');
		            		}
		            	}]
		        	}
		        }
			}
    	}
    
    });

	KND.Buttonlayer = Buttonlayer;
})