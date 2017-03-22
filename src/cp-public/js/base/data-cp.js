/**
 * @author 			umin
 * @since			2016-08-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		list
 * @description
 */
'use strict';
define(function(require, exports, module) {

    var subEvent = function() {
        var evts = new Map(), me = this;
        evts.put('widgetLoaded', function() {
        	me.loadData();
        }, me);
        evts.put('refresh', function() {
        	me.refresh();
        }, me);
        evts.put('loadMore', function() {
        	me.loadMore();
        }, me);
        evts.put('refresh', function( arg ) {
        	me.refresh(arg);
        }, me);
        return evts;
    };
	
	var getData = function( arg, cb, inst ) {
		if (!arg.url) return;
		new DataCenter().ajax($.extend(true, {}, {
			callback : function( data ) {
				if( KND.Util.isObject(data) ) {
					if( $.isFunction(arg.adapter) ){
						data = arg.adapter( data );
					}
					if(data.errorCode != "200" && data.errorMessage) $.toast(data.errorMessage);
					cb(data);
					if( data.status == true || data.status == 'success' || data.status == 'true') {
						KND.Publisher.publish('receiveDataStatus', 'success', inst);
					}else if( data.status == 'error' ){
						$.toast('获取数据出错，请稍后再试！');
						KND.Publisher.publish('receiveDataStatus', 'error', inst);
					}else if( data.status == 'timeout') {
						$.toast('获取数据超时，请稍后再试！');
						KND.Publisher.publish('receiveDataStatus', 'timeout', inst);
					}
				}else{
					KND.Publisher.publish('receiveDataStatus', 'error', inst);
				}
			}
		}, arg));
	};

	var DataCP = Klass.define(KND.BasicPlug, {
    	init: function() {
            this.registerEvent(subEvent.call(this));
    	},
		loadData: function() {
			var me = this
				, op = this.VueOpts
				, dp = op.data
				;
			KND.Publisher.publish('dataRequest', 'start', me);
			getData(op, function( data ){
				KND.Publisher.publish('dataFinish', data, me);
			}, me);
		},
		subscribe: function() {},
		refresh: function( arg ) {
            var me = this
                , op = $.extend(true, me.VueOpts, arg)
                , param = op.data.jsonparm || op.data
                , page = op.paging
                , index = page ? page['index'] : 'p'
                ;
			if( param && param[index] ) {
				param[index] = 0;
			}
			KND.Publisher.publish('dataRequest', 'start', me);
			op.loading = true;
			getData(op, function( data ) {
				KND.Publisher.publish('dataFinish', data, me);
			},me);
		},
		loadMore: function() {
            var me = this
                , op = me.VueOpts
                , param = op.data.jsonparm || op.data
                , page = op.paging
                , index = page ? page['index'] : 'p'
                ;
            if( param ) {
				param[index] = parseInt(param[index]);
				param[index]++;
			}
			op.loading = false;
			getData(op, function( data ){
				KND.Publisher.publish('loadMore', data, me);
			},me);
		},
		//ready: function() {
		//	this.checkState();
		//},
		checkState: function() {
			var subId = KND.Util.parseArray(this.subId);
			for (var i = 0; i < subId.length; i++) {
				var p = page.getPlug(subId[i]);
				if (p) {
					if (p.options && p.options.ctype === 'Scroll') continue;
					this.loadData();
				}
			}
		}
	});
	
	KND.DataCP = DataCP;
});