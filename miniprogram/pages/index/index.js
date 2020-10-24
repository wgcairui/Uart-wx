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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0Q7QUFDcEQsdUNBQWtDO0FBRWxDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUVKLElBQUksRUFBRSxFQUFnQjtRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxFQUFFO1FBQ1QsUUFBUSxFQUFFLENBQUM7S0FDWjtJQUNELE1BQU07UUFBTixpQkFVQztRQVRDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsVUFBQSxHQUFHO2dCQUVWLGFBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztvQkFDdkMsSUFBSSxHQUFHLENBQUMsRUFBRTt3QkFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7O3dCQUNuQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLDRCQUE0QixHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtnQkFDNUUsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUs7UUFBTCxpQkFXQztRQVRDLGFBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDL0IsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEIsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxLQUFLLEVBQUUsV0FBSSxFQUFFLENBQUMsR0FBRywwRkFBaUI7b0JBQ2xDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztp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aW1wb3J0IHsgT2JqZWN0VG9TdHJxdWVyeSB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCI7XG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIjtcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICAvLyBEVFXorr7lpIfkv6Hmga9cbiAgICBEVFVzOiBbXSBhcyBUZXJtaW5hbFtdLFxuICAgIHN0YXRlOiAnJyxcbiAgICBhbGFybTogJycsXG4gICAgYWxhcm1OdW06IDBcbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vIOWPkemAgee9kee7nOivt+axgu+8jOiOt+WPluWcqOe6v+i0puaIt1xuICAgICAgICBhcGkubG9naW4oeyBqc19jb2RlOiByZXMuY29kZSB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5vaykgdGhpcy5zdGFydCgpXG4gICAgICAgICAgZWxzZSB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBcIi9wYWdlcy9sb2dpbi9sb2dpbj9vcGVuaWQ9XCIgKyByZXMuYXJnLm9wZW5pZCB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOeZu+W9lei/kOihjFxuICBzdGFydCgpIHtcbiAgICAvLyDojrflj5bmnKror7vlj5bnmoRhbGFybeaVsOmHj1xuICAgIGFwaS5nZXRBbGFybXVuY29uZmlybWVkKCkudGhlbihlbCA9PiB7XG4gICAgICBpZiAoTnVtYmVyKGVsLmFyZykgPiAwKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYWxhcm06IGDmnIkke2VsLmFyZ33mnaHmnKrnoa7orqTnmoTlkYrorabkv6Hmga/vvIzngrnlh7vmn6XnnIs/YCxcbiAgICAgICAgICBhbGFybU51bTogTnVtYmVyKGVsLmFyZylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuYmluZERldigpXG4gIH0sXG4gIC8vIOiOt+WPlueUqOaIt+e7keWumuiuvuWkh1xuICBhc3luYyBiaW5kRGV2KCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfojrflj5ZEVFUnIH0pXG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0dXNlck1vdW50RGV2KClcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBEVFVzOiBhcmcuVVRzXG4gICAgICB9KVxuICAgICAgYXJnLlVUcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiBlbC5faWQsXG4gICAgICAgICAgZGF0YTogZWxcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnVXRzJyxcbiAgICAgICAgZGF0YTogYXJnLlVUc1xuICAgICAgfSlcbiAgICAgIHRoaXMuY291bnREZXYoYXJnLlVUcylcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmt7vliqDorr7lpIcnLFxuICAgICAgICBjb250ZW50OiAn5oKo6L+Y5rKh5pyJ5re75Yqg5Lu75L2V6K6+5aSH77yM6K+35YWI5re75Yqg6K6+5aSHJyxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvaW5kZXgvYmluZERldi9iaW5kRGV2JyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOaYvuekuueUqOaIt0RUVeWPguaVsFxuICBzaG93RFRVSW5mbyhldmVudDogdmFudEV2ZW50PHN0cmluZz4pIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBgL3BhZ2VzL2luZGV4L2R0dS9kdHU/aWQ9JHtldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbX1gIH0pXG4gIH0sXG4gIC8vIOafpeeci+iuvuWkh+aVsOaNrlxuICBzaG93TW91bnREZXZEYXRhKGV2ZW50OiB2YW50RXZlbnQ8VGVybWluYWxNb3VudERldnM+KSB7XG4gICAgY29uc3QgeyBwaWQsIG1vdW50RGV2LCBwcm90b2NvbCB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lml0ZW1cbiAgICBjb25zdCBpZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgIGNvbnN0IHsgRGV2TWFjIH0gPSB3eC5nZXRTdG9yYWdlU3luYyhpZCkgYXMgVGVybWluYWxcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9kZXZzL2RldnMnICsgT2JqZWN0VG9TdHJxdWVyeSh7IHBpZDogU3RyaW5nKHBpZCksIG1vdW50RGV2LCBwcm90b2NvbCwgRGV2TWFjIH0pXG4gICAgfSlcbiAgfSxcbiAgLy8g5p+l55yL5ZGK6K2mXG4gIHNlZUFsYXJtKCkge1xuICAgIHd4LnN3aXRjaFRhYih7IHVybDogJy9wYWdlcy9pbmRleC9hbGFybS9hbGFybT9udW09JyArIHRoaXMuZGF0YS5hbGFybU51bSB9KVxuICB9LFxuICAvLyDnu5/orqHmiYDmnInorr7lpIfnirbmgIFcbiAgY291bnREZXYodGVybWluYWxzOiBUZXJtaW5hbFtdKSB7XG4gICAgY29uc3QgdGVybWluYWxfYWxsID0gdGVybWluYWxzLmxlbmd0aFxuICAgIGNvbnN0IHRlcm1pbmFsX29uID0gdGVybWluYWxzLm1hcChlbCA9PiBlbC5vbmxpbmUpLmZpbHRlcihlbCA9PiBlbCkubGVuZ3RoXG4gICAgY29uc3QgbW9udXREZXZfYWxsID0gdGVybWluYWxzLm1hcChlbCA9PiBlbC5tb3VudERldnMubGVuZ3RoKS5yZWR1Y2UoKHByZSwgY3VyKSA9PiBwcmUgKyBjdXIpXG4gICAgY29uc3QgbW91bnREZXZfb24gPSB0ZXJtaW5hbHMubWFwKGVsID0+IGVsLm1vdW50RGV2cy5maWx0ZXIoZWwyID0+IGVsMi5vbmxpbmUpKS5yZWR1Y2UoKHByZSwgY3VyKSA9PiBbLi4ucHJlLCAuLi5jdXJdKS5sZW5ndGhcbiAgICAvLyBjb25zb2xlLmxvZyh7IHRlcm1pbmFsX2FsbCwgdGVybWluYWxfb24sIG1vbnV0RGV2X2FsbCwgbW91bnREZXZfb24gfSk7XG4gICAgY29uc3Qgc3RhdGUgPSBgRFRVOijlhajpg6gke3Rlcm1pbmFsX2FsbH0v5Zyo57q/JHt0ZXJtaW5hbF9vbn0pLOaMgui9veiuvuWkhzoo5YWo6YOoJHttb251dERldl9hbGx9L+WcqOe6vyR7bW91bnREZXZfb259KWBcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc3RhdGVcbiAgICB9KVxuICB9LFxuICAvL21hYz05OEQ4NjNDQzg3MEQmcGlkPTAmbW91bnREZXY9RzJLXG4gIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIGF3YWl0IHRoaXMuYmluZERldigpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG4gIC8vXG4gIGJpbmRsb2FkKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhg5YWs5LyX5Y+35Yqg6L29c3VjY2VzcyznirbmgIE6JHtldmVudC5kZXRhaWwuZXJyTXNnfWApO1xuICB9LFxuICBiaW5kZXJyb3IoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKGDlhazkvJflj7fliqDovb1lcnJvciznirbmgIE6JHtldmVudC5kZXRhaWwuZXJyTXNnfWApO1xuICB9XG59KVxuIl19