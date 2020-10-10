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
var unitCache_1 = require("../../../utils/unitCache");
Page({
    data: {
        mac: '',
        pid: '',
        result: {},
        filter: '',
        interval: 0
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({ title: options.mountDev || options.mac || '' });
        this.setData({
            mac: options.mac,
            pid: options.pid
        });
        this.GetDevsRunInfo();
    },
    GetDevsRunInfo: function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, ok, arg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, api_1.default.getDevsRunInfo(this.data.mac, this.data.pid)];
                    case 1:
                        _b = _c.sent(), ok = _b.ok, arg = _b.arg;
                        if (ok) {
                            arg.result = (_a = arg.result) === null || _a === void 0 ? void 0 : _a.map(function (obj) {
                                if (obj.unit && /^{.*}$/.test(obj.unit)) {
                                    obj.value = unitCache_1.default.get(obj.value, obj.unit);
                                    obj.unit = '';
                                }
                                return obj;
                            });
                            this.setData({
                                result: arg
                            });
                        }
                        else {
                            wx.showModal({
                                title: 'Error',
                                content: '信息获取失败'
                            });
                        }
                        return [2];
                }
            });
        });
    },
    onReady: function () {
    },
    onShow: function () {
        var _this = this;
        var interval = setInterval(function () { return _this.GetDevsRunInfo(); }, 5000);
        this.setData({
            interval: interval
        });
    },
    onHide: function () {
        clearInterval(this.data.interval);
    },
    onUnload: function () {
        clearInterval(this.data.interval);
    },
    onPullDownRefresh: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetDevsRunInfo()];
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
    },
    onSearch: function () {
        var _a;
        var regStr = new RegExp(this.data.filter);
        var result = (_a = this.data.result.result) === null || _a === void 0 ? void 0 : _a.filter(function (el) { return regStr.test(el.name); });
        this.setData({
            "result.result": result
        });
    },
    onCancel: function () {
        this.GetDevsRunInfo();
    },
    onLine: function (event) {
        var name = event.target.id;
        var _a = this.data, mac = _a.mac, pid = _a.pid;
        wx.navigateTo({
            url: '/pages/index/line/line' + util_1.ObjectToStrquery({ name: name, mac: mac, pid: pid })
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBc0Q7QUFDdEQsMENBQW9DO0FBQ3BDLHNEQUFnRDtBQUdoRCxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsTUFBTSxFQUFFLEVBQWlCO1FBQ3pCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsUUFBUSxFQUFDLENBQUM7S0FDWDtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzFFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1NBQ2pCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUssY0FBYzs7Ozs7OzRCQUNFLFdBQU0sYUFBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBcEUsS0FBYyxTQUFzRCxFQUFsRSxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsSUFBSSxFQUFFLEVBQUU7NEJBRU4sR0FBRyxDQUFDLE1BQU0sU0FBRyxHQUFHLENBQUMsTUFBTSwwQ0FBRSxHQUFHLENBQUMsVUFBQSxHQUFHO2dDQUM5QixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7b0NBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsbUJBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7b0NBQzlDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO2lDQUNkO2dDQUNELE9BQU8sR0FBRyxDQUFBOzRCQUNaLENBQUMsQ0FBQyxDQUFBOzRCQUNGLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsTUFBTSxFQUFFLEdBQUc7NkJBQ1osQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE9BQU87Z0NBQ2QsT0FBTyxFQUFFLFFBQVE7NkJBQ2xCLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7UUFBQSxpQkFLUDtRQUpDLElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxjQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixFQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLFVBQUE7U0FDVCxDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsTUFBTSxFQUFFO1FBQ04sYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUtELFFBQVEsRUFBRTtRQUNSLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFLRCxpQkFBaUIsRUFBRTs7Ozs0QkFDakIsV0FBTSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUE7O3dCQUEzQixTQUEyQixDQUFBO3dCQUMzQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztJQUNELFFBQVE7O1FBQ04sSUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxJQUFNLE1BQU0sU0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLE1BQU0sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLGVBQWUsRUFBRSxNQUFNO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLEVBQU4sVUFBTyxLQUFnQjtRQUNyQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUN0QixJQUFBLGNBQXdCLEVBQXRCLFlBQUcsRUFBRSxZQUFpQixDQUFBO1FBQzlCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsd0JBQXdCLEdBQUcsdUJBQWdCLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDO1NBQ3JFLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUb1N0cnF1ZXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIlxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcbmltcG9ydCB1bml0Q2FjaGUgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3VuaXRDYWNoZVwiXG5cbi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2RldnMvZGV2cy5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG1hYzogJycsXG4gICAgcGlkOiAnJyxcbiAgICByZXN1bHQ6IHt9IGFzIHF1ZXJ5UmVzdWx0LFxuICAgIGZpbHRlcjogJycsXG4gICAgaW50ZXJ2YWw6MFxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiBvcHRpb25zLm1vdW50RGV2IHx8IG9wdGlvbnMubWFjIHx8ICcnIH0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1hYzogb3B0aW9ucy5tYWMsXG4gICAgICBwaWQ6IG9wdGlvbnMucGlkXG4gICAgfSlcbiAgICB0aGlzLkdldERldnNSdW5JbmZvKClcbiAgfSxcblxuICBhc3luYyBHZXREZXZzUnVuSW5mbygpIHtcbiAgICBjb25zdCB7IG9rLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXREZXZzUnVuSW5mbyh0aGlzLmRhdGEubWFjLCB0aGlzLmRhdGEucGlkKVxuICAgIGlmIChvaykge1xuICAgICAgLy9cbiAgICAgIGFyZy5yZXN1bHQgPSBhcmcucmVzdWx0Py5tYXAob2JqID0+IHtcbiAgICAgICAgaWYgKG9iai51bml0ICYmIC9eey4qfSQvLnRlc3Qob2JqLnVuaXQpKSB7XG4gICAgICAgICAgb2JqLnZhbHVlID0gdW5pdENhY2hlLmdldChvYmoudmFsdWUsIG9iai51bml0KVxuICAgICAgICAgIG9iai51bml0ID0gJydcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqXG4gICAgICB9KVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgcmVzdWx0OiBhcmdcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICBjb250ZW50OiAn5L+h5oGv6I635Y+W5aSx6LSlJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCk9PnRoaXMuR2V0RGV2c1J1bkluZm8oKSw1MDAwKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBpbnRlcnZhbFxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHRoaXMuR2V0RGV2c1J1bkluZm8oKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICovXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcbiAgb25TZWFyY2goKSB7XG4gICAgY29uc3QgcmVnU3RyID0gbmV3IFJlZ0V4cCh0aGlzLmRhdGEuZmlsdGVyKVxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0YS5yZXN1bHQucmVzdWx0Py5maWx0ZXIoZWwgPT4gcmVnU3RyLnRlc3QoZWwubmFtZSkpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFwicmVzdWx0LnJlc3VsdFwiOiByZXN1bHRcbiAgICB9KVxuICB9LFxuICBvbkNhbmNlbCgpIHtcbiAgICB0aGlzLkdldERldnNSdW5JbmZvKClcbiAgfSxcbiAgLy8g6L+b5YWl5Y+C5pWw54q25oCBXG4gIG9uTGluZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5pZFxuICAgIGNvbnN0IHsgbWFjLCBwaWQgfSA9IHRoaXMuZGF0YVxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2xpbmUvbGluZScgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgbmFtZSwgbWFjLCBwaWQgfSlcbiAgICB9KVxuICB9XG59KSJdfQ==