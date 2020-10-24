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
var api = (function () {
    function api() {
        this.url = "https://test.ladishb.com/api/wx/";
        this.token = "";
    }
    api.prototype.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RequestUart({ url: "code2Session", data: data })];
                    case 1:
                        el = _a.sent();
                        if (el.ok) {
                            this.token = el.arg.token;
                            wx.setStorage({ key: 'token', data: el.arg.token });
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
        return this.RequestUart({ url: 'alarmConfirmed', data: { id: id } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0NBO0lBR0U7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLGtDQUFrQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBRWpCLENBQUM7SUFFSyxtQkFBSyxHQUFYLFVBQVksSUFBeUI7Ozs7OzRCQUN4QixXQUFNLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsRUFBQTs7d0JBQS9ELEVBQUUsR0FBRyxTQUEwRDt3QkFDckUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7NEJBQ3pCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7eUJBQ3BEO3dCQUNELFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFFRCx1QkFBUyxHQUFULFVBQVUsSUFBdUU7UUFDL0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVELHNCQUFRLEdBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCw0QkFBYyxHQUFkLFVBQWtCLElBQTJEO1FBQzNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFB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QUMsR0FBRyxDQUFDLElBQVcsQ0FBQyxDQUFBOzRDQUMxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7eUNBQ047b0NBQ0gsQ0FBQztvQ0FDRCxJQUFJLEVBQUUsVUFBQSxDQUFDO3dDQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTt3Q0FDbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO29DQUNYLENBQUM7b0NBQ0QsUUFBUSxFQUFFO3dDQUNSLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO29DQUMvQixDQUFDO2lDQUNGLENBQUMsQ0FBQTs0QkFDSixDQUFDLENBQUMsRUFBQTs0QkEvQkYsV0FBTyxTQStCTCxFQUFBOzs7O0tBQ0g7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQTVKRCxJQTRKQztBQUVELGtCQUFlLElBQUksR0FBRyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgdGVuY2V0TWFwIHtcbiAgLyog54q25oCB56CB77yMMOS4uuato+W4uCxcbjMxMOivt+axguWPguaVsOS/oeaBr+acieivr++8jFxuMzExS2V55qC85byP6ZSZ6K+vLFxuMzA26K+35rGC5pyJ5oqk5oyB5L+h5oGv6K+35qOA5p+l5a2X56ym5LiyLFxuMTEw6K+35rGC5p2l5rqQ5pyq6KKr5o6I5p2DICovXG4gIHN0YXR1czogbnVtYmVyLFxuICByZXF1ZXN0X2lkOiBzdHJpbmcsXG4gIG1lc3NhZ2U6IHN0cmluZ1xuICByZXN1bHQ6IGFueVxufVxuXG50eXBlIHVybCA9ICdnZXR1c2VyTW91bnREZXYnXG4gIHwgJ2NvZGUyU2Vzc2lvbidcbiAgfCAnZ2V0cGhvbmVudW1iZXInXG4gIHwgJ3JlZ2lzdGVyJ1xuICB8ICdnZXREVFVJbmZvJ1xuICB8ICdiaW5kRGV2J1xuICB8ICdnZXRBbGFybSdcbiAgfCAnZ2V0RGV2c1J1bkluZm8nXG4gIHwgJ2dldERldnNIaXN0b3J5SW5mbydcbiAgfCAndXNlcmxvZ2luJ1xuICB8ICdnZXRVc2VySW5mbydcbiAgfCAndW5iaW5kd3gnXG4gIHwgJ2dldEFsYXJtdW5jb25maXJtZWQnXG4gIHwgJ2FsYXJtQ29uZmlybWVkJ1xuICB8ICdnZXREZXZPcHJhdGUnXG4gIHwgJ1NlbmRQcm9jb3RvbEluc3RydWN0U2V0J1xuICB8ICdnZXRVc2VyRGV2Q29uc3RhbnQnXG4gIHwgJ3B1c2hUaHJlc2hvbGQnXG4gIHwgJ2dldFVzZXJBbGFybVRlbHMnXG4gIHwgJ3NldFVzZXJTZXR1cENvbnRhY3QnXG4gIHwgJ2FkZFRlcm1pbmFsTW91bnREZXYnXG4gIHwgJ2RlbFRlcm1pbmFsTW91bnREZXYnXG4gIHwgJ2RlbFVzZXJUZXJtaW5hbCdcbiAgfCAnRGV2VHlwZXMnXG4gIHwgJ21vZGlmeVVzZXJJbmZvJ1xuICB8ICdnZXRHUFNhZGRyZXNzJ1xuY2xhc3MgYXBpIHtcbiAgcmVhZG9ubHkgdXJsOiBzdHJpbmdcbiAgdG9rZW46IHN0cmluZ1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVybCA9IFwiaHR0cHM6Ly90ZXN0LmxhZGlzaGIuY29tL2FwaS93eC9cIlxuICAgIHRoaXMudG9rZW4gPSBcIlwiXG5cbiAgfVxuICAvLyDnmbvlvZUt55So5LqO5bCP56iL5bqP5ZCv5Yqo5YWz6IGU5b6u5L+h6Ieq5Yqo55m75b2VXG4gIGFzeW5jIGxvZ2luKGRhdGE6IHsganNfY29kZTogc3RyaW5nIH0pIHtcbiAgICBjb25zdCBlbCA9IGF3YWl0IHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogXCJjb2RlMlNlc3Npb25cIiwgZGF0YSB9KVxuICAgIGlmIChlbC5vaykge1xuICAgICAgdGhpcy50b2tlbiA9IGVsLmFyZy50b2tlblxuICAgICAgd3guc2V0U3RvcmFnZSh7IGtleTogJ3Rva2VuJywgZGF0YTogZWwuYXJnLnRva2VuIH0pXG4gICAgfVxuICAgIHJldHVybiBlbFxuICB9XG4gIC8vICDnmbvlvZUt55So5LqO5bCP56iL5bqP55m75b2V6aG16Z2i55m75b2VXG4gIHVzZXJsb2dpbihkYXRhOiB7IG9wZW5pZDogc3RyaW5nLCBhdmFudGVyOiBzdHJpbmcsIHVzZXI6IHN0cmluZywgcGFzc3dkOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICd1c2VybG9naW4nLCBkYXRhIH0pXG4gIH1cbiAgLy8g55So5LqO6Kej57uR5b6u5L+h5ZKM6YCP5Lyg6LSm5Y+355qE57uR5a6a5YWz57O7XG4gIHVuYmluZHd4KCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICd1bmJpbmR3eCcsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6Kej5a+G55S16K+d5a2X56ym5LiyXG4gIGdldHBob25lbnVtYmVyPFQ+KGRhdGE6IHsgb3BlbmlkOiBzdHJpbmcsIGVuY3J5cHRlZERhdGE6IHN0cmluZywgaXY6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VD4oeyB1cmw6IFwiZ2V0cGhvbmVudW1iZXJcIiwgZGF0YSB9KVxuICB9XG4gIC8vIOazqOWGjFxuICByZWdpc3RlclVzZXIoZGF0YTogeyB1c2VyOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdGVsOiBzdHJpbmcsIGF2YW50ZXI6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQoeyB1cmw6IFwicmVnaXN0ZXJcIiwgZGF0YSB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+e7keWumuiuvuWkh1xuICBnZXR1c2VyTW91bnREZXYoKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8eyBVVHM6IFRlcm1pbmFsW10gfT4oeyB1cmw6ICdnZXR1c2VyTW91bnREZXYnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOiOt+WPlkRUVeS/oeaBr1xuICBnZXREVFVJbmZvKG1hYzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VGVybWluYWw+KHsgdXJsOiAnZ2V0RFRVSW5mbycsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VXNlckluZm8+KHsgdXJsOiAnZ2V0VXNlckluZm8nLCBkYXRhOiB7fSB9KVxuICB9XG5cbiAgLy8g57uR5a6aRFRVXG4gIGJpbmREZXYobWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnYmluZERldicsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuICAvLyDojrflj5bmnKrnoa7orqTlkYrorabmlbDph49cbiAgZ2V0QWxhcm11bmNvbmZpcm1lZCgpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxzdHJpbmc+KHsgdXJsOiAnZ2V0QWxhcm11bmNvbmZpcm1lZCcsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6I635Y+W5ZGK6K2m5L+h5oGvXG4gIGdldEFsYXJtKHN0YXJ0OiBzdHJpbmcsIGVuZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8dWFydEFsYXJtT2JqZWN0W10+KHsgdXJsOiAnZ2V0QWxhcm0nLCBkYXRhOiB7IHN0YXJ0LCBlbmQgfSB9KVxuICB9XG4gIC8vIOehruiupOWRiuitpuS/oeaBryzmm7TmlrBiYXJcbiAgYWxhcm1Db25maXJtZWQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0KHsgdXJsOiAnYWxhcm1Db25maXJtZWQnLCBkYXRhOiB7IGlkIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIflrp7ml7bov5DooYzkv6Hmga9cbiAgZ2V0RGV2c1J1bkluZm8obWFjOiBzdHJpbmcsIHBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8cXVlcnlSZXN1bHQ+KHsgdXJsOiBcImdldERldnNSdW5JbmZvXCIsIGRhdGE6IHsgbWFjLCBwaWQgfSB9KVxuICB9XG4gIC8vIOiOt+WPluiuvuWkh+WOhuWPsui/kOihjOaVsOaNrlxuICBnZXREZXZzSGlzdG9yeUluZm8obWFjOiBzdHJpbmcsIHBpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRhdGF0aW1lOiBzdHJpbmcgPSAnJykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdnZXREZXZzSGlzdG9yeUluZm8nLCBkYXRhOiB7IG1hYywgcGlkLCBuYW1lLCBkYXRhdGltZSB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH5pON5o6n5oyH5LukXG4gIGdldERldk9wcmF0ZShwcm90b2NvbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8UGljazxQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLCAnT3ByYXRlSW5zdHJ1Y3QnPj4oeyB1cmw6ICdnZXREZXZPcHJhdGUnLCBkYXRhOiB7IHByb3RvY29sIH0gfSlcbiAgfVxuICAvLyAg5Zu65a6a5Y+R6YCB6K6+5aSH5pON5L2c5oyH5LukXG4gIFNlbmRQcm9jb3RvbEluc3RydWN0U2V0KHF1ZXJ5OiBQYXJ0aWFsPGluc3RydWN0UXVlcnlBcmc+LCBpdGVtOiBPcHJhdGVJbnN0cnVjdCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdTZW5kUHJvY290b2xJbnN0cnVjdFNldCcsIGRhdGE6IHsgcXVlcnksIGl0ZW0gfSwgbWV0aG9kOiAnUE9TVCcgfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfoh6rlrprkuYnljY/orq7phY3nva5cbiAgZ2V0VXNlckRldkNvbnN0YW50KHByb3RvY29sOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx7IHVzZXI6IFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsIHN5czogUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCwgcHJvdG9jb2w6IHByb3RvY29sIH0+KHsgdXJsOiAnZ2V0VXNlckRldkNvbnN0YW50JywgZGF0YTogeyBwcm90b2NvbCB9IH0pXG4gIH1cbiAgLy8g57uf5LiA5o+Q5Lqk6YWN572uXG4gIHB1c2hUaHJlc2hvbGQoYXJnOiBDb25zdGFudEFsYXJtU3RhdFtdIHwgVGhyZXNob2xkW10gfCBzdHJpbmdbXSwgdHlwZTogQ29uc3RhbnRUaHJlc2hvbGRUeXBlLCBQcm90b2NvbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogXCJwdXNoVGhyZXNob2xkXCIsIGRhdGE6IHsgdHlwZSwgYXJnLCBQcm90b2NvbCB9LCBtZXRob2Q6IFwiUE9TVFwiIH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi355qE5ZGK6K2m6IGU57O75pa55byPXG4gIGdldFVzZXJBbGFybVRlbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8UGljazx1c2VyU2V0dXAsICdtYWlscycgfCAndGVscyc+Pih7IHVybDogJ2dldFVzZXJBbGFybVRlbHMnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOiuvue9rueUqOaIt+eahOWRiuitpuiBlOezu+aWueW8j1xuICBzZXRVc2VyU2V0dXBDb250YWN0KHRlbHM6IHN0cmluZ1tdLCBtYWlsczogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnc2V0VXNlclNldHVwQ29udGFjdCcsIGRhdGE6IHsgdGVscywgbWFpbHMgfSwgbWV0aG9kOiBcIlBPU1RcIiB9KVxuICB9XG4gIC8vIOa3u+WKoERUVeaMgui9veiuvuWkh1xuICBhZGRUZXJtaW5hbE1vdW50RGUoRGV2TWFjOiBzdHJpbmcsIFR5cGU6IHN0cmluZywgbW91bnREZXY6IHN0cmluZywgcHJvdG9jb2w6IHN0cmluZywgcGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnYWRkVGVybWluYWxNb3VudERldicsIGRhdGE6IHsgRGV2TWFjLCBUeXBlLCBtb3VudERldiwgcHJvdG9jb2wsIHBpZCB9LCBtZXRob2Q6IFwiUE9TVFwiIH0pXG4gIH1cbiAgLy8g5Yig6Zmk57uI56uv5oyC6L296K6+5aSHXG4gIGRlbFRlcm1pbmFsTW91bnREZXYoRGV2TWFjOiBzdHJpbmcsIG1vdW50RGV2OiBzdHJpbmcsIHBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2RlbFRlcm1pbmFsTW91bnREZXYnLCBkYXRhOiB7IERldk1hYywgbW91bnREZXYsIHBpZCB9LCBtZXRob2Q6IFwiUE9TVFwiIH0pXG4gIH1cbiAgLy8g5Yig6Zmk55So5oi357uI56uv57uR5a6aXG4gIGRlbFVzZXJUZXJtaW5hbChtYWM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdkZWxVc2VyVGVybWluYWwnLCBkYXRhOiB7IG1hYyB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH57G75Z6LXG4gIERldlR5cGVzKFR5cGU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PERldnNUeXBlW10+KHsgdXJsOiAnRGV2VHlwZXMnLCBkYXRhOiB7IFR5cGUgfSB9KVxuICB9XG4gIC8vIOS/ruaUueeUqOaIt+S/oeaBr1xuICBtb2RpZnlVc2VySW5mbyh0eXBlOiAndGVsJyB8ICdtYWlsJyB8ICduYW1lJywgdmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdtb2RpZnlVc2VySW5mbycsIGRhdGE6IHsgdHlwZSwgdmFsdWUgfSB9KVxuICB9XG4gIC8vIOiOt+WPlmdwc+WumuS9jeeahOivpue7huWcsOWdgFxuICBnZXRHUFNhZGRyZXNzKGxvY2F0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx0ZW5jZXRNYXA+KHsgdXJsOiAnZ2V0R1BTYWRkcmVzcycsIGRhdGE6IHsgbG9jYXRpb24gfSB9KVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBSZXF1ZXN0VWFydDxUPihvYmplY3Q6IHsgdXJsOiB1cmwsIGRhdGE6IE9iamVjdCwgbWV0aG9kPzogXCJHRVRcIiB8IFwiUE9TVFwiIH0pIHtcbiAgICAvL3d4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjmn6Xor6InIH0pXG4gICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICBjb25zdCB0b2tlbjogc3RyaW5nID0gdGhpcy50b2tlbiB8fCBhd2FpdCB3eC5nZXRTdG9yYWdlKHsga2V5OiAndG9rZW4nIH0pLnRoZW4oZWwgPT4gZWwuZGF0YSkuY2F0Y2goKCkgPT4gXCJcIilcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8QXBvbGxvTW9uZ29SZXN1bHQ8VD4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHRoaXMudXJsICsgb2JqZWN0LnVybCxcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7IHRva2VuOiB0b2tlbiB9LCBvYmplY3QuZGF0YSksXG4gICAgICAgIG1ldGhvZDogb2JqZWN0Lm1ldGhvZCB8fCBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAvL3d4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6IFN0cmluZyhyZXMuc3RhdHVzQ29kZSksXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLnRvU3RyaW5nKCkgfHwgcmVzLmVyck1zZyxcbiAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlamVjdChyZXMpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhIGFzIGFueSlcbiAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBlID0+IHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoeyB0aXRsZTogJ+acjeWKoeWZqOmUmeivrycsIGNvbnRlbnQ6IGUuZXJyTXNnIH0pXG4gICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBhcGkoKVxuIl19