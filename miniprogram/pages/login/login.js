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
        img: "https://www.ladishb.com/upload/5y2wYWklE0usgYG0VwLTdRnc.png",
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
                                        wx.showToast({ title: msg, icon: "none", duration: 5000 });
                                    }
                                    else {
                                        wx.reLaunch({ url: '/pages/index/index' });
                                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFrQztBQUNsQyxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUMsNkRBQTZEO1FBQ2pFLFFBQVEsRUFBRSxFQUFnQztRQUMxQyxHQUFHLEVBQUUsRUFBRTtRQUNQLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLFlBQVksRUFBRSxLQUFLO1FBQ25CLE1BQU0sRUFBRSxFQUFFO1FBQ1YsVUFBVSxFQUFFLEVBQUU7UUFDZCxZQUFZLEVBQUUsRUFBRTtLQUNqQjtJQUNELE1BQU0sWUFBQyxHQUFHO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDO0lBTUQsV0FBVyxFQUFYLFVBQVksQ0FBWTtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUTtTQUM1QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsUUFBUSxFQUFSLFVBQVMsS0FBZ0I7UUFDdkIsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRUssY0FBYyxFQUFwQixVQUFxQixDQUFZOzs7Ozs7d0JBQy9CLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTt3QkFDbkIsV0FBTSxhQUFHLENBQUMsY0FBYyxDQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFBOzt3QkFBNUgsTUFBTSxHQUFHLFNBQW1IO3dCQUNsSSxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVc7eUJBQzVCLENBQUMsQ0FBQTt3QkFDRixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Ozs7O0tBQ2pCO0lBRUssUUFBUTs7OztnQkFDWixFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBRXpCLE9BQU8sRUFBRSxDQUFDLDZDQUE2QyxFQUFFLDZDQUE2QyxDQUFDO29CQUN2RyxPQUFPLEVBQUUsVUFBTyxJQUFJOzs7OztvQ0FDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO29DQUNqQyxLQUE2QyxJQUFJLENBQUMsSUFBSSxFQUFwRCxnQkFBaUMsRUFBckIsUUFBUSxjQUFBLEVBQUUsU0FBUyxlQUFBLEVBQUksR0FBRyxTQUFBLENBQWM7b0NBQ3hDLFdBQU0sYUFBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQyxFQUFBOztvQ0FBekcsS0FBYyxTQUEyRixFQUF2RyxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7b0NBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO29DQUN4QyxJQUFJLENBQUMsRUFBRSxFQUFFO3dDQUNQLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7cUNBRTNEO3lDQUFNO3dDQUNMLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3FDQUMzQzs7Ozt5QkFDRjtpQkFDRixDQUFDLENBQUE7Ozs7S0FDSDtJQUVLLEtBQUs7Ozs7Ozt3QkFDSCxLQUF1QyxJQUFJLENBQUMsSUFBSSxFQUE5QyxVQUFVLGdCQUFBLEVBQUUsWUFBWSxrQkFBQSxFQUFFLE1BQU0sWUFBQSxDQUFjO3dCQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7d0JBQ2hCLFdBQU0sYUFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxRQUFBLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBQTs7d0JBQTVILEtBQWMsU0FBOEcsRUFBMUgsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTt3QkFDckMsSUFBSSxFQUFFLEVBQUU7NEJBQ04sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7eUJBQzNDOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsT0FBTyxFQUFFLEdBQUc7NkJBQ2IsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvbG9naW4vbG9naW4uanNcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uL3V0aWxzL2FwaVwiO1xuUGFnZSh7XG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBpbWc6XCJodHRwczovL3d3dy5sYWRpc2hiLmNvbS91cGxvYWQvNXkyd1lXa2xFMHVzZ1lHMFZ3TFRkUm5jLnBuZ1wiLFxuICAgIHVzZXJJbmZvOiB7fSBhcyBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbyxcbiAgICB0ZWw6ICcnLFxuICAgIHJlZ2lzdGVybG9hZGluZzogZmFsc2UsXG4gICAgbG9naW5sb2FkaW5nOiBmYWxzZSxcbiAgICBvcGVuaWQ6ICcnLFxuICAgIGFjY29udFVzZXI6ICcnLFxuICAgIGFjY29udFBhc3N3ZDogJydcbiAgfSxcbiAgb25Mb2FkKG9wdCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBvcGVuaWQ6IG9wdC5vcGVuaWRcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gIGdldFVzZXJJbmZvKGU6IHZhbnRFdmVudCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm9cbiAgICB9KVxuICB9LFxuICB0YWJjbGljayhldmVudDogdmFudEV2ZW50KSB7XG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6IGV2ZW50LmRldGFpbC50aXRsZSB9KVxuICB9LFxuICAvLyDojrflj5bnlKjmiLfmiYvmnLrlj7fnoIFcbiAgYXN5bmMgZ2V0cGhvbmVudW1iZXIoZTogdmFudEV2ZW50KSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+iOt+WPluaJi+acuuWPtycgfSlcbiAgICBjb25zdCB0ZWxPYmogPSBhd2FpdCBhcGkuZ2V0cGhvbmVudW1iZXI8YW55Pih7IG9wZW5pZDogdGhpcy5kYXRhLm9wZW5pZCwgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSwgaXY6IGUuZGV0YWlsLml2IH0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRlbDogdGVsT2JqLmFyZy5waG9uZU51bWJlci8vcmVzLmFyZy5jb3VudHJ5Q29kZSArIHJlcy5hcmcucGhvbmVOdW1iZXJcbiAgICB9KVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfSxcbiAgLy8g5rOo5YaM55So5oi3XG4gIGFzeW5jIHJlZ2lzdGVyKCkge1xuICAgIHd4LnJlcXVlc3RTdWJzY3JpYmVNZXNzYWdlKHtcbiAgICAgIC8vIOiuoumYhea2iOaBr2lkXG4gICAgICB0bXBsSWRzOiBbJ1hQTjc1UC0wRjNzbzhkRV9fZTVieFM5eHpuQ3lOR3g0VEtYMEZsLWlfYjQnLCAnOE5YNmppOEFCbE5BT0VNY1U3djJqdEQ0c2dDQjdOTUhndVd6eFpuM0hPNCddLFxuICAgICAgc3VjY2VzczogYXN5bmMgKF9yZXMpID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgcmVnaXN0ZXJsb2FkaW5nOiB0cnVlIH0pXG4gICAgICAgIGNvbnN0IHsgdXNlckluZm86IHsgbmlja05hbWUsIGF2YXRhclVybCB9LCB0ZWwgfSA9IHRoaXMuZGF0YVxuICAgICAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS5yZWdpc3RlclVzZXIoeyB1c2VyOiB0aGlzLmRhdGEub3BlbmlkLCBuYW1lOiBuaWNrTmFtZSwgYXZhbnRlcjogYXZhdGFyVXJsLCB0ZWwgfSlcbiAgICAgICAgdGhpcy5zZXREYXRhKHsgcmVnaXN0ZXJsb2FkaW5nOiBmYWxzZSB9KVxuICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IG1zZywgaWNvbjogXCJub25lXCIsIGR1cmF0aW9uOiA1MDAwIH0pXG4gICAgICAgICAgLy8gd3gucmVkaXJlY3RUbyh7IHVybDogXCIvXCIgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOeZu+W9lVxuICBhc3luYyBsb2dpbigpIHtcbiAgICBjb25zdCB7IGFjY29udFVzZXIsIGFjY29udFBhc3N3ZCwgb3BlbmlkIH0gPSB0aGlzLmRhdGFcbiAgICB0aGlzLnNldERhdGEoeyBsb2dpbmxvYWRpbmc6IHRydWUgfSlcbiAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS51c2VybG9naW4oeyBhdmFudGVyOiB0aGlzLmRhdGEudXNlckluZm8uYXZhdGFyVXJsLCBvcGVuaWQsIHVzZXI6IGFjY29udFVzZXIsIHBhc3N3ZDogYWNjb250UGFzc3dkIH0pXG4gICAgdGhpcy5zZXREYXRhKHsgbG9naW5sb2FkaW5nOiBmYWxzZSB9KVxuICAgIGlmIChvaykge1xuICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn55m75b2V6ZSZ6K+vJyxcbiAgICAgICAgY29udGVudDogbXNnXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcbiJdfQ==