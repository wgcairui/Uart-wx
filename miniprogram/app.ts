"use strict";

App({
    globalData: {
        userInfo: {} as Uart.UserInfo,
        user: '',
        userGroup: '',
        userName: '',
        userAvanter: '',
        userTel: ''
    },
    onLaunch: function () {
        
    },
    onHide() {
        wx.clearStorage()
    }
});