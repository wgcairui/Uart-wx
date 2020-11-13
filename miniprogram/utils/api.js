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
            var _this = this;
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
                                        _this.wsInter = setInterval(function () {
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
                                    clearInterval(_this.wsInter);
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
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RequestUart({ url: 'unbindwx', data: {} })];
                    case 1:
                        el = _a.sent();
                        this.token = "";
                        return [2, el];
                }
            });
        });
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
    api.prototype.cancelwx = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RequestUart({ url: 'cancelwx', data: {} })];
                    case 1:
                        el = _a.sent();
                        this.token = "";
                        return [2, el];
                }
            });
        });
    };
    api.prototype.getUserTel = function () {
        return this.RequestUart({ url: 'getUserTel', data: {} });
    };
    api.prototype.sendValidation = function () {
        return this.RequestUart({ url: 'sendValidation', data: {} });
    };
    api.prototype.ValidationCode = function (code) {
        return this.RequestUart({ url: 'ValidationCode', data: { code: code } });
    };
    api.prototype.getNodes = function () {
        return this.RequestUart({ url: 'getNodes', data: {} });
    };
    api.prototype.bacthRegisterDTU = function (node, dtus) {
        return this.RequestUart({ url: 'bacthRegisterDTU', data: { node: node, dtus: dtus }, method: "POST" });
    };
    api.prototype.addVm = function () {
        return this.RequestUart({ url: 'addVm', data: {} });
    };
    api.prototype.modifyDTUName = function (dtu, name) {
        return this.RequestUart({ url: 'modifyDTUName', data: { dtu: dtu, name: name } });
    };
    api.prototype.updateGps = function (dtu, jw) {
        return this.RequestUart({ url: 'updateGps', data: { dtu: dtu, jw: jw } });
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
                                    timeout: 1000 * 60,
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
                                        wx.hideLoading();
                                        reject(e);
                                    },
                                    complete: function () {
                                        wx.hideNavigationBarLoading();
                                        wx.hideLoading();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQTZDO0FBaUQ3QztJQUlFO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxtQkFBVSxHQUFHLFVBQVUsQ0FBQTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBRUssbUJBQUssR0FBWCxVQUFZLElBQXlCOzs7Ozs7NEJBQ3hCLFdBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBL0QsRUFBRSxHQUFHLFNBQTBEO3dCQUNyRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQTs0QkFDekIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTs0QkFFN0MsT0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUMxQixHQUFHLEVBQUUsY0FBSztnQ0FDVixNQUFNLEVBQUU7b0NBQ04sY0FBYyxFQUFFLGtCQUFrQjtpQ0FDbkM7NkJBQ0YsQ0FBQyxDQUFBOzRCQUNGLElBQUUsQ0FBQyxNQUFNLENBQUM7Z0NBQ1IsSUFBRSxDQUFDLElBQUksQ0FBQztvQ0FDTixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQWUsRUFBRSxDQUFDO29DQUN2RCxPQUFPLEVBQUU7d0NBQ1AsS0FBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7NENBQ3pCLElBQUUsQ0FBQyxJQUFJ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QUUsQ0FBQTtvQ0FDbEIsQ0FBQztpQ0FDRixDQUFDLENBQUE7NEJBQ0osQ0FBQyxDQUFDLEVBQUE7NEJBbENGLFdBQU8sU0FrQ0wsRUFBQTs7OztLQUNIO0lBQ0gsVUFBQztBQUFELENBQUMsQUExT0QsSUEwT0M7QUFFRCxrQkFBZSxJQUFJLEdBQUcsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXJsUmVxdWVzdCwgdXJsV3MgfSBmcm9tIFwiLi4vY29uZmlnXCJcblxuaW50ZXJmYWNlIHRlbmNldE1hcCB7XG4gIC8qIOeKtuaAgeegge+8jDDkuLrmraPluLgsXG4zMTDor7fmsYLlj4LmlbDkv6Hmga/mnInor6/vvIxcbjMxMUtleeagvOW8j+mUmeivryxcbjMwNuivt+axguacieaKpOaMgeS/oeaBr+ivt+ajgOafpeWtl+espuS4sixcbjExMOivt+axguadpea6kOacquiiq+aOiOadgyAqL1xuICBzdGF0dXM6IG51bWJlcixcbiAgcmVxdWVzdF9pZDogc3RyaW5nLFxuICBtZXNzYWdlOiBzdHJpbmdcbiAgcmVzdWx0OiBhbnlcbn1cblxudHlwZSB1cmwgPSAnZ2V0dXNlck1vdW50RGV2J1xuICB8ICdjb2RlMlNlc3Npb24nXG4gIHwgJ2dldHBob25lbnVtYmVyJ1xuICB8ICdyZWdpc3RlcidcbiAgfCAnZ2V0RFRVSW5mbydcbiAgfCAnYmluZERldidcbiAgfCAnZ2V0QWxhcm0nXG4gIHwgJ2dldERldnNSdW5JbmZvJ1xuICB8ICdnZXREZXZzSGlzdG9yeUluZm8nXG4gIHwgJ3VzZXJsb2dpbidcbiAgfCAnZ2V0VXNlckluZm8nXG4gIHwgJ3VuYmluZHd4J1xuICB8ICdnZXRBbGFybXVuY29uZmlybWVkJ1xuICB8ICdhbGFybUNvbmZpcm1lZCdcbiAgfCAnZ2V0RGV2T3ByYXRlJ1xuICB8ICdTZW5kUHJvY290b2xJbnN0cnVjdFNldCdcbiAgfCAnZ2V0VXNlckRldkNvbnN0YW50J1xuICB8ICdwdXNoVGhyZXNob2xkJ1xuICB8ICdnZXRVc2VyQWxhcm1UZWxzJ1xuICB8ICdzZXRVc2VyU2V0dXBDb250YWN0J1xuICB8ICdhZGRUZXJtaW5hbE1vdW50RGV2J1xuICB8ICdkZWxUZXJtaW5hbE1vdW50RGV2J1xuICB8ICdkZWxVc2VyVGVybWluYWwnXG4gIHwgJ0RldlR5cGVzJ1xuICB8ICdtb2RpZnlVc2VySW5mbydcbiAgfCAnZ2V0R1BTYWRkcmVzcydcbiAgfCAnY2FuY2Vsd3gnXG4gIHwgJ2dldFVzZXJUZWwnXG4gIHwgJ3NlbmRWYWxpZGF0aW9uJ1xuICB8ICdWYWxpZGF0aW9uQ29kZSdcbiAgfCAnZ2V0Tm9kZXMnXG4gIHwgJ2JhY3RoUmVnaXN0ZXJEVFUnXG4gIHwgJ2FkZFZtJ1xuICB8ICdtb2RpZnlEVFVOYW1lJ1xuICB8ICd1cGRhdGVHcHMnXG5jbGFzcyBhcGkge1xuICByZWFkb25seSB1cmw6IHN0cmluZ1xuICB0b2tlbjogc3RyaW5nXG4gIHByaXZhdGUgd3NJbnRlcj86IG51bWJlclxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVybCA9IHVybFJlcXVlc3QgKyBcIi9hcGkvd3gvXCJcbiAgICB0aGlzLnRva2VuID0gXCJcIlxuICB9XG4gIC8vIOeZu+W9lS0g5Z+f5ZCNXG4gIGFzeW5jIGxvZ2luKGRhdGE6IHsganNfY29kZTogc3RyaW5nIH0pIHtcbiAgICBjb25zdCBlbCA9IGF3YWl0IHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogXCJjb2RlMlNlc3Npb25cIiwgZGF0YSB9KVxuICAgIGlmIChlbC5vaykge1xuICAgICAgdGhpcy50b2tlbiA9IGVsLmFyZy50b2tlblxuICAgICAgd3guc2V0U3RvcmFnZSh7IGtleTogJ3Rva2VuJywgZGF0YTogZWwuYXJnLnRva2VuIH0pXG4gICAgICAvLyDlkK/nlKhzb2NrZXRcbiAgICAgIGNvbnN0IHdzID0gd3guY29ubmVjdFNvY2tldCh7XG4gICAgICAgIHVybDogdXJsV3MsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHdzLm9uT3BlbigoKSA9PiB7XG4gICAgICAgIHdzLnNlbmQoe1xuICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgdG9rZW46IGVsLmFyZy50b2tlbiBhcyBzdHJpbmcgfSksXG4gICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53c0ludGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICB3cy5zZW5kKHsgZGF0YTogJ3RpbWUnIH0pXG4gICAgICAgICAgICB9LCAxMDAwICogMzApXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB3cy5vbk1lc3NhZ2UoKG1zZykgPT4ge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aWsOeahOWRiuitpuS/oeaBrycsXG4gICAgICAgICAgICBjb250ZW50OiBtc2cuZGF0YS50b1N0cmluZygpLFxuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvYWxhcm0vYWxhcm0nXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgd3gub25Tb2NrZXRDbG9zZSgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cobmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpICsgXCJzb2NrZXQgY2xvc2VcIik7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLndzSW50ZXIpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfVxuICAvLyAg55m75b2VLeeUqOS6juWwj+eoi+W6j+eZu+W9lemhtemdoueZu+W9lVxuICB1c2VybG9naW4oZGF0YTogeyBvcGVuaWQ6IHN0cmluZywgYXZhbnRlcjogc3RyaW5nLCB1c2VyOiBzdHJpbmcsIHBhc3N3ZDogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAndXNlcmxvZ2luJywgZGF0YSB9KVxuICB9XG4gIC8vIOeUqOS6juino+e7keW+ruS/oeWSjOmAj+S8oOi0puWPt+eahOe7keWumuWFs+ezu1xuICBhc3luYyB1bmJpbmR3eCgpIHtcbiAgICBjb25zdCBlbCA9IGF3YWl0IHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ3VuYmluZHd4JywgZGF0YToge30gfSlcbiAgICB0aGlzLnRva2VuID0gXCJcIlxuICAgIHJldHVybiBlbFxuICB9XG4gIC8vIOino+WvhueUteivneWtl+espuS4slxuICBnZXRwaG9uZW51bWJlcjxUPihkYXRhOiB7IG9wZW5pZDogc3RyaW5nLCBlbmNyeXB0ZWREYXRhOiBzdHJpbmcsIGl2OiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFQ+KHsgdXJsOiBcImdldHBob25lbnVtYmVyXCIsIGRhdGEgfSlcbiAgfVxuICAvLyDms6jlhoxcbiAgcmVnaXN0ZXJVc2VyKGRhdGE6IHsgdXNlcjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHRlbDogc3RyaW5nLCBhdmFudGVyOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0KHsgdXJsOiBcInJlZ2lzdGVyXCIsIGRhdGEgfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfnu5Hlrprorr7lpIdcbiAgZ2V0dXNlck1vdW50RGV2KCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHsgVVRzOiBUZXJtaW5hbFtdIH0+KHsgdXJsOiAnZ2V0dXNlck1vdW50RGV2JywgZGF0YToge30gfSlcbiAgfVxuICAvLyDojrflj5ZEVFXkv6Hmga9cbiAgZ2V0RFRVSW5mbyhtYWM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFRlcm1pbmFsPih7IHVybDogJ2dldERUVUluZm8nLCBkYXRhOiB7IG1hYyB9IH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFVzZXJJbmZvPih7IHVybDogJ2dldFVzZXJJbmZvJywgZGF0YToge30gfSlcbiAgfVxuXG4gIC8vIOe7keWumkRUVVxuICBiaW5kRGV2KG1hYzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2JpbmREZXYnLCBkYXRhOiB7IG1hYyB9IH0pXG4gIH1cbiAgLy8g6I635Y+W5pyq56Gu6K6k5ZGK6K2m5pWw6YePXG4gIGdldEFsYXJtdW5jb25maXJtZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8c3RyaW5nPih7IHVybDogJ2dldEFsYXJtdW5jb25maXJtZWQnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOiOt+WPluWRiuitpuS/oeaBr1xuICBnZXRBbGFybShzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHVhcnRBbGFybU9iamVjdFtdPih7IHVybDogJ2dldEFsYXJtJywgZGF0YTogeyBzdGFydCwgZW5kIH0gfSlcbiAgfVxuICAvLyDnoa7orqTlkYrorabkv6Hmga8s5pu05pawYmFyXG4gIGFsYXJtQ29uZmlybWVkKGlkPzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQoeyB1cmw6ICdhbGFybUNvbmZpcm1lZCcsIGRhdGE6IGlkID8geyBpZCB9IDoge30gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIflrp7ml7bov5DooYzkv6Hmga9cbiAgZ2V0RGV2c1J1bkluZm8obWFjOiBzdHJpbmcsIHBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8cXVlcnlSZXN1bHQ+KHsgdXJsOiBcImdldERldnNSdW5JbmZvXCIsIGRhdGE6IHsgbWFjLCBwaWQgfSB9KVxuICB9XG4gIC8vIOiOt+WPluiuvuWkh+WOhuWPsui/kOihjOaVsOaNrlxuICBnZXREZXZzSGlzdG9yeUluZm8obWFjOiBzdHJpbmcsIHBpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRhdGF0aW1lOiBzdHJpbmcgPSAnJykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdnZXREZXZzSGlzdG9yeUluZm8nLCBkYXRhOiB7IG1hYywgcGlkLCBuYW1lLCBkYXRhdGltZSB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH5pON5o6n5oyH5LukXG4gIGdldERldk9wcmF0ZShwcm90b2NvbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8UGljazxQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLCAnT3ByYXRlSW5zdHJ1Y3QnPj4oeyB1cmw6ICdnZXREZXZPcHJhdGUnLCBkYXRhOiB7IHByb3RvY29sIH0gfSlcbiAgfVxuICAvLyAg5Zu65a6a5Y+R6YCB6K6+5aSH5pON5L2c5oyH5LukXG4gIFNlbmRQcm9jb3RvbEluc3RydWN0U2V0KHF1ZXJ5OiBQYXJ0aWFsPGluc3RydWN0UXVlcnlBcmc+LCBpdGVtOiBPcHJhdGVJbnN0cnVjdCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdTZW5kUHJvY290b2xJbnN0cnVjdFNldCcsIGRhdGE6IHsgcXVlcnksIGl0ZW0gfSwgbWV0aG9kOiAnUE9TVCcgfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfoh6rlrprkuYnljY/orq7phY3nva5cbiAgZ2V0VXNlckRldkNvbnN0YW50KHByb3RvY29sOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx7IHVzZXI6IFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsIHN5czogUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCwgcHJvdG9jb2w6IHByb3RvY29sIH0+KHsgdXJsOiAnZ2V0VXNlckRldkNvbnN0YW50JywgZGF0YTogeyBwcm90b2NvbCB9IH0pXG4gIH1cbiAgLy8g57uf5LiA5o+Q5Lqk6YWN572uXG4gIHB1c2hUaHJlc2hvbGQoYXJnOiBDb25zdGFudEFsYXJtU3RhdFtdIHwgVGhyZXNob2xkW10gfCBzdHJpbmdbXSwgdHlwZTogQ29uc3RhbnRUaHJlc2hvbGRUeXBlLCBQcm90b2NvbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogXCJwdXNoVGhyZXNob2xkXCIsIGRhdGE6IHsgdHlwZSwgYXJnLCBQcm90b2NvbCB9LCBtZXRob2Q6IFwiUE9TVFwiIH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi355qE5ZGK6K2m6IGU57O75pa55byPXG4gIGdldFVzZXJBbGFybVRlbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8UGljazx1c2VyU2V0dXAsICdtYWlscycgfCAndGVscyc+Pih7IHVybDogJ2dldFVzZXJBbGFybVRlbHMnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOiuvue9rueUqOaIt+eahOWRiuitpuiBlOezu+aWueW8j1xuICBzZXRVc2VyU2V0dXBDb250YWN0KHRlbHM6IHN0cmluZ1tdLCBtYWlsczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnc2V0VXNlclNldHVwQ29udGFjdCcsIGRhdGE6IHsgdGVscywgbWFpbHMgfSwgbWV0aG9kOiBcIlBPU1RcIiB9KVxuICB9XG4gIC8vIOa3u+WKoERUVeaMgui9veiuvuWkh1xuICBhZGRUZXJtaW5hbE1vdW50RGUoRGV2TWFjOiBzdHJpbmcsIFR5cGU6IHN0cmluZywgbW91bnREZXY6IHN0cmluZywgcHJvdG9jb2w6IHN0cmluZywgcGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnYWRkVGVybWluYWxNb3VudERldicsIGRhdGE6IHsgRGV2TWFjLCBUeXBlLCBtb3VudERldiwgcHJvdG9jb2wsIHBpZCB9LCBtZXRob2Q6IFwiUE9TVFwiIH0pXG4gIH1cbiAgLy8g5Yig6Zmk57uI56uv5oyC6L296K6+5aSHXG4gIGRlbFRlcm1pbmFsTW91bnREZXYoRGV2TWFjOiBzdHJpbmcsIG1vdW50RGV2OiBzdHJpbmcsIHBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2RlbFRlcm1pbmFsTW91bnREZXYnLCBkYXRhOiB7IERldk1hYywgbW91bnREZXYsIHBpZCB9LCBtZXRob2Q6IFwiUE9TVFwiIH0pXG4gIH1cbiAgLy8g5Yig6Zmk55So5oi357uI56uv57uR5a6aXG4gIGRlbFVzZXJUZXJtaW5hbChtYWM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdkZWxVc2VyVGVybWluYWwnLCBkYXRhOiB7IG1hYyB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH57G75Z6LXG4gIERldlR5cGVzKFR5cGU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PERldnNUeXBlW10+KHsgdXJsOiAnRGV2VHlwZXMnLCBkYXRhOiB7IFR5cGUgfSB9KVxuICB9XG4gIC8vIOS/ruaUueeUqOaIt+S/oeaBr1xuICBtb2RpZnlVc2VySW5mbyh0eXBlOiAndGVsJyB8ICdtYWlsJyB8ICduYW1lJywgdmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdtb2RpZnlVc2VySW5mbycsIGRhdGE6IHsgdHlwZSwgdmFsdWUgfSB9KVxuICB9XG4gIC8vIOiOt+WPlmdwc+WumuS9jeeahOivpue7huWcsOWdgFxuICBnZXRHUFNhZGRyZXNzKGxvY2F0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx0ZW5jZXRNYXA+KHsgdXJsOiAnZ2V0R1BTYWRkcmVzcycsIGRhdGE6IHsgbG9jYXRpb24gfSB9KVxuICB9XG5cbiAgLy8g5rOo6ZSA5b6u5L+hXG4gIGFzeW5jIGNhbmNlbHd4KCkge1xuICAgIGNvbnN0IGVsID0gYXdhaXQgdGhpcy5SZXF1ZXN0VWFydDxzdHJpbmc+KHsgdXJsOiAnY2FuY2Vsd3gnLCBkYXRhOiB7fSB9KVxuICAgIHRoaXMudG9rZW4gPSBcIlwiXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvLyDojrflj5bnlKjmiLfmiYvmnLrlj7fnoIFcbiAgZ2V0VXNlclRlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxzdHJpbmc+KHsgdXJsOiAnZ2V0VXNlclRlbCcsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g5Y+R6YCB55+t5L+h6aqM6K+B56CBXG4gIHNlbmRWYWxpZGF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHN0cmluZz4oeyB1cmw6ICdzZW5kVmFsaWRhdGlvbicsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g5qOA6aqM55+t5L+h6aqM6K+B56CBXG4gIFZhbGlkYXRpb25Db2RlKGNvZGU6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHN0cmluZz4oeyB1cmw6ICdWYWxpZGF0aW9uQ29kZScsIGRhdGE6IHsgY29kZSB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6IqC54K55YiX6KGoXG4gIGdldE5vZGVzKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PE5vZGVDbGllbnRbXT4oeyB1cmw6ICdnZXROb2RlcycsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g5om56YeP5rOo5YaMRFRVXG4gIGJhY3RoUmVnaXN0ZXJEVFUobm9kZTogc3RyaW5nLCBkdHVzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHN0cmluZz4oeyB1cmw6ICdiYWN0aFJlZ2lzdGVyRFRVJywgZGF0YTogeyBub2RlLCBkdHVzIH0sIG1ldGhvZDogXCJQT1NUXCIgfSlcbiAgfVxuICAvLyDmt7vliqDomZrmi5/orr7lpIdcbiAgYWRkVm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VGVybWluYWxbXT4oeyB1cmw6ICdhZGRWbScsIGRhdGE6IHt9IH0pXG4gIH1cblxuICAvLyDkv67mlLlEVFXlkI3np7BcbiAgbW9kaWZ5RFRVTmFtZShkdHU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8c3RyaW5nPih7IHVybDogJ21vZGlmeURUVU5hbWUnLCBkYXRhOiB7IGR0dSwgbmFtZSB9IH0pXG4gIH1cblxuICAvLyDmm7TmlrBkdHXlrprkvY1cbiAgdXBkYXRlR3BzKGR0dTogc3RyaW5nLCBqdzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8c3RyaW5nPih7IHVybDogJ3VwZGF0ZUdwcycsIGRhdGE6IHsgZHR1LCBqdyB9IH0pXG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBSZXF1ZXN0VWFydDxUPihvYmplY3Q6IHsgdXJsOiB1cmwsIGRhdGE6IE9iamVjdCwgbWV0aG9kPzogXCJHRVRcIiB8IFwiUE9TVFwiIH0pIHtcbiAgICAvL3d4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjmn6Xor6InIH0pXG4gICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICBjb25zdCB0b2tlbjogc3RyaW5nID0gdGhpcy50b2tlbiB8fCBhd2FpdCB3eC5nZXRTdG9yYWdlKHsga2V5OiAndG9rZW4nIH0pLnRoZW4oZWwgPT4gZWwuZGF0YSkuY2F0Y2goKCkgPT4gXCJcIilcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8QXBvbGxvTW9uZ29SZXN1bHQ8VD4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB0aW1lb3V0OiAxMDAwICogNjAsXG4gICAgICAgIHVybDogdGhpcy51cmwgKyBvYmplY3QudXJsLFxuICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHsgdG9rZW46IHRva2VuIH0sIG9iamVjdC5kYXRhKSxcbiAgICAgICAgbWV0aG9kOiBvYmplY3QubWV0aG9kIHx8IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAvLyB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiBTdHJpbmcocmVzLnN0YXR1c0NvZGUpLFxuICAgICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS50b1N0cmluZygpIHx8IHJlcy5lcnJNc2csXG4gICAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSBhcyBhbnkpXG4gICAgICAgICAgICB9LCAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZSA9PiB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6ICfmnI3liqHlmajplJnor68nLCBjb250ZW50OiBlLmVyck1zZyB9KVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBhcGkoKVxuIl19