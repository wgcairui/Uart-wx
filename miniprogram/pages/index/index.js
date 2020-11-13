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
        alarmNum: 0,
        Vm: []
    },
    onLoad: function () {
        var _this = this;
        wx.login({
            success: function (res) {
                api_1.default.login({ js_code: res.code }).then(function (res) {
                    if (res.ok) {
                        console.log("userGroup:" + res.arg.userGroup);
                        switch (res.arg.userGroup) {
                            case "user":
                                _this.start();
                                break;
                            case "admin":
                                {
                                    wx.navigateTo({ url: "/pages/admin/index" });
                                }
                                break;
                            default:
                                wx.showModal({
                                    title: '用户组错误',
                                    content: '只有用户组user和admin可以使用小程序端',
                                    success: function () {
                                        api_1.default.unbindwx().then(function () {
                                            wx.startPullDownRefresh();
                                        });
                                    }
                                });
                                break;
                        }
                    }
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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, ok, arg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        wx.showLoading({ title: '获取DTU' });
                        return [4, api_1.default.getuserMountDev()];
                    case 1:
                        _b = _c.sent(), ok = _b.ok, arg = _b.arg;
                        wx.hideLoading();
                        if (ok && ((_a = arg) === null || _a === void 0 ? void 0 : _a.UTs) && arg.UTs.length > 0) {
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
                                        wx.navigateTo({
                                            url: '/pages/index/bindDev/bindDev',
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
                        this.countDev(this.data.DTUs);
                        this.start();
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
    addVm: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, arg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, api_1.default.addVm()];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, arg = _a.arg;
                        if (ok) {
                            this.setData({
                                Vm: arg
                            });
                            arg.forEach(function (el) {
                                wx.setStorage({
                                    key: el._id,
                                    data: el
                                });
                            });
                            wx.setStorage({
                                key: 'Uts',
                                data: arg
                            });
                            this.countDev(arg);
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBb0Q7QUFDcEQsdUNBQWtDO0FBRWxDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUVKLElBQUksRUFBRSxFQUFnQjtRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxFQUFFO1FBQ1QsUUFBUSxFQUFFLENBQUM7UUFDWCxFQUFFLEVBQUUsRUFBZ0I7S0FDckI7SUFDRCxNQUFNO1FBQU4saUJBa0NDO1FBakNDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsVUFBQSxHQUFHO2dCQUVWLGFBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztvQkFDeEMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBYSxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVcsQ0FBQyxDQUFDO3dCQUM5QyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFOzRCQUN6QixLQUFLLE1BQU07Z0NBQ1QsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFBO2dDQUNaLE1BQU07NEJBQ1IsS0FBSyxPQUFPO2dDQUNWO29DQUNFLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO2lDQUM3QztnQ0FDRCxNQUFLOzRCQUNQO2dDQUNFLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0NBQ1gsS0FBSyxFQUFFLE9BQU87b0NBQ2QsT0FBTyxFQUFFLHlCQUF5QjtvQ0FDbEMsT0FBTzt3Q0FDTCxhQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDOzRD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Z0IsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEcsTUFBTSxFQUFFO2dCQUNOLFVBQVU7b0JBQ1IsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFDVixVQUFVLENBQUM7NEJBQ1QsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUE7d0JBQzNCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtvQkFDVCxDQUFDLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0Y7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBR0ssS0FBSzs7Ozs7NEJBQ1csV0FBTSxhQUFHLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUEvQixLQUFjLFNBQWlCLEVBQTdCLEVBQUUsUUFBQSxFQUFFLEdBQUcsU0FBQTt3QkFDZixJQUFJLEVBQUUsRUFBRTs0QkFDTixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLEVBQUUsRUFBRSxHQUFHOzZCQUNSLENBQUMsQ0FBQTs0QkFDRixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTtnQ0FDWixFQUFFLENBQUMsVUFBVSxDQUFDO29DQUNaLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztvQ0FDWCxJQUFJLEVBQUUsRUFBRTtpQ0FDVCxDQUFDLENBQUE7NEJBQ0osQ0FBQyxDQUFDLENBQUE7NEJBQ0YsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQ0FDWixHQUFHLEVBQUUsS0FBSztnQ0FDVixJQUFJLEVBQUUsR0FBRzs2QkFDVixDQUFDLENBQUE7NEJBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTt5QkFDbkI7Ozs7O0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuaW1wb3J0IHsgT2JqZWN0VG9TdHJxdWVyeSB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCI7XG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIjtcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICAvLyBEVFXorr7lpIfkv6Hmga9cbiAgICBEVFVzOiBbXSBhcyBUZXJtaW5hbFtdLFxuICAgIHN0YXRlOiAnJyxcbiAgICBhbGFybTogJycsXG4gICAgYWxhcm1OdW06IDAsXG4gICAgVm06IFtdIGFzIFRlcm1pbmFsW11cbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vIOWPkemAgee9kee7nOivt+axgu+8jOiOt+WPluWcqOe6v+i0puaIt1xuICAgICAgICBhcGkubG9naW4oeyBqc19jb2RlOiByZXMuY29kZSB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgdXNlckdyb3VwOiR7cmVzLmFyZy51c2VyR3JvdXB9YCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHJlcy5hcmcudXNlckdyb3VwKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJ1c2VyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJhZG1pblwiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6IFwiL3BhZ2VzL2FkbWluL2luZGV4XCIgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnlKjmiLfnu4TplJnor68nLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogJ+WPquacieeUqOaIt+e7hHVzZXLlkoxhZG1pbuWPr+S7peS9v+eUqOWwj+eoi+W6j+errycsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgICAgICBhcGkudW5iaW5kd3goKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB3eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Ugd3gubmF2aWdhdGVUbyh7IHVybDogXCIvcGFnZXMvbG9naW4vbG9naW4/b3BlbmlkPVwiICsgcmVzLmFyZy5vcGVuaWQgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDnmbvlvZXov5DooYxcbiAgc3RhcnQoKSB7XG4gICAgLy8g6I635Y+W5pyq6K+75Y+W55qEYWxhcm3mlbDph49cbiAgICBhcGkuZ2V0QWxhcm11bmNvbmZpcm1lZCgpLnRoZW4oZWwgPT4ge1xuICAgICAgaWYgKE51bWJlcihlbC5hcmcpID4gMCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGFsYXJtOiBg5pyJJHtlbC5hcmd95p2h5pyq56Gu6K6k55qE5ZGK6K2m5L+h5oGv77yM54K55Ye75p+l55yLP2AsXG4gICAgICAgICAgYWxhcm1OdW06IE51bWJlcihlbC5hcmcpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmJpbmREZXYoKVxuICB9LFxuICAvLyDojrflj5bnlKjmiLfnu5Hlrprorr7lpIdcbiAgYXN5bmMgYmluZERldigpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn6I635Y+WRFRVJyB9KVxuICAgIGNvbnN0IHsgb2ssIGFyZyB9ID0gYXdhaXQgYXBpLmdldHVzZXJNb3VudERldigpXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIGlmIChvayAmJiBhcmc/LlVUcyAmJiBhcmcuVVRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIERUVXM6IGFyZy5VVHNcbiAgICAgIH0pXG4gICAgICBhcmcuVVRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6IGVsLl9pZCxcbiAgICAgICAgICBkYXRhOiBlbFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdVdHMnLFxuICAgICAgICBkYXRhOiBhcmcuVVRzXG4gICAgICB9KVxuICAgICAgdGhpcy5jb3VudERldihhcmcuVVRzKVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+a3u+WKoOiuvuWkhycsXG4gICAgICAgIGNvbnRlbnQ6ICfmgqjov5jmsqHmnInmt7vliqDku7vkvZXorr7lpIfvvIzor7flhYjmt7vliqDorr7lpIcnLFxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2JpbmREZXYvYmluZERldicsXG4gICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIGFkZFN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgICB3eC5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHd4LnN0YXJ0UHVsbERvd25SZWZyZXNoKClcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g5pi+56S655So5oi3RFRV5Y+C5pWwXG4gIHNob3dEVFVJbmZvKGV2ZW50OiB2YW50RXZlbnQ8c3RyaW5nPikge1xuICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6IGAvcGFnZXMvaW5kZXgvZHR1L2R0dT9pZD0ke2V2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtfWAgfSlcbiAgfSxcbiAgLy8g5p+l55yL6K6+5aSH5pWw5o2uXG4gIHNob3dNb3VudERldkRhdGEoZXZlbnQ6IHZhbnRFdmVudDxUZXJtaW5hbE1vdW50RGV2cz4pIHtcbiAgICBjb25zdCB7IHBpZCwgbW91bnREZXYsIHByb3RvY29sIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIGNvbnN0IGlkID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgY29uc3QgeyBEZXZNYWMgfSA9IHd4LmdldFN0b3JhZ2VTeW5jKGlkKSBhcyBUZXJtaW5hbFxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2RldnMvZGV2cycgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgcGlkOiBTdHJpbmcocGlkKSwgbW91bnREZXYsIHByb3RvY29sLCBEZXZNYWMgfSlcbiAgICB9KVxuICB9LFxuICAvLyDmn6XnnIvlkYroraZcbiAgc2VlQWxhcm0oKSB7XG4gICAgd3guc3dpdGNoVGFiKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtL2FsYXJtP251bT0nICsgdGhpcy5kYXRhLmFsYXJtTnVtIH0pXG4gIH0sXG4gIC8vIOe7n+iuoeaJgOacieiuvuWkh+eKtuaAgVxuICBjb3VudERldih0ZXJtaW5hbHM6IFRlcm1pbmFsW10pIHtcbiAgICBjb25zdCB0ZXJtaW5hbF9hbGwgPSB0ZXJtaW5hbHMubGVuZ3RoXG4gICAgY29uc3QgdGVybWluYWxfb24gPSB0ZXJtaW5hbHMubWFwKGVsID0+IGVsLm9ubGluZSkuZmlsdGVyKGVsID0+IGVsKS5sZW5ndGhcbiAgICBjb25zdCBtb251dERldl9hbGwgPSB0ZXJtaW5hbHMubWFwKGVsID0+IGVsLm1vdW50RGV2cy5sZW5ndGgpLnJlZHVjZSgocHJlLCBjdXIpID0+IHByZSArIGN1cilcbiAgICBjb25zdCBtb3VudERldl9vbiA9IHRlcm1pbmFscy5tYXAoZWwgPT4gZWwubW91bnREZXZzLmZpbHRlcihlbDIgPT4gZWwyLm9ubGluZSkpLnJlZHVjZSgocHJlLCBjdXIpID0+IFsuLi5wcmUsIC4uLmN1cl0pLmxlbmd0aFxuICAgIC8vIGNvbnNvbGUubG9nKHsgdGVybWluYWxfYWxsLCB0ZXJtaW5hbF9vbiwgbW9udXREZXZfYWxsLCBtb3VudERldl9vbiB9KTtcbiAgICBjb25zdCBzdGF0ZSA9IGBEVFU6KOWFqOmDqCR7dGVybWluYWxfYWxsfS/lnKjnur8ke3Rlcm1pbmFsX29ufSks5oyC6L296K6+5aSHOijlhajpg6gke21vbnV0RGV2X2FsbH0v5Zyo57q/JHttb3VudERldl9vbn0pYFxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzdGF0ZVxuICAgIH0pXG4gIH0sXG4gIC8vbWFjPTk4RDg2M0NDODcwRCZwaWQ9MCZtb3VudERldj1HMktcbiAgYXN5bmMgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgYXdhaXQgdGhpcy5iaW5kRGV2KClcbiAgICB0aGlzLmNvdW50RGV2KHRoaXMuZGF0YS5EVFVzKVxuICAgIHRoaXMuc3RhcnQoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9LFxuICAvL1xuICBiaW5kbG9hZChldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYOWFrOS8l+WPt+WKoOi9vXN1Y2Nlc3Ms54q25oCBOiR7ZXZlbnQuZGV0YWlsLmVyck1zZ31gKTtcbiAgfSxcbiAgYmluZGVycm9yKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhg5YWs5LyX5Y+35Yqg6L29ZXJyb3Is54q25oCBOiR7ZXZlbnQuZGV0YWlsLmVyck1zZ31gKTtcbiAgfSxcbiAgLy8g5re75Yqg57uR5a6a6K6+5aSHXG4gIGFkZE1vbnV0RGV2KGV2ZW50OiB2YW50RXZlbnQ8VGVybWluYWw+KSB7XG4gICAgY29uc3QgeyBpdGVtIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9tYW5hZ2VEZXYvYWRkTW91bnREZXYvYWRkTW91bnREZXYnICsgT2JqZWN0VG9TdHJxdWVyeSh7IGl0ZW06IEpTT04uc3RyaW5naWZ5KGl0ZW0pIH0pLFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIGFkZFN1Y2Nlc3MoKSB7XG4gICAgICAgICAgd3gubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHd4LnN0YXJ0UHVsbERvd25SZWZyZXNoKClcbiAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvLyDmt7vliqDomZrmi5/orr7lpIdcbiAgYXN5bmMgYWRkVm0oKSB7XG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuYWRkVm0oKVxuICAgIGlmIChvaykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgVm06IGFyZ1xuICAgICAgfSlcbiAgICAgIGFyZy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiBlbC5faWQsXG4gICAgICAgICAgZGF0YTogZWxcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnVXRzJyxcbiAgICAgICAgZGF0YTogYXJnXG4gICAgICB9KVxuICAgICAgdGhpcy5jb3VudERldihhcmcpXG4gICAgfVxuICB9XG59KVxuIl19