/**
 * @author 			umin
 * @since			2016-04-01
 * @copyright		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @description		项目工具库
 */

(function(){

	this.tools = {

        //server_host: 'http://mobile.xinri.com:10000/mxm', // 测试环境
        server_host: 'http://app.coracle.com:10027/mxm', // 测试环境
		server_ctet: '/api/v1/',

		/**
		 * 时间格式化
		 * @param date 日期字符串或对象
		 * @param fmt 待转日期格式 eg: yyyy-MM-dd
		 */
		format: function( date, fmt ){
			return new Date(date).format(fmt);
		},

		/**
		 * 转时间戳
		 * @param date 时间字符串或对象
		 */
		getTime: function( date ){
			return new Date(date).getTime();
		},

		/**
		 * 字符串比较 忽略大小写
		 * @param a 字符串
		 * @param b 字符串
		 */
		equalsIgnoreCase: function( a, b ){
			return a.toLowerCase() == b.toLowerCase(); 
		},

		/**
		 * json 字符串转 object
		 * @param json json 字符串
		 */
		parse: function( json ){
			try {
				return KND.Util.isObject( json ) ? json : JSON.parse(json);
			} catch ( e ) {
				KND.Util.error('字符串转JSON对象失败！'+ e);
				return { status: 'json parse fail！' };
			}
		},
		/**
		 * 方法校验调用
		 */
		invoke: function() {
			var args = Array.prototype.slice.call(arguments, 0)
				, met = args.shift()
				, inst = this
				;
			if (KND.Util.isObject(met) && !KND.Util.isFunction(met)) {
				inst = met;
				met = args.shift();
			}
			if(KND.Util.isFunction(met)) met.apply(inst, args);
		},
		getFullPath: function( path, defaultImagePath ) {
			defaultImagePath = defaultImagePath || '../cp-public/images/default.png';
			return path ? tools.server_host + path : defaultImagePath;
		},
		/**
		 * 附件上传
		 * @param path
		 */
		upload: function( img ){
			// 手机端运行
			KND.NativeAPI.goUpload({
				url: tools.server_host + '/upload-file',
				filePath: img.originalPicPath
			}, page);
			// 本地测试
			// KND.PCAPI.goUpload({
			// 	url: tools.server_host + '/upload-file',
			// 	filePath: img.originalPicPath
			// }, page)
		},
		/**
		 * 附件批量上传
		 */
		batchUpload: function( op ){
			var imgs = KND.Util.parseArray(op.imgs)
				, datas = []
				, cb = op.cb
				;

			if(!imgs || !imgs.length){
				if(KND.Util.isFunction(cb)) cb([]);
				return;
			}

			KND.Publisher.unsubscribe("uploadFinish", page);
			KND.Publisher.subscribe("uploadFinish", function( arg ) {
				datas.push(arg);
				imgs.length ? tools.upload(imgs.shift()) : cb(datas);
			}, page);
			tools.upload(imgs.shift());
		}
	}
	
	/**
	 * 日期格式化
	 * @param format 待转换的日期格式字符串 eg：yyyy-MM-dd
	 */
	Date.prototype.format = function ( format ) {
	    var o = {
	        "M+": this.getMonth() + 1, //month
	        "d+": this.getDate(), //day
	        "h+": this.getHours(), //hour
	        "m+": this.getMinutes(), //minute
	        "s+": this.getSeconds(), //second
	        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
	        "S": this.getMilliseconds() //millisecond
	    }
	    
	    if (/(y+)/.test(format)) {
	        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }

	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	};
	
	/**
	 * 字符串比较 忽略大小写
	 */
	String.prototype.equalsIgnoreCase = function( str ) {
		return this.toLowerCase() == str.toLowerCase();
	};

})();
