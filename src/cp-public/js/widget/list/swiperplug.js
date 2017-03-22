/**
 * @author 			umin
 * @since			2016-08-14
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		SwiperList
 * @description
 */
'use strict';
define(function(require, exports, module) {

    require('../../../css/list/swiperlist.css');

    /**
     * @class Widget.List 列表组件.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *		@example
     *		SwiperList: {
	 *			// 组件唯一标识 (required).
	 *			id: 'list',
	 *			// 组件订阅.
	 *			subId: 'list_dc',
	 *			// 数据过滤键值
	 *			dbData: 'list',
	 *			// 数据格式化方法
	 *			format: function(data) {
	 *				return {
	 *					labels:[{title:data.title, cls:'item-title', after:data.summary}, {title:data.pubTime, cls:'item-subtitle'}],
	 *					href:'', cls:'tttt', id: data.id
 	 *				}
 	 *			},
 	 *			// 当行被点击时触发
 	 *			clickFn: function( data, super ) {},
 	 *			// 当滑出按钮被点击时触发
 	 *			buttonFn: function( btn, data, super ) {}
 	 *		}
     *
     * **Note:**
     */
    var SwiperPlug = Klass.define(KND.BasicPlug, {
        ready: function() {
            var me = this;
            if (!me.Vdata) me.Vdata = {};
            if (!me.VueOpts) me.VueOpts = { method:{} };
            me.Vdata.btnStyle = {
                'width': 80 +'px'
            };
            me.Vdata.aStyle = {
                'min-width': $(window).width() +'px'
            };
            me.VueOpts.methods.buttonFn = function( btn, data ) {
                var bt = $.extend(true, {}, btn)
                    , sData = $.extend(true, {}, data)
                    ;
                tools.invoke(me, me.VueOpts.buttonFn, bt, sData, data);
            }
        },
        compiled: function() {
            this.addSwiper();
        },
        addSwiper: function() {
            var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, translate
                , isScrolling, touchesDiff, operationWidth
                , $container = $('#'+ this.Vdata.id)
                , $row = [] , translateStartX, translateCurrentX
                , transformReg = /\-?[0-9]+\.?[0-9]*/g
                , vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
                    (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : ''
                , _getTranslate = function() {
                    return $row.length ? ($row.css('transform') && $row.css('transform').match(transformReg)) || [3, 0] : [3, 0];
                }
                , _transform = function( touchesDiff ) {
                    var translateX = translateStartX + touchesDiff;
                    translateCurrentX = translateX > 0 ? 0 : translateX < -operationWidth ? -operationWidth : translateX;
                    _transformX(translateCurrentX);
                }
                , _transformX = function( x, $$row ) {
                    var _$$row = $$row || $row;
                    if (_$$row.length && !isScrolling) _$$row.transform('translate3d(' + x + 'px, 0, 0)');
                }
                , _handleTouchStrat = function( e ) {
                    if (isMoved || isTouched) return;
                    var _$$row = $row
                        , _isOpen = parseFloat(_getTranslate()[1]) == -operationWidth
                        ;
                    $row = $(e.target).parents('div.item-container');
                    if (!$row.length) return;
                    var $btns = $row.find('.item-operation .item-buttons');
                    if ($btns.length) {
                        $row.find('.item-operation').css('min-width', ($btns.length * 25 +'%'));
                    }
                    operationWidth = $row.find('.item-operation').width();
                    $row[0].style[vendor + 'TransitionDuration'] = '0ms';
                    if (_$$row && $row[0] != _$$row[0] && _isOpen) {
                        _transformX(0, _$$row);
                    }
                    translate = _getTranslate();
                    isTouched = true;
                    touchesDiff = 0;
                    touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    isScrolling = undefined;

                    translateStartX = parseFloat(translate[1]);
                }
                , _handleTouchMove = function( e ) {
                    if (!isTouched) return;
                    touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (typeof isScrolling === 'undefined') {
                        isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
                    }
                    if (!isScrolling) e.preventDefault();
                    touchesDiff = touchCurrentX - touchStartX;
                    _transform(touchesDiff);
                }
                , _handleTouchEnd = function( e ) {
                    var x = 0;
                    isTouched = isMoved = false;

                    if ($row.length) $row[0].style[vendor + 'TransitionDuration'] = '200ms';
                    if (Math.abs(touchesDiff) > 30) {
                        x = translateStartX == 0 ? translateCurrentX > -30 ? 0 : -operationWidth : translateCurrentX > -(operationWidth - 30) ? 0 : -operationWidth;
                    }
                    _transformX(x);
                }
            $container.on($.touchEvents.start, _handleTouchStrat);
            $container.on($.touchEvents.move, _handleTouchMove);
            $container.on($.touchEvents.end, _handleTouchEnd);
        }
    })

    return SwiperPlug;
})