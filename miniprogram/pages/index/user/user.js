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
        rgwx: false,
        rgTime: ''
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
                            rgwx: arg.rgtype === 'wx',
                            rgTime: new Date(arg.creatTime).toLocaleDateString()
                        });
                        wx.setStorage({ key: 'userinfo', data: arg });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwwQ0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUtELE1BQU0sRUFBRTs7O2dCQUNOLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTs7OztLQUNiO0lBR0ssS0FBSyxFQUFYOzs7Ozs0QkFDa0IsV0FBTSxhQUFHLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUEvQixHQUFHLEdBQUssQ0FBQSxTQUF1QixDQUFBLElBQTVCO3dCQUNYLElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJOzRCQUNkLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTzs0QkFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEtBQUssSUFBSTs0QkFDekIsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFVLENBQUMsQ0FBQyxrQkFBa0IsRUFBRTt5QkFDdEQsQ0FBQyxDQUFBO3dCQUNGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBOzs7OztLQUM5QztJQUVLLFFBQVE7Ozs7OzRCQUNRLFdBQU0sYUFBRyxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBbEMsS0FBYyxTQUFvQixFQUFoQyxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsSUFBSSxFQUFFLEVBQUU7NEJBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBOzRCQUNqQixFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTt5QkFDM0M7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsR0FBRzs2QkFDYixDQUFDLENBQUE7eUJBQ0g7Ozs7O0tBQ0Y7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxZQUFDLElBQUk7WUFDWixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFVBQVU7UUFDUixFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2hCLE9BQU8sWUFBQyxHQUFHO2dCQUNULElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO2dCQUNuQyxJQUFJO29CQUNGLEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxRQUFRO2dDQUNmLE9BQU8sRUFBRSxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUk7Z0NBQzdCLE9BQU87b0NBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0NBQzVDLENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTt3QkFDNUMsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTs7Ozs0QkFDakIsV0FBTSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUFsQixTQUFrQixDQUFBO3dCQUNsQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC91c2VyL3VzZXIuanNcblxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG5hbWU6ICcnLFxuICAgIGF2YW50ZXI6ICcnLFxuICAgIHJnd3g6IGZhbHNlLFxuICAgIHJnVGltZTogJydcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuXG4gIC8vXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGNvbnN0IHsgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0VXNlckluZm8oKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBuYW1lOiBhcmcubmFtZSxcbiAgICAgIGF2YW50ZXI6IGFyZy5hdmFudGVyLFxuICAgICAgcmd3eDogYXJnLnJndHlwZSA9PT0gJ3d4JyxcbiAgICAgIHJnVGltZTogbmV3IERhdGUoYXJnLmNyZWF0VGltZSEpLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gICAgfSlcbiAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAndXNlcmluZm8nLCBkYXRhOiBhcmcgfSlcbiAgfSxcbiAgLy8g6Kej57uR5b6u5L+hXG4gIGFzeW5jIHVuYmluZHd4KCkge1xuICAgIGNvbnN0IHsgb2ssIG1zZyB9ID0gYXdhaXQgYXBpLnVuYmluZHd4KClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuY2xlYXJDYWNoZSgpXG4gICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmk43kvZzlpLHotKUnLFxuICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvL1xuICBvcGVuU2V0dGluZygpIHtcbiAgICB3eC5vcGVuU2V0dGluZyh7XG4gICAgICB3aXRoU3Vic2NyaXB0aW9uczogdHJ1ZSxcbiAgICAgIHN1Y2Nlc3MoX3Jlcykge1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgd3guZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHJlcy5jdXJyZW50U2l6ZSAvIDEwMjRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3eC5jbGVhclN0b3JhZ2Uoe1xuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuaIkOWKnycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+a4hemZpOe8k+WtmCcgKyBzaXplICsgJ01CJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn57yT5a2Y5riF55CG5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yLFxuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLnN0YXJ0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfVxufSkiXX0=