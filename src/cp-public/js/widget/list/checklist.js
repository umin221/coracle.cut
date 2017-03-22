/**
 * @author 			umin
 * @since			2016-08-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		checklist
 * @description
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.CheckList 选择列表组件.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		CheckList: {
	 *			// 组件唯一标识 (required).
	 *			id: 'checklist',
	 *			// 组件订阅.
	 *			subId: 'checklist_dc',
	 *			// 数据过滤键值
	 *			dbData: 'list',
	 *			// 数据格式化方法
	 *			format: function(data) {
	 *				return {
	 *					labels:[{title:data.name, cls:'item-title', after:data.code}, {title:data.address, cls:'item-subtitle'}],
	 *					cls:'', type:'checkbox', name:'my-radio'
 	 *				}
 	 *			},
 	 *			// 当行被点击时触发
 	 *			clickFn: function( data ) {}
 	 *		}
	 *
	 * **Note:**
	 */
	var CheckList = Klass.define(KND.BasicPlug, {
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
		 * @property {Array} data.rows.labels
		 * 显示字段
		 * @property {String} data.rows.labels.title
		 * 行title
		 * @property {String} data.rows.labels.after
		 * 行after
		 * @property {String} data.rows.labels.cls
		 * 行样式绑定
		 * @property {String} data.rows.cls
		 * 样式绑定
		 * @property {String} data.rows.type
		 * 选择类型 checkbox/radio *必填*
		 * @property {String} data.rows.name
		 * 标签name值 *必填*
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
	            template: require('./checklist.tpl'),
	            data: function() {
	            	return me.Vdata;
	            },
	    		methods: {
	    			clickFn: function( data ) {
						var __timestamp = new Date().getTime();
						if (__timestamp - me.eventTimestamp < 100) return;
						me.eventTimestamp = __timestamp;
						var sData = me.sData = $.extend(true, {}, data);
						tools.invoke(me.VueOpts.clickFn, sData);
	    			}
	    		}
	    	}
    	},
    	/**
    	 * 格式化组件
    	 * 当前data必须为数组
    	 */
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
			me.ckname = me.Vdata.rows[0] && me.Vdata.rows[0].name;
		},
		/**
		 * @method
		 * 返回选择的 data.
		 */
    	getData: function() {
    		var me = this, vDatas = me.Vdata.rows, data = [];
    		$('[name="'+ me.ckname +'"]:checked').each(function(i, v) {
    			data.push(vDatas[v.getAttribute('data-index')]);
    		})
            return $.extend(true, [], data);
    	},
		/**
		 * @method
		 * 清除选中状态
		 */
		clear : function() {
			var me = this, vDatas = me.Vdata.rows, data = [];
			$('[name="' + me.ckname + '"]:checked').each(function (i, v) {
				v.checked = false;
			})
		}
	});

	KND.Checklist = CheckList;
})