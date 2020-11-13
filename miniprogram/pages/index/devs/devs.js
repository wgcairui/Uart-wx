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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBc0Q7QUFDdEQsMENBQW9DO0FBQ3BDLHNEQUFnRDtBQUNoRCxJQUFJLENBQUM7SUFNSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsUUFBUSxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsRUFBaUI7UUFDekIsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsQ0FBQztRQUNYLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7S0FDbkI7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ25CLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztZQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1NBQzNCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSyxPQUFPOzs7Ozt3QkFDWCxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7d0JBQ25DLFdBQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFBOzt3QkFBM0IsU0FBMkIsQ0FBQTt3QkFDM0IsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7OztLQUNqQjtJQUlELE1BQU0sRUFBRTtRQUFBLGlCQUlQO1FBSEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFB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QUssRUFBTCxVQUFNLENBQVk7UUFDaEIsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFjLENBQUE7UUFDcEMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSx3Q0FBd0MsR0FBRyx1QkFBZ0IsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3pHLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9kZXZzL2RldnMuanNcbmltcG9ydCB7IE9iamVjdFRvU3RycXVlcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuaW1wb3J0IHVuaXRDYWNoZSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdW5pdENhY2hlXCJcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG5cbiAgZGF0YToge1xuICAgIG1hYzogJycsXG4gICAgcGlkOiAnJyxcbiAgICBtb3VudERldjogXCJcIixcbiAgICByZXN1bHQ6IHt9IGFzIHF1ZXJ5UmVzdWx0LFxuICAgIGZpbHRlcjogJycsXG4gICAgaW50ZXJ2YWw6IDAsXG4gICAgcHJvdG9jb2w6ICcnLFxuICAgIF9vcHJhdGVTdGF0OiBmYWxzZVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiBvcHRpb25zLm1vdW50RGV2IHx8IG9wdGlvbnMubWFjIHx8ICcnIH0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1hYzogb3B0aW9ucy5EZXZNYWMsXG4gICAgICBwaWQ6IG9wdGlvbnMucGlkLFxuICAgICAgcHJvdG9jb2w6IG9wdGlvbnMucHJvdG9jb2wsXG4gICAgICBtb3VudERldjogb3B0aW9ucy5tb3VudERldlxuICAgIH0pXG4gIH0sXG4gIGFzeW5jIG9uUmVhZHkoKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+iOt+WPlui/kOihjOaVsOaNricgfSlcbiAgICBhd2FpdCB0aGlzLkdldERldnNSdW5JbmZvKClcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGludGVydmFsOiBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLkdldERldnNSdW5JbmZvKCksIDUwMDApXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kYXRhLmludGVydmFsKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5HZXREZXZzUnVuSW5mbygpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG4gIGFzeW5jIEdldERldnNSdW5JbmZvKCkge1xuICAgIGNvbnN0IHsgbWFjLCBwaWQsIGZpbHRlciB9ID0gdGhpcy5kYXRhXG4gICAgY29uc3QgeyBvaywgYXJnLCBtc2cgfSA9IGF3YWl0IGFwaS5nZXREZXZzUnVuSW5mbyhtYWMsIHBpZClcbiAgICBpZiAob2sgJiYgYXJnKSB7XG4gICAgICBjb25zdCByZWdTdHIgPSBuZXcgUmVnRXhwKGZpbHRlcilcbiAgICAgIGFyZy5yZXN1bHQgPSBhcmcucmVzdWx0LmZpbHRlcihlbCA9PiAhZmlsdGVyIHx8IHJlZ1N0ci50ZXN0KGVsLm5hbWUpKS5tYXAob2JqID0+IE9iamVjdC5hc3NpZ24ob2JqLCB1bml0Q2FjaGUuZ2V0KG9iai52YWx1ZSwgb2JqLnVuaXQgfHwgJycpKSlcbiAgICAgIGFyZy50aW1lID0gbmV3IERhdGUoYXJnLnRpbWUhKS50b0xvY2FsZVN0cmluZygpXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICByZXN1bHQ6IGFyZ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgY29udGVudDogbXNnLFxuICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gICAgICAgICAgLy93eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g5Yi36YCJ5Y+C5pWwXG4gIGZpbHRlcihlOiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBlLmRldGFpbC5maWx0ZXJcbiAgICBjb25zdCByZWdTdHIgPSBuZXcgUmVnRXhwKGZpbHRlcilcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGEucmVzdWx0LnJlc3VsdD8uZmlsdGVyKGVsID0+IHJlZ1N0ci50ZXN0KGVsLm5hbWUpKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBmaWx0ZXIsXG4gICAgICBcInJlc3VsdC5yZXN1bHRcIjogcmVzdWx0XG4gICAgfSlcbiAgfSxcbiAgLy8g5a+86Iiq5Yiw5Zu+6KGoXG4gIHRvbGluZShlOiB2YW50RXZlbnQpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9saW5lL2xpbmUnICsgT2JqZWN0VG9TdHJxdWVyeSh7IG5hbWU6IGUuZGV0YWlsLm5hbWUsIG1hYzogdGhpcy5kYXRhLm1hYywgcGlkOiB0aGlzLmRhdGEucGlkLCBwcm90b2NvbDogdGhpcy5kYXRhLnByb3RvY29sIH0pXG4gICAgfSlcbiAgfSxcbiAgLy8g5Y+R6YCB5pON5L2c5oyH5LukXG4gIGFzeW5jIG9wcmF0ZShlOiBQaWNrPHZhbnRFdmVudCwgJ2RldGFpbCc+KSB7XG4gICAgaWYgKHRoaXMuZGF0YS5fb3ByYXRlU3RhdCkgcmV0dXJuXG4gICAgY29uc3QgaXRlbTogT3ByYXRlSW5zdHJ1Y3QgPSBlLmRldGFpbFxuICAgIGlmIChpdGVtLnZhbHVlLmluY2x1ZGVzKFwiJWlcIikgJiYgIWl0ZW0udmFsKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL3V0aWwvc2V0VmFsL3NldFZhbCcgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgaXRlbSB9KSxcbiAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgdmFsdWVPazogKHZhbHVlOiB7IHZhbDogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0udmFsID0gdmFsdWUudmFsXG4gICAgICAgICAgICB0aGlzLm9wcmF0ZSh7IGRldGFpbDogaXRlbSB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5q2j5Zyo5Y+R6YCBJyB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBfb3ByYXRlU3RhdDogdHJ1ZVxuICAgIH0pXG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkuU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQoeyBtb3VudERldjogdGhpcy5kYXRhLm1vdW50RGV2LCBwaWQ6IE51bWJlcih0aGlzLmRhdGEucGlkKSwgcHJvdG9jb2w6IHRoaXMuZGF0YS5wcm90b2NvbCwgRGV2TWFjOiB0aGlzLmRhdGEubWFjIH0sIGl0ZW0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIF9vcHJhdGVTdGF0OiBmYWxzZVxuICAgIH0pXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIC8vIOWmguaenOiuvuWkh+acqumAmui/h+agoemqjO+8jOWImei3s+i9rOWIsOagoemqjOefreS/oemqjOivgeeggemhtemdolxuICAgIGlmIChvayA9PT0gNCkge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmnYPpmZDpqozor4EnLFxuICAgICAgICBjb250ZW50OiAn5pON5L2c5oyH5Luk6ZyA6KaB6aqM6K+B5oKo55qE6K6+5aSHLOaYr+WQpumAmui/h+efreS/oeW8gOWni+mqjOivge+8nycsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvdXRpbC9zbXNWYWxpZGF0aW9uL3Ntc1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uU3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NtcyB2YWxpZGF0aW9uIHN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMub3ByYXRlKHsgZGV0YWlsOiBpdGVtIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6IG9rID8gJ1N1Y2Nlc3MnIDogJ0Vycm9yJyxcbiAgICAgICAgY29udGVudDogbXNnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g6Lez6L2s5ZGK6K2m6K6+572uXG4gIGFsYXJtKGU6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHR5cGUgPSBlLmRldGFpbC50eXBlIGFzIHN0cmluZ1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9hbGFybVNldHRpbmcnICsgT2JqZWN0VG9TdHJxdWVyeSh7IHR5cGUsIHByb3RvY29sOiB0aGlzLmRhdGEucHJvdG9jb2wgfSlcbiAgICB9KVxuICB9XG59KSJdfQ==