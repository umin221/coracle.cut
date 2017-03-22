/**
 * @author 			zhuming
 * @since			2016-09-18
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		buttongroup
 * @description
 */
'use strict';
define(function(require, exports, module) {

    /**
     * @class Widget.Buttongroup 按钮.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		Buttongroup: {
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
    var Buttongroup = Klass.define(KND.BasicPlug, {
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
         * 按钮 clickFn事件
         */
        initOp: function() {
            var me = this;
            me.VueOpts = {
                template: require('./buttongroup.tpl'),
                data: function () {
                    return {
                        buttons:[{
                            text:'Button 1', cls:'', clickFn: function() {
                                console.log('Button 1');
                            }
                        },{
                            text:'Button 2', cls:'', clickFn: function() {
                                console.log('Button 2');
                            }
                        },{
                            text:'Button 3', cls:'', clickFn: function() {
                                console.log('Button 3');
                            }
                        }]
                    }
                }
            }
        }

    });

    KND.Buttongroup = Buttongroup;
})