/**
 * @author          zhuming
 * @since           2016-08-19
 * @copyright       Copyright (c) 2016, YZKJ
 * @version         1.0
 * @component       header
 * @description
 */
'use strict';
define(function(require, exports, module) {

    /**
     * @class Widget.Tab Tab 组件.
     * @extends basicPlug
     *
     * **Markdown**
     *
     * An embedded live example:
     *
     *      @example
     *      Tab: {
     *          // 组件唯一标识 (required).
     *          id: 'tab',
     *          // 静态 tab 配置 data 即可
     *          data: function() {
     *              return {
     *                  cls:'buttons-tab',//不同的tab样式风格,可选 buttons-tab、buttons-row
     *                  rows: [{
     *                      label:'Tab1', code:'one', slot:'tab1', active:'active', cls:''
     *                  },{
     *                      label:'Tab2', code:'two', slot:'tab2', active:''
     *                  },{
     *                      label:'Tab3', code:'three', slot:'tab3', active:''
     *                  }]
     *              }
     *          },
     *          // 动态 tab 需要配置 format
     *          format: function() {},
     *          // 当 tab 元素被点击时触发
     *          clickFn: function( data ) {}
     *      }
     *
     * **Note:**
     */
    var Attach = Klass.define(KND.BasicPlug, {
        init: function() {
            this.Vdata = {
                head: {},
                imgs: [],
                id: this.componentId
            };
            this.initOp();
        },
        /**
         * @property {Object} data
         * 组件 data 显示.
         * @property {String} head.head
         * class样式不同的tab样式风格,可选 buttons-tab、buttons-row
         * @property {Array} imgs
         * @property {String} data.maxlength
         * 最大附件数
         * @property {String} data.showAddIcon
         * 是否显示添加按钮
         * @property {String} data.edit
         * 附件是否可以编辑
         * @property {String} data.showType
         * 附件页面显示方式
         * @property {Boolean} data.openApp
         * 选择附件方式
         * @property {Boolean} data.isUpload
         * 是否立即上传附件
         */
        initOp: function() {
            var me = this;
            me.VueOpts = {
                template: require('./attach.tpl'),
                data: function() {
                    return {
                        head: {
                            title: '附件'
                        },
                        imgs: [],
                        maxlength: 3,
                        showAddIcon: true,
                        edit: true,
                        showType: 2,
                        openApp: false,
                        isUpload: false,
                        photoNumber: 1
                    }
                },
                methods: {
                    openBtn: function(i) {
                        me.vue.openApp = true;
                        me.vue.editIndex = me.vue.showType == 2 ? i : null;
                    },
                    add: function() {
                        me.addImg({})
                    },
                    del: function(i) {
                        me.vue.imgs.splice(i, 1);
                        me.showAddIco();
                    },
                    delImg_only: function(i) {
                        var remark = me.vue.imgs[i].remark;
                        var obj = {
                            id : me.vue.imgs[i].id,
                            "imgPath": "",
                            "imgName": "",
                            "size": '',
                            "type": "image",
                            "remark": remark
                        }
                        me.vue.imgs.splice(i, 1, obj);
                    },
                    close: function() {
                        me.vue.openApp = false;
                    },
                    open: function(type) {
                        me.vue.openApp = false;
                        var json;
                        window.attachAlbumFinish = function(json) { //图库
                            json = tools.parse(json);
                            if (json.status == false) {
                                page.loading(false);
                                return;
                            }
                            json.unupload = true;
                            delete json.imgData;

                            if (me.vue.isUpload) {
                                //window.uploadAlbumImgFinish = function(obj){
                                //    if (typeof obj == 'string') {
                                //        obj = JSON.parse(obj);
                                //    }
                                //    json.serverPath = obj.url;
                                //    json.imgPath = tools.server_host + tools.server_ctxt + obj.url;
                                //    me.vue.showType==1 ? me.addImg(json) : me.editImg(json);
                                //    page.loading(false);
                                //}
                                //me.uploadAlbum(json.result);
                                tools.invoke(me, tools.batchUpload, {
                                    imgs: json.result,
                                    cb: function(datas) {
                                        page.loading(false);
                                        var met = me.vue.showType == 1 ? 'addImg' : 'editImg';
                                        for (var i = 0; i < datas.length; i++) {
                                            var item = datas[i];
                                            item.serverPath = item.url;
                                            item.imgPath = tools.server_host + tools.server_ctxt + item.url;
                                            me[met](item);
                                        }
                                    }
                                });
                            } else {
                                page.loading(false);
                                var result = json.result;

                                for (var i = 0; i < result.length; i++) {
                                    //{"originalPicPath":"../public/img/xs.jpg","originalPicLength":5868782,"src":"../public/img/xs.jpg"}
                                    result[i].src = result[i].originalPicPath;
                                    result[i].imgPath = result[i].originalPicPath;
                                    me.vue.showType == 1 ? me.addImg(result[i]) : me.editImg(result[i]);
                                }
                            }
                        }
                        window.attachPictureFinish = function(json) { //拍照
                            if (typeof json === 'string') {
                                json = JSON.parse(json);
                            }
                            if (json.status == false) {
                                page.loading(false);
                                return;
                            }
                            json.unupload = true;
                            delete json.imgData;
                            if (me.vue.isUpload) {
                                window.uploadPictureImgFinish = function(obj) {
                                    if (typeof obj == 'string') {
                                        obj = JSON.parse(obj);
                                    }
                                    json.serverPath = obj.url;
                                    json.imgPath = tools.server_host + tools.server_ctxt + obj.url;
                                    me.vue.showType == 1 ? me.addImg(json) : me.editImg(json);
                                    page.loading(false);
                                }
                                me.uploadPicture(json.imgPath);
                            } else {
                                page.loading(false);
                                me.vue.showType == 1 ? me.addImg(json) : me.editImg(json);
                            }
                        }
                        switch (type) {
                            //拍照
                            case "photo":
                                page.loading(true);
                                json = {
                                    backType: 2,
                                    source: 'Camera',
                                    sCallback: 'attachPictureFinish'
                                };
                                KND.NativeAPI.goPhoto(me, json);
                                break;
                                //相册
                            case "imgLibrary":
                                page.loading(true);
                                json = {
                                    //photoNumber: (this._data.maxlength-this._data.imgs.length)+'',
                                    photoNumber: me.vue.photoNumber ? me.vue.photoNumber : (this._data.maxlength - this._data.imgs.length), //图片多选有问题 暂时改为只能选一张
                                    backType: 2,
                                    source: 'Album',
                                    sCallback: 'attachAlbumFinish'
                                }
                                KND.NativeAPI.fromImgLibrary(me, json);
                                break;
                                //录音
                            case "record":
                                json = {
                                    sCallback: this.photoFinish.bind(me, this),
                                    fCallback: function(err) {}
                                }

                                break;
                                //视屏
                            case "video":
                                var json = {
                                    sCallback: this.photoFinish.bind(me, this),
                                    fCallback: function(err) {}
                                }

                                break;
                        };
                    },
                    changeLength: function() {
                        me.showAddIco();
                    },
                    browseImages: function(i) {
                        var imgs = this.imgs.map(function(a){
                                var arr = a.imgPath.split('/');
                                return {
                                    name : arr[arr.length-1],
                                    size : '',
                                    url : a.imgPath
                                }
                            });
                        imgs = imgs.filter(function(a){
                            return !!a.url;
                        });
                        var json = {
                            imgs: imgs,
                            curIndex: i,
                        }
                        KND.NativeAPI.browseImages(json);
                    }
                },
                watch: {
                    'imgs': "changeLength"
                }
            }
        },
        uploadPicture: function(str) {
            KND.NativeAPI.goUpload({
                url: tools.server_host + tools.server_ctxt + '/upload-file?path=hd',
                filePath: str,
                sCallback: 'uploadPictureImgFinish'
            })
        },
        uploadAlbum: function(str) {
            var i = 0,
                strlen = str.length;
            for (i; i < strlen; i++) {
                KND.NativeAPI.goUpload({
                    url: tools.server_host + tools.server_ctxt + '/upload-file?path=hd',
                    filePath: str[i].originalPicPath,
                    sCallback: 'uploadAlbumImgFinish'
                })
            }
        },
        upload: function(str) {
            KND.NativeAPI.goUpload({
                url: tools.server_host + tools.server_ctxt + '/upload-file?path=hd',
                filePath: str,
                sCallback: 'uploadImgFinish'
            })
        },
        addImg: function(obj) {
            this.vue.imgs.push(obj);
            this.showAddIco();
        },
        editImg: function(obj) {
            var id = this.vue.imgs[this.vue.editIndex]['id'];
            obj.remark = this.vue.imgs[this.vue.editIndex]['remark'];
            if(id) obj.id = id;
            this.vue.imgs.splice(this.vue.editIndex, 1, obj);
        },
        showAddIco: function() {
            this.vue.showAddIcon = this.vue.imgs.length >= this.vue.maxlength ? false : true;
        }
    });
    KND.Attach = Attach;
})