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
        DTUs: []
    },
    onLoad: function () {
        var _this = this;
        wx.login({
            success: function (res) {
                api_1.default.login({ js_code: res.code }).then(function (res) {
                    if (res.ok)
                        _this.start();
                    else
                        wx.navigateTo({ url: "/pages/login/login?openid=" + res.arg.openid });
                });
            }
        });
    },
    start: function () {
        api_1.default.getAlarmunconfirmed();
        this.bindDev();
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
        wx.navigateTo({ url: "/pages/index/dtu/dtu?id=" + event.currentTarget.dataset.item });
    },
    showMountDevData: function (event) {
        var _a = event.currentTarget.dataset.item, pid = _a.pid, mountDev = _a.mountDev;
        var id = event.currentTarget.dataset.id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFrQztBQUVsQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFFSixJQUFJLEVBQUUsRUFBZ0I7S0FDdkI7SUFDRCxNQUFNO1FBQU4saUJBVUM7UUFUQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFFLFVBQUEsR0FBRztnQkFFVixhQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7b0JBQ3ZDLElBQUksR0FBRyxDQUFDLEVBQUU7d0JBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFBOzt3QkFDbkIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw0QkFBNEIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7Z0JBQzVFLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLO1FBRUgsYUFBRyxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFSyxPQUFPOzs7Ozs0QkFDUyxXQUFNLGFBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQXpDLEtBQWMsU0FBMkIsRUFBdkMsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHOzZCQUNkLENBQUMsQ0FBQTs0QkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2dDQUN2QixFQUFFLENBQUMsVUFBVSxDQUFDO29DQUNaLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztvQ0FDWCxJQUFJLEVBQUUsRUFBRTtpQ0FDVCxDQUFDLENBQUE7NEJBQ0osQ0FBQyxDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsbUJBQW1CO2dDQUM1QixPQUFPLFlBQUMsR0FBRztvQ0FDVCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0NBQ2YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw4QkFBOEIsRUFBRSxDQUFDLENBQUE7cUNBQ3ZEO2dDQUNILENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBRUQsV0FBVyxFQUFYLFVBQVksS0FBd0I7UUFDbEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw2QkFBMkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBTSxFQUFFLENBQUMsQ0FBQTtJQUN2RixDQUFDO0lBRUQsZ0JBQWdCLEVBQWhCLFVBQWlCLEtBQW1DO1FBQzVDLElBQUEscUNBQW9ELEVBQWxELFlBQUcsRUFBRSxzQkFBNkMsQ0FBQTtRQUMxRCxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUE7UUFDakMsSUFBQSxxQ0FBTSxDQUFzQztRQUNwRCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLDZCQUE2QixHQUFHLE1BQU0sR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFlBQVksR0FBRyxRQUFRO1NBQ3RGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxpQkFBaUI7Ozs7NEJBQ3JCLFdBQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBcEIsU0FBb0IsQ0FBQTt3QkFDcEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uL3V0aWxzL2FwaVwiO1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIC8vIERUVeiuvuWkh+S/oeaBr1xuICAgIERUVXM6IFtdIGFzIFRlcm1pbmFsW11cbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vIOWPkemAgee9kee7nOivt+axgu+8jOiOt+WPluWcqOe6v+i0puaIt1xuICAgICAgICBhcGkubG9naW4oeyBqc19jb2RlOiByZXMuY29kZSB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5vaykgdGhpcy5zdGFydCgpXG4gICAgICAgICAgZWxzZSB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBcIi9wYWdlcy9sb2dpbi9sb2dpbj9vcGVuaWQ9XCIgKyByZXMuYXJnLm9wZW5pZCB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOeZu+W9lei/kOihjFxuICBzdGFydCgpIHtcbiAgICAvLyDojrflj5bmnKror7vlj5bnmoRhbGFybeaVsOmHj1xuICAgIGFwaS5nZXRBbGFybXVuY29uZmlybWVkKClcbiAgICB0aGlzLmJpbmREZXYoKVxuICB9LFxuICAvLyDojrflj5bnlKjmiLfnu5Hlrprorr7lpIdcbiAgYXN5bmMgYmluZERldigpIHtcbiAgICBjb25zdCB7IG9rLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXR1c2VyTW91bnREZXYoKVxuICAgIGlmIChvaykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgRFRVczogYXJnLlVUc1xuICAgICAgfSlcbiAgICAgIHRoaXMuZGF0YS5EVFVzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6IGVsLl9pZCxcbiAgICAgICAgICBkYXRhOiBlbFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmt7vliqDorr7lpIcnLFxuICAgICAgICBjb250ZW50OiAn5oKo6L+Y5rKh5pyJ5re75Yqg5Lu75L2V6K6+5aSH77yM6K+35YWI5re75Yqg6K6+5aSHJyxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvaW5kZXgvYmluZERldi9iaW5kRGV2JyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOaYvuekuueUqOaIt0RUVeWPguaVsFxuICBzaG93RFRVSW5mbyhldmVudDogdmFudEV2ZW50PHN0cmluZz4pIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBgL3BhZ2VzL2luZGV4L2R0dS9kdHU/aWQ9JHtldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbX1gIH0pXG4gIH0sXG4gIC8vIOafpeeci+iuvuWkh+aVsOaNrlxuICBzaG93TW91bnREZXZEYXRhKGV2ZW50OiB2YW50RXZlbnQ8VGVybWluYWxNb3VudERldnM+KSB7XG4gICAgY29uc3QgeyBwaWQsIG1vdW50RGV2IH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIGNvbnN0IGlkID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgY29uc3QgeyBEZXZNYWMgfSA9IHd4LmdldFN0b3JhZ2VTeW5jKGlkKSBhcyBUZXJtaW5hbFxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2RldnMvZGV2cz9tYWM9JyArIERldk1hYyArICcmcGlkPScgKyBwaWQgKyAnJm1vdW50RGV2PScgKyBtb3VudERldlxuICAgIH0pXG4gIH0sXG4gIC8vXG4gIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIGF3YWl0IHRoaXMuYmluZERldigpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH1cbn0pXG4iXX0=