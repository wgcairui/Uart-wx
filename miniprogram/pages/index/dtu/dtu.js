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
        id: '',
        terminal: {},
        jwSupport: false,
        longitude: '',
        latitude: '',
        markers: [],
        address: '',
        recommend: ''
    },
    onLoad: function (options) {
        var id = options.id;
        if (id) {
            this.setData({
                id: id
            });
            this.start();
        }
    },
    start: function () {
        var _this = this;
        var id = this.data.id;
        var terminal = wx.getStorageSync(id);
        var jw = terminal.jw && terminal.jw.length > 10 ? terminal.jw.split(',') : false;
        console.log(jw);
        this.setData({
            terminal: terminal,
            jwSupport: Boolean(jw),
        });
        if (jw) {
            var mark = {
                iconPath: "../../../assert/mark.png",
                latitude: Number(jw[1]),
                longitude: Number(jw[0]),
                title: terminal.name,
                width: 50,
                height: 50
            };
            this.setData({
                longitude: jw[0],
                latitude: jw[1],
                markers: [mark]
            });
            api_1.default.getGPSaddress([jw[1], jw[0]].join(',')).then(function (_a) {
                var ok = _a.ok, arg = _a.arg;
                if (ok) {
                    _this.setData({
                        address: arg.result.address,
                        recommend: arg.result.formatted_addresses.recommend
                    });
                }
            });
        }
        wx.setNavigationBarTitle({ title: terminal.name });
    },
    markertap: function (_e) {
    },
    nameChange: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var value, _a, ok, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        value = event.detail.value;
                        return [4, api_1.default.modifyDTUName(this.data.terminal.DevMac, value)];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, msg = _a.msg;
                        if (!ok) {
                            wx.showModal({
                                title: "Error",
                                content: msg
                            });
                        }
                        else {
                            this.setData({
                                "terminal.name": value
                            });
                            wx.setStorage({
                                key: this.data.id,
                                data: this.data.terminal
                            });
                        }
                        return [2];
                }
            });
        });
    },
    updateGps: function () {
        var setupGps = this.setupGps;
        wx.showModal({
            title: 'Tip',
            content: '是否把DTU定位更新为当前地址?',
            success: function (ok) {
                wx.showLoading({
                    title: '请稍等'
                });
                if (ok.confirm) {
                    wx.getSetting({
                        success: function (res) {
                            if (!res.authSetting["scope.userLocation"]) {
                                wx.hideLoading();
                                wx.authorize({
                                    scope: "scope.userLocation",
                                    success: function () {
                                        setupGps();
                                    }
                                });
                            }
                            else {
                                setupGps();
                            }
                        }
                    });
                }
            }
        });
    },
    setupGps: function () {
        var _this = this;
        var _a = this.data, terminal = _a.terminal, id = _a.id;
        wx.getLocation({
            success: function (location) {
                terminal.jw = [location.longitude.toFixed(5), location.latitude.toFixed(5)].join(',');
                wx.hideLoading();
                wx.setStorage({
                    key: id,
                    data: terminal,
                    success: function () {
                        _this.start();
                    }
                });
                api_1.default.updateGps(terminal.DevMac, terminal.jw).then(function (el) {
                    if (el.ok) {
                        wx.showToast({ title: '更新定位成功' });
                    }
                    else {
                        wx.showToast({ title: el.msg, icon: 'none' });
                    }
                });
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHR1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHR1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQW9DO0FBR3BDLElBQUksQ0FBQztJQUtILElBQUksRUFBRTtRQUNKLEVBQUUsRUFBRSxFQUFFO1FBQ04sUUFBUSxFQUFFLEVBQWM7UUFDeEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsRUFBRTtRQUNaLE9BQU8sRUFBRSxFQUFXO1FBQ3BCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFFLEVBQUU7S0FFZDtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQTtRQUNyQixJQUFJLEVBQUUsRUFBRTtZQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsRUFBRSxJQUFBO2FBQ0gsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQ2I7SUFFSCxDQUFDO0lBRUQsS0FBSyxFQUFMO1FBQUEsaUJBbUNDO1FBbENDLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO1FBQ3ZCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFhLENBQUE7UUFDbEQsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDbEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxVQUFBO1lB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Q0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO3FCQUM5QztnQkFDSCxDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvZHR1L2R0dS5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGlkOiAnJyxcbiAgICB0ZXJtaW5hbDoge30gYXMgVGVybWluYWwsXG4gICAgandTdXBwb3J0OiBmYWxzZSxcbiAgICBsb25naXR1ZGU6ICcnLFxuICAgIGxhdGl0dWRlOiAnJyxcbiAgICBtYXJrZXJzOiBbXSBhcyBhbnlbXSxcbiAgICBhZGRyZXNzOiAnJyxcbiAgICByZWNvbW1lbmQ6ICcnXG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBjb25zdCBpZCA9IG9wdGlvbnMuaWRcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGlkXG4gICAgICB9KVxuICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuXG4gIH0sXG5cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmRhdGEuaWRcbiAgICBjb25zdCB0ZXJtaW5hbCA9IHd4LmdldFN0b3JhZ2VTeW5jKGlkKSBhcyBUZXJtaW5hbFxuICAgIGNvbnN0IGp3ID0gdGVybWluYWwuancgJiYgdGVybWluYWwuancubGVuZ3RoID4gMTAgPyB0ZXJtaW5hbC5qdy5zcGxpdCgnLCcpIDogZmFsc2VcbiAgICBjb25zb2xlLmxvZyhqdyk7XG5cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdGVybWluYWwsXG4gICAgICBqd1N1cHBvcnQ6IEJvb2xlYW4oancpLFxuICAgIH0pXG4gICAgaWYgKGp3KSB7XG4gICAgICBjb25zdCBtYXJrID0ge1xuICAgICAgICBpY29uUGF0aDogXCIuLi8uLi8uLi9hc3NlcnQvbWFyay5wbmdcIixcbiAgICAgICAgbGF0aXR1ZGU6IE51bWJlcihqd1sxXSksXG4gICAgICAgIGxvbmdpdHVkZTogTnVtYmVyKGp3WzBdKSxcbiAgICAgICAgdGl0bGU6IHRlcm1pbmFsLm5hbWUsXG4gICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgfVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbG9uZ2l0dWRlOiBqd1swXSxcbiAgICAgICAgbGF0aXR1ZGU6IGp3WzFdLFxuICAgICAgICBtYXJrZXJzOiBbbWFya11cbiAgICAgIH0pXG4gICAgICAvLyDmoLnmja5ncHPojrflj5blnLDlnYBcbiAgICAgIGFwaS5nZXRHUFNhZGRyZXNzKFtqd1sxXSwgandbMF1dLmpvaW4oJywnKSkudGhlbigoeyBvaywgYXJnIH0pID0+IHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGFyZy5yZXN1bHQuYWRkcmVzcyxcbiAgICAgICAgICAgIHJlY29tbWVuZDogYXJnLnJlc3VsdC5mb3JtYXR0ZWRfYWRkcmVzc2VzLnJlY29tbWVuZFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiB0ZXJtaW5hbC5uYW1lIH0pXG4gIH0sXG5cbiAgbWFya2VydGFwKF9lOiB2YW50RXZlbnQpIHtcbiAgICAvKiBjb25zdCBtYXAgPSB3eC5jcmVhdGVNYXBDb250ZXh0KGUuY3VycmVudFRhcmdldC5pZClcbiAgICBtYXAuZ2V0Q2VudGVyTG9jYXRpb24oe1xuICAgICAgc3VjY2VzcyhlMil7XG4gICAgICAgIGNvbnNvbGUubG9nKGUyKTtcbiAgICAgICAgXG4gICAgICB9XG4gICAgfSlcbiAgICBcbiAqL1xuICB9LFxuICAvL1xuICBhc3luYyBuYW1lQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZVxuICAgIGNvbnN0IHsgb2ssIG1zZyB9ID0gYXdhaXQgYXBpLm1vZGlmeURUVU5hbWUodGhpcy5kYXRhLnRlcm1pbmFsLkRldk1hYywgdmFsdWUpXG4gICAgaWYgKCFvaykge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6IFwiRXJyb3JcIixcbiAgICAgICAgY29udGVudDogbXNnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBcInRlcm1pbmFsLm5hbWVcIjogdmFsdWVcbiAgICAgIH0pXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiB0aGlzLmRhdGEuaWQsXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YS50ZXJtaW5hbFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gXG4gIHVwZGF0ZUdwcygpIHtcbiAgICBjb25zdCBzZXR1cEdwcyA9IHRoaXMuc2V0dXBHcHNcbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICdUaXAnLFxuICAgICAgY29udGVudDogJ+aYr+WQpuaKikRUVeWumuS9jeabtOaWsOS4uuW9k+WJjeWcsOWdgD8nLFxuICAgICAgc3VjY2Vzcyhvaykge1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfor7fnqI3nrYknXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChvay5jb25maXJtKSB7XG4gICAgICAgICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICBpZiAoIXJlcy5hdXRoU2V0dGluZ1tcInNjb3BlLnVzZXJMb2NhdGlvblwiXSkge1xuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICB3eC5hdXRob3JpemUoe1xuICAgICAgICAgICAgICAgICAgc2NvcGU6IFwic2NvcGUudXNlckxvY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR1cEdwcygpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXR1cEdwcygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvLyDorr7nva5HcHNcbiAgc2V0dXBHcHMoKSB7XG4gICAgY29uc3QgeyB0ZXJtaW5hbCwgaWQgfSA9IHRoaXMuZGF0YVxuICAgIHd4LmdldExvY2F0aW9uKHtcbiAgICAgIHN1Y2Nlc3M6IChsb2NhdGlvbikgPT4ge1xuICAgICAgICB0ZXJtaW5hbC5qdyA9IFtsb2NhdGlvbi5sb25naXR1ZGUudG9GaXhlZCg1KSwgbG9jYXRpb24ubGF0aXR1ZGUudG9GaXhlZCg1KV0uam9pbignLCcpXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OiBpZCxcbiAgICAgICAgICBkYXRhOiB0ZXJtaW5hbCxcbiAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8vIOS4iuS8oOWumuS9jeWIsOacjeWKoeerr1xuICAgICAgICBhcGkudXBkYXRlR3BzKHRlcm1pbmFsLkRldk1hYywgdGVybWluYWwuancpLnRoZW4oZWwgPT4ge1xuICAgICAgICAgIGlmIChlbC5vaykge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfmm7TmlrDlrprkvY3miJDlip8nIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiBlbC5tc2csIGljb246ICdub25lJyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59KSJdfQ==