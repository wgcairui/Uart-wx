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
        active: 0,
        protocol: '',
        setup: {}
    },
    onLoad: function (options) {
        var _this = this;
        var type = Number(options.type) || 0;
        var protocol = options.protocol;
        if (!protocol) {
            wx.navigateTo({
                url: '/pages/index/alarmSetting/index'
            });
        }
        else {
            this.setData({
                active: type,
                protocol: protocol
            });
            wx.getStorage({
                key: 'protocolSetup' + options.protocol,
                success: function (res) {
                    _this.setData({
                        setup: res.data
                    });
                },
                fail: function (_e) {
                    _this.getUserProtocolSetup();
                }
            });
        }
    },
    getUserProtocolSetup: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, arg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, api_1.default.getUserDevConstant(this.data.protocol)];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, arg = _a.arg;
                        if (ok) {
                            this.setData({
                                setup: arg
                            });
                            wx.setStorage({
                                key: 'protocolSetup' + this.data.protocol,
                                data: arg
                            });
                        }
                        return [2];
                }
            });
        });
    },
    tabclick: function (event) {
        wx.setNavigationBarTitle({ title: '协议配置-' + event.detail.title });
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
                    case 0: return [4, this.getUserProtocolSetup()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm1TZXR0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxhcm1TZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQW9DO0FBR3BDLElBQUksQ0FBQztJQUtILElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxDQUFDO1FBQ1QsUUFBUSxFQUFFLEVBQUU7UUFDWixLQUFLLEVBQUUsRUFBK0I7S0FDdkM7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQWpCLGlCQXlCUDtRQXhCQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNaLEdBQUcsRUFBRSxpQ0FBaUM7YUFDdkMsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsTUFBTSxFQUFFLElBQUk7Z0JBQ1osUUFBUSxVQUFBO2FBQ1QsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDWixHQUFHLEVBQUUsZUFBZSxHQUFHLE9BQU8sQ0FBQyxRQUFRO2dCQUN2QyxPQUFPLEVBQUUsVUFBQyxHQUFHO29CQUNYLEtBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJO3FCQUNoQixDQUFDLENBQUE7Z0JBQ0osQ0FBQztnQkFDRCxJQUFJLEVBQUUsVUFBQyxFQUFFO29CQUNQLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFBO2dCQUM3QixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7SUFFSCxDQUFDO0lBR0ssb0JBQW9COzs7Ozs0QkFDSixXQUFNLGFBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBOUQsS0FBYyxTQUFnRCxFQUE1RCxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsSUFBSSxFQUFFLEVBQUU7NEJBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxLQUFLLEVBQUUsR0FBRzs2QkFDWCxDQUFDLENBQUE7NEJBQ0YsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQ0FDWixHQUFHLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtnQ0FDekMsSUFBSSxFQUFFLEdBQUc7NkJBQ1YsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBQ0QsUUFBUSxFQUFSLFVBQVMsS0FBZ0I7UUFDdkIsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDbkUsQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTs7Ozs0QkFDakIsV0FBTSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBQTs7d0JBQWpDLFNBQWlDLENBQUE7d0JBQ2pDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBOzs7OztLQUN6QjtJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2FsYXJtU2V0dGluZy5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGFjdGl2ZTogMCxcbiAgICBwcm90b2NvbDogJycsXG4gICAgc2V0dXA6IHt9IGFzIFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGRcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBjb25zdCB0eXBlID0gTnVtYmVyKG9wdGlvbnMudHlwZSkgfHwgMFxuICAgIGNvbnN0IHByb3RvY29sID0gb3B0aW9ucy5wcm90b2NvbFxuICAgIGlmICghcHJvdG9jb2wpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2luZGV4J1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYWN0aXZlOiB0eXBlLFxuICAgICAgICBwcm90b2NvbFxuICAgICAgfSlcbiAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdwcm90b2NvbFNldHVwJyArIG9wdGlvbnMucHJvdG9jb2wsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgc2V0dXA6IHJlcy5kYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKF9lKSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRVc2VyUHJvdG9jb2xTZXR1cCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gIH0sXG5cbiAgLy8g6I635Y+W55So5oi35Y2P6K6u6YWN572uXG4gIGFzeW5jIGdldFVzZXJQcm90b2NvbFNldHVwKCkge1xuICAgIGNvbnN0IHsgb2ssIGFyZyB9ID0gYXdhaXQgYXBpLmdldFVzZXJEZXZDb25zdGFudCh0aGlzLmRhdGEucHJvdG9jb2wpXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzZXR1cDogYXJnXG4gICAgICB9KVxuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ3Byb3RvY29sU2V0dXAnICsgdGhpcy5kYXRhLnByb3RvY29sLFxuICAgICAgICBkYXRhOiBhcmdcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICB0YWJjbGljayhldmVudDogdmFudEV2ZW50KSB7XG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6ICfljY/orq7phY3nva4tJyArIGV2ZW50LmRldGFpbC50aXRsZSB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRVc2VyUHJvdG9jb2xTZXR1cCgpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==