/**
 * @author umin
 * @since 2016-08-21
 * @copyright Copyright (c) 2016, YZKJ
 * @version 1.0
 * @component iscroll
 * @description
 */
'use strict';
define(function(require, exports, module) {

    var subEvent = function() {
        var evts = new Map(), me = this;
        evts.put("widgetLoaded", function() {
        	me.render();
        }, me);
        evts.put("componentLoaded", function() {
        	me.refresh();
        }, me);
        return evts;
    };

	var iScroll = Klass.define(KND.BasicPlug, {
    	init: function() {
            this.registerEvent(subEvent.call(this));
            this.initOp();
    	},
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
	    		template : require('./iscroll.tpl')
    		}
    	},
    	setOptions: function( options ) {
    		this.options = options;
    	},
    	render: function() {
    		loaded.call(this);
    	},
    	refresh: function() {
    		var scroll = this.scroll;
	    	setTimeout(function() { scroll.refresh(); }, 50);
    	}
    });

	var loaded = function() {
		var me = this
			, pullDownEl = document.getElementById('pullDown')
			, pullDownOffset = pullDownEl.offsetHeight
			, pullUpEl = document.getElementById('pullUp')
			, pullUpOffset = pullUpEl.offsetHeight
			,
			
		options = $.extend(true, {}, {
			useTransition : true,
			scrollbars : true,
			topOffset : pullDownOffset,
			fadeScrollbars : true,
			preventDefault: false,
			onRefresh : function() {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				} else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				}
			},
			onScrollMove : function() {
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '放开刷新...';
					this.minScrollY = 0;
				} else if (this.y < 5
						&& pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '放开刷新...';
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5)
						&& !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开刷新...';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5)
						&& pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd : function() {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在加载...';
					KND.Publisher.publish('pullDown', me);
				} else if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载...';
					KND.Publisher.publish('pullUp', me);
				}
			}
		}, me.options);

		me.scroll = new IScroll('#wrapper', options);
	}
	
//	document.addEventListener('touchmove', function(e) {
//		e.preventDefault();
//	}, false);

	return iScroll
})