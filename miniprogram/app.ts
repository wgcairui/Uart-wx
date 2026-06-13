"use strict";

// 错误上报服务 (必须在 App() 之前 import, 否则 install() 拿不到 getApp() 实例)
import errorReporter from "./utils/error-reporter";

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
        // 1. 第一件事: 挂全局错误监听 (App.onError / wx.onError / wx.onUnhandledRejection / Page.onError mixin)
        // 必须在最早, 防止启动期错误漏报
        try {
            errorReporter.install();
        } catch (e) {
            // reporter 自身初始化失败也不能挂, 只 console.warn
            console.warn('[app] errorReporter.install failed:', e);
        }
    },
    // 同步未捕获错误兜底 (部分老基础库 wx.onError 拿不到)
    onError(err: any) {
        try {
            errorReporter.report(err, { source: 'App.onError', level: 'A' });
        } catch (e) {
            console.warn('[app] onError report failed:', e);
        }
    },
    onHide() {
        wx.clearStorage()
    }
});