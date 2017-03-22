/**
 * @author 			zhuming
 * @since			2016-09-18
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		button
 * @description
 */
'use strict';
define(function(require, exports, module) {

    /**
     * @class Widget.Button 按钮.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		Button: {
	 *			// 组件唯一标识 (required).
	 *			id: 'button',
	 *			data: function() {
 	 *				return {
 	 *				    text:'Big Round Button', cls:'button-big button-round', clickFn:function() {
 	 *                      console.log('Big Round Button');
 	 *				    }
 	 *				}
 	 *			}
 	 *		}
     *
     * **Note:**
     */
    var Button = Klass.define(KND.BasicPlug, {
        init: function() {
            this.initOp();
        },
        /**
         * @property {Object} data
         * 组件 data 结构.
         * @property {String} data.text.
         * 显示的文字
         * @property {String} data.cls.
         * 按钮 class
         * @property {String} data.clickFn.
         * 按钮 clickFn事件
         */
        initOp: function() {
            var me = this;
            me.VueOpts = {
                template: require('./button.tpl'),
                data: function () {
                    return {
                        text:'Usual Button 1', cls:'button-light', clickFn: function() {
                            console.log('Usual Button 1');
                        }
                    }
                }
            }
        }

    });

    KND.Button = Button;
})