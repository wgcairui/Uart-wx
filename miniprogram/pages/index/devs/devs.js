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
        protocol: '',
        _oprateStat: false
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({ title: '获取运行数据' });
                        return [4, this.GetDevsRunInfo()];
                    case 1:
                        _a.sent();
                        wx.hideLoading();
                        return [2];
                }
            });
        });
    },
    onShow: function () {
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, mac, pid, filter, _b, ok, arg, msg, regStr_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.data, mac = _a.mac, pid = _a.pid, filter = _a.filter;
                        return [4, api_1.default.getDevsRunInfo(mac, pid)];
                    case 1:
                        _b = _c.sent(), ok = _b.ok, arg = _b.arg, msg = _b.msg;
                        if (ok && arg) {
                            regStr_1 = new RegExp(filter);
                            arg.result = arg.result.filter(function (el) { return !filter || regStr_1.test(el.name); }).map(function (obj) { return Object.assign(obj, unitCache_1.default.get(obj.value, obj.unit || '')); });
                            arg.time = new Date(arg.time).toLocaleString();
                            this.setData({
                                result: arg,
                                interval: setTimeout(function () {
                                    _this.GetDevsRunInfo();
                                }, arg.Interval || 5000)
                            });
                        }
                        else {
                            clearInterval(this.data.interval);
                            wx.showModal({
                                title: 'Error',
                                content: msg,
                                success: function () {
                                    clearInterval(_this.data.interval);
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
            url: '/pages/index/line/line' + util_1.ObjectToStrquery({ name: e.detail.name, mac: this.data.mac, pid: this.data.pid, protocol: this.data.protocol })
        });
    },
    oprate: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var item, _a, ok, msg;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.data._oprateStat)
                            return [2];
                        item = e.detail;
                        if (item.value.includes("%i") && !item.val) {
                            wx.navigateTo({
                                url: '/pages/util/setVal/setVal' + util_1.ObjectToStrquery({ item: item }),
                                events: {
                                    valueOk: function (value) {
                                        item.val = value.val;
                                        _this.oprate({ detail: item });
                                    }
                                }
                            });
                            return [2];
                        }
                        wx.showLoading({ title: '正在发送' });
                        this.setData({
                            _oprateStat: true
                        });
                        return [4, api_1.default.SendProcotolInstructSet({ mountDev: this.data.mountDev, pid: Number(this.data.pid), protocol: this.data.protocol, DevMac: this.data.mac }, item)];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, msg = _a.msg;
                        this.setData({
                            _oprateStat: false
                        });
                        wx.hideLoading();
                        if (ok === 4) {
                            wx.showModal({
                                title: '权限验证',
                                content: '操作指令需要验证您的设备,是否通过短信开始验证？',
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.navigateTo({
                                            url: '/pages/util/smsValidation/smsValidation',
                                            events: {
                                                validationSuccess: function () {
                                                    console.log('sms validation success');
                                                    _this.oprate({ detail: item });
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        else {
                            wx.showModal({
                                title: ok ? 'Success' : 'Error',
                                content: msg
                            });
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBc0Q7QUFDdEQsMENBQW9DO0FBQ3BDLHNEQUFnRDtBQUNoRCxJQUFJLENBQUM7SUFNSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsUUFBUSxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsRUFBaUI7UUFDekIsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsQ0FBQztRQUNYLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7S0FDbkI7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ25CLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztZQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1NBQzNCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSyxPQUFPOzs7Ozt3QkFDWCxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7d0JBQ25DLFdBQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFBOzt3QkFBM0IsU0FBMkIsQ0FBQTt3QkFDM0IsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7OztLQUNqQjtJQUlELE1BQU0sRUFBRTtJQUlSLENBQUM7SUFLRCxNQUFNLEVBQUU7UUFDTixhQUFhLENBQUMsSUFB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LElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQWMsQ0FBQTtRQUNwQyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLHdDQUF3QyxHQUFHLHVCQUFnQixDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDekcsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2RldnMvZGV2cy5qc1xuaW1wb3J0IHsgT2JqZWN0VG9TdHJxdWVyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy91dGlsXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5pbXBvcnQgdW5pdENhY2hlIGZyb20gXCIuLi8uLi8uLi91dGlscy91bml0Q2FjaGVcIlxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cblxuICBkYXRhOiB7XG4gICAgbWFjOiAnJyxcbiAgICBwaWQ6ICcnLFxuICAgIG1vdW50RGV2OiBcIlwiLFxuICAgIHJlc3VsdDoge30gYXMgcXVlcnlSZXN1bHQsXG4gICAgZmlsdGVyOiAnJyxcbiAgICBpbnRlcnZhbDogMCxcbiAgICBwcm90b2NvbDogJycsXG4gICAgX29wcmF0ZVN0YXQ6IGZhbHNlXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6IG9wdGlvbnMubW91bnREZXYgfHwgb3B0aW9ucy5tYWMgfHwgJycgfSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWFjOiBvcHRpb25zLkRldk1hYyxcbiAgICAgIHBpZDogb3B0aW9ucy5waWQsXG4gICAgICBwcm90b2NvbDogb3B0aW9ucy5wcm90b2NvbCxcbiAgICAgIG1vdW50RGV2OiBvcHRpb25zLm1vdW50RGV2XG4gICAgfSlcbiAgfSxcbiAgYXN5bmMgb25SZWFkeSgpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn6I635Y+W6L+Q6KGM5pWw5o2uJyB9KVxuICAgIGF3YWl0IHRoaXMuR2V0RGV2c1J1bkluZm8oKVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAvKiB0aGlzLnNldERhdGEoe1xuICAgICAgaW50ZXJ2YWw6IHNldEludGVydmFsKCgpID0+IHRoaXMuR2V0RGV2c1J1bkluZm8oKSwgNTAwMClcbiAgICB9KSAqL1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kYXRhLmludGVydmFsKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLkdldERldnNSdW5JbmZvKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcbiAgYXN5bmMgR2V0RGV2c1J1bkluZm8oKSB7XG4gICAgY29uc3QgeyBtYWMsIHBpZCwgZmlsdGVyIH0gPSB0aGlzLmRhdGFcbiAgICBjb25zdCB7IG9rLCBhcmcsIG1zZyB9ID0gYXdhaXQgYXBpLmdldERldnNSdW5JbmZvKG1hYywgcGlkKVxuICAgIGlmIChvayAmJiBhcmcpIHtcbiAgICAgIGNvbnN0IHJlZ1N0ciA9IG5ldyBSZWdFeHAoZmlsdGVyKVxuICAgICAgYXJnLnJlc3VsdCA9IGFyZy5yZXN1bHQuZmlsdGVyKGVsID0+ICFmaWx0ZXIgfHwgcmVnU3RyLnRlc3QoZWwubmFtZSkpLm1hcChvYmogPT4gT2JqZWN0LmFzc2lnbihvYmosIHVuaXRDYWNoZS5nZXQob2JqLnZhbHVlLCBvYmoudW5pdCB8fCAnJykpKVxuICAgICAgYXJnLnRpbWUgPSBuZXcgRGF0ZShhcmcudGltZSEpLnRvTG9jYWxlU3RyaW5nKClcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHJlc3VsdDogYXJnLFxuICAgICAgICBpbnRlcnZhbDogc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5HZXREZXZzUnVuSW5mbygpXG4gICAgICAgIH0sIGFyZy5JbnRlcnZhbCB8fCA1MDAwKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgY29udGVudDogbXNnLFxuICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gICAgICAgICAgLy93eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g5Yi36YCJ5Y+C5pWwXG4gIGZpbHRlcihlOiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBlLmRldGFpbC5maWx0ZXJcbiAgICBjb25zdCByZWdTdHIgPSBuZXcgUmVnRXhwKGZpbHRlcilcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGEucmVzdWx0LnJlc3VsdD8uZmlsdGVyKGVsID0+IHJlZ1N0ci50ZXN0KGVsLm5hbWUpKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBmaWx0ZXIsXG4gICAgICBcInJlc3VsdC5yZXN1bHRcIjogcmVzdWx0XG4gICAgfSlcbiAgfSxcbiAgLy8g5a+86Iiq5Yiw5Zu+6KGoXG4gIHRvbGluZShlOiB2YW50RXZlbnQpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9saW5lL2xpbmUnICsgT2JqZWN0VG9TdHJxdWVyeSh7IG5hbWU6IGUuZGV0YWlsLm5hbWUsIG1hYzogdGhpcy5kYXRhLm1hYywgcGlkOiB0aGlzLmRhdGEucGlkLCBwcm90b2NvbDogdGhpcy5kYXRhLnByb3RvY29sIH0pXG4gICAgfSlcbiAgfSxcbiAgLy8g5Y+R6YCB5pON5L2c5oyH5LukXG4gIGFzeW5jIG9wcmF0ZShlOiBQaWNrPHZhbnRFdmVudCwgJ2RldGFpbCc+KSB7XG4gICAgaWYgKHRoaXMuZGF0YS5fb3ByYXRlU3RhdCkgcmV0dXJuXG4gICAgY29uc3QgaXRlbTogT3ByYXRlSW5zdHJ1Y3QgPSBlLmRldGFpbFxuICAgIGlmIChpdGVtLnZhbHVlLmluY2x1ZGVzKFwiJWlcIikgJiYgIWl0ZW0udmFsKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL3V0aWwvc2V0VmFsL3NldFZhbCcgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgaXRlbSB9KSxcbiAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgdmFsdWVPazogKHZhbHVlOiB7IHZhbDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0udmFsID0gdmFsdWUudmFsXG4gICAgICAgICAgICB0aGlzLm9wcmF0ZSh7IGRldGFpbDogaXRlbSB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5q2j5Zyo5Y+R6YCBJyB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBfb3ByYXRlU3RhdDogdHJ1ZVxuICAgIH0pXG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkuU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQoeyBtb3VudERldjogdGhpcy5kYXRhLm1vdW50RGV2LCBwaWQ6IE51bWJlcih0aGlzLmRhdGEucGlkKSwgcHJvdG9jb2w6IHRoaXMuZGF0YS5wcm90b2NvbCwgRGV2TWFjOiB0aGlzLmRhdGEubWFjIH0sIGl0ZW0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIF9vcHJhdGVTdGF0OiBmYWxzZVxuICAgIH0pXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIC8vIOWmguaenOiuvuWkh+acqumAmui/h+agoemqjO+8jOWImei3s+i9rOWIsOagoemqjOefreS/oemqjOivgeeggemhtemdolxuICAgIGlmIChvayA9PT0gNCkge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmnYPpmZDpqozor4EnLFxuICAgICAgICBjb250ZW50OiAn5pON5L2c5oyH5Luk6ZyA6KaB6aqM6K+B5oKo55qE6K6+5aSHLOaYr+WQpumAmui/h+efreS/oeW8gOWni+mqjOivge+8nycsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvdXRpbC9zbXNWYWxpZGF0aW9uL3Ntc1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uU3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NtcyB2YWxpZGF0aW9uIHN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMub3ByYXRlKHsgZGV0YWlsOiBpdGVtIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6IG9rID8gJ1N1Y2Nlc3MnIDogJ0Vycm9yJyxcbiAgICAgICAgY29udGVudDogbXNnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g6Lez6L2s5ZGK6K2m6K6+572uXG4gIGFsYXJtKGU6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHR5cGUgPSBlLmRldGFpbC50eXBlIGFzIHN0cmluZ1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9hbGFybVNldHRpbmcnICsgT2JqZWN0VG9TdHJxdWVyeSh7IHR5cGUsIHByb3RvY29sOiB0aGlzLmRhdGEucHJvdG9jb2wgfSlcbiAgICB9KVxuICB9XG59KSJdfQ==