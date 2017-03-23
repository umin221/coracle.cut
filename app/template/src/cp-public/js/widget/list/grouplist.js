/**
 * @author 			zhuming
 * @since			2016-09-18
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		Grouplist
 * @description
 */
'use strict';
define(function(require, exports, module) {

    /**
     * @class Widget.Grouplist 列表组件.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		Grouplist: {
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
     *                      title:'标题和副标题1',titcls:'',content:'false',
     *                      labels:[
     *                          {title:'商品名称',after:'哇哈哈',afterGroup:['哇哈哈','营养快线','蒙牛酸酸乳','纯甄'],icon:'icon-app',cls:'',href:''},
     *                          {title:'型号',after:'大瓶',icon:'icon-app', cls:''},
     *                          {title:'库存',after:'123件',icon:'icon-app', cls:''}
     *                      ], cls:'item-link'
     *                  },{
     *                      title:'标题和副标题2',
     *                      labels:[
     *                          {title:'商品名称',after:'营养快线',icon:'icon-app',cls:''},
     *                          {title:'型号',after:'小瓶',icon:'icon-app', cls:''},
     *                          {title:'库存',after:'220件',icon:'icon-app', cls:''}
     *                      ], cls:'item-link'
     *                  }]
 	 *				}
 	 *			},
 	 *			// 当行被点击时触发
 	 *			clickFn: function( data ) {}
 	 *		}
     *
     * **Note:**
     */
    var Grouplist = Klass.define(KND.BasicPlug, {
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
         * @property {Object} data.rows.titcls
         * 显示标题样式，可添加图标
         * @property {Object} data.rows.content
         * content存在时可隐藏显示子labels内容，为false时默认显示，为true时默认隐藏
         * @property {Array} data.rows.labels
         * 显示字段
         * @property {String} data.rows.labels.title
         * 行title(标题)
         * @property {String} data.rows.labels.after
         * 行after(内容)
         * @property {String} data.rows.labels.afterGroup
         * 行afterGroup(多条内容)
         * @property {String} data.rows.labels.cls
         * 行样式绑定 cls:'new-line'时内容可换行显示
         * @property {String} data.rows.labels.icon
         * 小图标样式
         * @property {String} data.rows.labels.href
         * 路由指向
         * @property {String} data.rows.cls
         * 样式绑定(为item-link加箭头)
         */
        initOp: function() {
            var me = this;
            me.VueOpts = {
                template: require('./grouplist.tpl'),
                data: function() {
                    return me.Vdata;
                },
                methods: {
                    /**
                     * @event clickFn
                     * 行点击时触发.
                     * @param {Object} data 当前点击行data.
                     */
                    clickTitleFn: function( data ) {
                        data.content = !data.content;
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
                if(isArray(format(data[i], i))){//如果是数组则循环数组取数据赋值绑定(一般用于类似from表单结构)
                    var arrdata = format(data[i], i);
                    for(var j = 0; j < arrdata.length; j++) {
                        if (data[i]) me.Vdata.rows.push(arrdata[j]);
                    }
                }else{//如果是不是数组则取对象数据赋值绑定(一般用于类似list列表结构)
                    if(data[i]) me.Vdata.rows.push(format(data[i], i));
                }
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
    function isArray(object){//是否为array数组类型
        return object && typeof object==='object' &&
            Array == object.constructor;
    }

    KND.Grouplist = Grouplist;
})