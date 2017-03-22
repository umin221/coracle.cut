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
     * @class Widget.Slides 列表组件.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		Slides: {
	 *			// 组件唯一标识 (required).
	 *			id: 'slides',
	 *			// 组件订阅.
	 *			subId: 'slides_dc',
	 *			// 数据过滤键值
	 *			dbData: 'list',
	 *			// 数据格式化方法
	 *			format: function(data) {
	 *				return {
	 *					title:'imgthree', bulletcls:'', imgcls:'', imgstyle:'width: 100%;margin-right: 10px;',
	 *					src:'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_640x640q60.jpg'
 	 *				}
 	 *			},
 	 *			swiper: {
 	 *			    autoplay: 0
 	 *			}
 	 *			// 当行被点击时触发
 	 *			clickFn: function( data ) {}
 	 *		}
     *
     * **Note:**
     */
    var Slides = Klass.define(KND.BasicPlug, {
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
         * @property {String} data.rows.title
         * 显示的文字
         * @property {String} data.rows.bulletcls
         * bullet 样式绑定
         * @property {String} data.rows.imgcls
         * img 样式绑定
         * @property {String} data.rows.imgstyle
         * img style
         * @property {String} data.rows.src
         * img src
         * @property {String} data.rows.clickFn
         * 点击事件
         */
        initOp: function() {
            var me = this;
            me.VueOpts = {
                template: require('./slides.tpl'),
                data: function () {
                    return me.Vdata;
                },
                swiper: {
                    pagination: '.swiper-pagination',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    paginationClickable: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: 2500,
                    autoplayDisableOnInteraction: false
                },
                methods: {
                    clickFn: function(data) {
                        var sData = me.sData = $.extend(true, {}, data);
                        tools.invoke(me, me.VueOpts.clickFn, sData);
                    }
                }
            }
        },
        format: function() {
            var me = this
                , data = KND.Util.parseArray(me.data)
                , format = me.VueOpts.format
                ;
            me.Vdata.rows = [];
            for (var i = 0; i < data.length; i++) {
                if(data[i]) me.Vdata.rows.push(format(data[i], i));
            };
        },
        render: function( option ) {
            this.swiper = new Swiper('#'+this.componentId, option);
        },
        compiled: function() {
            if (!this.swiper) this.render(this.VueOpts.swiper);
            else { this.swiper.update(); }
        }
    });

    KND.Slides = Slides;
})