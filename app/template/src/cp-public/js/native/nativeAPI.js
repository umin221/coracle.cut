/**
 * @class Native.NativeAPI 原生能力调用
 *
 * 提供原生态能力交互 API.
 *
 * An embedded live example:
 *
 *		@example
 *	    KND.NativeAPI.goPhoto();
 *
 * **Note:**
 * 根据当前设备类型，自动调用相应平台 API.
 *
 */
if (!KND) {
    var KND = {};
};
(function () {
    var $pointer = null,
        NativeAPI = null,
        Native = {},
        dataInst = null,
        type = KND.Util.getDevice().toUpperCase(),
        proxyCb = null,
        isPC = type == 'PC',
        setNativeAPI = function() {
            NativeAPI = KND[type + "API"];
        };

    // type = "IOS";
    KND.NativeCb = {
        setLoginInfo: function ( o ) {
            var o = tools.parse(o);
            KND.Publisher.publish("getLoginFinish", o, $pointer);
        },
        uploadFinish: function(o) {
            var o = tools.parse(o);
            KND.Publisher.publish("uploadFinish", o, $pointer);
        },
        /**
         * 音频录制回调函数
         * @param {Object} o
         * @param {String} o.recordSize 7782
         * @param {String} o.recordName 20160603143930.amr"
         * @param {String} o.recordPath \/var\/mobile\/Containers\/Data\/Application\/506B56C0-F646-4155-9ABC-92F6D837CD53\/Library\/Caches\/xImgDir\/20160603143930.amr
         */
        recordFinish: function( o ) {
            var o = tools.parse(o);
            KND.Publisher.publish("recordFinish", o, $pointer);
        },
        proxyFinish: function( o ) {
            var datas = tools.parse(o);
            proxyCb(datas);
        },
        checkNetworkFinish: function() {

        },

        photoFinish: function( result ) {
            alert(JSON.stringify( result ));
        },
        fromImgFinish: function( result ) {
            alert(JSON.stringify(result));
        },
        cloundVolFinish: function( result ) {
            alert(JSON.stringify(result));
        },
        qcodeFinish: function(result) {
            alert(JSON.stringify(result));
        },
        bcardScanFinish: function(result) {
            alert(JSON.stringify(result));
        },
        getCurrentCoordinateFinish: function(result) {
            alert(JSON.stringify(result));
        },
        getLocationInfoFinish: function(result) {
            alert(JSON.stringify(result));
        },
        getQDLocationInfoFinish: function(result) {
            alert(JSON.stringify(result));
        },
        setDevId: function(result) {
            alert(JSON.stringify(result));
        },
        openLogFinish: function(result) {
            alert(JSON.stringify(result));
        },
        checkUsersFinish: function(result) {
            alert(JSON.stringify(result));
        },
        /**
         * 日期选择完成
         * @param o
         */
        getKndTimeFinish: function( o ) {
            var o = tools.parse(o);
            KND.Publisher.publish("getKndTimeFinish", o, $pointer);
        },
        /**
         * 拍照完成 回调函数
         * @param {Object} o
         */
        photoFinish: function ( o ) {
            var o = tools.parse(o);
            KND.Publisher.publish("attachFinish", o, $pointer);
        },
        /**
         * 选人完成 回调函数
         * @param {Object} data 返回的参数数组
         * @param {Object} data[i].id 用户id
         * @param {Object} data[i].name 用户姓名
         * @param {Object} data[i].email 用户邮箱
         */
        selUsersFinish : function(data) {
            KND.Publisher.publish("selUsersFinish",data,$pointer);
        }
    };
    Native.API = {

        invoke: function( method, param ) {
            param = JSON.stringify(param);
            if (NativeAPI[method] && !isPC) {
                NativeAPI[method](param);
            } else {
                return NativeAPI.nativeAPI(method, param);
            }
        },
        /**
         * 设置数据加载对象
         * @param {Object} dataControl 数据加载对象
         */
        setDataControl: function (dataControl) {
            dataInst = dataControl;
        },

        // ------------------------------------附件------------------------------------
        /**
         * 打开附件 打开本地客户端里面的附件
         * @param {Object} json
         * @param {String} json.type 必选 附件类型  图片类：IMAGE;  音频类：AUDIO;  视频类：VEDIO;  文本类：TEXT;  办公类：OFFICE;  网页类：WEBSITE;  安装类：INSTALL;  压缩类：ZIP;
         * @param {String} json.filePath 必选 本地文件路径，不支持网络路径 file://xxx/aa.jpg
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openFile: function( json ) {
            var param = $.extend(true, {}, {
                type: 'IMAGE',
                filePath: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('openFile', param);
        },
        /**
         * 上传附件 上传附件到服务器
         * @param {Object} json
         * @param {String} json.url 必选 上传附件接收地址 http://192.168.13.87:8080/ceshi/upAndDownFile.jsp
         * @param {String} json.filePath 必选 待上传附件路径 file://xxx/aa.jpg
         * @param {Object} json.datas 可选 上传所需其他参数，多用在post请求
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        goUpload: function( json, $point) {
            $pointer = $point;
            var param = $.extend(true, {}, {
                url: '',
                filePath: '',
                datas: {},
                sCallback: 'KND.NativeCb.uploadFinish',
                fCallback: 'KND.NativeCb.uploadFinish'
            }, json);
            this.invoke('goUpload', param);
        },
        /**
         * 下载附件 下载附件到本地
         * @param point
         * @param {Object} json
         * @param {Object} json.file
         * @param {String} json.file.url 必选 附件下载地址
         * @param {String} json.file.name 必选 保存到本地的附件名称
         * @param {String} json.endBack 可选 下载完成后执行动 0：无动作； 1：返回缩略图； 2：直接打开； 3：返回缩略图并打开
         * @param {String} json.type 必选 附件类型  图片类：IMAGE;  音频类：AUDIO;  视频类：VEDIO;  文本类：TEXT;  办公类：OFFICE;  网页类：WEBSITE;  安装类：INSTALL;  压缩类：ZIP;
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        goDownload: function( $point, json ) {
            $pointer = $point;
            var param = $.extend(true, {}, {
                file: {
                    url: 'http://192.168.13.87:8080/ceshi/upAndDownFile.jsp',
                    name: "xxx"+ new Date().getTime() +".jpg"
                },
                endBack: "2",
                type: 'IMAGE',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('goDownload', param);
        },
        // ------------------------------------附件------------------------------------

        // ------------------------------------音视频------------------------------------
        /**
         * 音频录制 录制音频文件
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        goRecord: function( $point, json ) {
            $pointer = $point;
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.recordFinish',
                fCallback: 'KND.NativeCb.recordFinish'
            }, json);
            this.invoke('goRecord', param);
        },
        /**
         * 音频播放 打开本地客户端里面的音频文件
         * @param {Object} json
         * @param {String} json.recordPath 必选 本地音频文件路径 file://xxx/abc.amr
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openRecord: function( json ){
            var param = $.extend(true, {}, {
                recordPath: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('openRecord', param);
        },
        /**
         * 视频录制
         * @param {Object} json
         * @param {String} json.backType 必选  1：不需要返回视频缩略图； 2：需要返回视频缩略图
         * @param {String} json.maxTime 可选 最长录制时间，默认10秒
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        goPhotograph: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                backType: '1',
                maxTime: '10',
                sCallback: 'KND.NativeCb.photographFinish',
                fCallback: 'KND.NativeCb.photographFinish'
            }, json);
            this.invoke('goPhotograph', param);
        },
        /**
         * 视频播放 打开本地客户端里面的视频文件
         * @param {Object} json
         * @param {String} json.videoPath 必选 本地视频文件路径,网络视频路径 file://xxx/abc.amr
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openVideo: function( json ){
            var param = $.extend(true, {}, {
                videoPath: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('openVideo', param);
        },
        // ------------------------------------音视频------------------------------------

        // ------------------------------------网络------------------------------------
        handleData: function( json ) {
            dataInst ? dataInst.handleData(json) : this.reqInterfaceProxy(json);
        },
        /**
         * 代理请求 前端通过客户端的网络请求并获取返回数据，多用在跨域请求
         * @param {Object} json
         * @param {String} json.reqURL 必选 代理请求地址，可以为网络路径，也可以为相对路径，客户端会自动补全服务器地址和端口号，比如http://192.168.14.168:8080
         * @param {Object} json.datas 可选 代理请求参数，请求类型为POST时有效
         * @param {String} json.reqType 必选 代理请求类型
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        reqInterfaceProxy: function( json ){
            if (dataInst) {
                dataInst.reqInterfaceProxy(json);
            } else {
                var url = json.url
                    , data = json.data
                    , param
                    ;
                // 九牧参数 jsonpram 需要
                if (data && data.jsonparm) data.jsonparm = JSON.stringify(data.jsonparm);
                //_cb = function(datas) {
                //    json.cb(datas);
                //};
                proxyCb = json.cb;
                url = /http:\/\//.test(url) ? url : json.baseurl + url;
                param = {
                    reqURL: url,
                    datas: json.data,
                    reqType: json.type,
                    sCallback: 'KND.NativeCb.proxyFinish',
                    fCallback: 'KND.NativeCb.proxyFinish'
                };
                this.invoke('reqInterfaceProxy', param);
            }
        },
        /**
         * 网络状态 获取客户端网络状态或者类型
         * @param {Object} json
         * @param {String} json.type 可选 默认all  netstate：检测网络是否正常； nettype：检测网络类型； all：检测网络是否正常和网络类型；
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        checkNetwork: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                type: 'nettype',
                sCallback: 'KND.NativeCb.checkNetworkFinish',
                fCallback: 'KND.NativeCb.checkNetworkFinish'
            }, json);
            this.invoke('checkNetwork', param);
        },
        /**
         * 打开新页面
         * @param {Object} json
         * @param {String} json.url 必选 本地路径，相对客户端p_html的路径，必须以“/”开头；
         * @param {String} json.type 可选 类型 local/remote
         * @param {String} json.backNative 可选 是否显示返回导航栏， 0：表示不显示，默认为0，可不传； 1：表示显示
         * @param {String} json.backType 可选 是否缓存当前页， 0：缓存，默认为0，可不传； 1：不缓存
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openNewWeb: function( json ){
            var type = KND.Util.Validate.valid(json.url, 'url') === true ? 'remote' : 'local'; // 是否本地路径
            var param = $.extend(true, {}, {
                url: '/news/index.html',
                type: type,
                backNative: '0',
                backType: '0',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('toUrl', param);
        },
        /**
         * 关闭新页面
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        closeWeb: function( json ){
            var param = $.extend(true, {}, {
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('closeWeb', param);
        },
        // ------------------------------------网络------------------------------------

        // ------------------------------------设备------------------------------------
        /**
         * 拍照 调用客户端相机功能，并获取相应的图片数据
         * @param {Object} json
         * @param {String} json.backType 必选 1：返回图片路径（不存相册）； 2：返回图片路径和大小（存相册）； 3：返回图片、路径和大小（存相册）
         * @param {String} json.wDivisor 可选 固定图片压缩宽度，默认值400
         * @param {String} json.hDivisor 可选 固定图片压缩高度，默认值400
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        goPhoto: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                backType: '1',
                wDivisor: '1024',
                hDivisor: '780',
                sCallback: 'KND.NativeCb.photoFinish',
                fCallback: 'KND.NativeCb.photoFinish'
            }, json);
            this.invoke('goPhoto', param);
        },
        /**
         * 相册选择 获取图片，可根据参数获取拍照或者相册的图片信息
         * @param {Object} json
         * @param {String} json.photoNumber 必选 图片数量，1 为单选，大于 2 为多选
         * @param {String} json.source 必选 "Camera" 或 "Album"，只在 photoNumber = 1 时有效
         * @param {String} json.backType 必选 1：只返回压缩图； 2：只返回原图路径； 3：返回压缩图和原图路径
         * @param {String} json.wDivisor 可选 固定图片压缩宽度，默认值400
         * @param {String} json.hDivisor 可选 固定图片压缩高度，默认值400
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        fromImgLibrary : function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                photoNumber: '1',
                source: 'Camera',
                backType: '3',
                wDivisor: '1024',
                hDivisor: '780',
                sCallback: 'KND.NativeCb.fromImgFinish',
                fCallback: 'KND.NativeCb.fromImgFinish'
            }, json);
            this.invoke('fromImgLibrary', param);
        },
        /**
         * 单图预览
         * @param {Object} json
         * @param {String} json.photoPath 必选 图片路径；可以为网络路径，也可以为本地路径（需要完整的路径） http://xxx/aa.jpg
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openPhoto: function( json ){
            var param = $.extend(true, {}, {
                photoPath: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('openPhoto', param);
        },
        /**
         * 多图预览 多张图片预览
         * @param {Object} json
         * @param {Array} json.imgs 必选 图片
         * @param {String} json.imgs.name 必选 下载图片保存名称
         * @param {String} json.imgs.size 可选 大小，单位字节
         * @param {String} json.imgs.url 必选 图片路径，网络路径
         * @param {String} json.curIndex 默认显示第几张图片，从1开始
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        browseImages: function( json ){
            var param = $.extend(true, {}, {
                imgs: [{
                    name: '1.png',
                    size: '',
                    url: 'http://img1.imgtn.bdimg.com/it/u=733417015,367501698&fm=11&gp=0.jpg'
                }],
                curIndex: '1',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('browseImages', param);
        },
        /**
         * 日期控件 调用客户端的日期选择控件
         * @param {Object} json
         * @param {String} json.format 必选 时间格式，目前支持五种 yyyy-MM-dd、yyyy-MM-dd HH:mm、HH:mm、yyyy-MM、yyyy
         * @param {String} json.initDTime 可选 默认时间 2015-01-06 14:50:00
         * @param {String} json.tagID 控件ID
         * @param {String} json.kndMinTime 可选 最小时间（可不传） 2015-01-06 14:50:00
         * @param {String} json.kndMaxTime 可选 最大时间（可不传） 2015-01-06 14:50:00
         * @param {String} json.minInterval 可选 分钟间隔；当format指定为HH:mm时，此属性可以设置分钟间隔，间隔数需要能被60整除
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        setKndTime: function( json ){
            var param = $.extend(true, {}, {
                format: 'yyyy-MM-dd',
                initDTime: '',
                tagID: '',
                minInterval: '1',
                sCallback: 'KND.NativeCb.getKndTimeFinish',
                fCallback: 'KND.NativeCb.getKndTimeFinish'
            }, json);
            this.invoke('setKndTime', param);
        },
        /**
         * 语音识别 调用客户端的语音控件，并获取相应的内容
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        cloundVol: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.cloundVolFinish',
                fCallback: 'KND.NativeCb.cloundVolFinish'
            }, json);
            this.invoke('cloundVol', param);
        },
        /**
         * 扫描 调用客户端的扫描控件，并获取返回的内容
         * @param {Object} json
         * @param {String} json.type 必选 1：为单次扫描；2：为多次扫描
         * @param {Object} json.result 扫描结果，在type为2的时候使用
         * @param {Object} json.result.resultMes
         * @param {Object} json.result.resultCode 1.扫描成功；2.扫描失败；3.重复扫描；4.不存在；5.？扫描成功
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openQcode: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                type: '1',
                result: {
                    resultMes: '扫描成功',
                    resultCode: '1'
                },
                sCallback: 'KND.NativeCb.qcodeFinish',
                fCallback: 'KND.NativeCb.qcodeFinish'
            }, json);
            this.invoke('openQcode', param);
        },
        /**
         * 名片扫描 调用客户端的名片扫描控件，并获取返回的内容
         * @param {Object} json
         * @param {String} json.bcardType 必选 capture 通过摄像头扫描名片；fromLibrary 从相册选择名片
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        bcardScan: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                bcardType: 'capture',
                sCallback: 'KND.NativeCb.bcardScanFinish',
                fCallback: 'KND.NativeCb.bcardScanFinish'
            }, json);
            this.invoke('bcardScan', param);
        },
        /**
         * 中文地址解析 根据中文地址获取具体位置信息
         * @param {Object} json
         * @param {String} json.bcardType 必选 中文地址 深圳市龙华富士康
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        getCurrentCoordinate: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                address: '',
                sCallback: 'KND.NativeCb.getCurrentCoordinateFinish',
                fCallback: 'KND.NativeCb.getCurrentCoordinateFinish'
            }, json);
            this.invoke('getCurrentCoordinate', param);
        },
        /**
         * 打电话
         * @param {Object} json
         * @param {String} json.phoneNum 必选 电话号码，多个电话号码用“,”隔开 18680377081,15012772690
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openPhone: function( json ){
            var param = $.extend(true, {}, {
                phoneNum: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('openPhone', param);
        },
        /**
         * 发短信
         * @param {Object} json
         * @param {String} json.phoneNum 必选 电话号码，多个电话号码用“,”隔开 18680377081,15012772690
         * @param {String} json.message 可选 短信内容 你好！
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        opneMsg: function( json ){
            var param = $.extend(true, {}, {
                phoneNum: '',
                message: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('opneMsg', param);
        },
        /**
         * 发邮件
         * @param {Object} json
         * @param {String} json.recemail 必选 接收人邮箱 abc@126.com
         * @param {String} json.emailtitle 必选 邮件标题
         * @param {String} json.emailcontent 必选 邮件正文
         * @param {String} json.isHtml 可选 是否是html文件
         * @param {String} json.attachmentName 可选 图片名称(要与attachmentBase64一起使用) abc.png
         * @param {String} json.attachmentBase64 可选 图片base64 xxxx
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openEmail: function( json ){
            var param = $.extend(true, {}, {
                recemail: '',
                emailtitle: '',
                emailcontent: '',
                isHtml: 'NO',
                attachmentName: '',
                attachmentBase64: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('openEmail', param);
        },
        /**
         * 地图定位 利用客户端定位系统获取当前位置信息，不显示地图界面
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        getLocationInfo: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.getLocationInfoFinish',
                fCallback: 'KND.NativeCb.getLocationInfoFinish'
            }, json);
            this.invoke('getLocationInfo', param);
        },
        /**
         * 签到定位 利用客户端定位系统获取当前位置签到信息，不显示地图界面
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        getQDLocationInfo: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.getQDLocationInfoFinish',
                fCallback: 'KND.NativeCb.getQDLocationInfoFinish'
            }, json);
            this.invoke('getQDLocationInfo', param);
        },
        /**
         * 查看定位 根据经纬度信息在地图上显示，可显示多个位置
         * @param {Object} json
         * @param {Array} json.options
         * @param {String} json.options.longitude
         * @param {String} json.options.latitude
         * @param {String} json.flag 可选 图片base64
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        showMyLocation: function( json ){
            var param = $.extend(true, {}, {
                options: [{
                    longitude: '114.046448',
                    latitude: '22.648489'
                }],
                flag: 'true',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('showMyLocation', param);
        },
        /**
         * 我的周边 显示我的周边
         * * android暂不支持 *
         * @param {Object} json
         * @param {Array} json.options
         * @param {String} json.options.longitude
         * @param {String} json.options.latitude
         * @param {String} json.options.address
         * @param {String} json.title 可选 页面标题
         * @param {String} json.distance 可选 误差范围,单位米
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        showMapList: function( json ){
            var param = $.extend(true, {}, {
                options: [{
                    longitude: '114.046448',
                    latitude: '22.648489',
                    address: '深圳科技园'
                }],
                title: '签到位置',
                distance: '100',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('showMapList', param);
        },
        /**
         * 地图导航 根据传入的位置信息，利用系统导航软件规划出适合的线路
         * * android暂不支持 *
         * @param {Object} json
         * @param {Array} json.options
         * @param {String} json.options.longitude
         * @param {String} json.options.latitude
         * @param {String} json.options.address
         * @param {String} json.options.tit
         * @param {String} json.type 可选 地图类型
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        mapNavigation: function( json ){
            var param = $.extend(true, {}, {
                options: [{
                    longitude: '114.046448',
                    latitude: '22.648489',
                    address: '深圳龙华',
                    tit: '深圳龙华'
                }],
                type: 'traffic',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('mapNavigation', param);
        },
        // ------------------------------------设备------------------------------------

        // ------------------------------------其他------------------------------------
        /**
         * 返回工作区 返回原生态界面
         */
        back: function () {
            this.invoke('goNative');
        },
        /**
         * 功能旗标 显示主界面每个功能右上角的旗标数量
         * @param {Object} json
         * @param {String} json.type 必选 固定值 countNews
         * @param {String} json.shortCode 必选 功能标示，结合平台功能管理可查询 KTC_DEMO
         * @param {String} json.NEWS 必选 消息数量 3
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        countNews: function( json ){
            var param = $.extend(true, {}, {
                type: 'countNews',
                shortCode: '',
                NEWS: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('countNews', param);
        },
        /**
         * 应用下载
         * @param {Object} json
         * @param {String} json.url 必选 下载路径 https://c.kingnode.com/pool/1426041097798/1464836168130.plist
         * @param {String} json.appname 可选 应用名称 讯飞网
         * @param {String} json.version 可选 应用版本 1.40.0602
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        otaApp: function( json ){
            var param = $.extend(true, {}, {
                url: '',
                appname: '',
                version: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('otaApp', param);
        },
        /**
         * 登录信息 获取登录用户信息
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        getLoginInfo: function( $point, json ){
            setNativeAPI();
            $pointer = $point;
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.setLoginInfo',
                fCallback: 'KND.NativeCb.setLoginInfo'
            }, json);
            this.invoke('getLoginInfo', param);
        },
        /**
         * 唯一标示 获取当前设备唯一标示
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        getDevId: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.setDevId',
                fCallback: 'KND.NativeCb.setDevId'
            }, json);
            this.invoke('getDevId', param);
        },
        /**
         * 调试日志 打开设备调试日志
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openLog: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.openLogFinish',
                fCallback: 'KND.NativeCb.openLogFinish'
            }, json);
            this.invoke('openLog', param);
        },
        /**
         * 打开第三方应用
         * @param {Object} json
         * @param {String} json.openUrl ios--> weixin表示第三方应用标示，比如微信标示为weixin，QQ标示为mqq；xxx表示相关参数，可以为点"."和等号"="  不可以为空格和问号 weixin://xxx
         * @param {String} json.iosUrl ios--> ios客户端下载地址 微信：https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8 QQ：https://itunes.apple.com/cn/app/qq/id444934666?mt=8
         * @param {String} json.openPackage android--> 客户端包名 微信：微信：com.tencent.mm QQ：com.tencent.mobileqq
         * @param {String} json.openActivity 可选 android--> 客户端跳转到的界面 微信：com.tencent.mm.ui.LauncherUI QQ：com.tencent.mobileqq.activity.HomeActivity
         * @param {String} json.androidUrl --> android 客户端下载地址
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        openApp: function( json ){
            var param = $.extend(true, {}, {
                openUrl: '',
                iosUrl: '',
                openPackage: '',
                openActivity: '',
                androidUrl: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('openApp', param);
        },
        /**
         * 分享消息 将任务连接等网页类型的数据分享给其他人
         * @param {Object} json
         * @param {String} json.type 必选 字符串 single单选；checkbox多选
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        checkUsers: function( $point, json ){
            $pointer = $point;
            var param = $.extend(true, {}, {
                type: 'checkbox',
                sCallback: 'KND.NativeCb.checkUsersFinish',
                fCallback: 'KND.NativeCb.checkUsersFinish'
            }, json);
            this.invoke('checkUsers', param);
        },
        /**
         * 分享消息 将任务连接等网页类型的数据分享给其他人
         * @param {Object} json
         * @param {String} json.type no 不显示选择联系人界面；single 显示选择联系人界面，单选；checkbox 显示选择联系人界面，多选 / type:local 本地地址 type:remote 网络地址（此时url需要为全路径）
         * @param {Array} json.users 分享人员或者群组，当却仅当type类型为"no"，时候有效，其他类型可不传递
         * @param {String} json.users.id 230252
         * @param {String} json.users.name zhangkejun
         * @param {String} json.imgUrl 分享图片 http://cdn.duitang.com/uploads/item/201508/28/20150828205320_UsTY5.jpeg
         * @param {String} json.title 分享标题
         * @param {String} json.content 分享标题
         * @param {String} json.funcKey 轻应用标识，即在Xsimple后台配置应用时的轻应用标识
         * @param {String} json.url 分享网站链接
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        shareMsg: function( json ){
            var param = $.extend(true, {}, {
                type: '',
                users: '',
                imgUrl: '',
                title: '',
                content: '',
                funcKey: '',
                url: '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('shareMsg', param);
        },
        refresh: function( json ) {
            var param = $.extend(true, {}, {
                type: 'workspace' // notice 通知 / workspace 工作区
            }, json);
            this.invoke('refresh', param);
        },
        /**
         * 获取业务信息 从客户端获取 如待办id 或 后续其他业务信息
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        getBusinessInfo: function( json ) {
            var param = $.extend(true, {}, {
                sCallback: 'page.setBusinessInfo',
                fCallback: 'page.setBusinessInfo'
            }, json);
            return this.invoke('getBusinessInfo', param);
        },
        // ------------------------------------其他------------------------------------
        /**应用商城 详情 点击客服 跳转服务与支持
         * @param {Object} json
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         * */
        toCustomerService: function( json ){
            this.invoke('toCustomerService');
        },
        //打开地图  搜索位置 点击返回
        /*
        * 调用地图选择位置
        * @param {Object} json 输入参数
        * @param {String} json.sCallback 可选 成功回调方法名
        * @param {String} json.fCallback 可选 失败回调方法名
        * @param {Object} arg 返回的数据
        * @param {String} arg.address 返回的具体地址
        * @param {String} arg.lng  返回的地址经度
        * @param {String} arg.lat  返回的地址纬度
        * */
        getopenmap: function(json ){
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.getLocationInfoFinish',
                fCallback: 'KND.NativeCb.getLocationInfoFinish'
            }, json);
            this.invoke('getopenmap', param);
        },
        /**
         * 选择人员
         * @param {Object} json.type=singled单选，json.type=hangsome多选
         * @param {Object} json.type.initUsers 选择人的信息：名字，id及邮箱,
         * @param {String} json.sCallback 可选 成功回调方法名
         * @param {String} json.fCallback 可选 失败回调方法名
         */
        selUsers : function( json, $point ) {
            $pointer = $point;
            var param = $.extend(true, {}, {
                type: "single",
                sCallback: 'KND.NativeCb.selUsersFinish',
                fCallback: 'KND.NativeCb.selUsersFinish'
            }, json);
            this.invoke('selUsers', param);
        },
        //查看地点
        getViewlocation:function (json) {
            var param = $.extend(true, {}, {
                sCallback: 'KND.NativeCb.getLocationInfoFinish',
                fCallback: 'KND.NativeCb.getLocationInfoFinish'
            }, json);
            this.invoke('getViewlocation', param);
        },

    /**
     * 本地提醒
     * @param {Object} json
     * @param {String} json.id 提醒的消息id
     * @param {Array} json.msg 提醒的消息内容
     * @param {Array} json.time 提醒的时间
     */
        setAlarm: function(json){
            var param = $.extend(true, {}, {
                "id": '',
                "msg": '',
                "time": '',
                sCallback: '',
                fCallback: ''
            }, json);
            this.invoke('setAlarm', param);
        }
    };

    KND.NativeAPI = Native.API;
}());