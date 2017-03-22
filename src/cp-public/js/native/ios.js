if(!KND){
	var KND = {};
};
KND.IOSAPI = {
	nativeAPI: function( method, param ) {
		return param != undefined ? kndfunc[method](param) : kndfunc[method]();
	}
};