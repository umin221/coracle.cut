/**
 * @author 			zhuming
 * @since			2016-09-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		Datebar
 * @description
 */
'use strict';
define(function(require, exports, module) {

    /**
     * @class Widget.Datebar 按钮.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		Datebar: {
	 *			// 组件唯一标识 (required).
	 *			id: 'datebar',
	 *			data: function() {
 	 *				return {
 	 *					buttons: [{
 	 *						text:'取消', cls:'button-big button-fill button-danger', clickFn:function() {
 	 *						page.$router.go('/');
 	 *					},{
 	 *						text:'提交', icon:'', cls:'button-big button-fill button-success', clickFn:function() {
 	 *						page.$router.go('/');
 	 *					}]
 	 *
 	 *				}
 	 *			}
 	 *		}
	 *
	 * **Note:**
	 */
    var sDate = window.Date, _Tdate;

    var Date = function(datastr) {
        datastr = KND.Util.isString(datastr) ? datastr.replace(/-/g, '/') : datastr;
        return datastr ? new sDate(datastr) : new sDate();
    };

    var getTimeData = function (args) {
        var _date = new Date();
            _Tdate = _date.getFullYear() + '-' + ( _date.getMonth() + 1 ) + '-' + _date.getDate();// 获取当前日期
        var _TMonth = _date.getFullYear() + '-' + ( _date.getMonth() + 1 ),// 获取当前月份
            componentData = args.componentData || {},
            yearMonth = componentData.yearMonth || _TMonth,
            beginData = componentData.beginData ? componentData.beginData : _Tdate ,
            endData = componentData.endData ? componentData.endData : (new Date( sDate.parse(beginData) + ( 86400000  *  60 ) )),
            componentDay = componentData.day ? _date.getFullYear() + '-' + ( _date.getMonth() + 1 ) + '-' + componentData.day :"",//获取选择的几号
            selectDay = componentDay || '',
            arrData = [],i = 0,
            defaultData = selectDay ? selectDay : _Tdate;   // 如果不设置默认则选中的中当天

        // 设置一个月份格式YYYY-M (beginData和endData必须不存在的时候才生效)
        if( !componentData.beginData && !componentData.endData ){
            var _yearMonth = yearMonth.split('-'), _yDate = new Date();
            _yDate.setFullYear(_yearMonth[0], _yearMonth[1], '0');
            var yearMonthDate = _yDate.getDate(),
                beginData = (yearMonth + '-' + 1).replace(),
                endData = yearMonth + '-' + yearMonthDate;
        }

        var newBeginData = new Date( beginData ),  // 开始时间
            newEndData = new Date( endData ),    // 结束时间
            newTime = newEndData.getTime() - newBeginData.getTime(),  //时间差的毫秒数
            days = Math.floor( newTime/(24*3600*1000) );  // //计算出相差天数

        days = days > 61 ? 60  : days;  // 时间跨度必须小于或者等于两个月,

        function  dateAdd(NumDay,dtDate)  {
            var dtTmp = new Date( dtDate ),
                d,_newData,_arr = {},x;
            if( isNaN(dtTmp) ){
                dtTmp = new Date();
            }
            _newData = new Date( sDate.parse(dtTmp) + ( 86400000  *  NumDay ) );
            d = new Date(_newData);
            x = ( new Array("星期日", "星期一", "星期二","星期三","星期四", "星期五","星期六") )[d.getDay()];
            _arr = {
                y : d.getFullYear(),
                m : d.getMonth() + 1,
                d : d.getDate(),
                w : x
            }
            return  _arr;
        }

        for( ; i <=days ; i++ ){
            var _data = dateAdd(i,beginData),
                _y_m = _data.y + '-' + _data.m,
                _w = _data.w,
                _d = _data.d;
            var beforeData = ( new Date( _y_m+'-'+ _data.d ) ) >= ( new Date( _Tdate ) ),
                afterData = ( ( _y_m+'-'+ _data.d ) == ( defaultData ) );
            var cls = beforeData ?'':'Clsexpired';
            var active = (beforeData && afterData)?'active':'';
            arrData.push({
                year : _y_m,
                week : _w,
                data : _d,
                cls : cls,
                active: active
            });
        }

        return arrData;

    }



	var Datebar = Klass.define(KND.BasicPlug, {
    	init: function() {
            this.Vdata = {rows:[], width:'', id:this.componentId};
            this.initOp();
    	},
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
		        template: require('./datebar.tpl'),
		        data: function () {
		        	return me.Vdata
		        },
                //format: function(item) {
                //    return {
                //        year:item.year,
                //        week:item.week,
                //        data:item.data
                //    }
                //},
                methods: {
                    /**
                     * @event clickFn
                     * 行点击时触发.
                     * @param {Object} data 当前点击日期data.
                     */
                    clickFn: function( data ) {
                        me.switch(data);
                        var sData = me.sData = $.extend(true, {}, data);
                        tools.invoke(me.VueOpts.clickFn, sData);
                    }
                }
			}
    	},
        /**
         * 动态获取组件数据
         */
        ready: function() {
            var me = this;
            var options = this.VueOpts;
            var data = getTimeData({
                componentData: {
                    yearMonth: options.selectDate,
                    day: options.selectDay
                }
            });
            me.Vdata.rows = data;
            me.Vdata.hwidth = $(window).width();
            me.Vdata.width = data.length * 64;

            setTimeout(function() {
                me.repos();
            }, 50)
        },
        repos: function() {
            var $container = $('#'+ this.componentId)
                , todays = _Tdate.split('-')
                , seldays = this.VueOpts.selectDate.split('-');
            if (seldays.length == 1 || seldays[1] == todays[1]) $container.find('.content-block').scrollLeft((todays[2] - 3) * 64);
        },
        format: function() {
            var me = this
                , data = KND.Util.parseArray(me.data)
                , format = me.VueOpts.format
                ;

            for (var i = 0; i < data.length; i++) {
                if(data[i]) me.Vdata.rows.push(format(data[i], i));
            };
        },
        /**
         * 获取组件data
         * page.getData 统一接入
         */
        getData: function() {
            return this.sData;
        },
        /**
         * 组件刷新
         * @param options 组件配置
         */
        refresh: function( options ) {
            var vueOpts = this.VueOpts;
            $.extend(true, vueOpts, options);
            this.ready();
        },
        /**
         * 组件选中设置
         * @param $this 当前组件
         */
        switch: function( $this ) {
            this.reset();
            $this.active= 'active';
        },
        /**
         * 组件未选中设置
         */
        reset: function() {
            var _data = this.Vdata.rows;
            for (var i in _data) {
                _data[i].active = '';
            }
        }
    
    });

    KND.Datebar = Datebar;
})