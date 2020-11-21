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
        terminal.uptime = new Date(terminal.uptime).toLocaleString();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHR1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHR1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQW9DO0FBR3BDLElBQUksQ0FBQztJQUtILElBQUksRUFBRTtRQUNKLEVBQUUsRUFBRSxFQUFFO1FBQ04sUUFBUSxFQUFFLEVBQWM7UUFDeEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsRUFBRTtRQUNaLE9BQU8sRUFBRSxFQUFXO1FBQ3BCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFFLEVBQUU7S0FFZDtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQTtRQUNyQixJQUFJLEVBQUUsRUFBRTtZQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsRUFBRSxJQUFBO2FBQ0gsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQ2I7SUFFSCxDQUFDO0lBRUQsS0FBSyxFQUFMO1FBQUEsaUJBbUNDO1FBbENDLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO1FBQ3ZCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFhLENBQUE7UUFDbEQsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDbEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFFB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QyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtxQkFDbEM7eUJBQU07d0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO3FCQUM5QztnQkFDSCxDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvZHR1L2R0dS5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGlkOiAnJyxcbiAgICB0ZXJtaW5hbDoge30gYXMgVGVybWluYWwsXG4gICAgandTdXBwb3J0OiBmYWxzZSxcbiAgICBsb25naXR1ZGU6ICcnLFxuICAgIGxhdGl0dWRlOiAnJyxcbiAgICBtYXJrZXJzOiBbXSBhcyBhbnlbXSxcbiAgICBhZGRyZXNzOiAnJyxcbiAgICByZWNvbW1lbmQ6ICcnXG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBjb25zdCBpZCA9IG9wdGlvbnMuaWRcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGlkXG4gICAgICB9KVxuICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuXG4gIH0sXG5cbiAgc3RhcnQoKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmRhdGEuaWRcbiAgICBjb25zdCB0ZXJtaW5hbCA9IHd4LmdldFN0b3JhZ2VTeW5jKGlkKSBhcyBUZXJtaW5hbFxuICAgIGNvbnN0IGp3ID0gdGVybWluYWwuancgJiYgdGVybWluYWwuancubGVuZ3RoID4gMTAgPyB0ZXJtaW5hbC5qdy5zcGxpdCgnLCcpIDogZmFsc2VcbiAgICBjb25zb2xlLmxvZyhqdyk7XG4gICAgdGVybWluYWwudXB0aW1lID0gbmV3IERhdGUodGVybWluYWwudXB0aW1lISkudG9Mb2NhbGVTdHJpbmcoKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0ZXJtaW5hbCxcbiAgICAgIGp3U3VwcG9ydDogQm9vbGVhbihqdyksXG4gICAgfSlcbiAgICBpZiAoancpIHtcbiAgICAgIGNvbnN0IG1hcmsgPSB7XG4gICAgICAgIGljb25QYXRoOiBcIi4uLy4uLy4uL2Fzc2VydC9tYXJrLnBuZ1wiLFxuICAgICAgICBsYXRpdHVkZTogTnVtYmVyKGp3WzFdKSxcbiAgICAgICAgbG9uZ2l0dWRlOiBOdW1iZXIoandbMF0pLFxuICAgICAgICB0aXRsZTogdGVybWluYWwubmFtZSxcbiAgICAgICAgd2lkdGg6IDUwLFxuICAgICAgICBoZWlnaHQ6IDUwXG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBsb25naXR1ZGU6IGp3WzBdLFxuICAgICAgICBsYXRpdHVkZTogandbMV0sXG4gICAgICAgIG1hcmtlcnM6IFttYXJrXVxuICAgICAgfSlcbiAgICAgIC8vIOagueaNrmdwc+iOt+WPluWcsOWdgFxuICAgICAgYXBpLmdldEdQU2FkZHJlc3MoW2p3WzFdLCBqd1swXV0uam9pbignLCcpKS50aGVuKCh7IG9rLCBhcmcgfSkgPT4ge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgYWRkcmVzczogYXJnLnJlc3VsdC5hZGRyZXNzLFxuICAgICAgICAgICAgcmVjb21tZW5kOiBhcmcucmVzdWx0LmZvcm1hdHRlZF9hZGRyZXNzZXMucmVjb21tZW5kXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6IHRlcm1pbmFsLm5hbWUgfSlcbiAgfSxcblxuICBtYXJrZXJ0YXAoX2U6IHZhbnRFdmVudCkge1xuICAgIC8qIGNvbnN0IG1hcCA9IHd4LmNyZWF0ZU1hcENvbnRleHQoZS5jdXJyZW50VGFyZ2V0LmlkKVxuICAgIG1hcC5nZXRDZW50ZXJMb2NhdGlvbih7XG4gICAgICBzdWNjZXNzKGUyKXtcbiAgICAgICAgY29uc29sZS5sb2coZTIpO1xuICAgICAgICBcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICovXG4gIH0sXG4gIC8vXG4gIGFzeW5jIG5hbWVDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlXG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkubW9kaWZ5RFRVTmFtZSh0aGlzLmRhdGEudGVybWluYWwuRGV2TWFjLCB2YWx1ZSlcbiAgICBpZiAoIW9rKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIFwidGVybWluYWwubmFtZVwiOiB2YWx1ZVxuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6IHRoaXMuZGF0YS5pZCxcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLnRlcm1pbmFsXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvLyBcbiAgdXBkYXRlR3BzKCkge1xuICAgIGNvbnN0IHNldHVwR3BzID0gdGhpcy5zZXR1cEdwc1xuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ1RpcCcsXG4gICAgICBjb250ZW50OiAn5piv5ZCm5oqKRFRV5a6a5L2N5pu05paw5Li65b2T5YmN5Zyw5Z2APycsXG4gICAgICBzdWNjZXNzKG9rKSB7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+ivt+eojeetiSdcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKG9rLmNvbmZpcm0pIHtcbiAgICAgICAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgIGlmICghcmVzLmF1dGhTZXR0aW5nW1wic2NvcGUudXNlckxvY2F0aW9uXCJdKSB7XG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgIHd4LmF1dGhvcml6ZSh7XG4gICAgICAgICAgICAgICAgICBzY29wZTogXCJzY29wZS51c2VyTG9jYXRpb25cIixcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHVwR3BzKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldHVwR3BzKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8vIOiuvue9rkdwc1xuICBzZXR1cEdwcygpIHtcbiAgICBjb25zdCB7IHRlcm1pbmFsLCBpZCB9ID0gdGhpcy5kYXRhXG4gICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgc3VjY2VzczogKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIHRlcm1pbmFsLmp3ID0gW2xvY2F0aW9uLmxvbmdpdHVkZS50b0ZpeGVkKDUpLCBsb2NhdGlvbi5sYXRpdHVkZS50b0ZpeGVkKDUpXS5qb2luKCcsJylcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6IGlkLFxuICAgICAgICAgIGRhdGE6IHRlcm1pbmFsLFxuICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLy8g5LiK5Lyg5a6a5L2N5Yiw5pyN5Yqh56uvXG4gICAgICAgIGFwaS51cGRhdGVHcHModGVybWluYWwuRGV2TWFjLCB0ZXJtaW5hbC5qdykudGhlbihlbCA9PiB7XG4gICAgICAgICAgaWYgKGVsLm9rKSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+abtOaWsOWumuS9jeaIkOWKnycgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IGVsLm1zZywgaWNvbjogJ25vbmUnIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pIl19