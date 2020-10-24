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
        mountDev: "",
        result: {},
        filter: '',
        interval: 0,
        protocol: ''
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({ title: options.mountDev || options.mac || '' });
        this.setData({
            mac: options.DevMac,
            pid: options.pid,
            protocol: options.protocol,
            mountDev: options.mountDev
        });
    },
    onReady: function () {
        this.GetDevsRunInfo();
    },
    onShow: function () {
        var _this = this;
        this.setData({
            interval: setInterval(function () { return _this.GetDevsRunInfo(); }, 5000)
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
    GetDevsRunInfo: function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, mac, pid, filter, _c, ok, arg, msg, regStr_1;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = this.data, mac = _b.mac, pid = _b.pid, filter = _b.filter;
                        return [4, api_1.default.getDevsRunInfo(mac, pid)];
                    case 1:
                        _c = _d.sent(), ok = _c.ok, arg = _c.arg, msg = _c.msg;
                        if (ok && arg) {
                            regStr_1 = new RegExp(filter);
                            arg.result = (_a = arg.result) === null || _a === void 0 ? void 0 : _a.filter(function (el) { return !filter || regStr_1.test(el.name); }).map(function (obj) { return Object.assign(obj, unitCache_1.default.get(obj.value, obj.unit || '')); });
                            this.setData({
                                result: arg
                            });
                        }
                        else {
                            clearInterval(this.data.interval);
                            wx.showModal({
                                title: 'Error',
                                content: msg,
                                success: function () {
                                    clearInterval(_this.data.interval);
                                    wx.navigateBack();
                                }
                            });
                        }
                        return [2];
                }
            });
        });
    },
    filter: function (e) {
        var _a;
        var filter = e.detail.filter;
        var regStr = new RegExp(filter);
        var result = (_a = this.data.result.result) === null || _a === void 0 ? void 0 : _a.filter(function (el) { return regStr.test(el.name); });
        this.setData({
            filter: filter,
            "result.result": result
        });
    },
    toline: function (e) {
        wx.navigateTo({
            url: '/pages/index/line/line' + util_1.ObjectToStrquery({ name: e.detail.name, mac: this.data.mac, pid: this.data.pid })
        });
    },
    oprate: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var item, _a, ok, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        item = e.detail;
                        if (item.value.includes("%i")) {
                            console.log(item.value);
                        }
                        return [4, api_1.default.SendProcotolInstructSet({ mountDev: this.data.mountDev, pid: Number(this.data.pid), protocol: this.data.protocol, DevMac: this.data.mac }, item)];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, msg = _a.msg;
                        wx.showModal({
                            title: ok ? 'Success' : 'Error',
                            content: msg
                        });
                        return [2];
                }
            });
        });
    },
    alarm: function (e) {
        var type = e.detail.type;
        wx.navigateTo({
            url: '/pages/index/alarmSetting/alarmSetting' + util_1.ObjectToStrquery({ type: type, protocol: this.data.protocol })
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBc0Q7QUFDdEQsMENBQW9DO0FBQ3BDLHNEQUFnRDtBQUNoRCxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsUUFBUSxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsRUFBaUI7UUFDekIsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsQ0FBQztRQUNYLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ25CLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztZQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1NBQzNCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFJRCxNQUFNLEVBQUU7UUFBQSxpQkFJUDtRQUhDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsV0FBVyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFLEVBQXJCLENBQXFCLEVBQUUsSUFBSSxDQUFDO1NBQ3pELENBQUMsQ0FBQTtJQUNKLENBQUM7SUFLRCxNQUFNLEVBQUU7UUFDTixhQUFhLENBQUMsSUFBSSxDQUFDLElB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LENBQVk7Ozs7Ozt3QkFDakIsSUFBSSxHQUFtQixDQUFDLENBQUMsTUFBTSxDQUFBO3dCQUNyQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFFekI7d0JBQ21CLFdBQU0sYUFBRyxDQUFDLHVCQUF1QixDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUF4SyxLQUFjLFNBQTBKLEVBQXRLLEVBQUUsUUFBQSxFQUFFLEdBQUcsU0FBQTt3QkFDZixFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNYLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTzs0QkFDL0IsT0FBTyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQyxDQUFBOzs7OztLQUNIO0lBRUQsS0FBSyxFQUFMLFVBQU0sQ0FBWTtRQUNoQixJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQWMsQ0FBQTtRQUNwQyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLHdDQUF3QyxHQUFHLHVCQUFnQixDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDekcsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2RldnMvZGV2cy5qc1xuaW1wb3J0IHsgT2JqZWN0VG9TdHJxdWVyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy91dGlsXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5pbXBvcnQgdW5pdENhY2hlIGZyb20gXCIuLi8uLi8uLi91dGlscy91bml0Q2FjaGVcIlxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG1hYzogJycsXG4gICAgcGlkOiAnJyxcbiAgICBtb3VudERldjogXCJcIixcbiAgICByZXN1bHQ6IHt9IGFzIHF1ZXJ5UmVzdWx0LFxuICAgIGZpbHRlcjogJycsXG4gICAgaW50ZXJ2YWw6IDAsXG4gICAgcHJvdG9jb2w6ICcnXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6IG9wdGlvbnMubW91bnREZXYgfHwgb3B0aW9ucy5tYWMgfHwgJycgfSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWFjOiBvcHRpb25zLkRldk1hYyxcbiAgICAgIHBpZDogb3B0aW9ucy5waWQsXG4gICAgICBwcm90b2NvbDogb3B0aW9ucy5wcm90b2NvbCxcbiAgICAgIG1vdW50RGV2OiBvcHRpb25zLm1vdW50RGV2XG4gICAgfSlcbiAgfSxcbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLkdldERldnNSdW5JbmZvKClcbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKCgpID0+IHRoaXMuR2V0RGV2c1J1bkluZm8oKSwgNTAwMClcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kYXRhLmludGVydmFsKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLkdldERldnNSdW5JbmZvKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcbiAgYXN5bmMgR2V0RGV2c1J1bkluZm8oKSB7XG4gICAgY29uc3QgeyBtYWMsIHBpZCwgZmlsdGVyIH0gPSB0aGlzLmRhdGFcbiAgICBjb25zdCB7IG9rLCBhcmcsIG1zZyB9ID0gYXdhaXQgYXBpLmdldERldnNSdW5JbmZvKG1hYywgcGlkKVxuICAgIGlmIChvayAmJiBhcmcpIHtcbiAgICAgIGNvbnN0IHJlZ1N0ciA9IG5ldyBSZWdFeHAoZmlsdGVyKVxuICAgICAgYXJnLnJlc3VsdCA9IGFyZy5yZXN1bHQ/LmZpbHRlcihlbCA9PiAhZmlsdGVyIHx8IHJlZ1N0ci50ZXN0KGVsLm5hbWUpKS5tYXAob2JqID0+IE9iamVjdC5hc3NpZ24ob2JqLCB1bml0Q2FjaGUuZ2V0KG9iai52YWx1ZSwgb2JqLnVuaXQgfHwgJycpKSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHJlc3VsdDogYXJnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICBjb250ZW50OiBtc2csXG4gICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g5Yi36YCJ5Y+C5pWwXG4gIGZpbHRlcihlOiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBlLmRldGFpbC5maWx0ZXJcbiAgICBjb25zdCByZWdTdHIgPSBuZXcgUmVnRXhwKGZpbHRlcilcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGEucmVzdWx0LnJlc3VsdD8uZmlsdGVyKGVsID0+IHJlZ1N0ci50ZXN0KGVsLm5hbWUpKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBmaWx0ZXIsXG4gICAgICBcInJlc3VsdC5yZXN1bHRcIjogcmVzdWx0XG4gICAgfSlcbiAgfSxcbiAgLy8g5a+86Iiq5Yiw5Zu+6KGoXG4gIHRvbGluZShlOiB2YW50RXZlbnQpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9saW5lL2xpbmUnICsgT2JqZWN0VG9TdHJxdWVyeSh7IG5hbWU6IGUuZGV0YWlsLm5hbWUsIG1hYzogdGhpcy5kYXRhLm1hYywgcGlkOiB0aGlzLmRhdGEucGlkIH0pXG4gICAgfSlcbiAgfSxcbiAgLy8g5Y+R6YCB5pON5L2c5oyH5LukXG4gIGFzeW5jIG9wcmF0ZShlOiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBpdGVtOiBPcHJhdGVJbnN0cnVjdCA9IGUuZGV0YWlsXG4gICAgaWYgKGl0ZW0udmFsdWUuaW5jbHVkZXMoXCIlaVwiKSkge1xuICAgICAgY29uc29sZS5sb2coaXRlbS52YWx1ZSk7XG5cbiAgICB9XG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkuU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQoeyBtb3VudERldjogdGhpcy5kYXRhLm1vdW50RGV2LCBwaWQ6IE51bWJlcih0aGlzLmRhdGEucGlkKSwgcHJvdG9jb2w6IHRoaXMuZGF0YS5wcm90b2NvbCwgRGV2TWFjOiB0aGlzLmRhdGEubWFjIH0sIGl0ZW0pXG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiBvayA/ICdTdWNjZXNzJyA6ICdFcnJvcicsXG4gICAgICBjb250ZW50OiBtc2dcbiAgICB9KVxuICB9LFxuICAvLyDot7PovazlkYroraborr7nva5cbiAgYWxhcm0oZTogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdHlwZSA9IGUuZGV0YWlsLnR5cGUgYXMgc3RyaW5nXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2FsYXJtU2V0dGluZycgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgdHlwZSwgcHJvdG9jb2w6IHRoaXMuZGF0YS5wcm90b2NvbCB9KVxuICAgIH0pXG4gIH1cbn0pIl19