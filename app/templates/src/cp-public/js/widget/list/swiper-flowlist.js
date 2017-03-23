/**
 * @author 			zhuming
 * @since			2016-09-18
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		FlowList
 * @description
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.Flowlist 列表组件.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Flowlist: {
	 *			// 组件唯一标识 (required).
	 *			id: 'list',
	 *			// 组件订阅.
	 *			subId: 'list_dc',
	 *			// 数据过滤键值
	 *			dbData: 'list',
	 *			// 数据格式化方法
	 *			format: function(data) {
	 *				return {
	 *					 labels:[{title:item.time, cls:'list-order'},
     *                   {title:item.author, cls:'list-content',after:'',aftercls:''},
     *                   {title:item.name, cls:'list-content'}],
     *                   href:'',id: item.id,cls:"bg-blue"
 	 *				}
 	 *			},
 	 *			// 当行被点击时触发
 	 *			clickFn: function( data ) {}
 	 *		}
	 *
	 * **Note:**
	 */
	var plug = require('./swiperplug'), SwiperFlowlist = Klass.define(plug, {
    	init: function() {
    		this.Vdata = {rows:[], nodata:false, id:this.componentId, data:[]};
            this.initOp();
    	},
		compiled: function() {
			this.Vdata.aStyle = {
				'min-width': ($(window).width() - 40) +'px'
			};
			this.addSwiper();
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
         * @property {String} data.rows.labels.aftercls
         * 行after样式
		 * @property {String} data.rows.labels.cls
		 * 行节点样式绑定
		 * @property {String} data.rows.href
		 * 路由指向
		 * @property {String} data.rows.cls
		 * 样式绑定
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
				template: require('./swiper-flowlist.tpl'),
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
	    			},
	    			change : function(){
	    				console.log(me.vue.data);
	    			}
	    		},
	    		watch : {
	    			"data" : "change"
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
				me.Vdata.data = [];
			}
			for (var i = 0; i < data.length; i++) {
				if(data[i]){
					me.Vdata.rows.push(format(data[i], i));
					me.Vdata.data.push(data[i]);
				} 
			};

			if (unLoadMore && !me.Vdata.rows.length) me.Vdata.nodata = true;

			KND.Publisher.publish(hasLoad, flag, me); // 无更多数据
    	},
		/**
		 * @method
		 * 返回点击行 data.
		 */
    	getData: function() {
            return this.sData;
    	}
    });

	KND.SwiperFlowlist = SwiperFlowlist;
})