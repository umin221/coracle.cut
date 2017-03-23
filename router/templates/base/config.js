/**
 * @author 			umin
 * @since			2016-09-03
 * @copyright 		Copyright (c) 2016, YZKJ
 * @version			1.0
 * @description		路由配置
 */
define(function(require, exports, module) {

    require('./index.css');

    //  全局page
    page = KND.getPage({
        data: {
            baseurl: tools.server_host + tools.server_ctet,
            type: 'post'
        },
        state: {
            online: false
        }
    });

    page.Ready(function( loginInfo ) {// 组件初始化
        page.map({// 功能页面路由映射
            '/': {
                component: require('./js/main')
            }
        });
    });
});