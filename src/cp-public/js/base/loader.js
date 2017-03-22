/**
 * @author 			umin
 * @since			2016-08-13
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @description		模块加载
 * @dependency		seajs
 */
'use strict';
(function( global, undefined ){
	var KND = global.KND = global.KND ? global.KND : {};
	/**
	 * 依赖加载
	 */
	var _nDependencies = [];
	var MODULES = {
		nativeApi:{
			js :  "js/native/nativeAPI",
			dependencies: _nDependencies
		},
		PC : {
			js : 'nat/pc',
			css: 'css/ios.css'
		},
		IOS : {
			js : 'nat/ios',
			css: 'css/ios.css'
		},
		ANDROID : {
			js : 'nat/android',
			css: 'css/android.css'
		},
        Swiper: {
        	js: 'js/base/swiper.jquery.min',
        	css: 'css/swiper.min.css'
        },
		DataCP: {
			js: 'js/base/data-cp'
		},
		Buttonlayer : {
			js: 'wt/button/buttonlayer'
		},
		Header: {
			js: 'wt/header/header',
            css: 'css/header/header.css'
		},
		Form: {
			js: 'wt/form/form',
			css: 'css/form/form.css'
		},
		Checklist: {
			js: 'wt/list/checklist'
		},
		List: {
			js: 'wt/list/list',
            css: 'css/list/list.css'
		},
		Footbar: {
			js: 'wt/footbar/footbar'
		},
		iScroll: {
			js: 'wt/iscroll/iscroll',
			css: 'css/iscroller.css'
		},
		Scroll: {
			js: ['wt/iscroll/scroll']
		},
        Tab: {
            js: 'wt/tab/tab',
            css: 'css/tab/tab.css'
        },
        Search: {
            js: 'wt/search/search',
            css: 'css/search/search.css'
        },
        Slides: {
            js: 'wt/slides/slides',
            dependencies: ['Swiper']
        },
        Panel: {
        	js: 'wt/panel/panel',
            css: 'css/panel/panel.css'
        },
        Datebar: {
            js: 'wt/datebar/datebar',
            css: 'css/datebar/datebar.css'
        },
        Medialist: {
            js: 'wt/list/medialist',
            css: 'css/list/medialist.css'
        },
        Flowlist: {
            js: 'wt/list/flowlist',
            css: 'css/list/flowlist.css'
        },
        Button : {
            js: 'wt/button/button'
        },
        Buttongroup : {
            js: 'wt/button/buttongroup'
        },
        Grouplist : {
            js: 'wt/list/grouplist',
            css: 'css/list/grouplist.css'
        },
        Contactslist : {
            js: 'wt/list/contactslist'
        },
		Menu: {
			js: 'wt/menu/menu',
			css: 'css/menu/menu.css'
		},
		SwiperList: {
			js: 'wt/list/swiperplug-demo'
		},
		Todolist: {
			js: 'wt/list/todolist',
            css: 'css/list/todolist.css'
		},
		SwiperFlowlist: {
			js: 'wt/list/swiper-flowlist'
		},
        Attach : {
            js: 'wt/attach/attach'
        }
	}
	/**
	 * 文件或模块加载完成回调
	 */
	, finish = function() { }
	/**
	 * 文件加载
	 * @param path 文件路径
	 */
	, loadFile = function(path, callback) {
	    seajs.use(path, function() {
	    	var args = Array.prototype.slice.call(arguments, 0);
			if (callback){
				callback(args);
			}
			loader.onLoad(name, args);
	    });
	}
	/**
	 * 模块加载
	 * @param name 模块名称，多模块数组传入
	 */
	, loadModule = function (name, callback){
		var mm = [], _keyword = /(^template$|^components$)/;
		if (typeof name == 'string'){
			if (_keyword.test(name)) KND.Util.error('['+ name +'] components name conflict!');
			add(name);
		} else {
			for(var i=0; i<name.length; i++){
				add(name[i]);
			}
		};
		function add(name){
			if (!loader.modules[name]) return;
			var d = loader.modules[name]['dependencies'];
			if (d){
				for(var i=0; i<d.length; i++){
					add(d[i]);
				}
			}
			mm.push(name);
		}
		var time = 0;
		function loadMm(){
			var _paths = []
			for ( var i = 0; i < mm.length; i++ ) {
				var module = loader.modules[mm[i]]
					, mcs = KND.Util.parseArray(module['css'])
					, mjs = KND.Util.parseArray(module['js'])
					;
				_paths = _paths.concat(mcs, mjs);
			};
			if (!_paths.length) KND.Util.error('['+ name +'] the module is undefined!');
		    seajs.use(_paths, function() {
		    	var args = Array.prototype.slice.call(arguments, 0);
				if (callback){
					callback(args);
				}
				loader.onLoad(name, args);
		    });
		}
		loadMm();
	}
	/**
	 * 模块加载
	 */
	, loader = {
		modules : MODULES,
		jsbase:'../../', 
		cssbase : '../../',
		css:true,  
		timeout:2000,
		preLoadModule : ['css'],
		preload : function() {
			preloadModule(this.preLoadModule);
		},
		load: function(name, callback){
			if (/\.css$/i.test(name) || /\.js$/i.test(name)){
				loadFile(name, callback);
			} else {
				loadModule(name, callback);
			}
		},
		setModules : function( module ) {
			this.modules = $.extend(true, {}, this.modules, module);
		},
		onProgress: function(name){},
		onLoad: function(name){}
	};
	KND.Loader = loader;
}( window ));
