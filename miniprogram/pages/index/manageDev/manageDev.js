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
var util_1 = require("../../../utils/util");
var api_1 = require("../../../utils/api");
Page({
    data: {
        devs: []
    },
    onLoad: function () {
        this.sortDevslist();
    },
    sortDevslist: function () {
        var _this = this;
        wx.getStorage({
            key: 'Uts'
        }).then(function (_a) {
            var data = _a.data;
            _this.setData({
                devs: data
            });
        }).catch(function () {
            wx.showModal({
                title: '设备错误',
                content: '缓存被清理或没有绑定设备,请在首页下拉刷新',
                success: function () {
                    wx.switchTab({ url: '/pages/index/index' });
                }
            });
        });
    },
    deleteMountDev: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, item, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = event.currentTarget.dataset, item = _a.item, key = _a.key;
                        return [4, api_1.default.delTerminalMountDev(key, item.mountDev, item.pid)];
                    case 1:
                        _b.sent();
                        wx.startPullDownRefresh();
                        return [2];
                }
            });
        });
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
    deleteDTU: function (event) {
        var _this = this;
        var _a = event.currentTarget.dataset.item, DevMac = _a.DevMac, mountDevs = _a.mountDevs;
        if (mountDevs.length > 0) {
            wx.showModal({
                title: 'Tip',
                content: "\u662F\u5426\u5220\u9664DTU\u7ED1\u5B9A\u7684\u6240\u6709\u8BBE\u5907?",
                success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var _i, mountDevs_1, dev;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!res.confirm) return [3, 5];
                                _i = 0, mountDevs_1 = mountDevs;
                                _a.label = 1;
                            case 1:
                                if (!(_i < mountDevs_1.length)) return [3, 4];
                                dev = mountDevs_1[_i];
                                return [4, this.deleteMountDev({ currentTarget: { dataset: { item: dev, key: DevMac } } })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3, 1];
                            case 4: return [3, 6];
                            case 5:
                                api_1.default.delUserTerminal(DevMac).then(function () {
                                    wx.startPullDownRefresh();
                                });
                                _a.label = 6;
                            case 6: return [2];
                        }
                    });
                }); }
            });
        }
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
            var arg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_1.default.getuserMountDev()];
                    case 1:
                        arg = (_a.sent()).arg;
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
                        this.sortDevslist();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlRGV2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFuYWdlRGV2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXNEO0FBQ3RELDBDQUFvQztBQUdwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBZ0I7S0FDdkI7SUFLRCxNQUFNLEVBQUU7UUFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVELFlBQVksRUFBWjtRQUFBLGlCQWdCQztRQWZDLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsS0FBSztTQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUE4QjtnQkFBNUIsY0FBSTtZQUNiLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7YUFDWCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDUCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxNQUFNO2dCQUNiLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLE9BQU87b0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0JBQzdDLENBQUM7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxjQUFjLEVBQXBCLFVBQXFCLEtBQW1DOzs7Ozs7d0JBQ2hELEtBQWdCLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUF6QyxJQUFJLFVBQUEsRUFBRSxHQUFHLFNBQUEsQ0FBZ0M7d0JBQ2pELFdBQU0sYUFBRyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFHLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBQTs7d0JBQXBFLFNBQW9FLENBQUE7d0JBQ3BFLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFBOzs7OztLQUMxQjtJQUVELFdBQVcsRUFBWCxVQUFZLEtBQTBCO1FBQzVCLElBQUEsdUNBQUksQ0FBZ0M7UUFDNUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxnREFBZ0QsR0FBRyx1QkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEcsTUFBTSxFQUFFO2dCQUNOLFVBQVU7b0JBQ1IsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFDVixVQUFVLENBQUM7NEJBQ1QsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUE7d0JBQzNCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtvQkFDVCxDQUFDLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0Y7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsS0FBMEI7UUFBcEMsaUJBbUJDO1FBbEJTLElBQUEscUNBQTJCLEVBQW5CLGtCQUFNLEVBQUUsd0JBQVcsQ0FBZ0M7UUFDbkUsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSx3RUFBaUI7Z0JBQzFCLE9BQU8sRUFBRSxVQUFPLEdBQUc7Ozs7O3FDQUNiLEdBQUcsQ0FBQyxPQUFPLEVBQVgsY0FBVztzQ0FDWSxFQUFULHVCQUFTOzs7cUNBQVQsQ0FBQSx1QkFBUyxDQUFBO2dDQUFoQixHQUFHO2dDQUNWLFdBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQVMsQ0FBQyxFQUFBOztnQ0FBNUYsU0FBNEYsQ0FBQTs7O2dDQUQ5RSxJQUFTLENBQUE7Ozs7Z0NBSXpCLGFBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO29DQUMvQixFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtnQ0FDM0IsQ0FBQyxDQUFDLENBQUE7Ozs7O3FCQUVMO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFOzs7Ozs0QkFDRCxXQUFNLGFBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBQTs7d0JBQW5DLEdBQUcsR0FBSyxDQUFBLFNBQTJCLENBQUEsSUFBaEM7d0JBQ1gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFOzRCQUNoQixFQUFFLENBQUMsVUFBVSxDQUFDO2dDQUNaLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztnQ0FDWCxJQUFJLEVBQUUsRUFBRTs2QkFDVCxDQUFDLENBQUE7d0JBQ0osQ0FBQyxDQUFDLENBQUE7d0JBQ0YsRUFBRSxDQUFDLFVBQVUsQ0FBQzs0QkFDWixHQUFHLEVBQUUsS0FBSzs0QkFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUc7eUJBQ2QsQ0FBQyxDQUFBO3dCQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTt3QkFDbkIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0NBR0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JqZWN0VG9TdHJxdWVyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy91dGlsXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5cbi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9pbmRleC5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGRldnM6IFtdIGFzIFRlcm1pbmFsW11cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc29ydERldnNsaXN0KClcbiAgfSxcblxuICBzb3J0RGV2c2xpc3QoKSB7XG4gICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICBrZXk6ICdVdHMnXG4gICAgfSkudGhlbigoeyBkYXRhIH06IHsgZGF0YTogVGVybWluYWxbXSB9KSA9PiB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBkZXZzOiBkYXRhXG4gICAgICB9KVxuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn6K6+5aSH6ZSZ6K+vJyxcbiAgICAgICAgY29udGVudDogJ+e8k+WtmOiiq+a4heeQhuaIluayoeaciee7keWumuiuvuWkhyzor7flnKjpppbpobXkuIvmi4nliLfmlrAnLFxuICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgIHd4LnN3aXRjaFRhYih7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICAvLyDliKDpmaREVFXmjILovb3orr7lpIdcbiAgYXN5bmMgZGVsZXRlTW91bnREZXYoZXZlbnQ6IHZhbnRFdmVudDxUZXJtaW5hbE1vdW50RGV2cz4pIHtcbiAgICBjb25zdCB7IGl0ZW0sIGtleSB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgYXdhaXQgYXBpLmRlbFRlcm1pbmFsTW91bnREZXYoa2V5LCBpdGVtLm1vdW50RGV2LCAoaXRlbS5waWQgYXMgYW55KSlcbiAgICB3eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG4gIC8vIOa3u+WKoOe7keWumuiuvuWkh1xuICBhZGRNb251dERldihldmVudDogdmFudEV2ZW50PFRlcm1pbmFsPikge1xuICAgIGNvbnN0IHsgaXRlbSB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvbWFuYWdlRGV2L2FkZE1vdW50RGV2L2FkZE1vdW50RGV2JyArIE9iamVjdFRvU3RycXVlcnkoeyBpdGVtOiBKU09OLnN0cmluZ2lmeShpdGVtKSB9KSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBhZGRTdWNjZXNzKCkge1xuICAgICAgICAgIHd4Lm5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB3eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOWIoOmZpERUVVxuICBkZWxldGVEVFUoZXZlbnQ6IHZhbnRFdmVudDxUZXJtaW5hbD4pIHtcbiAgICBjb25zdCB7IGl0ZW06IHsgRGV2TWFjLCBtb3VudERldnMgfSB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgaWYgKG1vdW50RGV2cy5sZW5ndGggPiAwKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ1RpcCcsXG4gICAgICAgIGNvbnRlbnQ6IGDmmK/lkKbliKDpmaREVFXnu5HlrprnmoTmiYDmnInorr7lpIc/YCxcbiAgICAgICAgc3VjY2VzczogYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgZm9yIChsZXQgZGV2IG9mIG1vdW50RGV2cykge1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZU1vdW50RGV2KHsgY3VycmVudFRhcmdldDogeyBkYXRhc2V0OiB7IGl0ZW06IGRldiwga2V5OiBEZXZNYWMgfSB9IH0gYXMgYW55KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcGkuZGVsVXNlclRlcm1pbmFsKERldk1hYykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHd4LnN0YXJ0UHVsbERvd25SZWZyZXNoKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHsgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0dXNlck1vdW50RGV2KClcbiAgICBhcmcuVVRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogZWwuX2lkLFxuICAgICAgICBkYXRhOiBlbFxuICAgICAgfSlcbiAgICB9KVxuICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnVXRzJyxcbiAgICAgIGRhdGE6IGFyZy5VVHNcbiAgICB9KVxuICAgIHRoaXMuc29ydERldnNsaXN0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcblxuXG59KSJdfQ==