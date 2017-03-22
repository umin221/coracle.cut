if (!KND) {
	var KND = {};
};
(function() {
	var WRAP = '\r\n';
	KND.PCAPI = {
		nativeAPI: function( method, param ) {
			console.log(method + WRAP + param);
			param = param ? tools.parse(param) : param;
			tools.invoke(this[method], param);
		},
		getLoginInfo : function( param ) {
			var _loginInfo = {"id":64,"loginName":"000001","userName":"liliangjun","email":"SS@coracle.com","imageAddress":"","address":"福建省南安市仑苍镇丰富路312号","sex":"MAN","phone":"13542591444","telephone":"","signature":"我的","orgName":"","userOtherInfo_11":"1000","userId":"3c1fced4fee44538acd0865b7aff457d","userSystem":"BORCCI","userType":"employee","userOtherInfo_1":"董事长","deptName":"董事会","token":"867247028634862"};
			KND.NativeCb.setLoginInfo(JSON.stringify(_loginInfo));
		},
		reqInterfaceProxy: function( param ) {
			$.ajax({
				url: param.reqURL,
				type: param.reqType,
				data: param.datas,
				success: function(data) {
					eval(param.sCallback)(data);
				},
				error: function(xhr, errorType, error){
					eval(param.sCallback)({status:'error'});
					console.error("ajax 调用出错：%c"+JSON.stringify(xhr)+"____\n "+JSON.stringify(errorType)+"\n"+error,"color:red;font-size:13px;");
				}
			});
		},
		toUrl: function(param) {
			window.location.href =  param.type == 'remote' ? param.url : ('../' + param.url);
		},
		setKndTime: function(param) {
			eval(param.sCallback)({
				'result': new Date().format(param.format),
				'tagID': param.tagID
			});
		},
		goPhoto: function(param) {
			//var jsonStr = {status:false};
			eval(param.sCallback)('{"imgPath":"../public/img/xs.jpg","imgData":"===fileData","imgName":"===fileName","size":"1024","type":"image"}');
		},
		goUpload: function(param) {
			//var jsonStr = {status:false};
			eval(param.sCallback)('{"showUrl":"/api/v2/attachment/id/58357b50711f17147f91c613.png","path":"/uf","s_url":"/api/v2/attachment/id/58357b50711f17147f91c616","uuid":"4c6c0d35890f4ebda926a63abac587bf","type":"image","url":"/api/v2/attachment/id/58357b50711f17147f91c613.png","ext":"png","size":"450019"}');
		},
		//通讯录选人
		selUsers: function(param) {
			var json = '[{"userid":"1852", "name":"安建烨", "imageAddress" : "/uf/employee/photo/50.jpg"},{"userid": "102","name" : "李思","imageAddress" : "/uf/employee/photo/150.jpg"},{"userid": "103","name" : "王舞","imageAddress" : "/uf/employee/photo/50.jpg"},{"userid": "104","name" : "赵柳","imageAddress" : "/uf/employee/photo/150.jpg"}]';
			eval(param.sCallback)(json);
		},
		getQDLocationInfo: function(param) {
			//		var param = JSON.parse(param);
			//		setTimeout(function(){
			eval(param.sCallback)('{ "district" : "南山区高新南一道",  "longitude" : "113.947594",  "latitude" : "22.538765",  "city" : "深圳市",  "address" : "中国广东省深圳市南山区粤海街道科技园高新南一道",  "province" : "广东省"}');
			//			eval(param.fCallback)('{"status":"error","msg":"出错"}');
			//		}, 1000);
		},
		setAlarm: function(param) {
			eval(param.sCallback)('{"id":"123","msg":"这个是显到时间时显示的标题","time":"2016-11-02 16:00:00"}')
		},
		cancleAlarm: function(param) {
			eval(param.sCallback)('{"id":"123"}')
		},
		fromImgLibrary: function(param) {
			//eval(param.sCallback)('{"backType":"2","result":[{"originalPicPath":"../public/img/xs.jpg","originalPicLength":5868782}]}');
			eval(param.sCallback)('{"backType":"2","result":[{"originalPicPath":"../public/img/xs.jpg","originalPicLength":5868782},{"originalPicPath":"../public/img/xs.jpg","originalPicLength":5868782}]}');
		},
		goNative: function() {
			history.back();
		}
	};
}())