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
                                        reject(e);
                                    },
                                    complete: function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQTZDO0FBaUQ3QztJQUlFO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxtQkFBVSxHQUFHLFVBQVUsQ0FBQTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBRUssbUJBQUssR0FBWCxVQUFZLElBQXlCOzs7Ozs7NEJBQ3hCLFdBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBL0QsRUFBRSxHQUFHLFNBQTBEO3dCQUNyRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQTs0QkFDekIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTs0QkFFN0MsT0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUMxQixHQUFHLEVBQUUsY0FBSztnQ0FDVixNQUFNLEVBQUU7b0NBQ04sY0FBYyxFQUFFLGtCQUFrQjtpQ0FDbkM7NkJBQ0YsQ0FBQyxDQUFBOzRCQUNGLElBQUUsQ0FBQyxNQUFNLENBQUM7Z0NBQ1IsSUFBRSxDQUFDLElBQUksQ0FBQztvQ0FDTixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQWUsRUFBRSxDQUFDO29DQUN2RCxPQUFPLEVBQUU7d0NBQ1AsS0FBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7NENBQ3pCLElBQUUsQ0FBQyxJQUFJ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SUFBSSxHQUFHLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVybFJlcXVlc3QsIHVybFdzIH0gZnJvbSBcIi4uL2NvbmZpZ1wiXG5cbmludGVyZmFjZSB0ZW5jZXRNYXAge1xuICAvKiDnirbmgIHnoIHvvIww5Li65q2j5bi4LFxuMzEw6K+35rGC5Y+C5pWw5L+h5oGv5pyJ6K+v77yMXG4zMTFLZXnmoLzlvI/plJnor68sXG4zMDbor7fmsYLmnInmiqTmjIHkv6Hmga/or7fmo4Dmn6XlrZfnrKbkuLIsXG4xMTDor7fmsYLmnaXmupDmnKrooqvmjojmnYMgKi9cbiAgc3RhdHVzOiBudW1iZXIsXG4gIHJlcXVlc3RfaWQ6IHN0cmluZyxcbiAgbWVzc2FnZTogc3RyaW5nXG4gIHJlc3VsdDogYW55XG59XG5cbnR5cGUgdXJsID0gJ2dldHVzZXJNb3VudERldidcbiAgfCAnY29kZTJTZXNzaW9uJ1xuICB8ICdnZXRwaG9uZW51bWJlcidcbiAgfCAncmVnaXN0ZXInXG4gIHwgJ2dldERUVUluZm8nXG4gIHwgJ2JpbmREZXYnXG4gIHwgJ2dldEFsYXJtJ1xuICB8ICdnZXREZXZzUnVuSW5mbydcbiAgfCAnZ2V0RGV2c0hpc3RvcnlJbmZvJ1xuICB8ICd1c2VybG9naW4nXG4gIHwgJ2dldFVzZXJJbmZvJ1xuICB8ICd1bmJpbmR3eCdcbiAgfCAnZ2V0QWxhcm11bmNvbmZpcm1lZCdcbiAgfCAnYWxhcm1Db25maXJtZWQnXG4gIHwgJ2dldERldk9wcmF0ZSdcbiAgfCAnU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQnXG4gIHwgJ2dldFVzZXJEZXZDb25zdGFudCdcbiAgfCAncHVzaFRocmVzaG9sZCdcbiAgfCAnZ2V0VXNlckFsYXJtVGVscydcbiAgfCAnc2V0VXNlclNldHVwQ29udGFjdCdcbiAgfCAnYWRkVGVybWluYWxNb3VudERldidcbiAgfCAnZGVsVGVybWluYWxNb3VudERldidcbiAgfCAnZGVsVXNlclRlcm1pbmFsJ1xuICB8ICdEZXZUeXBlcydcbiAgfCAnbW9kaWZ5VXNlckluZm8nXG4gIHwgJ2dldEdQU2FkZHJlc3MnXG4gIHwgJ2NhbmNlbHd4J1xuICB8ICdnZXRVc2VyVGVsJ1xuICB8ICdzZW5kVmFsaWRhdGlvbidcbiAgfCAnVmFsaWRhdGlvbkNvZGUnXG4gIHwgJ2dldE5vZGVzJ1xuICB8ICdiYWN0aFJlZ2lzdGVyRFRVJ1xuICB8ICdhZGRWbSdcbiAgfCAnbW9kaWZ5RFRVTmFtZSdcbiAgfCAndXBkYXRlR3BzJ1xuY2xhc3MgYXBpIHtcbiAgcmVhZG9ubHkgdXJsOiBzdHJpbmdcbiAgdG9rZW46IHN0cmluZ1xuICBwcml2YXRlIHdzSW50ZXI/OiBudW1iZXJcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmwgPSB1cmxSZXF1ZXN0ICsgXCIvYXBpL3d4L1wiXG4gICAgdGhpcy50b2tlbiA9IFwiXCJcbiAgfVxuICAvLyDnmbvlvZUtIOWfn+WQjVxuICBhc3luYyBsb2dpbihkYXRhOiB7IGpzX2NvZGU6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgZWwgPSBhd2FpdCB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6IFwiY29kZTJTZXNzaW9uXCIsIGRhdGEgfSlcbiAgICBpZiAoZWwub2spIHtcbiAgICAgIHRoaXMudG9rZW4gPSBlbC5hcmcudG9rZW5cbiAgICAgIHd4LnNldFN0b3JhZ2UoeyBrZXk6ICd0b2tlbicsIGRhdGE6IGVsLmFyZy50b2tlbiB9KVxuICAgICAgLy8g5ZCv55Soc29ja2V0XG4gICAgICBjb25zdCB3cyA9IHd4LmNvbm5lY3RTb2NrZXQoe1xuICAgICAgICB1cmw6IHVybFdzLFxuICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB3cy5vbk9wZW4oKCkgPT4ge1xuICAgICAgICB3cy5zZW5kKHtcbiAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IHRva2VuOiBlbC5hcmcudG9rZW4gYXMgc3RyaW5nIH0pLFxuICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud3NJbnRlciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgd3Muc2VuZCh7IGRhdGE6ICd0aW1lJyB9KVxuICAgICAgICAgICAgfSwgMTAwMCAqIDMwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgd3Mub25NZXNzYWdlKChtc2cpID0+IHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmlrDnmoTlkYrorabkv6Hmga8nLFxuICAgICAgICAgICAgY29udGVudDogbXNnLmRhdGEudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtL2FsYXJtJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHd4Lm9uU29ja2V0Q2xvc2UoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKSArIFwic29ja2V0IGNsb3NlXCIpO1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy53c0ludGVyKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIGVsXG4gIH1cbiAgLy8gIOeZu+W9lS3nlKjkuo7lsI/nqIvluo/nmbvlvZXpobXpnaLnmbvlvZVcbiAgdXNlcmxvZ2luKGRhdGE6IHsgb3BlbmlkOiBzdHJpbmcsIGF2YW50ZXI6IHN0cmluZywgdXNlcjogc3RyaW5nLCBwYXNzd2Q6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ3VzZXJsb2dpbicsIGRhdGEgfSlcbiAgfVxuICAvLyDnlKjkuo7op6Pnu5Hlvq7kv6HlkozpgI/kvKDotKblj7fnmoTnu5HlrprlhbPns7tcbiAgYXN5bmMgdW5iaW5kd3goKSB7XG4gICAgY29uc3QgZWwgPSBhd2FpdCB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICd1bmJpbmR3eCcsIGRhdGE6IHt9IH0pXG4gICAgdGhpcy50b2tlbiA9IFwiXCJcbiAgICByZXR1cm4gZWxcbiAgfVxuICAvLyDop6Plr4bnlLXor53lrZfnrKbkuLJcbiAgZ2V0cGhvbmVudW1iZXI8VD4oZGF0YTogeyBvcGVuaWQ6IHN0cmluZywgZW5jcnlwdGVkRGF0YTogc3RyaW5nLCBpdjogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxUPih7IHVybDogXCJnZXRwaG9uZW51bWJlclwiLCBkYXRhIH0pXG4gIH1cbiAgLy8g5rOo5YaMXG4gIHJlZ2lzdGVyVXNlcihkYXRhOiB7IHVzZXI6IHN0cmluZywgbmFtZTogc3RyaW5nLCB0ZWw6IHN0cmluZywgYXZhbnRlcjogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydCh7IHVybDogXCJyZWdpc3RlclwiLCBkYXRhIH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGdldHVzZXJNb3VudERldigpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx7IFVUczogVGVybWluYWxbXSB9Pih7IHVybDogJ2dldHVzZXJNb3VudERldicsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6I635Y+WRFRV5L+h5oGvXG4gIGdldERUVUluZm8obWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxUZXJtaW5hbD4oeyB1cmw6ICdnZXREVFVJbmZvJywgZGF0YTogeyBtYWMgfSB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxVc2VySW5mbz4oeyB1cmw6ICdnZXRVc2VySW5mbycsIGRhdGE6IHt9IH0pXG4gIH1cblxuICAvLyDnu5HlrppEVFVcbiAgYmluZERldihtYWM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdiaW5kRGV2JywgZGF0YTogeyBtYWMgfSB9KVxuICB9XG4gIC8vIOiOt+WPluacquehruiupOWRiuitpuaVsOmHj1xuICBnZXRBbGFybXVuY29uZmlybWVkKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHN0cmluZz4oeyB1cmw6ICdnZXRBbGFybXVuY29uZmlybWVkJywgZGF0YToge30gfSlcbiAgfVxuICAvLyDojrflj5blkYrorabkv6Hmga9cbiAgZ2V0QWxhcm0oc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx1YXJ0QWxhcm1PYmplY3RbXT4oeyB1cmw6ICdnZXRBbGFybScsIGRhdGE6IHsgc3RhcnQsIGVuZCB9IH0pXG4gIH1cbiAgLy8g56Gu6K6k5ZGK6K2m5L+h5oGvLOabtOaWsGJhclxuICBhbGFybUNvbmZpcm1lZChpZD86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0KHsgdXJsOiAnYWxhcm1Db25maXJtZWQnLCBkYXRhOiBpZCA/IHsgaWQgfSA6IHt9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH5a6e5pe26L+Q6KGM5L+h5oGvXG4gIGdldERldnNSdW5JbmZvKG1hYzogc3RyaW5nLCBwaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHF1ZXJ5UmVzdWx0Pih7IHVybDogXCJnZXREZXZzUnVuSW5mb1wiLCBkYXRhOiB7IG1hYywgcGlkIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIfljoblj7Lov5DooYzmlbDmja5cbiAgZ2V0RGV2c0hpc3RvcnlJbmZvKG1hYzogc3RyaW5nLCBwaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkYXRhdGltZTogc3RyaW5nID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnZ2V0RGV2c0hpc3RvcnlJbmZvJywgZGF0YTogeyBtYWMsIHBpZCwgbmFtZSwgZGF0YXRpbWUgfSB9KVxuICB9XG4gIC8vIOiOt+WPluiuvuWkh+aTjeaOp+aMh+S7pFxuICBnZXREZXZPcHJhdGUocHJvdG9jb2w6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFBpY2s8UHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCwgJ09wcmF0ZUluc3RydWN0Jz4+KHsgdXJsOiAnZ2V0RGV2T3ByYXRlJywgZGF0YTogeyBwcm90b2NvbCB9IH0pXG4gIH1cbiAgLy8gIOWbuuWumuWPkemAgeiuvuWkh+aTjeS9nOaMh+S7pFxuICBTZW5kUHJvY290b2xJbnN0cnVjdFNldChxdWVyeTogUGFydGlhbDxpbnN0cnVjdFF1ZXJ5QXJnPiwgaXRlbTogT3ByYXRlSW5zdHJ1Y3QpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQnLCBkYXRhOiB7IHF1ZXJ5LCBpdGVtIH0sIG1ldGhvZDogJ1BPU1QnIH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi36Ieq5a6a5LmJ5Y2P6K6u6YWN572uXG4gIGdldFVzZXJEZXZDb25zdGFudChwcm90b2NvbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8eyB1c2VyOiBQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLCBzeXM6IFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsIHByb3RvY29sOiBwcm90b2NvbCB9Pih7IHVybDogJ2dldFVzZXJEZXZDb25zdGFudCcsIGRhdGE6IHsgcHJvdG9jb2wgfSB9KVxuICB9XG4gIC8vIOe7n+S4gOaPkOS6pOmFjee9rlxuICBwdXNoVGhyZXNob2xkKGFyZzogQ29uc3RhbnRBbGFybVN0YXRbXSB8IFRocmVzaG9sZFtdIHwgc3RyaW5nW10sIHR5cGU6IENvbnN0YW50VGhyZXNob2xkVHlwZSwgUHJvdG9jb2w6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6IFwicHVzaFRocmVzaG9sZFwiLCBkYXRhOiB7IHR5cGUsIGFyZywgUHJvdG9jb2wgfSwgbWV0aG9kOiBcIlBPU1RcIiB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+eahOWRiuitpuiBlOezu+aWueW8j1xuICBnZXRVc2VyQWxhcm1UZWxzKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFBpY2s8dXNlclNldHVwLCAnbWFpbHMnIHwgJ3RlbHMnPj4oeyB1cmw6ICdnZXRVc2VyQWxhcm1UZWxzJywgZGF0YToge30gfSlcbiAgfVxuICAvLyDorr7nva7nlKjmiLfnmoTlkYrorabogZTns7vmlrnlvI9cbiAgc2V0VXNlclNldHVwQ29udGFjdCh0ZWxzOiBzdHJpbmdbXSwgbWFpbHM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ3NldFVzZXJTZXR1cENvbnRhY3QnLCBkYXRhOiB7IHRlbHMsIG1haWxzIH0sIG1ldGhvZDogXCJQT1NUXCIgfSlcbiAgfVxuICAvLyDmt7vliqBEVFXmjILovb3orr7lpIdcbiAgYWRkVGVybWluYWxNb3VudERlKERldk1hYzogc3RyaW5nLCBUeXBlOiBzdHJpbmcsIG1vdW50RGV2OiBzdHJpbmcsIHByb3RvY29sOiBzdHJpbmcsIHBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2FkZFRlcm1pbmFsTW91bnREZXYnLCBkYXRhOiB7IERldk1hYywgVHlwZSwgbW91bnREZXYsIHByb3RvY29sLCBwaWQgfSwgbWV0aG9kOiBcIlBPU1RcIiB9KVxuICB9XG4gIC8vIOWIoOmZpOe7iOerr+aMgui9veiuvuWkh1xuICBkZWxUZXJtaW5hbE1vdW50RGV2KERldk1hYzogc3RyaW5nLCBtb3VudERldjogc3RyaW5nLCBwaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdkZWxUZXJtaW5hbE1vdW50RGV2JywgZGF0YTogeyBEZXZNYWMsIG1vdW50RGV2LCBwaWQgfSwgbWV0aG9kOiBcIlBPU1RcIiB9KVxuICB9XG4gIC8vIOWIoOmZpOeUqOaIt+e7iOerr+e7keWumlxuICBkZWxVc2VyVGVybWluYWwobWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnZGVsVXNlclRlcm1pbmFsJywgZGF0YTogeyBtYWMgfSB9KVxuICB9XG4gIC8vIOiOt+WPluiuvuWkh+exu+Wei1xuICBEZXZUeXBlcyhUeXBlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxEZXZzVHlwZVtdPih7IHVybDogJ0RldlR5cGVzJywgZGF0YTogeyBUeXBlIH0gfSlcbiAgfVxuICAvLyDkv67mlLnnlKjmiLfkv6Hmga9cbiAgbW9kaWZ5VXNlckluZm8odHlwZTogJ3RlbCcgfCAnbWFpbCcgfCAnbmFtZScsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnbW9kaWZ5VXNlckluZm8nLCBkYXRhOiB7IHR5cGUsIHZhbHVlIH0gfSlcbiAgfVxuICAvLyDojrflj5ZncHPlrprkvY3nmoTor6bnu4blnLDlnYBcbiAgZ2V0R1BTYWRkcmVzcyhsb2NhdGlvbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8dGVuY2V0TWFwPih7IHVybDogJ2dldEdQU2FkZHJlc3MnLCBkYXRhOiB7IGxvY2F0aW9uIH0gfSlcbiAgfVxuXG4gIC8vIOazqOmUgOW+ruS/oVxuICBhc3luYyBjYW5jZWx3eCgpIHtcbiAgICBjb25zdCBlbCA9IGF3YWl0IHRoaXMuUmVxdWVzdFVhcnQ8c3RyaW5nPih7IHVybDogJ2NhbmNlbHd4JywgZGF0YToge30gfSlcbiAgICB0aGlzLnRva2VuID0gXCJcIlxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLy8g6I635Y+W55So5oi35omL5py65Y+356CBXG4gIGdldFVzZXJUZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8c3RyaW5nPih7IHVybDogJ2dldFVzZXJUZWwnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOWPkemAgeefreS/oemqjOivgeeggVxuICBzZW5kVmFsaWRhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxzdHJpbmc+KHsgdXJsOiAnc2VuZFZhbGlkYXRpb24nLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOajgOmqjOefreS/oemqjOivgeeggVxuICBWYWxpZGF0aW9uQ29kZShjb2RlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxzdHJpbmc+KHsgdXJsOiAnVmFsaWRhdGlvbkNvZGUnLCBkYXRhOiB7IGNvZGUgfSB9KVxuICB9XG4gIC8vIOiOt+WPluiKgueCueWIl+ihqFxuICBnZXROb2RlcygpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxOb2RlQ2xpZW50W10+KHsgdXJsOiAnZ2V0Tm9kZXMnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOaJuemHj+azqOWGjERUVVxuICBiYWN0aFJlZ2lzdGVyRFRVKG5vZGU6IHN0cmluZywgZHR1czogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxzdHJpbmc+KHsgdXJsOiAnYmFjdGhSZWdpc3RlckRUVScsIGRhdGE6IHsgbm9kZSwgZHR1cyB9LCBtZXRob2Q6IFwiUE9TVFwiIH0pXG4gIH1cbiAgLy8g5re75Yqg6Jma5ouf6K6+5aSHXG4gIGFkZFZtKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFRlcm1pbmFsW10+KHsgdXJsOiAnYWRkVm0nLCBkYXRhOiB7fSB9KVxuICB9XG5cbiAgLy8g5L+u5pS5RFRV5ZCN56ewXG4gIG1vZGlmeURUVU5hbWUoZHR1OiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHN0cmluZz4oeyB1cmw6ICdtb2RpZnlEVFVOYW1lJywgZGF0YTogeyBkdHUsIG5hbWUgfSB9KVxuICB9XG5cbiAgLy8g5pu05pawZHR15a6a5L2NXG4gIHVwZGF0ZUdwcyhkdHU6IHN0cmluZywganc6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHN0cmluZz4oeyB1cmw6ICd1cGRhdGVHcHMnLCBkYXRhOiB7IGR0dSwgancgfSB9KVxuICB9XG4gIHByaXZhdGUgYXN5bmMgUmVxdWVzdFVhcnQ8VD4ob2JqZWN0OiB7IHVybDogdXJsLCBkYXRhOiBPYmplY3QsIG1ldGhvZD86IFwiR0VUXCIgfCBcIlBPU1RcIiB9KSB7XG4gICAgLy93eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5q2j5Zyo5p+l6K+iJyB9KVxuICAgIC8vIHd4LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgY29uc3QgdG9rZW46IHN0cmluZyA9IHRoaXMudG9rZW4gfHwgYXdhaXQgd3guZ2V0U3RvcmFnZSh7IGtleTogJ3Rva2VuJyB9KS50aGVuKGVsID0+IGVsLmRhdGEpLmNhdGNoKCgpID0+IFwiXCIpXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPEFwb2xsb01vbmdvUmVzdWx0PFQ+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdGltZW91dDogMTAwMCAqIDYwLFxuICAgICAgICB1cmw6IHRoaXMudXJsICsgb2JqZWN0LnVybCxcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7IHRva2VuOiB0b2tlbiB9LCBvYmplY3QuZGF0YSksXG4gICAgICAgIG1ldGhvZDogb2JqZWN0Lm1ldGhvZCB8fCBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgLy8gd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogU3RyaW5nKHJlcy5zdGF0dXNDb2RlKSxcbiAgICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEudG9TdHJpbmcoKSB8fCByZXMuZXJyTXNnLFxuICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEgYXMgYW55KVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGUgPT4ge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7IHRpdGxlOiAn5pyN5Yqh5Zmo6ZSZ6K+vJywgY29udGVudDogZS5lcnJNc2cgfSlcbiAgICAgICAgICAvLyB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgICAvLyB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgYXBpKClcbiJdfQ==