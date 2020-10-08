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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBc0Q7QUFDdEQsMENBQW9DO0FBQ3BDLHNEQUFnRDtBQUdoRCxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsTUFBTSxFQUFFLEVBQWlCO1FBQ3pCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsUUFBUSxFQUFDLENBQUM7S0FDWDtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzFFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1NBQ2pCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUssY0FBYzs7Ozs7OzRCQUNFLFdBQU0sYUFBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBcEUsS0FBYyxTQUFzRCxFQUFsRSxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsSUFBSSxFQUFFLEVBQUU7NEJBRU4sR0FBRyxDQUFDLE1BQU0sU0FBRyxHQUFHLENBQUMsTUFBTSwwQ0FBRSxHQUFHLENBQUMsVUFBQSxHQUFHO2dDQUM5QixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7b0NBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsbUJBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7b0NBQzlDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO2lDQUNkO2dDQUNELE9BQU8sR0FBRyxDQUFBOzRCQUNaLENBQUMsQ0FBQyxDQUFBOzRCQUNGLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsTUFBTSxFQUFFLEdBQUc7NkJBQ1osQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE9BQU87Z0NBQ2QsT0FBTyxFQUFFLFFBQVE7NkJBQ2xCLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7UUFBQSxpQkFLUDtRQUpDLElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxjQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRSxFQUFyQixDQUFxQixFQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLFVBQUE7U0FDVCxDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsTUFBTSxFQUFFO1FBQ04sYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUtELFFBQVEsRUFBRTtRQUNSLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFLRCxpQkFBaUIsRUFBRTs7Ozs0QkFDakIsV0FBTSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUE7O3dCQUEzQixTQUEyQixDQUFBO3dCQUMzQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztJQUNELFFBQVE7O1FBQ04sSUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxJQUFNLE1BQU0sU0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLDBDQUFFLE1BQU0sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLGVBQWUsRUFBRSxNQUFNO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLEVBQU4sVUFBTyxLQUFnQjtRQUNyQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUN0QixJQUFBLEtBQWUsSUFBSSxDQUFDLElBQUksRUFBdEIsR0FBRyxTQUFBLEVBQUUsR0FBRyxTQUFjLENBQUE7UUFDOUIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSx3QkFBd0IsR0FBRyx1QkFBZ0IsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLEdBQUcsS0FBQSxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUM7U0FDckUsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9iamVjdFRvU3RycXVlcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuaW1wb3J0IHVuaXRDYWNoZSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdW5pdENhY2hlXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvZGV2cy9kZXZzLmpzXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbWFjOiAnJyxcbiAgICBwaWQ6ICcnLFxuICAgIHJlc3VsdDoge30gYXMgcXVlcnlSZXN1bHQsXG4gICAgZmlsdGVyOiAnJyxcbiAgICBpbnRlcnZhbDowXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6IG9wdGlvbnMubW91bnREZXYgfHwgb3B0aW9ucy5tYWMgfHwgJycgfSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWFjOiBvcHRpb25zLm1hYyxcbiAgICAgIHBpZDogb3B0aW9ucy5waWRcbiAgICB9KVxuICAgIHRoaXMuR2V0RGV2c1J1bkluZm8oKVxuICB9LFxuXG4gIGFzeW5jIEdldERldnNSdW5JbmZvKCkge1xuICAgIGNvbnN0IHsgb2ssIGFyZyB9ID0gYXdhaXQgYXBpLmdldERldnNSdW5JbmZvKHRoaXMuZGF0YS5tYWMsIHRoaXMuZGF0YS5waWQpXG4gICAgaWYgKG9rKSB7XG4gICAgICAvL1xuICAgICAgYXJnLnJlc3VsdCA9IGFyZy5yZXN1bHQ/Lm1hcChvYmogPT4ge1xuICAgICAgICBpZiAob2JqLnVuaXQgJiYgL157Lip9JC8udGVzdChvYmoudW5pdCkpIHtcbiAgICAgICAgICBvYmoudmFsdWUgPSB1bml0Q2FjaGUuZ2V0KG9iai52YWx1ZSwgb2JqLnVuaXQpXG4gICAgICAgICAgb2JqLnVuaXQgPSAnJ1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmpcbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICByZXN1bHQ6IGFyZ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgIGNvbnRlbnQ6ICfkv6Hmga/ojrflj5blpLHotKUnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+dGhpcy5HZXREZXZzUnVuSW5mbygpLDUwMDApXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGludGVydmFsXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kYXRhLmludGVydmFsKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5HZXREZXZzUnVuSW5mbygpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuICBvblNlYXJjaCgpIHtcbiAgICBjb25zdCByZWdTdHIgPSBuZXcgUmVnRXhwKHRoaXMuZGF0YS5maWx0ZXIpXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRhLnJlc3VsdC5yZXN1bHQ/LmZpbHRlcihlbCA9PiByZWdTdHIudGVzdChlbC5uYW1lKSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgXCJyZXN1bHQucmVzdWx0XCI6IHJlc3VsdFxuICAgIH0pXG4gIH0sXG4gIG9uQ2FuY2VsKCkge1xuICAgIHRoaXMuR2V0RGV2c1J1bkluZm8oKVxuICB9LFxuICAvLyDov5vlhaXlj4LmlbDnirbmgIFcbiAgb25MaW5lKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0LmlkXG4gICAgY29uc3QgeyBtYWMsIHBpZCB9ID0gdGhpcy5kYXRhXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvbGluZS9saW5lJyArIE9iamVjdFRvU3RycXVlcnkoeyBuYW1lLCBtYWMsIHBpZCB9KVxuICAgIH0pXG4gIH1cbn0pIl19