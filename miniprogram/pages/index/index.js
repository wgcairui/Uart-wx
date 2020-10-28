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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
var api_1 = require("../../utils/api");
Page({
    data: {
        DTUs: [],
        state: '',
        alarm: '',
        alarmNum: 0
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
        var _this = this;
        api_1.default.getAlarmunconfirmed().then(function (el) {
            if (Number(el.arg) > 0) {
                _this.setData({
                    alarm: "\u6709" + el.arg + "\u6761\u672A\u786E\u8BA4\u7684\u544A\u8B66\u4FE1\u606F\uFF0C\u70B9\u51FB\u67E5\u770B?",
                    alarmNum: Number(el.arg)
                });
            }
        });
        this.bindDev();
    },
    bindDev: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, arg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wx.showLoading({ title: '获取DTU' });
                        return [4, api_1.default.getuserMountDev()];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, arg = _a.arg;
                        wx.hideLoading();
                        if (ok) {
                            this.setData({
                                DTUs: arg.UTs
                            });
                            arg.UTs.forEach(function (el) {
                                wx.setStorage({
                                    key: el._id,
                                    data: el
                                });
                            });
                            wx.setStorage({
                                key: 'Uts',
                                data: arg.UTs
                            });
                            this.countDev(arg.UTs);
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
        var _a = event.currentTarget.dataset.item, pid = _a.pid, mountDev = _a.mountDev, protocol = _a.protocol;
        var id = event.currentTarget.dataset.id;
        var DevMac = wx.getStorageSync(id).DevMac;
        wx.navigateTo({
            url: '/pages/index/devs/devs' + util_1.ObjectToStrquery({ pid: String(pid), mountDev: mountDev, protocol: protocol, DevMac: DevMac })
        });
    },
    seeAlarm: function () {
        wx.switchTab({ url: '/pages/index/alarm/alarm?num=' + this.data.alarmNum });
    },
    countDev: function (terminals) {
        var terminal_all = terminals.length;
        var terminal_on = terminals.map(function (el) { return el.online; }).filter(function (el) { return el; }).length;
        var monutDev_all = terminals.map(function (el) { return el.mountDevs.length; }).reduce(function (pre, cur) { return pre + cur; });
        var mountDev_on = terminals.map(function (el) { return el.mountDevs.filter(function (el2) { return el2.online; }); }).reduce(function (pre, cur) { return __spreadArrays(pre, cur); }).length;
        var state = "DTU:(\u5168\u90E8" + terminal_all + "/\u5728\u7EBF" + terminal_on + "),\u6302\u8F7D\u8BBE\u5907:(\u5168\u90E8" + monutDev_all + "/\u5728\u7EBF" + mountDev_on + ")";
        this.setData({
            state: state
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
    },
    bindload: function (event) {
        console.log("\u516C\u4F17\u53F7\u52A0\u8F7Dsuccess,\u72B6\u6001:" + event.detail.errMsg);
    },
    binderror: function (event) {
        console.log("\u516C\u4F17\u53F7\u52A0\u8F7Derror,\u72B6\u6001:" + event.detail.errMsg);
    },
    addMonutDev: function (event) {
        var item = event.currentTarget.dataset.item;
        wx.navigateTo({
            url: '/pages/index/manageDev/addMountDev/addMountDev' + util_1.ObjectToStrquery({ item: JSON.stringify(item) }),
            events: {
                addSuccess: function () {
                    wx.nextTick(function () {
                        setTimeout(function () {
                            wx.startPullDownRefresh();
                        }, 500);
                    });
                }
            }
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0Q7QUFDcEQsdUNBQWtDO0FBRWxDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUVKLElBQUksRUFBRSxFQUFnQjtRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxFQUFFO1FBQ1QsUUFBUSxFQUFFLENBQUM7S0FDWjtJQUNELE1BQU07UUFBTixpQkFVQztRQVRDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsVUFBQSxHQUFHO2dCQUVWLGFBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztvQkFDdkMsSUFBSSxHQUFHLENBQUMsRUFBRTt3QkFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7O3dCQUNuQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLDRCQUE0QixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtnQkFDNUUsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUs7UUFBTCxpQkFXQztRQVRDLGFBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDL0IsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEIsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxLQUFLLEVBQUUsV0FBSSxFQUFFLENBQUMsR0FBRywwRkFBaUI7b0JBQ2xDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztp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O1FBQzVDLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsZ0RBQWdELEdBQUcsdUJBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3hHLE1BQU0sRUFBRTtnQkFDTixVQUFVO29CQUNSLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBQ1YsVUFBVSxDQUFDOzRCQUNULEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFBO3dCQUMzQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7b0JBQ1QsQ0FBQyxDQUFDLENBQUE7Z0JBQ0osQ0FBQzthQUNGO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG5pbXBvcnQgeyBPYmplY3RUb1N0cnF1ZXJ5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxcIjtcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uL3V0aWxzL2FwaVwiO1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIC8vIERUVeiuvuWkh+S/oeaBr1xuICAgIERUVXM6IFtdIGFzIFRlcm1pbmFsW10sXG4gICAgc3RhdGU6ICcnLFxuICAgIGFsYXJtOiAnJyxcbiAgICBhbGFybU51bTogMFxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8g5Y+R6YCB572R57uc6K+35rGC77yM6I635Y+W5Zyo57q/6LSm5oi3XG4gICAgICAgIGFwaS5sb2dpbih7IGpzX2NvZGU6IHJlcy5jb2RlIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLm9rKSB0aGlzLnN0YXJ0KClcbiAgICAgICAgICBlbHNlIHd4Lm5hdmlnYXRlVG8oeyB1cmw6IFwiL3BhZ2VzL2xvZ2luL2xvZ2luP29wZW5pZD1cIiArIHJlcy5hcmcub3BlbmlkIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g55m75b2V6L+Q6KGMXG4gIHN0YXJ0KCkge1xuICAgIC8vIOiOt+WPluacquivu+WPlueahGFsYXJt5pWw6YePXG4gICAgYXBpLmdldEFsYXJtdW5jb25maXJtZWQoKS50aGVuKGVsID0+IHtcbiAgICAgIGlmIChOdW1iZXIoZWwuYXJnKSA+IDApIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBhbGFybTogYOaciSR7ZWwuYXJnfeadoeacquehruiupOeahOWRiuitpuS/oeaBr++8jOeCueWHu+afpeeciz9gLFxuICAgICAgICAgIGFsYXJtTnVtOiBOdW1iZXIoZWwuYXJnKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5iaW5kRGV2KClcbiAgfSxcbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGFzeW5jIGJpbmREZXYoKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+iOt+WPlkRUVScgfSlcbiAgICBjb25zdCB7IG9rLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXR1c2VyTW91bnREZXYoKVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIERUVXM6IGFyZy5VVHNcbiAgICAgIH0pXG4gICAgICBhcmcuVVRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6IGVsLl9pZCxcbiAgICAgICAgICBkYXRhOiBlbFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdVdHMnLFxuICAgICAgICBkYXRhOiBhcmcuVVRzXG4gICAgICB9KVxuICAgICAgdGhpcy5jb3VudERldihhcmcuVVRzKVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+a3u+WKoOiuvuWkhycsXG4gICAgICAgIGNvbnRlbnQ6ICfmgqjov5jmsqHmnInmt7vliqDku7vkvZXorr7lpIfvvIzor7flhYjmt7vliqDorr7lpIcnLFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9pbmRleC9iaW5kRGV2L2JpbmREZXYnIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g5pi+56S655So5oi3RFRV5Y+C5pWwXG4gIHNob3dEVFVJbmZvKGV2ZW50OiB2YW50RXZlbnQ8c3RyaW5nPikge1xuICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6IGAvcGFnZXMvaW5kZXgvZHR1L2R0dT9pZD0ke2V2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtfWAgfSlcbiAgfSxcbiAgLy8g5p+l55yL6K6+5aSH5pWw5o2uXG4gIHNob3dNb3VudERldkRhdGEoZXZlbnQ6IHZhbnRFdmVudDxUZXJtaW5hbE1vdW50RGV2cz4pIHtcbiAgICBjb25zdCB7IHBpZCwgbW91bnREZXYsIHByb3RvY29sIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIGNvbnN0IGlkID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgY29uc3QgeyBEZXZNYWMgfSA9IHd4LmdldFN0b3JhZ2VTeW5jKGlkKSBhcyBUZXJtaW5hbFxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2RldnMvZGV2cycgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgcGlkOiBTdHJpbmcocGlkKSwgbW91bnREZXYsIHByb3RvY29sLCBEZXZNYWMgfSlcbiAgICB9KVxuICB9LFxuICAvLyDmn6XnnIvlkYroraZcbiAgc2VlQWxhcm0oKSB7XG4gICAgd3guc3dpdGNoVGFiKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtL2FsYXJtP251bT0nICsgdGhpcy5kYXRhLmFsYXJtTnVtIH0pXG4gIH0sXG4gIC8vIOe7n+iuoeaJgOacieiuvuWkh+eKtuaAgVxuICBjb3VudERldih0ZXJtaW5hbHM6IFRlcm1pbmFsW10pIHtcbiAgICBjb25zdCB0ZXJtaW5hbF9hbGwgPSB0ZXJtaW5hbHMubGVuZ3RoXG4gICAgY29uc3QgdGVybWluYWxfb24gPSB0ZXJtaW5hbHMubWFwKGVsID0+IGVsLm9ubGluZSkuZmlsdGVyKGVsID0+IGVsKS5sZW5ndGhcbiAgICBjb25zdCBtb251dERldl9hbGwgPSB0ZXJtaW5hbHMubWFwKGVsID0+IGVsLm1vdW50RGV2cy5sZW5ndGgpLnJlZHVjZSgocHJlLCBjdXIpID0+IHByZSArIGN1cilcbiAgICBjb25zdCBtb3VudERldl9vbiA9IHRlcm1pbmFscy5tYXAoZWwgPT4gZWwubW91bnREZXZzLmZpbHRlcihlbDIgPT4gZWwyLm9ubGluZSkpLnJlZHVjZSgocHJlLCBjdXIpID0+IFsuLi5wcmUsIC4uLmN1cl0pLmxlbmd0aFxuICAgIC8vIGNvbnNvbGUubG9nKHsgdGVybWluYWxfYWxsLCB0ZXJtaW5hbF9vbiwgbW9udXREZXZfYWxsLCBtb3VudERldl9vbiB9KTtcbiAgICBjb25zdCBzdGF0ZSA9IGBEVFU6KOWFqOmDqCR7dGVybWluYWxfYWxsfS/lnKjnur8ke3Rlcm1pbmFsX29ufSks5oyC6L296K6+5aSHOijlhajpg6gke21vbnV0RGV2X2FsbH0v5Zyo57q/JHttb3VudERldl9vbn0pYFxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzdGF0ZVxuICAgIH0pXG4gIH0sXG4gIC8vbWFjPTk4RDg2M0NDODcwRCZwaWQ9MCZtb3VudERldj1HMktcbiAgYXN5bmMgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgYXdhaXQgdGhpcy5iaW5kRGV2KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcbiAgLy9cbiAgYmluZGxvYWQoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKGDlhazkvJflj7fliqDovb1zdWNjZXNzLOeKtuaAgToke2V2ZW50LmRldGFpbC5lcnJNc2d9YCk7XG4gIH0sXG4gIGJpbmRlcnJvcihldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYOWFrOS8l+WPt+WKoOi9vWVycm9yLOeKtuaAgToke2V2ZW50LmRldGFpbC5lcnJNc2d9YCk7XG4gIH0sXG4gIC8vIOa3u+WKoOe7keWumuiuvuWkh1xuICBhZGRNb251dERldihldmVudDogdmFudEV2ZW50PFRlcm1pbmFsPikge1xuICAgIGNvbnN0IHsgaXRlbSB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvbWFuYWdlRGV2L2FkZE1vdW50RGV2L2FkZE1vdW50RGV2JyArIE9iamVjdFRvU3RycXVlcnkoeyBpdGVtOiBKU09OLnN0cmluZ2lmeShpdGVtKSB9KSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBhZGRTdWNjZXNzKCkge1xuICAgICAgICAgIHd4Lm5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB3eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG59KVxuIl19