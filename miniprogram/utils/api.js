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
        var _this = this;
        return this.RequestUart({ url: 'alarmConfirmed', data: { id: id } }).finally(function () { return _this.getAlarmunconfirmed(); });
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
                                            wx.showModal({ title: String(res.statusCode), content: res.data.toString() || res.errMsg });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBO0lBR0U7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLGtDQUFrQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBRWpCLENBQUM7SUFFSyxtQkFBSyxHQUFYLFVBQVksSUFBeUI7Ozs7OzRCQUN4QixXQUFNLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsRUFBQTs7d0JBQS9ELEVBQUUsR0FBRyxTQUEwRDt3QkFDckUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7NEJBQ3pCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7eUJBQ3BEO3dCQUNELFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFFRCx1QkFBUyxHQUFULFVBQVUsSUFBdUU7UUFDL0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVELHNCQUFRLEdBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCw0QkFBYyxHQUFkLFVBQWtCLElBQTJEO1FBQzNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELDBCQUFZLEdBQVosVUFBYSxJQUFrRTtRQUM3RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBRUQsNkJBQWUsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBc0IsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDcEYsQ0FBQztJQUVELHdCQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBVyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxLQUFBLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekUsQ0FBQztJQUVELHlCQUFXLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQVcsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFHRCxxQkFBTyxHQUFQLFVBQVEsR0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsS0FBQSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFFRCxpQ0FBbUIsR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQVMsRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDM0UsQ0FBQztJQUVELHNCQUFRLEdBQVIsVUFBUyxLQUFhLEVBQUUsR0FBVztRQUNqQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQW9CLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN2RixDQUFDO0lBRUQsNEJBQWMsR0FBZCxVQUFlLEVBQVU7UUFBekIsaUJBRUM7UUFEQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFBLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFBO0lBQzVHLENBQUM7SUFFRCw0QkFBYyxHQUFkLFVBQWUsR0FBVyxFQUFFLEdBQVc7UUFDckMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFjLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsS0FBQSxFQUFFLEdBQUcsS0FBQSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3JGLENBQUM7SUFFRCxnQ0FBa0IsR0FBbEIsVUFBbUIsR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFZLEVBQUUsUUFBcUI7UUFBckIseUJBQUEsRUFBQSxhQUFxQjtRQUM5RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxLQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDakcsQ0FBQztJQUVELDBCQUFZLEdBQVosVUFBYSxRQUFnQjtRQUMzQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQW9ELEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLFVBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN6SCxDQUFDO0lBRUQscUNBQXVCLEdBQXZCLFVBQXdCLEtBQWdDLEVBQUUsSUFBb0I7UUFDNUUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFNLEVBQUUsR0FBRyxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDekcsQ0FBQztJQUVELGdDQUFrQixHQUFsQixVQUFtQixRQUFnQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQTBGLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsVUFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3JLLENBQUM7SUFFRCwyQkFBYSxHQUFiLFVBQWMsR0FBaUQsRUFBRSxJQUEyQixFQUFFLFFBQWdCO1FBQzVHLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBTSxFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUN2RyxDQUFDO0lBQ2EseUJBQVcsR0FBekIsVUFBNkIsTUFBMkQ7Ozs7Ozs7d0JBRXRGLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO3dCQUNQLEtBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQTtnQ0FBVixjQUFVO3dCQUFJLFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxJQUFJLEVBQVAsQ0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQU0sT0FBQSxFQUFFLEVBQUYsQ0FBRSxDQUFDLEVBQUE7OzhCQUF6RSxTQUF5RTs7O3dCQUF2RyxLQUFLLEtBQWtHO3dCQUN0RyxXQUFNLElBQUksT0FBTyxDQUF1QixVQUFDLE9BQU8sRUFBRSxNQUFNO2dDQUM3RCxFQUFFLENBQUMsT0FBTyxDQUFDO29DQUNULEdBQUcsRUFBRSxLQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHO29DQUMxQixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO29DQUNsRCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxLQUFLO29DQUM5QixPQUFPLEVBQUUsVUFBQSxHQUFHO3dDQUdWLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7NENBQzFCLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTs0Q0FDM0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3lDQUNaOzZDQUFNOzRDQUNMLFVBQVUsQ0FBQztnREFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQVcsQ0FBQyxDQUFBOzRDQUMxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7eUNBQ047b0NBQ0gsQ0FBQztvQ0FDRCxJQUFJLEVBQUUsVUFBQSxDQUFDO3dDQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTt3Q0FDbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO29DQUNYLENBQUM7b0NBQ0QsUUFBUSxFQUFFO3dDQUNSLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO29DQUMvQixDQUFDO2lDQUNGLENBQUMsQ0FBQTs0QkFDSixDQUFDLENBQUMsRUFBQTs0QkF6QkYsV0FBTyxTQXlCTCxFQUFBOzs7O0tBQ0g7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQXJIRCxJQXFIQztBQUVELGtCQUFlLElBQUksR0FBRyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIHVybCA9ICdnZXR1c2VyTW91bnREZXYnXG4gIHwgJ2NvZGUyU2Vzc2lvbidcbiAgfCAnZ2V0cGhvbmVudW1iZXInXG4gIHwgJ3JlZ2lzdGVyJ1xuICB8ICdnZXREVFVJbmZvJ1xuICB8ICdiaW5kRGV2J1xuICB8ICdnZXRBbGFybSdcbiAgfCAnZ2V0RGV2c1J1bkluZm8nXG4gIHwgJ2dldERldnNIaXN0b3J5SW5mbydcbiAgfCAndXNlcmxvZ2luJ1xuICB8ICdnZXRVc2VySW5mbydcbiAgfCAndW5iaW5kd3gnXG4gIHwgJ2dldEFsYXJtdW5jb25maXJtZWQnXG4gIHwgJ2FsYXJtQ29uZmlybWVkJ1xuICB8ICdnZXREZXZPcHJhdGUnXG4gIHwgJ1NlbmRQcm9jb3RvbEluc3RydWN0U2V0J1xuICB8ICdnZXRVc2VyRGV2Q29uc3RhbnQnXG4gIHwgJ3B1c2hUaHJlc2hvbGQnXG5jbGFzcyBhcGkge1xuICByZWFkb25seSB1cmw6IHN0cmluZ1xuICB0b2tlbjogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudXJsID0gXCJodHRwczovL3Rlc3QubGFkaXNoYi5jb20vYXBpL3d4L1wiXG4gICAgdGhpcy50b2tlbiA9IFwiXCJcblxuICB9XG4gIC8vIOeZu+W9lS3nlKjkuo7lsI/nqIvluo/lkK/liqjlhbPogZTlvq7kv6Hoh6rliqjnmbvlvZVcbiAgYXN5bmMgbG9naW4oZGF0YTogeyBqc19jb2RlOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IGVsID0gYXdhaXQgdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiBcImNvZGUyU2Vzc2lvblwiLCBkYXRhIH0pXG4gICAgaWYgKGVsLm9rKSB7XG4gICAgICB0aGlzLnRva2VuID0gZWwuYXJnLnRva2VuXG4gICAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAndG9rZW4nLCBkYXRhOiBlbC5hcmcudG9rZW4gfSlcbiAgICB9XG4gICAgcmV0dXJuIGVsXG4gIH1cbiAgLy8gIOeZu+W9lS3nlKjkuo7lsI/nqIvluo/nmbvlvZXpobXpnaLnmbvlvZVcbiAgdXNlcmxvZ2luKGRhdGE6IHsgb3BlbmlkOiBzdHJpbmcsIGF2YW50ZXI6IHN0cmluZywgdXNlcjogc3RyaW5nLCBwYXNzd2Q6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ3VzZXJsb2dpbicsIGRhdGEgfSlcbiAgfVxuICAvLyDnlKjkuo7op6Pnu5Hlvq7kv6HlkozpgI/kvKDotKblj7fnmoTnu5HlrprlhbPns7tcbiAgdW5iaW5kd3goKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ3VuYmluZHd4JywgZGF0YToge30gfSlcbiAgfVxuICAvLyDop6Plr4bnlLXor53lrZfnrKbkuLJcbiAgZ2V0cGhvbmVudW1iZXI8VD4oZGF0YTogeyBvcGVuaWQ6IHN0cmluZywgZW5jcnlwdGVkRGF0YTogc3RyaW5nLCBpdjogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxUPih7IHVybDogXCJnZXRwaG9uZW51bWJlclwiLCBkYXRhIH0pXG4gIH1cbiAgLy8g5rOo5YaMXG4gIHJlZ2lzdGVyVXNlcihkYXRhOiB7IHVzZXI6IHN0cmluZywgbmFtZTogc3RyaW5nLCB0ZWw6IHN0cmluZywgYXZhbnRlcjogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydCh7IHVybDogXCJyZWdpc3RlclwiLCBkYXRhIH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGdldHVzZXJNb3VudERldigpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx7IFVUczogVGVybWluYWxbXSB9Pih7IHVybDogJ2dldHVzZXJNb3VudERldicsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6I635Y+WRFRV5L+h5oGvXG4gIGdldERUVUluZm8obWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxUZXJtaW5hbD4oeyB1cmw6ICdnZXREVFVJbmZvJywgZGF0YTogeyBtYWMgfSB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxVc2VySW5mbz4oeyB1cmw6ICdnZXRVc2VySW5mbycsIGRhdGE6IHt9IH0pXG4gIH1cblxuICAvLyDnu5HlrppEVFVcbiAgYmluZERldihtYWM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdiaW5kRGV2JywgZGF0YTogeyBtYWMgfSB9KVxuICB9XG4gIC8vIOiOt+WPluacquehruiupOWRiuitpuaVsOmHj1xuICBnZXRBbGFybXVuY29uZmlybWVkKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHN0cmluZz4oeyB1cmw6ICdnZXRBbGFybXVuY29uZmlybWVkJywgZGF0YToge30gfSlcbiAgfVxuICAvLyDojrflj5blkYrorabkv6Hmga9cbiAgZ2V0QWxhcm0oc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx1YXJ0QWxhcm1PYmplY3RbXT4oeyB1cmw6ICdnZXRBbGFybScsIGRhdGE6IHsgc3RhcnQsIGVuZCB9IH0pXG4gIH1cbiAgLy8g56Gu6K6k5ZGK6K2m5L+h5oGvLOabtOaWsGJhclxuICBhbGFybUNvbmZpcm1lZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQoeyB1cmw6ICdhbGFybUNvbmZpcm1lZCcsIGRhdGE6IHsgaWQgfSB9KS5maW5hbGx5KCgpID0+IHRoaXMuZ2V0QWxhcm11bmNvbmZpcm1lZCgpKVxuICB9XG4gIC8vIOiOt+WPluiuvuWkh+WunuaXtui/kOihjOS/oeaBr1xuICBnZXREZXZzUnVuSW5mbyhtYWM6IHN0cmluZywgcGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxxdWVyeVJlc3VsdD4oeyB1cmw6IFwiZ2V0RGV2c1J1bkluZm9cIiwgZGF0YTogeyBtYWMsIHBpZCB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH5Y6G5Y+y6L+Q6KGM5pWw5o2uXG4gIGdldERldnNIaXN0b3J5SW5mbyhtYWM6IHN0cmluZywgcGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGF0YXRpbWU6IHN0cmluZyA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2dldERldnNIaXN0b3J5SW5mbycsIGRhdGE6IHsgbWFjLCBwaWQsIG5hbWUsIGRhdGF0aW1lIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIfmk43mjqfmjIfku6RcbiAgZ2V0RGV2T3ByYXRlKHByb3RvY29sOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxQaWNrPFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsICdPcHJhdGVJbnN0cnVjdCc+Pih7IHVybDogJ2dldERldk9wcmF0ZScsIGRhdGE6IHsgcHJvdG9jb2wgfSB9KVxuICB9XG4gIC8vICDlm7rlrprlj5HpgIHorr7lpIfmk43kvZzmjIfku6RcbiAgU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQocXVlcnk6IFBhcnRpYWw8aW5zdHJ1Y3RRdWVyeUFyZz4sIGl0ZW06IE9wcmF0ZUluc3RydWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ1NlbmRQcm9jb3RvbEluc3RydWN0U2V0JywgZGF0YTogeyBxdWVyeSwgaXRlbSB9LCBtZXRob2Q6ICdQT1NUJyB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+iHquWumuS5ieWNj+iurumFjee9rlxuICBnZXRVc2VyRGV2Q29uc3RhbnQocHJvdG9jb2w6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHsgdXNlcjogUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCwgc3lzOiBQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLCBwcm90b2NvbDogcHJvdG9jb2wgfT4oeyB1cmw6ICdnZXRVc2VyRGV2Q29uc3RhbnQnLCBkYXRhOiB7IHByb3RvY29sIH0gfSlcbiAgfVxuICAvLyDnu5/kuIDmj5DkuqTphY3nva5cbiAgcHVzaFRocmVzaG9sZChhcmc6IENvbnN0YW50QWxhcm1TdGF0W10gfCBUaHJlc2hvbGRbXSB8IHN0cmluZ1tdLCB0eXBlOiBDb25zdGFudFRocmVzaG9sZFR5cGUsIFByb3RvY29sOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiBcInB1c2hUaHJlc2hvbGRcIiwgZGF0YTogeyB0eXBlLCBhcmcsIFByb3RvY29sIH0sIG1ldGhvZDogXCJQT1NUXCIgfSlcbiAgfVxuICBwcml2YXRlIGFzeW5jIFJlcXVlc3RVYXJ0PFQ+KG9iamVjdDogeyB1cmw6IHVybCwgZGF0YTogT2JqZWN0LCBtZXRob2Q/OiBcIkdFVFwiIHwgXCJQT1NUXCIgfSkge1xuICAgIC8vd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+ato+WcqOafpeivoicgfSlcbiAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgIGNvbnN0IHRva2VuOiBzdHJpbmcgPSB0aGlzLnRva2VuIHx8IGF3YWl0IHd4LmdldFN0b3JhZ2UoeyBrZXk6ICd0b2tlbicgfSkudGhlbihlbCA9PiBlbC5kYXRhKS5jYXRjaCgoKSA9PiBcIlwiKVxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxBcG9sbG9Nb25nb1Jlc3VsdDxUPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogdGhpcy51cmwgKyBvYmplY3QudXJsLFxuICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHsgdG9rZW46IHRva2VuIH0sIG9iamVjdC5kYXRhKSxcbiAgICAgICAgbWV0aG9kOiBvYmplY3QubWV0aG9kIHx8IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgIC8vd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoeyB0aXRsZTogU3RyaW5nKHJlcy5zdGF0dXNDb2RlKSwgY29udGVudDogcmVzLmRhdGEudG9TdHJpbmcoKSB8fCByZXMuZXJyTXNnIH0pXG4gICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSBhcyBhbnkpXG4gICAgICAgICAgICB9LCAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZSA9PiB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6ICfmnI3liqHlmajplJnor68nLCBjb250ZW50OiBlLmVyck1zZyB9KVxuICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgYXBpKClcbiJdfQ==