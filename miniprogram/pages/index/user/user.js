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
var api_1 = require("../../../utils/api");
Page({
    data: {
        name: '',
        avanter: '',
        rgwx: false
    },
    onLoad: function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var arg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_1.default.getUserInfo()];
                    case 1:
                        arg = (_a.sent()).arg;
                        this.setData({
                            name: arg.name,
                            avanter: arg.avanter,
                            rgwx: arg.rgtype === 'wx'
                        });
                        wx.setStorage({ key: 'userinfo', data: arg });
                        wx.setNavigationBarTitle({ title: arg.name || arg.user });
                        return [2];
                }
            });
        });
    },
    unbindwx: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, api_1.default.unbindwx()];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, msg = _a.msg;
                        if (ok) {
                            wx.reLaunch({ url: '/pages/index/index' });
                        }
                        else {
                            wx.showModal({
                                title: '操作失败',
                                content: msg
                            });
                        }
                        return [2];
                }
            });
        });
    },
    openSetting: function () {
        wx.openSetting({
            withSubscriptions: true,
            success: function (_res) {
            }
        });
    },
    clearCache: function () {
        wx.getStorageInfo({
            success: function (res) {
                var size = res.currentSize / 1024;
                try {
                    wx.clearStorage({
                        success: function () {
                            wx.showModal({
                                title: '缓存清理成功',
                                content: '清除缓存' + size + 'MB',
                                success: function () {
                                    wx.reLaunch({ url: '/pages/index/index' });
                                }
                            });
                        }
                    });
                }
                catch (error) {
                    wx.showModal({
                        title: '缓存清理失败',
                        content: error,
                        success: function () {
                            wx.reLaunch({ url: '/pages/index/index' });
                        }
                    });
                }
            }
        });
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwwQ0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxLQUFLO0tBQ1o7SUFLRCxNQUFNLEVBQUUsVUFBZ0IsUUFBUTs7Ozs7NEJBQ2QsV0FBTSxhQUFHLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUEvQixHQUFHLEdBQUssQ0FBQSxTQUF1QixDQUFBLElBQTVCO3dCQUNYLElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJOzRCQUNkLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTzs0QkFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEtBQUssSUFBSTt5QkFDMUIsQ0FBQyxDQUFBO3dCQUNGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO3dCQUM3QyxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTs7Ozs7S0FDMUQ7SUFFSyxRQUFROzs7Ozs0QkFDUSxXQUFNLGFBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQWxDLEtBQWMsU0FBb0IsRUFBaEMsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3lCQUMzQzs2QkFBTTs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxNQUFNO2dDQUNiLE9BQU8sRUFBRSxHQUFHOzZCQUNiLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtJQUVELFdBQVc7UUFDVCxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ2IsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixPQUFPLFlBQUMsSUFBSTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsVUFBVTtRQUNSLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDaEIsT0FBTyxZQUFDLEdBQUc7Z0JBQ1QsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7Z0JBQ25DLElBQUk7b0JBQ0YsRUFBRSxDQUFDLFlBQVksQ0FBQzt3QkFDZCxPQUFPOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLFFBQVE7Z0NBQ2YsT0FBTyxFQUFFLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSTtnQ0FDN0IsT0FBTztvQ0FDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtnQ0FDNUMsQ0FBQzs2QkFDRixDQUFDLENBQUE7d0JBQ0osQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsUUFBUTt3QkFDZixPQUFPLEVBQUUsS0FBSzt3QkFDZCxPQUFPOzRCQUNMLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3dCQUM1QyxDQUFDO3FCQUNGLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L3VzZXIvdXNlci5qc1xuXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgcmd3eDogZmFsc2VcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKF9vcHRpb25zKSB7XG4gICAgY29uc3QgeyBhcmcgfSA9IGF3YWl0IGFwaS5nZXRVc2VySW5mbygpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG5hbWU6IGFyZy5uYW1lLFxuICAgICAgYXZhbnRlcjogYXJnLmF2YW50ZXIsXG4gICAgICByZ3d4OiBhcmcucmd0eXBlID09PSAnd3gnXG4gICAgfSlcbiAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAndXNlcmluZm8nLCBkYXRhOiBhcmcgfSlcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZTogYXJnLm5hbWUgfHwgYXJnLnVzZXIgfSlcbiAgfSxcbiAgLy8g6Kej57uR5b6u5L+hXG4gIGFzeW5jIHVuYmluZHd4KCkge1xuICAgIGNvbnN0IHsgb2ssIG1zZyB9ID0gYXdhaXQgYXBpLnVuYmluZHd4KClcbiAgICBpZiAob2spIHtcbiAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aTjeS9nOWksei0pScsXG4gICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vXG4gIG9wZW5TZXR0aW5nKCkge1xuICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgIHdpdGhTdWJzY3JpcHRpb25zOiB0cnVlLFxuICAgICAgc3VjY2VzcyhfcmVzKSB7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgY2xlYXJDYWNoZSgpIHtcbiAgICB3eC5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBjb25zdCBzaXplID0gcmVzLmN1cnJlbnRTaXplIC8gMTAyNFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZSh7XG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn57yT5a2Y5riF55CG5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5riF6Zmk57yT5a2YJyArIHNpemUgKyAnTUInLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfnvJPlrZjmuIXnkIblpLHotKUnLFxuICAgICAgICAgICAgY29udGVudDogZXJyb3IsXG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==