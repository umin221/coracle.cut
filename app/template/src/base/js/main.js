/**
 * @author 			umin
 * @since			2016-09-03
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @description		基准应用
 */
define(function(require, exports, module) {

        var _options = {

            Header: { // 组件类型
                data: function() { // 组件配置
                    return {
                        title:'基准应用',
                        buttons: [
                            { text:'', icon:'icon-left', cls:'back pull-left', clickFn:function() {
                                page.back();
                            }},{text:'', icon:'icon-filter', cls:'pull-right', clickFn:function() {
                                console.log('点击右侧按钮');
                            }}
                        ]
                    }
                }
            },

            List: {
                id: 'list_id',
                subId: 'dc_id',
                dbData: 'list',
                format: function(item) {
                    return {
                        imgs:{src:item.icon,cls:'width40 radius10'},
                        labels:[
                            {title:item.title, cls:'item-title'},
                            {title:item.pubTime, cls:'item-subtitle'},
                        ], cls:'rowli', item:item
                    }
                },
                clickFn: function(data, dataRef) {
                    console.log(data);
                }
            },

            DataCP: [{ // 数据加载
                id: 'dc_id',
                subId: ['list_id'],
                url: 'news/get-news-list',
                data: {
                    p: '0',
                    s: '10',
                    type: 'unread',
                    name: '',
                    typeId: 1
                }
            }]
        }

    return page.compile(_options);
})