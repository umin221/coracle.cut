/**
 * @author 			zhuming
 * @since			2016-09-19
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		Contactslist
 * @description
 */
'use strict';
define(function(require, exports, module) {

    /**
     * @class Widget.Contactslist 列表组件.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		Contactslist: {
	 *			// 组件唯一标识 (required).
	 *			id: 'list',
	 *			// 组件订阅.
	 *			subId: 'list_dc',
	 *			// 数据过滤键值
	 *			dbData: 'list',
	 *			// 数据格式化方法
	 *			format: function(data) {
	 *				return {
	 *			         rows: [{
     *                   title:'A',
     *                   labels:[
     *                       {title:'标题1', cls:''},
     *                       {title:'标题2', cls:''},
     *                   ], cls:''
     *               },{
     *                   title:'B',
     *                   labels:[
     *                       {title:'标题1', cls:''},
     *                       {title:'标题2', cls:''},
     *                       {title:'标题3', cls:''}
     *                   ], cls:''
     *               }]
 	 *				}
 	 *			},
 	 *			// 当行被点击时触发
 	 *			clickFn: function( data ) {}
 	 *		}
     *
     * **Note:**
     */
    var Contactslist = Klass.define(KND.BasicPlug, {
        init: function() {
            this.Vdata = {rows:[], id:this.componentId};
            this.initOp();
        },
        clearData: function() {
            this.Vdata.rows = [];
        },
        /**
         * @property {Object} data
         * 组件 data 结构.
         * @property {Array} data.rows
         * @property {Object} data.rows.title
         * 显示标题
         * @property {Array} data.rows.labels
         * 显示字段
         * @property {String} data.rows.labels.title
         * 行after(内容)
         * @property {String} data.rows.labels.cls
         * 小图标样式
         * @property {String} data.rows.cls
         * 样式绑定(为item-link加箭头)
         */
        initOp: function() {
            var me = this;
            me.VueOpts = {
                template: require('./contactslist.tpl'),
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
                        var sData = me.sData = $.extend(true, {}, data);
                        tools.invoke(me.VueOpts.clickFn, sData);
                    }
                }
            }
        },
        format: function() {
            var me = this
                , data = KND.Util.parseArray(me.data)
                , format = me.VueOpts.format
                , maxlen = me.VueOpts.maxlen || 10
                , flag = data.length >= maxlen
                , hasLoad = flag ? 'hasload' : 'noload'
                ;
            if (me.state != 'loadmore') { // 非加载历史记录则清空当前数据
                me.Vdata.rows = [];
            }
            KND.Publisher.publish(hasLoad, flag, me); // 无更多数据
            for (var i = 0; i < data.length; i++) {
                if(data[i]) me.Vdata.rows.push(format(data[i], i));
            };
        },
        /**
         * @method
         * 返回点击行 data.
         */
        getData: function() {
            return this.sData;
        }
    });

    KND.Contactslist = Contactslist;
})