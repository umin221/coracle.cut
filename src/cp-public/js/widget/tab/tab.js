/**
 * @author 			zhuming
 * @since			2016-08-19
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		header
 * @description
 */
'use strict';
define(function(require, exports, module) {

    /**
     * @class Widget.Tab Tab 组件.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		Tab: {
	 *			// 组件唯一标识 (required).
	 *			id: 'tab',
	 *		    // 静态 tab 配置 data 即可
	 *			data: function() {
	 *				return {
	 *					cls:'buttons-tab',//不同的tab样式风格,可选 buttons-tab、buttons-row、buttons-fan
	 *					rows: [{
	 *					    label:'Tab1', code:'one', slot:'tab1', active:'active', cls:''
	 *					},{
	 *					    label:'Tab2', code:'two', slot:'tab2', active:''
	 *					},{
	 *					    label:'Tab3', code:'three', slot:'tab3', active:''
	 *					}]
 	 *				}
 	 *			},
 	 *		    // 动态 tab 需要配置 format
 	 *		    format: function() {},
 	 *			// 当 tab 元素被点击时触发
 	 *			clickFn: function( data ) {}
 	 *		}
     *
     * **Note:**
     */
    var Tab = Klass.define(KND.BasicPlug, {
        init: function() {
            this.Vdata = {cls:'buttons-tab',rows:[], id:this.componentId};
            this.initOp();
        },
        clearData: function() {
            this.Vdata.rows = [];
        },
        /**
         * @property {Object} data
         * 组件 data 结构.
         * @property {String} data.cls
         * class样式不同的tab样式风格,可选 buttons-tab、buttons-row、buttons-fan
         * @property {String} data.containerStyle
         * 容器样式绑定
         * @property {Array} data.rows
         * @property {String} data.rows.label
         * 显示的文字
         * @property {String} data.rows.code
         * tab标示类型
         * @property {String} data.rows.slot
         * 分页 name
         * @property {String} data.rows.active
         * 当前标签页活跃状态 为 active 是为活跃
         * @property {String} data.rows.cls
         * li 样式绑定
         */
        initOp: function() {
            var me = this;
            me.VueOpts = {
                template: require('./tab.tpl'),
                data: function () {
                    return me.Vdata;
                    //return {
                    //    cls:'buttons-tab',//不同的tab样式风格,可选 buttons-tab、buttons-row
                    //    containerStyle: {
                    //        height: $(window).height() - 40 - 44 +'px'
                    //    },
                    //    rows: [{
                    //        label:'Tab1', code:'one', slot:'tab1', active:'active', cls:''
                    //    },{
                    //        label:'Tab2', code:'two', slot:'tab2', active:''
                    //    },{
                    //        label:'Tab3', code:'three', slot:'tab3', active:''
                    //    }]
                    //}
                },
                methods: {
                    clickFn: function(data, evt) {
                    	me.switch(data);
	    				tools.invoke(me.VueOpts.clickFn, $.extend(true, {}, data));
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
         * TAB 切换操作
         */
        switch: function( $this ) {
        	this.reset();
        	$this.active = 'active';
        },
        reset: function() {
        	var _data = this.vue.$data.rows;
        	for (var i in _data) {
        		_data[i].active = '';
        	}
        }
    });
    KND.Tab = Tab;
})