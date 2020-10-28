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
var config_1 = require("../config");
var api = (function () {
    function api() {
        this.url = config_1.urlRequest + "/api/wx/";
        this.token = "";
    }
    api.prototype.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var el, ws_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RequestUart({ url: "code2Session", data: data })];
                    case 1:
                        el = _a.sent();
                        if (el.ok) {
                            this.token = el.arg.token;
                            wx.setStorage({ key: 'token', data: el.arg.token });
                            ws_1 = wx.connectSocket({
                                url: config_1.urlWs,
                                header: {
                                    'content-type': 'application/json'
                                }
                            });
                            ws_1.onOpen(function () {
                                ws_1.send({
                                    data: JSON.stringify({ token: el.arg.token }),
                                    success: function () {
                                        setInterval(function () {
                                            ws_1.send({ data: 'time' });
                                        }, 1000 * 30);
                                    }
                                });
                                ws_1.onMessage(function (msg) {
                                    wx.showModal({
                                        title: '新的告警信息',
                                        content: msg.data.toString(),
                                        success: function () {
                                            wx.switchTab({
                                                url: '/pages/index/alarm/alarm'
                                            });
                                        }
                                    });
                                });
                                wx.onSocketClose(function () {
                                    console.log(new Date().toLocaleString() + "socket close");
                                });
                            });
                        }
                        return [2, el];
                }
            });
        });
    };
    api.prototype.userlogin = function (data) {
        return this.RequestUart({ url: 'userlogin', data: data });
    };
    api.prototype.unbindwx = function () {
        return this.RequestUart({ url: 'unbindwx', data: {} });
    };
    api.prototype.getphonenumber = function (data) {
        return this.RequestUart({ url: "getphonenumber", data: data });
    };
    api.prototype.registerUser = function (data) {
        return this.RequestUart({ url: "register", data: data });
    };
    api.prototype.getuserMountDev = function () {
        return this.RequestUart({ url: 'getuserMountDev', data: {} });
    };
    api.prototype.getDTUInfo = function (mac) {
        return this.RequestUart({ url: 'getDTUInfo', data: { mac: mac } });
    };
    api.prototype.getUserInfo = function () {
        return this.RequestUart({ url: 'getUserInfo', data: {} });
    };
    api.prototype.bindDev = function (mac) {
        return this.RequestUart({ url: 'bindDev', data: { mac: mac } });
    };
    api.prototype.getAlarmunconfirmed = function () {
        return this.RequestUart({ url: 'getAlarmunconfirmed', data: {} });
    };
    api.prototype.getAlarm = function (start, end) {
        return this.RequestUart({ url: 'getAlarm', data: { start: start, end: end } });
    };
    api.prototype.alarmConfirmed = function (id) {
        return this.RequestUart({ url: 'alarmConfirmed', data: id ? { id: id } : {} });
    };
    api.prototype.getDevsRunInfo = function (mac, pid) {
        return this.RequestUart({ url: "getDevsRunInfo", data: { mac: mac, pid: pid } });
    };
    api.prototype.getDevsHistoryInfo = function (mac, pid, name, datatime) {
        if (datatime === void 0) { datatime = ''; }
        return this.RequestUart({ url: 'getDevsHistoryInfo', data: { mac: mac, pid: pid, name: name, datatime: datatime } });
    };
    api.prototype.getDevOprate = function (protocol) {
        return this.RequestUart({ url: 'getDevOprate', data: { protocol: protocol } });
    };
    api.prototype.SendProcotolInstructSet = function (query, item) {
        return this.RequestUart({ url: 'SendProcotolInstructSet', data: { query: query, item: item }, method: 'POST' });
    };
    api.prototype.getUserDevConstant = function (protocol) {
        return this.RequestUart({ url: 'getUserDevConstant', data: { protocol: protocol } });
    };
    api.prototype.pushThreshold = function (arg, type, Protocol) {
        return this.RequestUart({ url: "pushThreshold", data: { type: type, arg: arg, Protocol: Protocol }, method: "POST" });
    };
    api.prototype.getUserAlarmTels = function () {
        return this.RequestUart({ url: 'getUserAlarmTels', data: {} });
    };
    api.prototype.setUserSetupContact = function (tels, mails) {
        return this.RequestUart({ url: 'setUserSetupContact', data: { tels: tels, mails: mails }, method: "POST" });
    };
    api.prototype.addTerminalMountDe = function (DevMac, Type, mountDev, protocol, pid) {
        return this.RequestUart({ url: 'addTerminalMountDev', data: { DevMac: DevMac, Type: Type, mountDev: mountDev, protocol: protocol, pid: pid }, method: "POST" });
    };
    api.prototype.delTerminalMountDev = function (DevMac, mountDev, pid) {
        return this.RequestUart({ url: 'delTerminalMountDev', data: { DevMac: DevMac, mountDev: mountDev, pid: pid }, method: "POST" });
    };
    api.prototype.delUserTerminal = function (mac) {
        return this.RequestUart({ url: 'delUserTerminal', data: { mac: mac } });
    };
    api.prototype.DevTypes = function (Type) {
        return this.RequestUart({ url: 'DevTypes', data: { Type: Type } });
    };
    api.prototype.modifyUserInfo = function (type, value) {
        return this.RequestUart({ url: 'modifyUserInfo', data: { type: type, value: value } });
    };
    api.prototype.getGPSaddress = function (location) {
        return this.RequestUart({ url: 'getGPSaddress', data: { location: location } });
    };
    api.prototype.RequestUart = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var token, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wx.showNavigationBarLoading();
                        _a = this.token;
                        if (_a) return [3, 2];
                        return [4, wx.getStorage({ key: 'token' }).then(function (el) { return el.data; }).catch(function () { return ""; })];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        token = _a;
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: _this.url + object.url,
                                    data: Object.assign({ token: token }, object.data),
                                    method: object.method || "GET",
                                    success: function (res) {
                                        if (res.statusCode !== 200) {
                                            wx.showModal({
                                                title: String(res.statusCode),
                                                content: res.data.toString() || res.errMsg,
                                                success: function () {
                                                    wx.reLaunch({ url: '/pages/index/index' });
                                                }
                                            });
                                            reject(res);
                                        }
                                        else {
                                            setTimeout(function () {
                                                resolve(res.data);
                                            }, 0);
                                        }
                                    },
                                    fail: function (e) {
                                        wx.showModal({ title: '服务器错误', content: e.errMsg });
                                        reject(e);
                                    },
                                    complete: function () {
                                        wx.hideNavigationBarLoading();
                                    }
                                });
                            })];
                    case 3: return [2, _b.sent()];
                }
            });
        });
    };
    return api;
}());
exports.default = new api();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQTZDO0FBd0M3QztJQUdFO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxtQkFBVSxHQUFHLFVBQVUsQ0FBQTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUVqQixDQUFDO0lBRUssbUJBQUssR0FBWCxVQUFZLElBQXlCOzs7Ozs0QkFDeEIsV0FBTSxJQUFJLENBQUMsV0FBVyxDQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLEVBQUE7O3dCQUEvRCxFQUFFLEdBQUcsU0FBMEQ7d0JBQ3JFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBOzRCQUN6QixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBOzRCQUU3QyxPQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0NBQzFCLEdBQUcsRUFBRSxjQUFLO2dDQUNWLE1BQU0sRUFBRTtvQ0FDTixjQUFjLEVBQUUsa0JBQWtCO2lDQUNuQzs2QkFDRixDQUFDLENBQUE7NEJBQ0YsSUFBRSxDQUFDLE1BQU0sQ0FBQztnQ0FDUixJQUFFLENBQUMsSUFBSSxDQUFDO29DQUNOLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBZSxFQUFFLENBQUM7b0NBQ3ZELE9BQU87d0NBQ0wsV0FBVyxDQUFDOzRDQUNWLElBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxF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OzRDQUMxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7eUNBQ047b0NBQ0gsQ0FBQztvQ0FDRCxJQUFJLEVBQUUsVUFBQSxDQUFDO3dDQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTt3Q0FDbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO29DQUNYLENBQUM7b0NBQ0QsUUFBUSxFQUFFO3dDQUNSLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO29DQUMvQixDQUFDO2lDQUNGLENBQUMsQ0FBQTs0QkFDSixDQUFDLENBQUMsRUFBQTs0QkEvQkYsV0FBTyxTQStCTCxFQUFBOzs7O0tBQ0g7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQTVMRCxJQTRMQztBQUVELGtCQUFlLElBQUksR0FBRyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1cmxSZXF1ZXN0LCB1cmxXcyB9IGZyb20gXCIuLi9jb25maWdcIlxuXG5pbnRlcmZhY2UgdGVuY2V0TWFwIHtcbiAgLyog54q25oCB56CB77yMMOS4uuato+W4uCxcbjMxMOivt+axguWPguaVsOS/oeaBr+acieivr++8jFxuMzExS2V55qC85byP6ZSZ6K+vLFxuMzA26K+35rGC5pyJ5oqk5oyB5L+h5oGv6K+35qOA5p+l5a2X56ym5LiyLFxuMTEw6K+35rGC5p2l5rqQ5pyq6KKr5o6I5p2DICovXG4gIHN0YXR1czogbnVtYmVyLFxuICByZXF1ZXN0X2lkOiBzdHJpbmcsXG4gIG1lc3NhZ2U6IHN0cmluZ1xuICByZXN1bHQ6IGFueVxufVxuXG50eXBlIHVybCA9ICdnZXR1c2VyTW91bnREZXYnXG4gIHwgJ2NvZGUyU2Vzc2lvbidcbiAgfCAnZ2V0cGhvbmVudW1iZXInXG4gIHwgJ3JlZ2lzdGVyJ1xuICB8ICdnZXREVFVJbmZvJ1xuICB8ICdiaW5kRGV2J1xuICB8ICdnZXRBbGFybSdcbiAgfCAnZ2V0RGV2c1J1bkluZm8nXG4gIHwgJ2dldERldnNIaXN0b3J5SW5mbydcbiAgfCAndXNlcmxvZ2luJ1xuICB8ICdnZXRVc2VySW5mbydcbiAgfCAndW5iaW5kd3gnXG4gIHwgJ2dldEFsYXJtdW5jb25maXJtZWQnXG4gIHwgJ2FsYXJtQ29uZmlybWVkJ1xuICB8ICdnZXREZXZPcHJhdGUnXG4gIHwgJ1NlbmRQcm9jb3RvbEluc3RydWN0U2V0J1xuICB8ICdnZXRVc2VyRGV2Q29uc3RhbnQnXG4gIHwgJ3B1c2hUaHJlc2hvbGQnXG4gIHwgJ2dldFVzZXJBbGFybVRlbHMnXG4gIHwgJ3NldFVzZXJTZXR1cENvbnRhY3QnXG4gIHwgJ2FkZFRlcm1pbmFsTW91bnREZXYnXG4gIHwgJ2RlbFRlcm1pbmFsTW91bnREZXYnXG4gIHwgJ2RlbFVzZXJUZXJtaW5hbCdcbiAgfCAnRGV2VHlwZXMnXG4gIHwgJ21vZGlmeVVzZXJJbmZvJ1xuICB8ICdnZXRHUFNhZGRyZXNzJ1xuY2xhc3MgYXBpIHtcbiAgcmVhZG9ubHkgdXJsOiBzdHJpbmdcbiAgdG9rZW46IHN0cmluZ1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVybCA9IHVybFJlcXVlc3QgKyBcIi9hcGkvd3gvXCJcbiAgICB0aGlzLnRva2VuID0gXCJcIlxuXG4gIH1cbiAgLy8g55m75b2VLSDln5/lkI1cbiAgYXN5bmMgbG9naW4oZGF0YTogeyBqc19jb2RlOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IGVsID0gYXdhaXQgdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiBcImNvZGUyU2Vzc2lvblwiLCBkYXRhIH0pXG4gICAgaWYgKGVsLm9rKSB7XG4gICAgICB0aGlzLnRva2VuID0gZWwuYXJnLnRva2VuXG4gICAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAndG9rZW4nLCBkYXRhOiBlbC5hcmcudG9rZW4gfSlcbiAgICAgIC8vIOWQr+eUqHNvY2tldFxuICAgICAgY29uc3Qgd3MgPSB3eC5jb25uZWN0U29ja2V0KHtcbiAgICAgICAgdXJsOiB1cmxXcyxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgd3Mub25PcGVuKCgpID0+IHtcbiAgICAgICAgd3Muc2VuZCh7XG4gICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyB0b2tlbjogZWwuYXJnLnRva2VuIGFzIHN0cmluZyB9KSxcbiAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICB3cy5zZW5kKHsgZGF0YTogJ3RpbWUnIH0pXG4gICAgICAgICAgICB9LCAxMDAwICogMzApXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB3cy5vbk1lc3NhZ2UoKG1zZykgPT4ge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aWsOeahOWRiuitpuS/oeaBrycsXG4gICAgICAgICAgICBjb250ZW50OiBtc2cuZGF0YS50b1N0cmluZygpLFxuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvYWxhcm0vYWxhcm0nXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgd3gub25Tb2NrZXRDbG9zZSgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cobmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpICsgXCJzb2NrZXQgY2xvc2VcIik7XG5cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBlbFxuICB9XG4gIC8vICDnmbvlvZUt55So5LqO5bCP56iL5bqP55m75b2V6aG16Z2i55m75b2VXG4gIHVzZXJsb2dpbihkYXRhOiB7IG9wZW5pZDogc3RyaW5nLCBhdmFudGVyOiBzdHJpbmcsIHVzZXI6IHN0cmluZywgcGFzc3dkOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICd1c2VybG9naW4nLCBkYXRhIH0pXG4gIH1cbiAgLy8g55So5LqO6Kej57uR5b6u5L+h5ZKM6YCP5Lyg6LSm5Y+355qE57uR5a6a5YWz57O7XG4gIHVuYmluZHd4KCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICd1bmJpbmR3eCcsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6Kej5a+G55S16K+d5a2X56ym5LiyXG4gIGdldHBob25lbnVtYmVyPFQ+KGRhdGE6IHsgb3BlbmlkOiBzdHJpbmcsIGVuY3J5cHRlZERhdGE6IHN0cmluZywgaXY6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VD4oeyB1cmw6IFwiZ2V0cGhvbmVudW1iZXJcIiwgZGF0YSB9KVxuICB9XG4gIC8vIOazqOWGjFxuICByZWdpc3RlclVzZXIoZGF0YTogeyB1c2VyOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdGVsOiBzdHJpbmcsIGF2YW50ZXI6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQoeyB1cmw6IFwicmVnaXN0ZXJcIiwgZGF0YSB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+e7keWumuiuvuWkh1xuICBnZXR1c2VyTW91bnREZXYoKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8eyBVVHM6IFRlcm1pbmFsW10gfT4oeyB1cmw6ICdnZXR1c2VyTW91bnREZXYnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOiOt+WPlkRUVeS/oeaBr1xuICBnZXREVFVJbmZvKG1hYzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VGVybWluYWw+KHsgdXJsOiAnZ2V0RFRVSW5mbycsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VXNlckluZm8+KHsgdXJsOiAnZ2V0VXNlckluZm8nLCBkYXRhOiB7fSB9KVxuICB9XG5cbiAgLy8g57uR5a6aRFRVXG4gIGJpbmREZXYobWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnYmluZERldicsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuICAvLyDojrflj5bmnKrnoa7orqTlkYrorabmlbDph49cbiAgZ2V0QWxhcm11bmNvbmZpcm1lZCgpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxzdHJpbmc+KHsgdXJsOiAnZ2V0QWxhcm11bmNvbmZpcm1lZCcsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6I635Y+W5ZGK6K2m5L+h5oGvXG4gIGdldEFsYXJtKHN0YXJ0OiBzdHJpbmcsIGVuZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8dWFydEFsYXJtT2JqZWN0W10+KHsgdXJsOiAnZ2V0QWxhcm0nLCBkYXRhOiB7IHN0YXJ0LCBlbmQgfSB9KVxuICB9XG4gIC8vIOehruiupOWRiuitpuS/oeaBryzmm7TmlrBiYXJcbiAgYWxhcm1Db25maXJtZWQoaWQ/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydCh7IHVybDogJ2FsYXJtQ29uZmlybWVkJywgZGF0YTogaWQgPyB7IGlkIH0gOiB7fSB9KVxuICB9XG4gIC8vIOiOt+WPluiuvuWkh+WunuaXtui/kOihjOS/oeaBr1xuICBnZXREZXZzUnVuSW5mbyhtYWM6IHN0cmluZywgcGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxxdWVyeVJlc3VsdD4oeyB1cmw6IFwiZ2V0RGV2c1J1bkluZm9cIiwgZGF0YTogeyBtYWMsIHBpZCB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH5Y6G5Y+y6L+Q6KGM5pWw5o2uXG4gIGdldERldnNIaXN0b3J5SW5mbyhtYWM6IHN0cmluZywgcGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGF0YXRpbWU6IHN0cmluZyA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2dldERldnNIaXN0b3J5SW5mbycsIGRhdGE6IHsgbWFjLCBwaWQsIG5hbWUsIGRhdGF0aW1lIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIfmk43mjqfmjIfku6RcbiAgZ2V0RGV2T3ByYXRlKHByb3RvY29sOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxQaWNrPFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsICdPcHJhdGVJbnN0cnVjdCc+Pih7IHVybDogJ2dldERldk9wcmF0ZScsIGRhdGE6IHsgcHJvdG9jb2wgfSB9KVxuICB9XG4gIC8vICDlm7rlrprlj5HpgIHorr7lpIfmk43kvZzmjIfku6RcbiAgU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQocXVlcnk6IFBhcnRpYWw8aW5zdHJ1Y3RRdWVyeUFyZz4sIGl0ZW06IE9wcmF0ZUluc3RydWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ1NlbmRQcm9jb3RvbEluc3RydWN0U2V0JywgZGF0YTogeyBxdWVyeSwgaXRlbSB9LCBtZXRob2Q6ICdQT1NUJyB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+iHquWumuS5ieWNj+iurumFjee9rlxuICBnZXRVc2VyRGV2Q29uc3RhbnQocHJvdG9jb2w6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHsgdXNlcjogUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCwgc3lzOiBQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLCBwcm90b2NvbDogcHJvdG9jb2wgfT4oeyB1cmw6ICdnZXRVc2VyRGV2Q29uc3RhbnQnLCBkYXRhOiB7IHByb3RvY29sIH0gfSlcbiAgfVxuICAvLyDnu5/kuIDmj5DkuqTphY3nva5cbiAgcHVzaFRocmVzaG9sZChhcmc6IENvbnN0YW50QWxhcm1TdGF0W10gfCBUaHJlc2hvbGRbXSB8IHN0cmluZ1tdLCB0eXBlOiBDb25zdGFudFRocmVzaG9sZFR5cGUsIFByb3RvY29sOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiBcInB1c2hUaHJlc2hvbGRcIiwgZGF0YTogeyB0eXBlLCBhcmcsIFByb3RvY29sIH0sIG1ldGhvZDogXCJQT1NUXCIgfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfnmoTlkYrorabogZTns7vmlrnlvI9cbiAgZ2V0VXNlckFsYXJtVGVscygpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxQaWNrPHVzZXJTZXR1cCwgJ21haWxzJyB8ICd0ZWxzJz4+KHsgdXJsOiAnZ2V0VXNlckFsYXJtVGVscycsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6K6+572u55So5oi355qE5ZGK6K2m6IGU57O75pa55byPXG4gIHNldFVzZXJTZXR1cENvbnRhY3QodGVsczogc3RyaW5nW10sIG1haWxzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdzZXRVc2VyU2V0dXBDb250YWN0JywgZGF0YTogeyB0ZWxzLCBtYWlscyB9LCBtZXRob2Q6IFwiUE9TVFwiIH0pXG4gIH1cbiAgLy8g5re75YqgRFRV5oyC6L296K6+5aSHXG4gIGFkZFRlcm1pbmFsTW91bnREZShEZXZNYWM6IHN0cmluZywgVHlwZTogc3RyaW5nLCBtb3VudERldjogc3RyaW5nLCBwcm90b2NvbDogc3RyaW5nLCBwaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdhZGRUZXJtaW5hbE1vdW50RGV2JywgZGF0YTogeyBEZXZNYWMsIFR5cGUsIG1vdW50RGV2LCBwcm90b2NvbCwgcGlkIH0sIG1ldGhvZDogXCJQT1NUXCIgfSlcbiAgfVxuICAvLyDliKDpmaTnu4jnq6/mjILovb3orr7lpIdcbiAgZGVsVGVybWluYWxNb3VudERldihEZXZNYWM6IHN0cmluZywgbW91bnREZXY6IHN0cmluZywgcGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnZGVsVGVybWluYWxNb3VudERldicsIGRhdGE6IHsgRGV2TWFjLCBtb3VudERldiwgcGlkIH0sIG1ldGhvZDogXCJQT1NUXCIgfSlcbiAgfVxuICAvLyDliKDpmaTnlKjmiLfnu4jnq6/nu5HlrppcbiAgZGVsVXNlclRlcm1pbmFsKG1hYzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2RlbFVzZXJUZXJtaW5hbCcsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIfnsbvlnotcbiAgRGV2VHlwZXMoVHlwZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8RGV2c1R5cGVbXT4oeyB1cmw6ICdEZXZUeXBlcycsIGRhdGE6IHsgVHlwZSB9IH0pXG4gIH1cbiAgLy8g5L+u5pS555So5oi35L+h5oGvXG4gIG1vZGlmeVVzZXJJbmZvKHR5cGU6ICd0ZWwnIHwgJ21haWwnIHwgJ25hbWUnLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ21vZGlmeVVzZXJJbmZvJywgZGF0YTogeyB0eXBlLCB2YWx1ZSB9IH0pXG4gIH1cbiAgLy8g6I635Y+WZ3Bz5a6a5L2N55qE6K+m57uG5Zyw5Z2AXG4gIGdldEdQU2FkZHJlc3MobG9jYXRpb246IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHRlbmNldE1hcD4oeyB1cmw6ICdnZXRHUFNhZGRyZXNzJywgZGF0YTogeyBsb2NhdGlvbiB9IH0pXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFJlcXVlc3RVYXJ0PFQ+KG9iamVjdDogeyB1cmw6IHVybCwgZGF0YTogT2JqZWN0LCBtZXRob2Q/OiBcIkdFVFwiIHwgXCJQT1NUXCIgfSkge1xuICAgIC8vd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+ato+WcqOafpeivoicgfSlcbiAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgIGNvbnN0IHRva2VuOiBzdHJpbmcgPSB0aGlzLnRva2VuIHx8IGF3YWl0IHd4LmdldFN0b3JhZ2UoeyBrZXk6ICd0b2tlbicgfSkudGhlbihlbCA9PiBlbC5kYXRhKS5jYXRjaCgoKSA9PiBcIlwiKVxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxBcG9sbG9Nb25nb1Jlc3VsdDxUPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogdGhpcy51cmwgKyBvYmplY3QudXJsLFxuICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHsgdG9rZW46IHRva2VuIH0sIG9iamVjdC5kYXRhKSxcbiAgICAgICAgbWV0aG9kOiBvYmplY3QubWV0aG9kIHx8IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgIC8vd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogU3RyaW5nKHJlcy5zdGF0dXNDb2RlKSxcbiAgICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEudG9TdHJpbmcoKSB8fCByZXMuZXJyTXNnLFxuICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEgYXMgYW55KVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGUgPT4ge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7IHRpdGxlOiAn5pyN5Yqh5Zmo6ZSZ6K+vJywgY29udGVudDogZS5lcnJNc2cgfSlcbiAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGFwaSgpXG4iXX0=