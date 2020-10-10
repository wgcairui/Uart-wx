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
                            wx.switchTab({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUFrQztBQUUxQixJQUFBLGdDQUFVLENBQXlCO0FBQzNDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUVKLElBQUksRUFBRSxFQUFnQjtLQUN2QjtJQUNELE1BQU07UUFBTixpQkF1QkM7UUF0QkMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBRVY7b0JBQ0UsYUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO3dCQUN2QyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUU7NEJBQ1YsVUFBVSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTs0QkFDOUIsVUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQTs0QkFDeEMsVUFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQTs0QkFDeEMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTs0QkFDbEMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQTs0QkFDaEMsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFBOzRCQUNkLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsR0FBRyxFQUFDLHdCQUF3Qjs2QkFDN0IsQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsNEJBQTRCLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO3lCQUN0RTtvQkFDSCxDQUFDLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUssT0FBTzs7Ozs7NEJBQ1MsV0FBTSxhQUFHLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUF6QyxLQUFjLFNBQTJCLEVBQXZDLEVBQUUsUUFBQSxFQUFFLEdBQUcsU0FBQTt3QkFDZixJQUFJLEVBQUUsRUFBRTs0QkFDTixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRzs2QkFDZCxDQUFDLENBQUE7NEJBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTtnQ0FDdkIsRUFBRSxDQUFDLFVBQVUsQ0FBQztvQ0FDWixHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUc7b0NBQ1gsSUFBSSxFQUFFLEVBQUU7aUNBQ1QsQ0FBQyxDQUFBOzRCQUNKLENBQUMsQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsT0FBTyxFQUFFLG1CQUFtQjtnQ0FDNUIsT0FBTyxZQUFDLEdBQUc7b0NBQ1QsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO3dDQUNmLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsOEJBQThCLEVBQUUsQ0FBQyxDQUFBO3FDQUN2RDtnQ0FDSCxDQUFDOzZCQUNGLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtJQUVELFdBQVcsRUFBWCxVQUFZLEtBQWdCO1FBQzFCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQzNCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUE7UUFDOUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsNkJBQTJCLEdBQUcsQ0FBQyxHQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQzlELENBQUM7SUFFRCxnQkFBZ0IsRUFBaEIsVUFBaUIsS0FBZ0I7UUFDekIsSUFBQSwrQkFBZ0QsRUFBL0MsVUFBRSxFQUFFLFdBQUcsRUFBRSxnQkFBc0MsQ0FBQTtRQUM5QyxJQUFBLHFDQUFNLENBQXNDO1FBQ3BELEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsNkJBQTZCLEdBQUcsTUFBTSxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsWUFBWSxHQUFHLFFBQVE7U0FDdEYsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVLLGlCQUFpQjs7Ozs0QkFDckIsV0FBTSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUE7O3dCQUFwQixTQUFvQixDQUFBO3dCQUNwQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCI7XG4vLyDojrflj5blupTnlKjlrp7kvotcbmNvbnN0IHsgZ2xvYmFsRGF0YSB9ID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgLy8gRFRV6K6+5aSH5L+h5oGvXG4gICAgRFRVczogW10gYXMgVGVybWluYWxbXVxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8g5Y+R6YCB572R57uc6K+35rGC77yM6I635Y+W5Zyo57q/6LSm5oi3XG4gICAgICAgIHtcbiAgICAgICAgICBhcGkubG9naW4oeyBqc19jb2RlOiByZXMuY29kZSB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgIGdsb2JhbERhdGEudXNlciA9IHJlcy5hcmcudXNlclxuICAgICAgICAgICAgICBnbG9iYWxEYXRhLnVzZXJHcm91cCA9IHJlcy5hcmcudXNlckdyb3VwXG4gICAgICAgICAgICAgIGdsb2JhbERhdGEudXNlckF2YW50ZXIgPSByZXMuYXJnLmF2YW50ZXJcbiAgICAgICAgICAgICAgZ2xvYmFsRGF0YS51c2VyTmFtZSA9IHJlcy5hcmcubmFtZVxuICAgICAgICAgICAgICBnbG9iYWxEYXRhLnVzZXJUZWwgPSByZXMuYXJnLnRlbFxuICAgICAgICAgICAgICB0aGlzLmJpbmREZXYoKVxuICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgIHVybDpcIi9wYWdlcy9pbmRleC91c2VyL3VzZXJcIlxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogXCIvcGFnZXMvbG9naW4vbG9naW4/b3BlbmlkPVwiICsgcmVzLmFyZy5vcGVuaWQgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGFzeW5jIGJpbmREZXYoKSB7XG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0dXNlck1vdW50RGV2KClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIERUVXM6IGFyZy5VVHNcbiAgICAgIH0pXG4gICAgICB0aGlzLmRhdGEuRFRVcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiBlbC5faWQsXG4gICAgICAgICAgZGF0YTogZWxcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5re75Yqg6K6+5aSHJyxcbiAgICAgICAgY29udGVudDogJ+aCqOi/mOayoeaciea3u+WKoOS7u+S9leiuvuWkh++8jOivt+WFiOa3u+WKoOiuvuWkhycsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2JpbmREZXYvYmluZERldicgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDmmL7npLrnlKjmiLdEVFXlj4LmlbBcbiAgc2hvd0RUVUluZm8oZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IGR0dXMgPSB0aGlzLmRhdGEuRFRVc1xuICAgIGNvbnN0IGluZGV4ID0gZHR1cy5maW5kSW5kZXgoZWwgPT4gZWwuX2lkID09PSBldmVudC50YXJnZXQuaWQpXG4gICAgY29uc3QgZHR1ID0gZHR1c1tpbmRleF1cbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiBgL3BhZ2VzL2luZGV4L2R0dS9kdHU/aWQ9JHtkdHUuX2lkfWAgfSlcbiAgfSxcbiAgLy8g5p+l55yL6K6+5aSH5pWw5o2uXG4gIHNob3dNb3VudERldkRhdGEoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IFtpZCwgcGlkLCBtb3VudERldl0gPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpXG4gICAgY29uc3QgeyBEZXZNYWMgfSA9IHd4LmdldFN0b3JhZ2VTeW5jKGlkKSBhcyBUZXJtaW5hbFxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2RldnMvZGV2cz9tYWM9JyArIERldk1hYyArICcmcGlkPScgKyBwaWQgKyAnJm1vdW50RGV2PScgKyBtb3VudERldlxuICAgIH0pXG4gIH0sXG4gIC8vXG4gIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIGF3YWl0IHRoaXMuYmluZERldigpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH1cbn0pXG4iXX0=