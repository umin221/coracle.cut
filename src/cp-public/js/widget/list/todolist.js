/**
 * @author 			chenjun
 * @since			2016-10-05
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		PicList
 * @description     九牧待办列表
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.Medialist 列表组件.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Medialist: {
	 *			// 组件唯一标识 (required).
	 *			id: 'list',
	 *			// 组件订阅.
	 *			subId: 'list_dc',
	 *			// 数据过滤键值
	 *			dbData: 'list',
	 *			// 数据格式化方法
	 *			format: function(data) {
	 *				return {
	 *			         imgs:{src:'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',cls:'width80'},
	 *					 labels:[
     *                       {title:'一号会议室', cls:'item-title'},
     *                       {title:'地址：'+'集团总部11楼A区', cls:'item-subtitle'},
     *                       {title:'设备：', cls:'item-subtitle',icon:['icon-computer'], after:'预定',aftercls:'after-btn'},
     *                       {title:'可容纳人数：'+'20', cls:'item-subtitle'},
     *                       {title:'备注:'+'', cls:'item-subtitle'}
     *                   ], cls:'rowli'
 	 *				}
 	 *			},
 	 *			// 当行被点击时触发
 	 *			clickFn: function( data ) {}
 	 *		}
	 *
	 * **Note:**
	 */
	var Todolist = Klass.define(KND.BasicPlug, {
    	init: function() {
    		this.Vdata = {rows:[], nodata:false, id:this.componentId};
            this.initOp();
    	},
		clearData: function() {
			this.Vdata.rows = [];
		},
		/**
		 * @property {Object} data
		 * 组件 data 结构.
		 * @property {Array} data.rows
         * @property {Object} data.rows.imgs
         * 显示图片
         * @property {Array} data.rows.imgs.cls
         * 图片样式
		 * @property {Array} data.rows.labels
		 * 显示字段
		 * @property {String} data.rows.labels.title
		 * 行title
		 * @property {String} data.rows.labels.after
		 * 行after
         * @property {String} data.rows.labels.aftercls
         * 行after样式
		 * @property {String} data.rows.labels.cls
		 * 行样式绑定
         * @property {String} data.rows.labels.icon
         * 小图标样式
		 * @property {String} data.rows.href
		 * 路由指向
		 * @property {String} data.rows.cls
		 * 样式绑定
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
				template: require('./todolist.tpl'),
	            data: function() {
	            	return me.Vdata;
	            },
	    		methods: {
					/**
					 * @event clickFn
					 * 行点击时触发.
					 * @param {Object} data 当前点击行data.
					 */
	    			clickFn: function( data, i ) {
	    				var sData = me.sData = $.extend(true, {}, data);
	    				tools.invoke(me.VueOpts.clickFn, sData, i);
	    			},
					/**
					 * @event delFn
					 * 左滑操作，点击时触发.
					 * @param {Object} data 当前点击行data. 删除或其他左滑操作
					 */
	    			delFn : function(data,i){
	    				var sData = me.sData = $.extend(true, {}, data);
	    				tools.invoke(me.VueOpts.delFn, sData, me);
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
                , unLoadMore = me.state != 'loadmore'
				;
            me.Vdata.nodata = false;
			if (me.state != 'loadmore') { // 非加载历史记录则清空当前数据
				me.Vdata.rows = [];
			}
			KND.Publisher.publish(hasLoad, flag, me); // 无更多数据
			for (var i = 0; i < data.length; i++) {
				if(data[i]) me.Vdata.rows.push(format(data[i], i));
			};
            if (unLoadMore && !me.Vdata.rows.length) me.Vdata.nodata = true;
    	},
		/**
		 * @method
		 * 返回点击行 data.
		 */
    	getData: function() {
            return this.sData;
    	}
    });

	KND.Todolist = Todolist;
})