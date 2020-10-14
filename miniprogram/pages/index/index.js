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
        api_1.default.getAlarmunconfirmed();
        this.bindDev();
        wx.navigateTo({
            url: '/pages/index/alarmSetting/alarmSetting?type=2&protocol=P01'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvRDtBQUNwRCx1Q0FBa0M7QUFFbEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBRUosSUFBSSxFQUFFLEVBQWdCO0tBQ3ZCO0lBQ0QsTUFBTTtRQUFOLGlCQVVDO1FBVEMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBRVYsYUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO29CQUN2QyxJQUFJLEdBQUcsQ0FBQyxFQUFFO3dCQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTs7d0JBQ25CLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsNEJBQTRCLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO2dCQUM1RSxDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSztRQUVILGFBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsNERBQTREO1NBQ2xFLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxPQUFPOzs7Ozs0QkFDUyxXQUFNLGFBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQXpDLEtBQWMsU0FBMkIsRUFBdkMsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHOzZCQUNkLENBQUMsQ0FBQTs0QkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2dDQUN2QixFQUFFLENBQUMsVUFBVSxDQUFDO29DQUNaLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztvQ0FDWCxJQUFJLEVBQUUsRUFBRTtpQ0FDVCxDQUFDLENBQUE7NEJBQ0osQ0FBQyxDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsbUJBQW1CO2dDQUM1QixPQUFPLFlBQUMsR0FBRztvQ0FDVCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0NBQ2YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw4QkFBOEIsRUFBRSxDQUFDLENBQUE7cUNBQ3ZEO2dDQUNILENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBRUQsV0FBVyxFQUFYLFVBQVksS0FBd0I7UUFDbEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw2QkFBMkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBTSxFQUFFLENBQUMsQ0FBQTtJQUN2RixDQUFDO0lBRUQsZ0JBQWdCLEVBQWhCLFVBQWlCLEtBQW1DO1FBQzVDLElBQUEscUNBQThELEVBQTVELFlBQUcsRUFBRSxzQkFBUSxFQUFFLHNCQUE2QyxDQUFBO1FBQ3BFLElBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQTtRQUNqQyxJQUFBLHFDQUFNLENBQXNDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsdUJBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNHLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsd0JBQXdCLEdBQUcsdUJBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7U0FDbkcsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVLLGlCQUFpQjs7Ozs0QkFDckIsV0FBTSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUE7O3dCQUFwQixTQUFvQixDQUFBO3dCQUNwQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuaW1wb3J0IHsgT2JqZWN0VG9TdHJxdWVyeSB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCI7XG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIjtcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICAvLyBEVFXorr7lpIfkv6Hmga9cbiAgICBEVFVzOiBbXSBhcyBUZXJtaW5hbFtdXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyDlj5HpgIHnvZHnu5zor7fmsYLvvIzojrflj5blnKjnur/otKbmiLdcbiAgICAgICAgYXBpLmxvZ2luKHsganNfY29kZTogcmVzLmNvZGUgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMub2spIHRoaXMuc3RhcnQoKVxuICAgICAgICAgIGVsc2Ugd3gubmF2aWdhdGVUbyh7IHVybDogXCIvcGFnZXMvbG9naW4vbG9naW4/b3BlbmlkPVwiICsgcmVzLmFyZy5vcGVuaWQgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDnmbvlvZXov5DooYxcbiAgc3RhcnQoKSB7XG4gICAgLy8g6I635Y+W5pyq6K+75Y+W55qEYWxhcm3mlbDph49cbiAgICBhcGkuZ2V0QWxhcm11bmNvbmZpcm1lZCgpXG4gICAgdGhpcy5iaW5kRGV2KClcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvYWxhcm1TZXR0aW5nP3R5cGU9MiZwcm90b2NvbD1QMDEnXG4gICAgfSlcbiAgfSxcbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGFzeW5jIGJpbmREZXYoKSB7XG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0dXNlck1vdW50RGV2KClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIERUVXM6IGFyZy5VVHNcbiAgICAgIH0pXG4gICAgICB0aGlzLmRhdGEuRFRVcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiBlbC5faWQsXG4gICAgICAgICAgZGF0YTogZWxcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5re75Yqg6K6+5aSHJyxcbiAgICAgICAgY29udGVudDogJ+aCqOi/mOayoeaciea3u+WKoOS7u+S9leiuvuWkh++8jOivt+WFiOa3u+WKoOiuvuWkhycsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2JpbmREZXYvYmluZERldicgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDmmL7npLrnlKjmiLdEVFXlj4LmlbBcbiAgc2hvd0RUVUluZm8oZXZlbnQ6IHZhbnRFdmVudDxzdHJpbmc+KSB7XG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogYC9wYWdlcy9pbmRleC9kdHUvZHR1P2lkPSR7ZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lml0ZW19YCB9KVxuICB9LFxuICAvLyDmn6XnnIvorr7lpIfmlbDmja5cbiAgc2hvd01vdW50RGV2RGF0YShldmVudDogdmFudEV2ZW50PFRlcm1pbmFsTW91bnREZXZzPikge1xuICAgIGNvbnN0IHsgcGlkLCBtb3VudERldiwgcHJvdG9jb2wgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtXG4gICAgY29uc3QgaWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICBjb25zdCB7IERldk1hYyB9ID0gd3guZ2V0U3RvcmFnZVN5bmMoaWQpIGFzIFRlcm1pbmFsXG4gICAgY29uc29sZS5sb2coJy9wYWdlcy9pbmRleC9kZXZzL2RldnMnICsgT2JqZWN0VG9TdHJxdWVyeSh7IHBpZDogU3RyaW5nKHBpZCksIG1vdW50RGV2LCBwcm90b2NvbCwgRGV2TWFjIH0pKTtcblxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2RldnMvZGV2cycgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgcGlkOiBTdHJpbmcocGlkKSwgbW91bnREZXYsIHByb3RvY29sLCBEZXZNYWMgfSlcbiAgICB9KVxuICB9LFxuICAvL21hYz05OEQ4NjNDQzg3MEQmcGlkPTAmbW91bnREZXY9RzJLXG4gIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIGF3YWl0IHRoaXMuYmluZERldigpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH1cbn0pXG4iXX0=