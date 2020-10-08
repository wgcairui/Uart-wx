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
var globalData = getApp().globalData;
Page({
    data: {
        DTUs: []
    },
    onLoad: function () {
        var _this = this;
        wx.login({
            success: function (res) {
                {
                    api_1.default.login({ js_code: res.code }).then(function (res) {
                        if (res.ok) {
                            globalData.user = res.arg.user;
                            globalData.userGroup = res.arg.userGroup;
                            globalData.userAvanter = res.arg.avanter;
                            globalData.userName = res.arg.name;
                            globalData.userTel = res.arg.tel;
                            _this.bindDev();
                            wx.navigateTo({
                                url: "/pages/index/user/user"
                            });
                        }
                        else {
                            wx.navigateTo({ url: "/pages/login/login?openid=" + res.arg.openid });
                        }
                    });
                }
            }
        });
    },
    bindDev: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, arg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, api_1.default.getuserMountDev()];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, arg = _a.arg;
                        if (ok) {
                            this.setData({
                                DTUs: arg.UTs
                            });
                            this.data.DTUs.forEach(function (el) {
                                wx.setStorage({
                                    key: el._id,
                                    data: el
                                });
                            });
                        }
                        else {
                            wx.showModal({
                                title: '添加设备',
                                content: '您还没有添加任何设备，请先添加设备',
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.navigateTo({ url: '/pages/index/bindDev/bindDev' });
                                    }
                                }
                            });
                        }
                        return [2];
                }
            });
        });
    },
    showDTUInfo: function (event) {
        var dtus = this.data.DTUs;
        var index = dtus.findIndex(function (el) { return el._id === event.target.id; });
        var dtu = dtus[index];
        wx.navigateTo({ url: "/pages/index/dtu/dtu?id=" + dtu._id });
    },
    showMountDevData: function (event) {
        var _a = event.target.id.split("-"), id = _a[0], pid = _a[1], mountDev = _a[2];
        var DevMac = wx.getStorageSync(id).DevMac;
        wx.navigateTo({
            url: '/pages/index/devs/devs?mac=' + DevMac + '&pid=' + pid + '&mountDev=' + mountDev
        });
    },
    onPullDownRefresh: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.bindDev()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFrQztBQUUxQixJQUFBLFVBQVUsR0FBSyxNQUFNLEVBQWMsV0FBekIsQ0FBeUI7QUFDM0MsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBRUosSUFBSSxFQUFFLEVBQWdCO0tBQ3ZCO0lBQ0QsTUFBTTtRQUFOLGlCQXVCQztRQXRCQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFFLFVBQUEsR0FBRztnQkFFVjtvQkFDRSxhQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7d0JBQ3ZDLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTs0QkFDVixVQUFVLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBOzRCQUM5QixVQUFVLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFBOzRCQUN4QyxVQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFBOzRCQUN4QyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBOzRCQUNsQyxVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFBOzRCQUNoQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7NEJBQ2QsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQ0FDWixHQUFHLEVBQUMsd0JBQXdCOzZCQUM3QixDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw0QkFBNEIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7eUJBQ3RFO29CQUNILENBQUMsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxPQUFPOzs7Ozs0QkFDUyxXQUFNLGFBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQXpDLEtBQWMsU0FBMkIsRUFBdkMsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHOzZCQUNkLENBQUMsQ0FBQTs0QkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2dDQUN2QixFQUFFLENBQUMsVUFBVSxDQUFDO29DQUNaLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztvQ0FDWCxJQUFJLEVBQUUsRUFBRTtpQ0FDVCxDQUFDLENBQUE7NEJBQ0osQ0FBQyxDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsbUJBQW1CO2dDQUM1QixPQUFPLFlBQUMsR0FBRztvQ0FDVCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0NBQ2YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw4QkFBOEIsRUFBRSxDQUFDLENBQUE7cUNBQ3ZEO2dDQUNILENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBRUQsV0FBVyxFQUFYLFVBQVksS0FBZ0I7UUFDMUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDM0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQTFCLENBQTBCLENBQUMsQ0FBQTtRQUM5RCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw2QkFBMkIsR0FBRyxDQUFDLEdBQUssRUFBRSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUVELGdCQUFnQixFQUFoQixVQUFpQixLQUFnQjtRQUN6QixJQUFBLEtBQXNCLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBL0MsRUFBRSxRQUFBLEVBQUUsR0FBRyxRQUFBLEVBQUUsUUFBUSxRQUE4QixDQUFBO1FBQzlDLElBQUEsTUFBTSxHQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFhLE9BQXRDLENBQXNDO1FBQ3BELEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsNkJBQTZCLEdBQUcsTUFBTSxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsWUFBWSxHQUFHLFFBQVE7U0FDdEYsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVLLGlCQUFpQjs7Ozs0QkFDckIsV0FBTSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUE7O3dCQUFwQixTQUFvQixDQUFBO3dCQUNwQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCI7XG4vLyDojrflj5blupTnlKjlrp7kvotcbmNvbnN0IHsgZ2xvYmFsRGF0YSB9ID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgLy8gRFRV6K6+5aSH5L+h5oGvXG4gICAgRFRVczogW10gYXMgVGVybWluYWxbXVxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8g5Y+R6YCB572R57uc6K+35rGC77yM6I635Y+W5Zyo57q/6LSm5oi3XG4gICAgICAgIHtcbiAgICAgICAgICBhcGkubG9naW4oeyBqc19jb2RlOiByZXMuY29kZSB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgIGdsb2JhbERhdGEudXNlciA9IHJlcy5hcmcudXNlclxuICAgICAgICAgICAgICBnbG9iYWxEYXRhLnVzZXJHcm91cCA9IHJlcy5hcmcudXNlckdyb3VwXG4gICAgICAgICAgICAgIGdsb2JhbERhdGEudXNlckF2YW50ZXIgPSByZXMuYXJnLmF2YW50ZXJcbiAgICAgICAgICAgICAgZ2xvYmFsRGF0YS51c2VyTmFtZSA9IHJlcy5hcmcubmFtZVxuICAgICAgICAgICAgICBnbG9iYWxEYXRhLnVzZXJUZWwgPSByZXMuYXJnLnRlbFxuICAgICAgICAgICAgICB0aGlzLmJpbmREZXYoKVxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6XCIvcGFnZXMvaW5kZXgvdXNlci91c2VyXCJcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6IFwiL3BhZ2VzL2xvZ2luL2xvZ2luP29wZW5pZD1cIiArIHJlcy5hcmcub3BlbmlkIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOiOt+WPlueUqOaIt+e7keWumuiuvuWkh1xuICBhc3luYyBiaW5kRGV2KCkge1xuICAgIGNvbnN0IHsgb2ssIGFyZyB9ID0gYXdhaXQgYXBpLmdldHVzZXJNb3VudERldigpXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBEVFVzOiBhcmcuVVRzXG4gICAgICB9KVxuICAgICAgdGhpcy5kYXRhLkRUVXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTogZWwuX2lkLFxuICAgICAgICAgIGRhdGE6IGVsXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+a3u+WKoOiuvuWkhycsXG4gICAgICAgIGNvbnRlbnQ6ICfmgqjov5jmsqHmnInmt7vliqDku7vkvZXorr7lpIfvvIzor7flhYjmt7vliqDorr7lpIcnLFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9pbmRleC9iaW5kRGV2L2JpbmREZXYnIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g5pi+56S655So5oi3RFRV5Y+C5pWwXG4gIHNob3dEVFVJbmZvKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBkdHVzID0gdGhpcy5kYXRhLkRUVXNcbiAgICBjb25zdCBpbmRleCA9IGR0dXMuZmluZEluZGV4KGVsID0+IGVsLl9pZCA9PT0gZXZlbnQudGFyZ2V0LmlkKVxuICAgIGNvbnN0IGR0dSA9IGR0dXNbaW5kZXhdXG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogYC9wYWdlcy9pbmRleC9kdHUvZHR1P2lkPSR7ZHR1Ll9pZH1gIH0pXG4gIH0sXG4gIC8vIOafpeeci+iuvuWkh+aVsOaNrlxuICBzaG93TW91bnREZXZEYXRhKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBbaWQsIHBpZCwgbW91bnREZXZdID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVxuICAgIGNvbnN0IHsgRGV2TWFjIH0gPSB3eC5nZXRTdG9yYWdlU3luYyhpZCkgYXMgVGVybWluYWxcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9kZXZzL2RldnM/bWFjPScgKyBEZXZNYWMgKyAnJnBpZD0nICsgcGlkICsgJyZtb3VudERldj0nICsgbW91bnREZXZcbiAgICB9KVxuICB9LFxuICAvL1xuICBhc3luYyBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICBhd2FpdCB0aGlzLmJpbmREZXYoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9XG59KVxuIl19