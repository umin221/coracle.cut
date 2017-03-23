/**
 * @author 			umin
 * @since			2016-08-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		footbar
 * @description
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.Footbar 工具栏.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Footbar: {
	 *			// 组件唯一标识 (required).
	 *			id: 'footbar',
	 *			data: function() {
 	 *				return {
 	 *					// 不配置 icon 选项，则只显示文案
 	 *					buttons: [{
 	 *						text:'Home', icon:'icon-home', cls:'tts', clickFn:function() {
 	 *							console.log('Home');
 	 *						}
 	 *					},{
 	 *						text:'Me', icon:'icon-me', clickFn:function() {
 	 *							console.log('Me');
 	 *						}
 	 *					},{
 	 *						text:'Star', icon:'icon-star', clickFn:function() {
 	 *							console.log('Star');
 	 *						}
 	 *					},{
 	 *						text:'Setting', icon:'icon-settings', clickFn:function() {
 	 *							console.log('Setting');
 	 *						}
 	 *					}]
 	 *				}
 	 *			}
 	 *		}
	 *
	 * **Note:**
	 */
	var Footbar = Klass.define(KND.BasicPlug, {
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
		 * @property {String} data.buttons.icon.
		 * icon 样式绑定
		 * @property {String} data.buttons.cls.
		 * 按钮样式绑定
		 * @property {String} data.buttons.clickFn.
		 * 按钮 handler
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
				template: require('./footbar.tpl'),
		        data: function () {
		            return {
		            	buttons: [{ text:'Home', icon:'icon-home', cls:'tts', clickFn:function() {
		            			console.log('Home');
		            		}
		            	},{
		            		text:'Me', icon:'icon-me', clickFn:function() {
		            			console.log('Me');
		            		}
		            	},{
		            		text:'Star', icon:'icon-star', clickFn:function() {
		            			console.log('Star');
		            		}
		            	},{
		            		text:'Setting', icon:'icon-settings', clickFn:function() {
		            			console.log('Setting');
		            		}
		            	}]
		            };
		        }
    		}
    	}
	});

	KND.Footbar = Footbar;
})