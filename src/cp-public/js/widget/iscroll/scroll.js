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
	
	require('./scroller');
	
    var subEvent = function() {
        var evts = new Map(), me = this;
        evts.put("widgetLoaded", function() {
        	me.render();
        }, me);
        evts.put("componentLoaded", function() {
        	me.refresh();
        }, me);
        evts.put("noload", function( flag ) {
        	me.hasload(flag);
        }, me);
        evts.put("hasload", function( flag ) {
        	me.hasload(flag);
        }, me);
        return evts;
    };

	/**
	 * @class Widget.Scroll 滚动刷新组件.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Scroll: {
	 *			// 组件唯一标识 (required).
	 *			id: 'scroll',
	 *			subId: ['list']
 	 *		}
	 *
	 * **Note:**
	 */
	var mScroll =  Klass.define(KND.BasicPlug, {
    	init: function() {
			var me = this;
			me.registerEvent(subEvent.call(me));
			me.Vdata = {hasload:false, id:me.componentId, refresh:true, infinite:true};
			me.initOp();
    	},
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
	    		template: require('./scroll.tpl'),
	    		data: function() {
	            	return me.Vdata;
	    		}
    		}
    	},
    	setOptions: function( options ) {
    		this.options = $.extend(true, {}, {
				refresh: true,
				infinite: true
			}, options);
    	},
    	render: function() {
			var me = this
				, options = me.options
				, refresh = me.Vdata.refresh = options.refresh
				, infinite = me.Vdata.infinite = options.infinite
				, pullDown = options.pullDown || 'refresh'
				, pullUp = options.pullUp || 'loadMore'
				, $content = me.$content = $('#'+ me.componentId).scroller()
				;
			if (refresh) {
				$content
					.addClass('pull-to-refresh-content')
					.on('refresh', function() {
						me.Vdata.hasload = false;
						KND.Publisher.publish(pullDown, me);
					});
				$.initPullToRefresh($content);
			}
			if (infinite) {
				$content
					.addClass(' infinite-scroll')
					.on('infinite', function() {
						if(me.infinite) return;
						me.infinite = true;
						KND.Publisher.publish(pullUp, me);
					});
				$.initInfiniteScroll($content);
			};
            me.loaded();
    	},
		/**
		 * @method 组件刷新
		 */
    	refresh: function() {
    		this.infinite = false;
    		$.pullToRefreshDone();
    	},
		/**
		 * @method 是否需要加载更多
		 * @param flag
		 * true 有 / fals 没有
		 */
		hasload: function( flag ) {
			this.Vdata.hasload = flag;
			this.loaded();
		},
		loaded: function() {
			var flag = this.Vdata.hasload
				, $ct = this.$content
				;
			if (!$ct || !$ct.length) return;
			var met = flag ? 'attachInfiniteScroll' : 'detachInfiniteScroll';
			$[met]($ct);
		},
		widgetsLoaded: function() {}
    });

	KND.Scroll = mScroll;
});
