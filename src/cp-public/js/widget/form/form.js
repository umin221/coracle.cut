/**
 * @author 			umin
 * @since			2016-08-13
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @component		Form
 * @description		
 */
'use strict';
define(function(require, exports, module) {

	/**
	 * @class Widget.From 表单组件.
	 * @extends basicPlug
	 *
	 * **Markdown**
	 *
	 * An embedded live example:
	 *
	 *		@example
	 *		Form: {
	 *			// 组件唯一标识 (required).
	 *			id: 'form',
	 *			// 组件订阅.
	 *			subId: 'form_dc',
	 *			// 数据过滤键值
	 *			dbData: 'detail',
	 *			// 数据格式化方法
	 *			format: function(data) {
 	 *				return [{
 	 *					label:'姓名', value:data.author, type:'text', icon:'icon-form-name', cls:'', placeholder:'Your name', field:'name',href:''
 	 *				},{
 	 *					label:'邮箱', value:data.email, type:'email', icon:'icon-form-email', cls:'', placeholder:'E-mail', field:'email',href:''
 	 *				},{
 	 *					label:'密码', value:data.hitsNum, type:'password', icon:'icon-form-password', cls:'', placeholder:'Password', field:'pwd',href:''
 	 *				},{
 	 *					label:'日历', value:data.email, type:'calendar', icon:'icon-form-calendar', cls:'', placeholder:'Calendar', field:'calendar',href:''
 	 *				},{
 	 *					label:'生日', value:data.birth, type:'date', icon:'icon-form-calendar', cls:'', placeholder:'Birth day',href:''
 	 *				},{
 	 *					label:'性别', value:data.sex, type:'select', icon:'icon-form-gender', cls:'', placeholder:'E-mail', option:['Male','Female'],href:''
 	 *				},{
 	 *					label:'开关', type:'switch', icon:'icon-form-toggle', cls:'', placeholder:'', checked:true,href:''
 	 *				},{
 	 *					label:'文本域', value:data.title, type:'textarea', icon:'icon-form-comment', cls:'align-top', placeholder:'textarea',href:''
 	 *				}]
 	 *			}
 	 *		}
	 *
	 * **Note:**
	 */
	var Form = Klass.define(KND.BasicPlug, {
    	init: function() {
    		this.Vdata = {datas:[], id:this.componentId};
            this.initOp();
    	},
		clearData: function() {
			this.Vdata.datas = [];
		},
		/**
		 * @property {Object} data
		 * 组件 data 结构
		 * @property {Array} data.datas
		 * @property {String} data.datas.label
		 * 左侧 label
		 * @property {String} data.datas.value
		 * 右侧 value
		 * @property {String} data.datas.type
		 * 字段类型 ~ [text, email, password, date, select, switch, textarea]
		 * @property {String} data.datas.icon
		 * icon 样式绑定
		 * @property {String} data.datas.cls
		 * 行样式绑定
         * @property {String} data.datas.href
         * 路由指向
		 * @property {String} data.datas.placeholder
		 * *仅为输入项时有效*
		 * @property {Array} data.datas.option
		 * *type仅为select时有效*
		 */
    	initOp: function() {
    		var me = this;
    		me.VueOpts = {
		        template: require('./form.tpl'),
		        data: function () {
	            	return me.Vdata;
		        },
                methods: {
                    clickFn: function(data, evt) {
                        if(typeof data.clickFn === 'function')
                            data.clickFn.call(me,data);
                    }
                }
			}
    	},
		ready: function() {
			this.data = [{}];
			this.format();
		},
    	/**
    	 * 格式化组件
    	 * 当前data必须为数组
    	 */
    	format: function() {
    		var me = this
				, data = KND.Util.parseArray(me.data)
				, format = me.VueOpts.format
				;
    		me.Vdata.datas = []; // 清除历史数据
			for (var i = 0; i < data.length; i++) {
				if(data[i]) me.Vdata.datas.push(format(data[i], i))
			};
    	},
		/**
		 * @method
		 * 返回表单 data.
		 * page.getData 统一接入.
		 */
    	getData: function() {
    		var vDatas = this.Vdata.datas, vData, data = {};
    		for (var i = 0; i < vDatas.length; i++) {
    			vData = vDatas[i];
    			for (var v in vData) {
    				var _key = vData[v]['field'] || vData[v]['label']
    				data[_key] = vData[v].value || '';
    			}
    		}
    		return data;
    	},
        /**
         * @method
         * page.setData 设置数据.
         * @property {String} key
         * *key值*
         * @property {String|Object} value
         * *value值*
         */
        _setData: function(key,value) {
            var vDatas = this.Vdata.datas, vData;
            for (var i = 0; i < vDatas.length; i++) {
                vData = vDatas[i];
                for (var v in vData) {
                    var _key = vData[v]['field'] || vData[v]['label']
                    if(key == _key){
                        vData[v].value = value
                    }
                }
            }
        },
    	/**
    	 * 表单事件注册
    	 */
    	regEvent: function() {
            $('#'+ this.componentId).find("[data-toggle='calendar']").calendar();
			//$.initCalendar();
    	},
    	/**
    	 * 组件编译完成回调-最后执行
    	 */
    	compiled: function() {
    		this.regEvent();
    	}
    });

	KND.Form = Form;
})