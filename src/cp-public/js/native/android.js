if (!KND) {
    var KND = {};
};
KND.ANDROIDAPI = {
    nativeAPI: function( method, param ) {
        return param != undefined ? kndfunc[method](param) : kndfunc[method]();
    },
    openFile: function( param ) {
        accessoryfunc.openFile(param);
    },
    goRecord: function( param ) {
        recordingfunc.goRecord(param);
    },
    openRecord: function( param ) {
        recordingfunc.openRecord(param);
    },
    goPhoto: function( param ) {
        capturefunc.goPhoto(param);
    },
    fromImgLibrary: function( param ) {
        capturefunc.fromImgLibrary(param);
    },
    openPhoto: function( param ) {
        capturefunc.openPhoto(param);
    },
    setKndTime: function( param ) {
        calendarfunc.setKndTime(param);
    },
    cloundVol: function( param ) {
        cloundvolfunc.cloundVol(param);
    },
    openQcode: function( param ) {
        qcodefunc.openQcode(param);
    },
    selUsers: function( param ) {
        kndfunc.selUsers(param);
    },
    shareMsg: function( param ) {
        imFunc.shareMsg(param);
    },
    setAlarm : function(param){
        kndfunc.setAlarm(param)
    }
};
