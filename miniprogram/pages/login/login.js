"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../../utils/api");
Page({
    data: {
        userInfo: {},
        tel: '',
        registerloading: false,
        loginloading: false,
        openid: '',
        accontUser: '',
        accontPasswd: ''
    },
    onLoad: function (opt) {
        this.setData({
            openid: opt.openid
        });
    },
    getUserInfo: function (e) {
        this.setData({
            userInfo: e.detail.userInfo
        });
    },
    tabclick: function (event) {
        wx.setNavigationBarTitle({ title: event.detail.title });
    },
    getphonenumber: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var telObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({ title: '获取手机号' });
                        return [4, api_1.default.getphonenumber({ openid: this.data.openid, encryptedData: e.detail.encryptedData, iv: e.detail.iv })];
                    case 1:
                        telObj = _a.sent();
                        this.setData({
                            tel: telObj.arg.phoneNumber
                        });
                        wx.hideLoading();
                        return [2];
                }
            });
        });
    },
    register: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                wx.requestSubscribeMessage({
                    tmplIds: ['XPN75P-0F3so8dE__e5bxS9xznCyNGx4TKX0Fl-i_b4', '8NX6ji8ABlNAOEMcU7v2jtD4sgCB7NMHguWzxZn3HO4'],
                    success: function (_res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, nickName, avatarUrl, tel, _c, ok, msg;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    this.setData({ registerloading: true });
                                    _a = this.data, _b = _a.userInfo, nickName = _b.nickName, avatarUrl = _b.avatarUrl, tel = _a.tel;
                                    return [4, api_1.default.registerUser({ user: this.data.openid, name: nickName, avanter: avatarUrl, tel: tel })];
                                case 1:
                                    _c = _d.sent(), ok = _c.ok, msg = _c.msg;
                                    this.setData({ registerloading: false });
                                    if (!ok) {
                                        wx.showToast({ title: msg, icon: "none" });
                                        wx.redirectTo({ url: "/" });
                                    }
                                    else {
                                        wx.reLaunch({ url: '/pages/index/index' });
                                    }
                                    wx.showToast({ title: msg });
                                    return [2];
                            }
                        });
                    }); }
                });
                return [2];
            });
        });
    },
    login: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accontUser, accontPasswd, openid, _b, ok, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.data, accontUser = _a.accontUser, accontPasswd = _a.accontPasswd, openid = _a.openid;
                        this.setData({ loginloading: true });
                        return [4, api_1.default.userlogin({ avanter: this.data.userInfo.avatarUrl, openid: openid, user: accontUser, passwd: accontPasswd })];
                    case 1:
                        _b = _c.sent(), ok = _b.ok, msg = _b.msg;
                        this.setData({ loginloading: false });
                        if (ok) {
                            wx.reLaunch({ url: '/pages/index/index' });
                        }
                        else {
                            wx.showModal({
                                title: '登录错误',
                                content: msg
                            });
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFrQztBQUNsQyxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsRUFBZ0M7UUFDMUMsR0FBRyxFQUFFLEVBQUU7UUFDUCxlQUFlLEVBQUUsS0FBSztRQUN0QixZQUFZLEVBQUUsS0FBSztRQUNuQixNQUFNLEVBQUUsRUFBRTtRQUNWLFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFLEVBQUU7S0FDakI7SUFDRCxNQUFNLFlBQUMsR0FBRztRQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQU1ELFdBQVcsRUFBWCxVQUFZLENBQVk7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7U0FDNUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFFBQVEsRUFBUixVQUFTLEtBQWdCO1FBQ3ZCLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVLLGNBQWMsRUFBcEIsVUFBcUIsQ0FBTTs7Ozs7O3dCQUN6QixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7d0JBQ25CLFdBQU0sYUFBRyxDQUFDLGNBQWMsQ0FBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBQTs7d0JBQTVILE1BQU0sR0FBRyxTQUFtSDt3QkFDbEksSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXO3lCQUM1QixDQUFDLENBQUE7d0JBQ0YsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7OztLQUNqQjtJQUVLLFFBQVE7Ozs7Z0JBQ1osRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUN6QixPQUFPLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSw2Q0FBNkMsQ0FBQztvQkFDdkcsT0FBTyxFQUFFLFVBQU8sSUFBSTs7Ozs7b0NBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtvQ0FDakMsS0FBNkMsSUFBSSxDQUFDLElBQUksRUFBcEQsZ0JBQWlDLEVBQXJCLFFBQVEsY0FBQSxFQUFFLFNBQVMsZUFBQSxFQUFJLEdBQUcsU0FBQSxDQUFjO29DQUN4QyxXQUFNLGFBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUMsRUFBQTs7b0NBQXpHLEtBQWMsU0FBMkYsRUFBdkcsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO29DQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtvQ0FDeEMsSUFBSSxDQUFDLEVBQUUsRUFBRTt3Q0FDUCxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTt3Q0FDMUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO3FDQUM1Qjt5Q0FBTTt3Q0FDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtxQ0FDM0M7b0NBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBOzs7O3lCQUM3QjtpQkFDRixDQUFDLENBQUE7Ozs7S0FDSDtJQUVLLEtBQUs7Ozs7Ozt3QkFDSCxLQUF1QyxJQUFJLENBQUMsSUFBSSxFQUE5QyxVQUFVLGdCQUFBLEVBQUUsWUFBWSxrQkFBQSxFQUFFLE1BQU0sWUFBQSxDQUFjO3dCQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7d0JBQ2hCLFdBQU0sYUFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxRQUFBLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBQTs7d0JBQTVILEtBQWMsU0FBOEcsRUFBMUgsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTt3QkFDckMsSUFBSSxFQUFFLEVBQUU7NEJBQ04sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7eUJBQzNDOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsT0FBTyxFQUFFLEdBQUc7NkJBQ2IsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvbG9naW4vbG9naW4uanNcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uL3V0aWxzL2FwaVwiO1xuUGFnZSh7XG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICB1c2VySW5mbzoge30gYXMgV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8sXG4gICAgdGVsOiAnJyxcbiAgICByZWdpc3RlcmxvYWRpbmc6IGZhbHNlLFxuICAgIGxvZ2lubG9hZGluZzogZmFsc2UsXG4gICAgb3BlbmlkOiAnJyxcbiAgICBhY2NvbnRVc2VyOiAnJyxcbiAgICBhY2NvbnRQYXNzd2Q6ICcnXG4gIH0sXG4gIG9uTG9hZChvcHQpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgb3BlbmlkOiBvcHQub3BlbmlkXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICBnZXRVc2VySW5mbyhlOiB2YW50RXZlbnQpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgfSlcbiAgfSxcbiAgdGFiY2xpY2soZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiBldmVudC5kZXRhaWwudGl0bGUgfSlcbiAgfSxcbiAgLy8g6I635Y+W55So5oi35omL5py65Y+356CBXG4gIGFzeW5jIGdldHBob25lbnVtYmVyKGU6IGFueSkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfojrflj5bmiYvmnLrlj7cnIH0pXG4gICAgY29uc3QgdGVsT2JqID0gYXdhaXQgYXBpLmdldHBob25lbnVtYmVyPGFueT4oeyBvcGVuaWQ6IHRoaXMuZGF0YS5vcGVuaWQsIGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsIGl2OiBlLmRldGFpbC5pdiB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0ZWw6IHRlbE9iai5hcmcucGhvbmVOdW1iZXIvL3Jlcy5hcmcuY291bnRyeUNvZGUgKyByZXMuYXJnLnBob25lTnVtYmVyXG4gICAgfSlcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gIH0sXG4gIC8vIOazqOWGjOeUqOaIt1xuICBhc3luYyByZWdpc3RlcigpIHtcbiAgICB3eC5yZXF1ZXN0U3Vic2NyaWJlTWVzc2FnZSh7XG4gICAgICB0bXBsSWRzOiBbJ1hQTjc1UC0wRjNzbzhkRV9fZTVieFM5eHpuQ3lOR3g0VEtYMEZsLWlfYjQnLCAnOE5YNmppOEFCbE5BT0VNY1U3djJqdEQ0c2dDQjdOTUhndVd6eFpuM0hPNCddLFxuICAgICAgc3VjY2VzczogYXN5bmMgKF9yZXMpID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgcmVnaXN0ZXJsb2FkaW5nOiB0cnVlIH0pXG4gICAgICAgIGNvbnN0IHsgdXNlckluZm86IHsgbmlja05hbWUsIGF2YXRhclVybCB9LCB0ZWwgfSA9IHRoaXMuZGF0YVxuICAgICAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS5yZWdpc3RlclVzZXIoeyB1c2VyOiB0aGlzLmRhdGEub3BlbmlkLCBuYW1lOiBuaWNrTmFtZSwgYXZhbnRlcjogYXZhdGFyVXJsLCB0ZWwgfSlcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgcmVnaXN0ZXJsb2FkaW5nOiBmYWxzZSB9KVxuICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IG1zZywgaWNvbjogXCJub25lXCIgfSlcbiAgICAgICAgICB3eC5yZWRpcmVjdFRvKHsgdXJsOiBcIi9cIiB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICB9XG4gICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiBtc2cgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDnmbvlvZVcbiAgYXN5bmMgbG9naW4oKSB7XG4gICAgY29uc3QgeyBhY2NvbnRVc2VyLCBhY2NvbnRQYXNzd2QsIG9wZW5pZCB9ID0gdGhpcy5kYXRhXG4gICAgdGhpcy5zZXREYXRhKHsgbG9naW5sb2FkaW5nOiB0cnVlIH0pXG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkudXNlcmxvZ2luKHsgYXZhbnRlcjogdGhpcy5kYXRhLnVzZXJJbmZvLmF2YXRhclVybCwgb3BlbmlkLCB1c2VyOiBhY2NvbnRVc2VyLCBwYXNzd2Q6IGFjY29udFBhc3N3ZCB9KVxuICAgIHRoaXMuc2V0RGF0YSh7IGxvZ2lubG9hZGluZzogZmFsc2UgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+eZu+W9lemUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pXG4iXX0=