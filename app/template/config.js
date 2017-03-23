/**
 * Created by umin.
 */
'use strict';
var host = 'http://127.0.0.1:8080/mxm',

    server = {
        host: host,
        login: {
            url: host +'/login',
            data: {
                'username': 'admin',
                'password': 'Gzmtr2017'
            }
        },

        function: {
            url: host +'/appstore/function',
            data: {
                'sEcho': '1',
                'iColumns': '8',
                'sColumns': '',
                'iDisplayStart': '0',
                'iDisplayLength': '100',
                'mDataProp_0': 'id',
                'mDataProp_1': 'icon',
                'mDataProp_2': 'name',
                'mDataProp_3': 'version',
                'mDataProp_4': 'markName',
                'mDataProp_5': 'active',
                'mDataProp_6': 'createTimeStr',
                'mDataProp_7': 'id',
                'sSearch': '',
                'bRegex': 'false',
                'sSearch_0': '',
                'bRegex_0': 'false',
                'bSearchable_0': 'true',
                'sSearch_1': '',
                'bRegex_1': 'false',
                'bSearchable_1': 'true',
                'sSearch_2': '',
                'bRegex_2': 'false',
                'bSearchable_2': 'true',
                'sSearch_3': '',
                'bRegex_3': 'false',
                'bSearchable_3': 'true',
                'sSearch_4': '',
                'bRegex_4': 'false',
                'bSearchable_4': 'true',
                'sSearch_5': '',
                'bRegex_5': 'false',
                'bSearchable_5': 'true',
                'sSearch_6': '',
                'bRegex_6': 'false',
                'bSearchable_6': 'true',
                'sSearch_7': '',
                'bRegex_7': 'false',
                'bSearchable_7': 'true',
                'iSortCol_0': '1',
                'sSortDir_0': 'asc',
                'iSortingCols': '1',
                'bSortable_0': 'false',
                'bSortable_1': 'false',
                'bSortable_2': 'true',
                'bSortable_3': 'true',
                'bSortable_4': 'true',
                'bSortable_5': 'true',
                'bSortable_6': 'true',
                'bSortable_7': 'false'
            }
        },

        upload: {
            url: host +'/appstore/func-version/create',
            data: {
                'id': '',
                'icon': '',
                'address': '',
                'num': '',
                'status': 'ENABLE',
                'versionFile': '',
                'url': '',
                'function.id': '',
                'function.unzip': 'Y',
                'remark': ''
            }
        }
    }
;

module.exports = {
    server: server,
    src: './src',
    build: './build',
    dist: './dist'
};