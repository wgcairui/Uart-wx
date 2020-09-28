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
                        console.log(res);
                        if (res.ok) {
                            globalData.user = res.arg.user;
                            globalData.userGroup = res.arg.userGroup;
                            globalData.userAvanter = res.arg.avanter;
                            globalData.userName = res.arg.name;
                            globalData.userTel = res.arg.tel;
                            _this.bindDev();
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
        var _a = event.target.id.split("-"), id = _a[0], pid = _a[1];
        var DevMac = wx.getStorageSync(id).DevMac;
        wx.navigateTo({
            url: '/pages/index/devs/devs?mac=' + DevMac + '&pid=' + pid
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFrQztBQUUxQixJQUFBLFVBQVUsR0FBSyxNQUFNLEVBQWMsV0FBekIsQ0FBeUI7QUFDM0MsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBRUosSUFBSSxFQUFFLEVBQWdCO0tBQ3ZCO0lBQ0QsTUFBTTtRQUFOLGlCQXFCQztRQXBCQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFFLFVBQUEsR0FBRztnQkFFVjtvQkFDRSxhQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7d0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pCLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTs0QkFDVixVQUFVLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBOzRCQUM5QixVQUFVLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFBOzRCQUN4QyxVQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFBOzRCQUN4QyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBOzRCQUNsQyxVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFBOzRCQUNoQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7eUJBQ2Y7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw0QkFBNEIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7eUJBQ3RFO29CQUNILENBQUMsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxPQUFPOzs7Ozs0QkFDUyxXQUFNLGFBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQXpDLEtBQWMsU0FBMkIsRUFBdkMsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHOzZCQUNkLENBQUMsQ0FBQTs0QkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2dDQUN2QixFQUFFLENBQUMsVUFBVSxDQUFDO29DQUNaLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztvQ0FDWCxJQUFJLEVBQUUsRUFBRTtpQ0FDVCxDQUFDLENBQUE7NEJBQ0osQ0FBQyxDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsbUJBQW1CO2dDQUM1QixPQUFPLFlBQUMsR0FBRztvQ0FDVCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0NBQ2YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw4QkFBOEIsRUFBRSxDQUFDLENBQUE7cUNBQ3ZEO2dDQUNILENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBRUQsV0FBVyxFQUFYLFVBQVksS0FBZ0I7UUFDMUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDM0IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQTFCLENBQTBCLENBQUMsQ0FBQTtRQUM5RCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSw2QkFBMkIsR0FBRyxDQUFDLEdBQUssRUFBRSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUVELGdCQUFnQixFQUFoQixVQUFpQixLQUFnQjtRQUN6QixJQUFBLEtBQVksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFyQyxFQUFFLFFBQUEsRUFBRSxHQUFHLFFBQThCLENBQUE7UUFDcEMsSUFBQSxNQUFNLEdBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQWEsT0FBdEMsQ0FBc0M7UUFDcEQsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSw2QkFBNkIsR0FBRyxNQUFNLEdBQUcsT0FBTyxHQUFHLEdBQUc7U0FDNUQsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIjtcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuY29uc3QgeyBnbG9iYWxEYXRhIH0gPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICAvLyBEVFXorr7lpIfkv6Hmga9cbiAgICBEVFVzOiBbXSBhcyBUZXJtaW5hbFtdXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyDlj5HpgIHnvZHnu5zor7fmsYLvvIzojrflj5blnKjnur/otKbmiLdcbiAgICAgICAge1xuICAgICAgICAgIGFwaS5sb2dpbih7IGpzX2NvZGU6IHJlcy5jb2RlIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgIGdsb2JhbERhdGEudXNlciA9IHJlcy5hcmcudXNlclxuICAgICAgICAgICAgICBnbG9iYWxEYXRhLnVzZXJHcm91cCA9IHJlcy5hcmcudXNlckdyb3VwXG4gICAgICAgICAgICAgIGdsb2JhbERhdGEudXNlckF2YW50ZXIgPSByZXMuYXJnLmF2YW50ZXJcbiAgICAgICAgICAgICAgZ2xvYmFsRGF0YS51c2VyTmFtZSA9IHJlcy5hcmcubmFtZVxuICAgICAgICAgICAgICBnbG9iYWxEYXRhLnVzZXJUZWwgPSByZXMuYXJnLnRlbFxuICAgICAgICAgICAgICB0aGlzLmJpbmREZXYoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogXCIvcGFnZXMvbG9naW4vbG9naW4/b3BlbmlkPVwiICsgcmVzLmFyZy5vcGVuaWQgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGFzeW5jIGJpbmREZXYoKSB7XG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0dXNlck1vdW50RGV2KClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIERUVXM6IGFyZy5VVHNcbiAgICAgIH0pXG4gICAgICB0aGlzLmRhdGEuRFRVcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiBlbC5faWQsXG4gICAgICAgICAgZGF0YTogZWxcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5re75Yqg6K6+5aSHJyxcbiAgICAgICAgY29udGVudDogJ+aCqOi/mOayoeaciea3u+WKoOS7u+S9leiuvuWkh++8jOivt+WFiOa3u+WKoOiuvuWkhycsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2JpbmREZXYvYmluZERldicgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDmmL7npLrnlKjmiLdEVFXlj4LmlbBcbiAgc2hvd0RUVUluZm8oZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IGR0dXMgPSB0aGlzLmRhdGEuRFRVc1xuICAgIGNvbnN0IGluZGV4ID0gZHR1cy5maW5kSW5kZXgoZWwgPT4gZWwuX2lkID09PSBldmVudC50YXJnZXQuaWQpXG4gICAgY29uc3QgZHR1ID0gZHR1c1tpbmRleF1cbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBgL3BhZ2VzL2luZGV4L2R0dS9kdHU/aWQ9JHtkdHUuX2lkfWAgfSlcbiAgfSxcbiAgLy8g5p+l55yL6K6+5aSH5pWw5o2uXG4gIHNob3dNb3VudERldkRhdGEoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IFtpZCwgcGlkXSA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilcbiAgICBjb25zdCB7IERldk1hYyB9ID0gd3guZ2V0U3RvcmFnZVN5bmMoaWQpIGFzIFRlcm1pbmFsXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvZGV2cy9kZXZzP21hYz0nICsgRGV2TWFjICsgJyZwaWQ9JyArIHBpZFxuICAgIH0pXG4gIH1cbn0pXG4iXX0=