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
var util_1 = require("../../utils/util");
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
        api_1.default.getAlarmunconfirmed().then(function (el) {
        }).catch(function (e) {
        });
        this.bindDev();
        wx.navigateTo({
            url: '/pages/index/alarmSetting/index'
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
                            wx.setStorage({
                                key: 'Uts',
                                data: arg.UTs
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
        var _a = event.currentTarget.dataset.item, pid = _a.pid, mountDev = _a.mountDev, protocol = _a.protocol;
        var id = event.currentTarget.dataset.id;
        var DevMac = wx.getStorageSync(id).DevMac;
        console.log('/pages/index/devs/devs' + util_1.ObjectToStrquery({ pid: String(pid), mountDev: mountDev, protocol: protocol, DevMac: DevMac }));
        wx.navigateTo({
            url: '/pages/index/devs/devs' + util_1.ObjectToStrquery({ pid: String(pid), mountDev: mountDev, protocol: protocol, DevMac: DevMac })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvRDtBQUNwRCx1Q0FBa0M7QUFFbEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBRUosSUFBSSxFQUFFLEVBQWdCO0tBQ3ZCO0lBQ0QsTUFBTTtRQUFOLGlCQVVDO1FBVEMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBRVYsYUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO29CQUN2QyxJQUFJLEdBQUcsQ0FBQyxFQUFFO3dCQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTs7d0JBQ25CLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsNEJBQTRCLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO2dCQUM1RSxDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxFQUFMO1FBRUUsYUFBRyxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtRQUlqQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFNO1FBR2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxpQ0FBaUM7U0FDdkMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVLLE9BQU87Ozs7OzRCQUNTLFdBQU0sYUFBRyxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBekMsS0FBYyxTQUEyQixFQUF2QyxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsSUFBSSxFQUFFLEVBQUU7NEJBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUc7NkJBQ2QsQ0FBQyxDQUFBOzRCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7Z0NBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0NBQ1osR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHO29DQUNYLElBQUksRUFBRSxFQUFFO2lDQUNULENBQUMsQ0FBQTs0QkFDSixDQUFDLENBQUMsQ0FBQTs0QkFDRixFQUFFLENBQUMsVUFBVSxDQUFDO2dDQUNaLEdBQUcsRUFBRSxLQUFLO2dDQUNWLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRzs2QkFDZCxDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsbUJBQW1CO2dDQUM1QixPQUFPLFlBQUMsR0FBRztvQ0FDVCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0NBQ2YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw4QkFBOEIsRUFBRSxDQUFDLENBQUE7cUNBQ3ZEO2dDQUNILENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBRUQsV0FBVyxFQUFYLFVBQVksS0FBd0I7UUFDbEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw2QkFBMkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBTSxFQUFFLENBQUMsQ0FBQTtJQUN2RixDQUFDO0lBRUQsZ0JBQWdCLEVBQWhCLFVBQWlCLEtBQW1DO1FBQzVDLElBQUEscUNBQThELEVBQTVELFlBQUcsRUFBRSxzQkFBUSxFQUFFLHNCQUE2QyxDQUFBO1FBQ3BFLElBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQTtRQUNqQyxJQUFBLHFDQUFNLENBQXNDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsdUJBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNHLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsd0JBQXdCLEdBQUcsdUJBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7U0FDbkcsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVLLGlCQUFpQjs7Ozs0QkFDckIsV0FBTSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUE7O3dCQUFwQixTQUFvQixDQUFBO3dCQUNwQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuaW1wb3J0IHsgT2JqZWN0VG9TdHJxdWVyeSB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCI7XG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIjtcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICAvLyBEVFXorr7lpIfkv6Hmga9cbiAgICBEVFVzOiBbXSBhcyBUZXJtaW5hbFtdXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyDlj5HpgIHnvZHnu5zor7fmsYLvvIzojrflj5blnKjnur/otKbmiLdcbiAgICAgICAgYXBpLmxvZ2luKHsganNfY29kZTogcmVzLmNvZGUgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMub2spIHRoaXMuc3RhcnQoKVxuICAgICAgICAgIGVsc2Ugd3gubmF2aWdhdGVUbyh7IHVybDogXCIvcGFnZXMvbG9naW4vbG9naW4/b3BlbmlkPVwiICsgcmVzLmFyZy5vcGVuaWQgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDnmbvlvZXov5DooYxcbiAgc3RhcnQoKSB7XG4gICAgLy8g6I635Y+W5pyq6K+75Y+W55qEYWxhcm3mlbDph49cbiAgICBhcGkuZ2V0QWxhcm11bmNvbmZpcm1lZCgpLnRoZW4oZWwgPT4ge1xuICAgICAgLy9jb25zb2xlLmxvZyhlbCk7XG5cbiAgICAgIC8vaWYgKE51bWJlcihlbC5hcmcpID4gMCkgd3guc2V0VGFiQmFyQmFkZ2UoeyBpbmRleDogMCwgdGV4dDogJzQnIHx8ICcnIH0pXG4gICAgfSkuY2F0Y2goKGU6IGFueSkgPT4ge1xuICAgICAgLy9jb25zb2xlLmxvZyhlKTtcblxuICAgIH0pXG4gICAgdGhpcy5iaW5kRGV2KClcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvaW5kZXgnXG4gICAgfSlcbiAgfSxcbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGFzeW5jIGJpbmREZXYoKSB7XG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0dXNlck1vdW50RGV2KClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIERUVXM6IGFyZy5VVHNcbiAgICAgIH0pXG4gICAgICB0aGlzLmRhdGEuRFRVcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiBlbC5faWQsXG4gICAgICAgICAgZGF0YTogZWxcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnVXRzJyxcbiAgICAgICAgZGF0YTogYXJnLlVUc1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmt7vliqDorr7lpIcnLFxuICAgICAgICBjb250ZW50OiAn5oKo6L+Y5rKh5pyJ5re75Yqg5Lu75L2V6K6+5aSH77yM6K+35YWI5re75Yqg6K6+5aSHJyxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvaW5kZXgvYmluZERldi9iaW5kRGV2JyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOaYvuekuueUqOaIt0RUVeWPguaVsFxuICBzaG93RFRVSW5mbyhldmVudDogdmFudEV2ZW50PHN0cmluZz4pIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBgL3BhZ2VzL2luZGV4L2R0dS9kdHU/aWQ9JHtldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbX1gIH0pXG4gIH0sXG4gIC8vIOafpeeci+iuvuWkh+aVsOaNrlxuICBzaG93TW91bnREZXZEYXRhKGV2ZW50OiB2YW50RXZlbnQ8VGVybWluYWxNb3VudERldnM+KSB7XG4gICAgY29uc3QgeyBwaWQsIG1vdW50RGV2LCBwcm90b2NvbCB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lml0ZW1cbiAgICBjb25zdCBpZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgIGNvbnN0IHsgRGV2TWFjIH0gPSB3eC5nZXRTdG9yYWdlU3luYyhpZCkgYXMgVGVybWluYWxcbiAgICBjb25zb2xlLmxvZygnL3BhZ2VzL2luZGV4L2RldnMvZGV2cycgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgcGlkOiBTdHJpbmcocGlkKSwgbW91bnREZXYsIHByb3RvY29sLCBEZXZNYWMgfSkpO1xuXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvZGV2cy9kZXZzJyArIE9iamVjdFRvU3RycXVlcnkoeyBwaWQ6IFN0cmluZyhwaWQpLCBtb3VudERldiwgcHJvdG9jb2wsIERldk1hYyB9KVxuICAgIH0pXG4gIH0sXG4gIC8vbWFjPTk4RDg2M0NDODcwRCZwaWQ9MCZtb3VudERldj1HMktcbiAgYXN5bmMgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgYXdhaXQgdGhpcy5iaW5kRGV2KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfVxufSlcbiJdfQ==