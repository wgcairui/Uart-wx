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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFrQztBQUNsQyxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsRUFBZ0M7UUFDMUMsR0FBRyxFQUFFLEVBQUU7UUFDUCxlQUFlLEVBQUUsS0FBSztRQUN0QixZQUFZLEVBQUUsS0FBSztRQUNuQixNQUFNLEVBQUUsRUFBRTtRQUNWLFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFLEVBQUU7S0FDakI7SUFDRCxNQUFNLFlBQUMsR0FBRztRQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQU1ELFdBQVcsRUFBWCxVQUFZLENBQVk7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7U0FDNUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFFBQVEsRUFBUixVQUFTLEtBQWdCO1FBQ3ZCLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVLLGNBQWMsRUFBcEIsVUFBcUIsQ0FBWTs7Ozs7O3dCQUMvQixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7d0JBQ25CLFdBQU0sYUFBRyxDQUFDLGNBQWMsQ0FBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBQTs7d0JBQTVILE1BQU0sR0FBRyxTQUFtSDt3QkFDbEksSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXO3lCQUM1QixDQUFDLENBQUE7d0JBQ0YsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7OztLQUNqQjtJQUVLLFFBQVE7Ozs7Z0JBQ1osRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUV6QixPQUFPLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSw2Q0FBNkMsQ0FBQztvQkFDdkcsT0FBTyxFQUFFLFVBQU8sSUFBSTs7Ozs7b0NBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtvQ0FDakMsS0FBNkMsSUFBSSxDQUFDLElBQUksRUFBcEQsZ0JBQWlDLEVBQXJCLFFBQVEsY0FBQSxFQUFFLFNBQVMsZUFBQSxFQUFJLEdBQUcsU0FBQSxDQUFjO29DQUN4QyxXQUFNLGFBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUMsRUFBQTs7b0NBQXpHLEtBQWMsU0FBMkYsRUFBdkcsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO29DQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtvQ0FDeEMsSUFBSSxDQUFDLEVBQUUsRUFBRTt3Q0FDUCxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO3FDQUUzRDt5Q0FBTTt3Q0FDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtxQ0FDM0M7Ozs7eUJBQ0Y7aUJBQ0YsQ0FBQyxDQUFBOzs7O0tBQ0g7SUFFSyxLQUFLOzs7Ozs7d0JBQ0gsS0FBdUMsSUFBSSxDQUFDLElBQUksRUFBOUMsVUFBVSxnQkFBQSxFQUFFLFlBQVksa0JBQUEsRUFBRSxNQUFNLFlBQUEsQ0FBYzt3QkFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO3dCQUNoQixXQUFNLGFBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sUUFBQSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUE7O3dCQUE1SCxLQUFjLFNBQThHLEVBQTFILEVBQUUsUUFBQSxFQUFFLEdBQUcsU0FBQTt3QkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7d0JBQ3JDLElBQUksRUFBRSxFQUFFOzRCQUNOLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3lCQUMzQzs2QkFBTTs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxNQUFNO2dDQUNiLE9BQU8sRUFBRSxHQUFHOzZCQUNiLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2xvZ2luL2xvZ2luLmpzXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIjtcblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgdXNlckluZm86IHt9IGFzIFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvLFxuICAgIHRlbDogJycsXG4gICAgcmVnaXN0ZXJsb2FkaW5nOiBmYWxzZSxcbiAgICBsb2dpbmxvYWRpbmc6IGZhbHNlLFxuICAgIG9wZW5pZDogJycsXG4gICAgYWNjb250VXNlcjogJycsXG4gICAgYWNjb250UGFzc3dkOiAnJ1xuICB9LFxuICBvbkxvYWQob3B0KSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG9wZW5pZDogb3B0Lm9wZW5pZFxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgZ2V0VXNlckluZm8oZTogdmFudEV2ZW50KSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mb1xuICAgIH0pXG4gIH0sXG4gIHRhYmNsaWNrKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZTogZXZlbnQuZGV0YWlsLnRpdGxlIH0pXG4gIH0sXG4gIC8vIOiOt+WPlueUqOaIt+aJi+acuuWPt+eggVxuICBhc3luYyBnZXRwaG9uZW51bWJlcihlOiB2YW50RXZlbnQpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn6I635Y+W5omL5py65Y+3JyB9KVxuICAgIGNvbnN0IHRlbE9iaiA9IGF3YWl0IGFwaS5nZXRwaG9uZW51bWJlcjxhbnk+KHsgb3BlbmlkOiB0aGlzLmRhdGEub3BlbmlkLCBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLCBpdjogZS5kZXRhaWwuaXYgfSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdGVsOiB0ZWxPYmouYXJnLnBob25lTnVtYmVyLy9yZXMuYXJnLmNvdW50cnlDb2RlICsgcmVzLmFyZy5waG9uZU51bWJlclxuICAgIH0pXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICB9LFxuICAvLyDms6jlhoznlKjmiLdcbiAgYXN5bmMgcmVnaXN0ZXIoKSB7XG4gICAgd3gucmVxdWVzdFN1YnNjcmliZU1lc3NhZ2Uoe1xuICAgICAgLy8g6K6i6ZiF5raI5oGvaWRcbiAgICAgIHRtcGxJZHM6IFsnWFBONzVQLTBGM3NvOGRFX19lNWJ4Uzl4em5DeU5HeDRUS1gwRmwtaV9iNCcsICc4Tlg2amk4QUJsTkFPRU1jVTd2Mmp0RDRzZ0NCN05NSGd1V3p4Wm4zSE80J10sXG4gICAgICBzdWNjZXNzOiBhc3luYyAoX3JlcykgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoeyByZWdpc3RlcmxvYWRpbmc6IHRydWUgfSlcbiAgICAgICAgY29uc3QgeyB1c2VySW5mbzogeyBuaWNrTmFtZSwgYXZhdGFyVXJsIH0sIHRlbCB9ID0gdGhpcy5kYXRhXG4gICAgICAgIGNvbnN0IHsgb2ssIG1zZyB9ID0gYXdhaXQgYXBpLnJlZ2lzdGVyVXNlcih7IHVzZXI6IHRoaXMuZGF0YS5vcGVuaWQsIG5hbWU6IG5pY2tOYW1lLCBhdmFudGVyOiBhdmF0YXJVcmwsIHRlbCB9KVxuICAgICAgICB0aGlzLnNldERhdGEoeyByZWdpc3RlcmxvYWRpbmc6IGZhbHNlIH0pXG4gICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogbXNnLCBpY29uOiBcIm5vbmVcIiwgZHVyYXRpb246IDUwMDAgfSlcbiAgICAgICAgICAvLyB3eC5yZWRpcmVjdFRvKHsgdXJsOiBcIi9cIiB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g55m75b2VXG4gIGFzeW5jIGxvZ2luKCkge1xuICAgIGNvbnN0IHsgYWNjb250VXNlciwgYWNjb250UGFzc3dkLCBvcGVuaWQgfSA9IHRoaXMuZGF0YVxuICAgIHRoaXMuc2V0RGF0YSh7IGxvZ2lubG9hZGluZzogdHJ1ZSB9KVxuICAgIGNvbnN0IHsgb2ssIG1zZyB9ID0gYXdhaXQgYXBpLnVzZXJsb2dpbih7IGF2YW50ZXI6IHRoaXMuZGF0YS51c2VySW5mby5hdmF0YXJVcmwsIG9wZW5pZCwgdXNlcjogYWNjb250VXNlciwgcGFzc3dkOiBhY2NvbnRQYXNzd2QgfSlcbiAgICB0aGlzLnNldERhdGEoeyBsb2dpbmxvYWRpbmc6IGZhbHNlIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfnmbvlvZXplJnor68nLFxuICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuIl19