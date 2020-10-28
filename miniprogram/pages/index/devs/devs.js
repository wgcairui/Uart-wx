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
            url: '/pages/index/line/line' + util_1.ObjectToStrquery({ name: e.detail.name, mac: this.data.mac, pid: this.data.pid, protocol: this.data.protocol })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBc0Q7QUFDdEQsMENBQW9DO0FBQ3BDLHNEQUFnRDtBQUNoRCxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsUUFBUSxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsRUFBaUI7UUFDekIsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsQ0FBQztRQUNYLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ25CLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztZQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1NBQzNCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFJRCxNQUFNLEVBQUU7UUFBQSxpQkFJUDtRQUhDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsV0FBVyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFLEVBQXJCLENBQXFCLEVBQUUsSUFBSSxDQUFDO1NBQ3pELENBQUMsQ0FBQTtJQUNKLENBQUM7SUFLRCxNQUFNLEVBQUU7UUFDTixhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBS0QsUUFBUSxFQUFFO1FBQ1IsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUtELGlCQUFpQixFQUFFOzs7OzRCQUNqQixXQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQTs7d0JBQTNCLFNBQTJCLENBQUE7d0JBQzNCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBOzs7OztLQUN6QjtJQUNLLGNBQWM7Ozs7Ozs7O3dCQUNaLEtBQXVCLElBQUksQ0FBQyxJQUFJLEVBQTlCLEdBQUcsU0FBQSxFQUFFLEdBQUcsU0FBQSxFQUFFLE1BQU0sWUFBQSxDQUFjO3dCQUNiLFdBQU0sYUFBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUE7O3dCQUFyRCxLQUFtQixTQUFrQyxFQUFuRCxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ3BCLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTs0QkFDUCxXQUFTLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBOzRCQUNqQyxHQUFHLENBQUMsTUFBTSxTQUFHLEdBQUcsQ0FBQyxNQUFNLDBDQUFFLE1BQU0sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLENBQUMsTUFBTSxJQUFJLFFBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUEvQixDQUErQixFQUFFLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLG1CQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUE1RCxDQUE0RCxDQUFDLENBQUE7NEJBQy9JLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsTUFBTSxFQUFFLEdBQUc7NkJBQ1osQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBOzRCQUNqQyxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxPQUFPO2dDQUNkLE9BQU8sRUFBRSxHQUFHO2dDQUNaLE9BQU8sRUFBRTtvQ0FDUCxhQUFhLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQ0FDakMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO2dDQUNuQixDQUFDOzZCQUNGLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtJQUVELE1BQU0sRUFBTixVQUFPLENBQVk7O1FBQ2pCLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQzlCLElBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2pDLElBQU0sTUFBTSxTQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sMENBQUUsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsTUFBTSxRQUFBO1lBQ04sZUFBZSxFQUFFLE1BQU07U0FDeEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE1BQU0sRUFBTixVQUFPLENBQVk7UUFDakIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSx3QkFBd0IsR0FBRyx1QkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2hKLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxNQUFNLEVBQVosVUFBYSxDQUFZOzs7Ozs7d0JBQ2pCLElBQUksR0FBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQTt3QkFDckMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBRXpCO3dCQUNtQixXQUFNLGFBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFBOzt3QkFBeEssS0FBYyxTQUEwSixFQUF0SyxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsRUFBRSxDQUFDLFNBQVMsQ0FBQzs0QkFDWCxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU87NEJBQy9CLE9BQU8sRUFBRSxHQUFHO3lCQUNiLENBQUMsQ0FBQTs7Ozs7S0FDSDtJQUVELEtBQUssRUFBTCxVQUFNLENBQVk7UUFDaEIsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFjLENBQUE7UUFDcEMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSx3Q0FBd0MsR0FBRyx1QkFBZ0IsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3pHLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9kZXZzL2RldnMuanNcbmltcG9ydCB7IE9iamVjdFRvU3RycXVlcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuaW1wb3J0IHVuaXRDYWNoZSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdW5pdENhY2hlXCJcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBtYWM6ICcnLFxuICAgIHBpZDogJycsXG4gICAgbW91bnREZXY6IFwiXCIsXG4gICAgcmVzdWx0OiB7fSBhcyBxdWVyeVJlc3VsdCxcbiAgICBmaWx0ZXI6ICcnLFxuICAgIGludGVydmFsOiAwLFxuICAgIHByb3RvY29sOiAnJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiBvcHRpb25zLm1vdW50RGV2IHx8IG9wdGlvbnMubWFjIHx8ICcnIH0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1hYzogb3B0aW9ucy5EZXZNYWMsXG4gICAgICBwaWQ6IG9wdGlvbnMucGlkLFxuICAgICAgcHJvdG9jb2w6IG9wdGlvbnMucHJvdG9jb2wsXG4gICAgICBtb3VudERldjogb3B0aW9ucy5tb3VudERldlxuICAgIH0pXG4gIH0sXG4gIG9uUmVhZHkoKSB7XG4gICAgdGhpcy5HZXREZXZzUnVuSW5mbygpXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGludGVydmFsOiBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLkdldERldnNSdW5JbmZvKCksIDUwMDApXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kYXRhLmludGVydmFsKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5HZXREZXZzUnVuSW5mbygpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG4gIGFzeW5jIEdldERldnNSdW5JbmZvKCkge1xuICAgIGNvbnN0IHsgbWFjLCBwaWQsIGZpbHRlciB9ID0gdGhpcy5kYXRhXG4gICAgY29uc3QgeyBvaywgYXJnLCBtc2cgfSA9IGF3YWl0IGFwaS5nZXREZXZzUnVuSW5mbyhtYWMsIHBpZClcbiAgICBpZiAob2sgJiYgYXJnKSB7XG4gICAgICBjb25zdCByZWdTdHIgPSBuZXcgUmVnRXhwKGZpbHRlcilcbiAgICAgIGFyZy5yZXN1bHQgPSBhcmcucmVzdWx0Py5maWx0ZXIoZWwgPT4gIWZpbHRlciB8fCByZWdTdHIudGVzdChlbC5uYW1lKSkubWFwKG9iaiA9PiBPYmplY3QuYXNzaWduKG9iaiwgdW5pdENhY2hlLmdldChvYmoudmFsdWUsIG9iai51bml0IHx8ICcnKSkpXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICByZXN1bHQ6IGFyZ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgY29udGVudDogbXNnLFxuICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmRhdGEuaW50ZXJ2YWwpXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOWIt+mAieWPguaVsFxuICBmaWx0ZXIoZTogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgZmlsdGVyID0gZS5kZXRhaWwuZmlsdGVyXG4gICAgY29uc3QgcmVnU3RyID0gbmV3IFJlZ0V4cChmaWx0ZXIpXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRhLnJlc3VsdC5yZXN1bHQ/LmZpbHRlcihlbCA9PiByZWdTdHIudGVzdChlbC5uYW1lKSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZmlsdGVyLFxuICAgICAgXCJyZXN1bHQucmVzdWx0XCI6IHJlc3VsdFxuICAgIH0pXG4gIH0sXG4gIC8vIOWvvOiIquWIsOWbvuihqFxuICB0b2xpbmUoZTogdmFudEV2ZW50KSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvbGluZS9saW5lJyArIE9iamVjdFRvU3RycXVlcnkoeyBuYW1lOiBlLmRldGFpbC5uYW1lLCBtYWM6IHRoaXMuZGF0YS5tYWMsIHBpZDogdGhpcy5kYXRhLnBpZCwgcHJvdG9jb2w6IHRoaXMuZGF0YS5wcm90b2NvbCB9KVxuICAgIH0pXG4gIH0sXG4gIC8vIOWPkemAgeaTjeS9nOaMh+S7pFxuICBhc3luYyBvcHJhdGUoZTogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgaXRlbTogT3ByYXRlSW5zdHJ1Y3QgPSBlLmRldGFpbFxuICAgIGlmIChpdGVtLnZhbHVlLmluY2x1ZGVzKFwiJWlcIikpIHtcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0udmFsdWUpO1xuXG4gICAgfVxuICAgIGNvbnN0IHsgb2ssIG1zZyB9ID0gYXdhaXQgYXBpLlNlbmRQcm9jb3RvbEluc3RydWN0U2V0KHsgbW91bnREZXY6IHRoaXMuZGF0YS5tb3VudERldiwgcGlkOiBOdW1iZXIodGhpcy5kYXRhLnBpZCksIHByb3RvY29sOiB0aGlzLmRhdGEucHJvdG9jb2wsIERldk1hYzogdGhpcy5kYXRhLm1hYyB9LCBpdGVtKVxuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogb2sgPyAnU3VjY2VzcycgOiAnRXJyb3InLFxuICAgICAgY29udGVudDogbXNnXG4gICAgfSlcbiAgfSxcbiAgLy8g6Lez6L2s5ZGK6K2m6K6+572uXG4gIGFsYXJtKGU6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHR5cGUgPSBlLmRldGFpbC50eXBlIGFzIHN0cmluZ1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9hbGFybVNldHRpbmcnICsgT2JqZWN0VG9TdHJxdWVyeSh7IHR5cGUsIHByb3RvY29sOiB0aGlzLmRhdGEucHJvdG9jb2wgfSlcbiAgICB9KVxuICB9XG59KSJdfQ==