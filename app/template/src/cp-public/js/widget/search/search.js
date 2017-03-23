/**
 * @author 			zhuming
 * @since			2016-08-23
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		search
 * @description
 */
'use strict';
define(function(require, exports, module) {

    /**
     * @class Widget.Search 搜索组件.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		Search: {
	 *			// 组件唯一标识 (required).
	 *			id: 'search',
	 *			data: function() {
 	 *				return {
 	 *					btntext:'确认', placeholder:'输入关键字...', icon:'icon-search', cls:'', key:'',
 	 *					btnClickFn:function() {
 	 *					    console.log("点击按钮");
 	 *					    this._data.cls = '';
 	 *					},
 	 *					iptClickFn:function() {
 	 *					    console.log("点击输入框");
 	 *					    this._data.cls = 'searchbar-active';
 	 *					 }
 	 *				}
 	 *			},
 	 *			searchFn: function(val) {
 	 *			    console.log(val)
 	 *			}
 	 *		}
     *
     * **Note:**
     */
    var Search = Klass.define(KND.BasicPlug, {
        init: function() {
            this.initOp();
            this.vFilter(); // vue 过滤器
        },
        /**
         * @property {Object} data
         * 组件 data 结构
         * @property {String} data.btntext
         * 按钮显示的文字
         * @property {String} data.placeholder
         * 输入框默认文字
         * @property {String} data.maxlength
         * 输入框限制字数
         * @property {String} data.icon
         * 输入框按钮图标
         * @property {String} data.cls
         * 按钮 class
         * @property {String} data.key
         * 搜索字符串 *必选*
         * @property {String} data.btnClickFn
         * 按钮点击事件
         * @property {String} data.iptClickFn
         * 输入框点击事件
         */
        initOp: function() {
            var me = this;
            me.VueOpts = {
                template: require('./search.tpl'),
                data: function () {
                    return {
                        btntext:'确认', placeholder:'输入关键字...', maxlength:100, icon:'icon-search', cls:'', key:'', btnClickFn:function(event) {
                            console.log("点击按钮");
                            this._data.cls = '';
                        }, iptClickFn:function() {
                            console.log("点击输入框");
                            this._data.cls = 'searchbar-active';
                        }
                    }
                },
                methods: {
                    clickFn: function(data) {
                        console.log('methods－clickFn');
                    }
                }
            }
        },
        vFilter: function() {
            var me = this;
            Vue.filter('filter', {
                // model -> view
                // 在更新 `<input>` 元素之前格式化值
                read: function(val) {
                    return val;
                },
                // view -> model
                // 在写回数据之前格式化值
                write: function(val, oldVal) {
                    if (val == oldVal) return val;
                    tools.invoke(me.VueOpts.searchFn, val, oldVal);
                    return val;
                }
            });
        }
    });
    KND.Search = Search;
})