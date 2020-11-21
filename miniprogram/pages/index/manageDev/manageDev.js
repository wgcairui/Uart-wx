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
        else {
            api_1.default.delUserTerminal(DevMac).then(function () {
                wx.startPullDownRefresh();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlRGV2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFuYWdlRGV2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXNEO0FBQ3RELDBDQUFvQztBQUdwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBZ0I7S0FDdkI7SUFLRCxNQUFNLEVBQUU7UUFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVELFlBQVksRUFBWjtRQUFBLGlCQWdCQztRQWZDLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsS0FBSztTQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUE4QjtnQkFBNUIsY0FBSTtZQUNiLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7YUFDWCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDUCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxNQUFNO2dCQUNiLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLE9BQU87b0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0JBQzdDLENBQUM7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxjQUFjLEVBQXBCLFVBQXFCLEtBQW1DOzs7Ozs7d0JBQ2hELEtBQWdCLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUF6QyxJQUFJLFVBQUEsRUFBRSxHQUFHLFNBQUEsQ0FBZ0M7d0JBQ2pELFdBQU0sYUFBRyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFHLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBQTs7d0JBQXBFLFNBQW9FLENBQUE7d0JBQ3BFLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFBOzs7OztLQUMxQjtJQUVELFdBQVcsRUFBWCxVQUFZLEtBQTBCO1FBQzVCLElBQUEsdUNBQUksQ0FBZ0M7UUFDNUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxnREFBZ0QsR0FBRyx1QkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEcsTUFBTSxFQUFFO2dCQUNOLFVBQVU7b0JBQ1IsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFDVixVQUFVLENBQUM7NEJBQ1QsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUE7d0JBQzNCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtvQkFDVCxDQUFDLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0Y7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsS0FBMEI7UUFBcEMsaUJBdUJDO1FBdEJTLElBQUEscUNBQTJCLEVBQW5CLGtCQUFNLEVBQUUsd0JBQVcsQ0FBZ0M7UUFDbkUsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSx3RUFBaUI7Z0JBQzFCLE9BQU8sRUFBRSxVQUFPLEdBQUc7Ozs7O3FDQUNiLEdBQUcsQ0FBQyxPQUFPLEVBQVgsY0FBVztzQ0FDWSxFQUFULHVCQUFTOzs7cUNBQVQsQ0FBQSx1QkFBUyxDQUFBO2dDQUFoQixHQUFHO2dDQUNWLFdBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQVMsQ0FBQyxFQUFBOztnQ0FBNUYsU0FBNEYsQ0FBQTs7O2dDQUQ5RSxJQUFTLENBQUE7Ozs7Z0NBSXpCLGFBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO29DQUMvQixFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtnQ0FDM0IsQ0FBQyxDQUFDLENBQUE7Ozs7O3FCQUVMO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLGFBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMvQixFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtZQUMzQixDQUFDLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTs7Ozs7NEJBQ0QsV0FBTSxhQUFHLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUFuQyxHQUFHLEdBQUssQ0FBQSxTQUEyQixDQUFBLElBQWhDO3dCQUNYLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTs0QkFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQ0FDWixHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUc7Z0NBQ1gsSUFBSSxFQUFFLEVBQUU7NkJBQ1QsQ0FBQyxDQUFBO3dCQUNKLENBQUMsQ0FBQyxDQUFBO3dCQUNGLEVBQUUsQ0FBQyxVQUFVLENBQUM7NEJBQ1osR0FBRyxFQUFFLEtBQUs7NEJBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHO3lCQUNkLENBQUMsQ0FBQTt3QkFDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7d0JBQ25CLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBOzs7OztLQUN6QjtDQUdGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9iamVjdFRvU3RycXVlcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG4vLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvaW5kZXguanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBkZXZzOiBbXSBhcyBUZXJtaW5hbFtdXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNvcnREZXZzbGlzdCgpXG4gIH0sXG5cbiAgc29ydERldnNsaXN0KCkge1xuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnVXRzJ1xuICAgIH0pLnRoZW4oKHsgZGF0YSB9OiB7IGRhdGE6IFRlcm1pbmFsW10gfSkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgZGV2czogZGF0YVxuICAgICAgfSlcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+iuvuWkh+mUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6ICfnvJPlrZjooqvmuIXnkIbmiJbmsqHmnInnu5Hlrprorr7lpIcs6K+35Zyo6aaW6aG15LiL5ouJ5Yi35pawJyxcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgLy8g5Yig6ZmkRFRV5oyC6L296K6+5aSHXG4gIGFzeW5jIGRlbGV0ZU1vdW50RGV2KGV2ZW50OiB2YW50RXZlbnQ8VGVybWluYWxNb3VudERldnM+KSB7XG4gICAgY29uc3QgeyBpdGVtLCBrZXkgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldFxuICAgIGF3YWl0IGFwaS5kZWxUZXJtaW5hbE1vdW50RGV2KGtleSwgaXRlbS5tb3VudERldiwgKGl0ZW0ucGlkIGFzIGFueSkpXG4gICAgd3guc3RhcnRQdWxsRG93blJlZnJlc2goKVxuICB9LFxuICAvLyDmt7vliqDnu5Hlrprorr7lpIdcbiAgYWRkTW9udXREZXYoZXZlbnQ6IHZhbnRFdmVudDxUZXJtaW5hbD4pIHtcbiAgICBjb25zdCB7IGl0ZW0gfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldFxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L21hbmFnZURldi9hZGRNb3VudERldi9hZGRNb3VudERldicgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgaXRlbTogSlNPTi5zdHJpbmdpZnkoaXRlbSkgfSksXG4gICAgICBldmVudHM6IHtcbiAgICAgICAgYWRkU3VjY2VzcygpIHtcbiAgICAgICAgICB3eC5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgd3guc3RhcnRQdWxsRG93blJlZnJlc2goKVxuICAgICAgICAgICAgfSwgNTAwKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDliKDpmaREVFVcbiAgZGVsZXRlRFRVKGV2ZW50OiB2YW50RXZlbnQ8VGVybWluYWw+KSB7XG4gICAgY29uc3QgeyBpdGVtOiB7IERldk1hYywgbW91bnREZXZzIH0gfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldFxuICAgIGlmIChtb3VudERldnMubGVuZ3RoID4gMCkge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdUaXAnLFxuICAgICAgICBjb250ZW50OiBg5piv5ZCm5Yig6ZmkRFRV57uR5a6a55qE5omA5pyJ6K6+5aSHP2AsXG4gICAgICAgIHN1Y2Nlc3M6IGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGRldiBvZiBtb3VudERldnMpIHtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVNb3VudERldih7IGN1cnJlbnRUYXJnZXQ6IHsgZGF0YXNldDogeyBpdGVtOiBkZXYsIGtleTogRGV2TWFjIH0gfSB9IGFzIGFueSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBpLmRlbFVzZXJUZXJtaW5hbChEZXZNYWMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB3eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLmRlbFVzZXJUZXJtaW5hbChEZXZNYWMpLnRoZW4oKCkgPT4ge1xuICAgICAgICB3eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHsgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0dXNlck1vdW50RGV2KClcbiAgICBhcmcuVVRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogZWwuX2lkLFxuICAgICAgICBkYXRhOiBlbFxuICAgICAgfSlcbiAgICB9KVxuICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnVXRzJyxcbiAgICAgIGRhdGE6IGFyZy5VVHNcbiAgICB9KVxuICAgIHRoaXMuc29ydERldnNsaXN0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcblxuXG59KSJdfQ==