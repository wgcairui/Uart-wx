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
    onLoad: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.start();
                return [2];
            });
        });
    },
    start: function () {
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
                            this.clearCache();
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.start()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwwQ0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxLQUFLO0tBQ1o7SUFLRCxNQUFNLEVBQUU7OztnQkFDTixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7Ozs7S0FDYjtJQUdLLEtBQUs7Ozs7OzRCQUNPLFdBQU0sYUFBRyxDQUFDLFdBQVcsRUFBRSxFQUFBOzt3QkFBL0IsR0FBRyxHQUFLLENBQUEsU0FBdUIsQ0FBQSxJQUE1Qjt3QkFDWCxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTs0QkFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87NEJBQ3BCLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxLQUFLLElBQUk7eUJBQzFCLENBQUMsQ0FBQTt3QkFDRixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTt3QkFDN0MsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7Ozs7O0tBQzFEO0lBRUssUUFBUTs7Ozs7NEJBQ1EsV0FBTSxhQUFHLENBQUMsUUFBUSxFQUFFLEVBQUE7O3dCQUFsQyxLQUFjLFNBQW9CLEVBQWhDLEVBQUUsUUFBQSxFQUFFLEdBQUcsU0FBQTt3QkFDZixJQUFJLEVBQUUsRUFBRTs0QkFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7NEJBQ2pCLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3lCQUMzQzs2QkFBTTs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxNQUFNO2dDQUNiLE9BQU8sRUFBRSxHQUFHOzZCQUNiLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtJQUVELFdBQVc7UUFDVCxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ2IsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixPQUFPLFlBQUMsSUFBSTtZQUNaLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsVUFBVTtRQUNSLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDaEIsT0FBTyxZQUFDLEdBQUc7Z0JBQ1QsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7Z0JBQ25DLElBQUk7b0JBQ0YsRUFBRSxDQUFDLFlBQVksQ0FBQzt3QkFDZCxPQUFPOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLFFBQVE7Z0NBQ2YsT0FBTyxFQUFFLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSTtnQ0FDN0IsT0FBTztvQ0FDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtnQ0FDNUMsQ0FBQzs2QkFDRixDQUFDLENBQUE7d0JBQ0osQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsUUFBUTt3QkFDZixPQUFPLEVBQUUsS0FBSzt3QkFDZCxPQUFPOzRCQUNMLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3dCQUM1QyxDQUFDO3FCQUNGLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFOzs7OzRCQUNqQixXQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBQWxCLFNBQWtCLENBQUE7d0JBQ2xCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBOzs7OztLQUN6QjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L3VzZXIvdXNlci5qc1xuXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgcmd3eDogZmFsc2VcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuXG4gIC8vXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGNvbnN0IHsgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0VXNlckluZm8oKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBuYW1lOiBhcmcubmFtZSxcbiAgICAgIGF2YW50ZXI6IGFyZy5hdmFudGVyLFxuICAgICAgcmd3eDogYXJnLnJndHlwZSA9PT0gJ3d4J1xuICAgIH0pXG4gICAgd3guc2V0U3RvcmFnZSh7IGtleTogJ3VzZXJpbmZvJywgZGF0YTogYXJnIH0pXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6IGFyZy5uYW1lIHx8IGFyZy51c2VyIH0pXG4gIH0sXG4gIC8vIOino+e7keW+ruS/oVxuICBhc3luYyB1bmJpbmR3eCgpIHtcbiAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS51bmJpbmR3eCgpXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLmNsZWFyQ2FjaGUoKVxuICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5pON5L2c5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogbXNnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy9cbiAgb3BlblNldHRpbmcoKSB7XG4gICAgd3gub3BlblNldHRpbmcoe1xuICAgICAgd2l0aFN1YnNjcmlwdGlvbnM6IHRydWUsXG4gICAgICBzdWNjZXNzKF9yZXMpIHtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBjbGVhckNhY2hlKCkge1xuICAgIHd4LmdldFN0b3JhZ2VJbmZvKHtcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSByZXMuY3VycmVudFNpemUgLyAxMDI0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgd3guY2xlYXJTdG9yYWdlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfnvJPlrZjmuIXnkIbmiJDlip8nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmuIXpmaTnvJPlrZgnICsgc2l6ZSArICdNQicsXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuWksei0pScsXG4gICAgICAgICAgICBjb250ZW50OiBlcnJvcixcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5zdGFydCgpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH1cbn0pIl19