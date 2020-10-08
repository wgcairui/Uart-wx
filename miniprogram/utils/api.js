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
                        if (el.ok)
                            this.token = el.arg.token;
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
    api.prototype.bindDev = function (mac) {
        return this.RequestUart({ url: 'bindDev', data: { mac: mac } });
    };
    api.prototype.getAlarm = function (start, end) {
        return this.RequestUart({ url: 'getAlarm', data: { start: start, end: end } });
    };
    api.prototype.getDevsRunInfo = function (mac, pid) {
        return this.RequestUart({ url: "getDevsRunInfo", data: { mac: mac, pid: pid } });
    };
    api.prototype.getDevsHistoryInfo = function (mac, pid, name, datatime) {
        if (datatime === void 0) { datatime = ''; }
        return this.RequestUart({ url: 'getDevsHistoryInfo', data: { mac: mac, pid: pid, name: name, datatime: datatime } });
    };
    api.prototype.RequestUart = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showNavigationBarLoading();
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: _this.url + object.url,
                                    data: Object.assign({ token: _this.token }, object.data),
                                    method: object.method || "GET",
                                    success: function (res) {
                                        if (res.statusCode !== 200) {
                                            wx.showModal({ title: String(res.statusCode), content: res.errMsg });
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
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return api;
}());
exports.default = new api();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0E7SUFHRTtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsa0NBQWtDLENBQUE7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUVLLG1CQUFLLEdBQVgsVUFBWSxJQUF5Qjs7Ozs7NEJBQ3hCLFdBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBL0QsRUFBRSxHQUFHLFNBQTBEO3dCQUNyRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzRCQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7d0JBQzNCLFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFFRCw0QkFBYyxHQUFkLFVBQWtCLElBQTJDO1FBQzNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELDBCQUFZLEdBQVosVUFBYSxJQUFrRTtRQUM3RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBRUQsNkJBQWUsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBc0IsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDcEYsQ0FBQztJQUVELHdCQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBVyxFQUFFLEdBQUcsRUFBRSxZ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Y2VzQ29udGVudCI6WyJ0eXBlIHVybCA9ICdnZXR1c2VyTW91bnREZXYnXG4gIHwgJ2NvZGUyU2Vzc2lvbidcbiAgfCAnZ2V0cGhvbmVudW1iZXInXG4gIHwgJ3JlZ2lzdGVyJ1xuICB8ICdnZXREVFVJbmZvJ1xuICB8ICdiaW5kRGV2J1xuICB8ICdnZXRBbGFybSdcbiAgfCAnZ2V0RGV2c1J1bkluZm8nXG4gIHwgJ2dldERldnNIaXN0b3J5SW5mbydcbmNsYXNzIGFwaSB7XG4gIHJlYWRvbmx5IHVybDogc3RyaW5nXG4gIHRva2VuOiBzdHJpbmdcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmwgPSBcImh0dHBzOi8vdGVzdC5sYWRpc2hiLmNvbS9hcGkvd3gvXCJcbiAgICB0aGlzLnRva2VuID0gXCJcIlxuICB9XG4gIC8vIOeZu+W9lVxuICBhc3luYyBsb2dpbihkYXRhOiB7IGpzX2NvZGU6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgZWwgPSBhd2FpdCB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6IFwiY29kZTJTZXNzaW9uXCIsIGRhdGEgfSlcbiAgICBpZiAoZWwub2spXG4gICAgICB0aGlzLnRva2VuID0gZWwuYXJnLnRva2VuXG4gICAgcmV0dXJuIGVsXG4gIH1cbiAgLy8g6Kej5a+G55S16K+d5a2X56ym5LiyXG4gIGdldHBob25lbnVtYmVyPFQ+KGRhdGE6IHsgZW5jcnlwdGVkRGF0YTogc3RyaW5nLCBpdjogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxUPih7IHVybDogXCJnZXRwaG9uZW51bWJlclwiLCBkYXRhIH0pXG4gIH1cbiAgLy8g5rOo5YaMXG4gIHJlZ2lzdGVyVXNlcihkYXRhOiB7IHVzZXI6IHN0cmluZywgbmFtZTogc3RyaW5nLCB0ZWw6IHN0cmluZywgYXZhbnRlcjogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydCh7IHVybDogXCJyZWdpc3RlclwiLCBkYXRhIH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGdldHVzZXJNb3VudERldigpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx7IFVUczogVGVybWluYWxbXSB9Pih7IHVybDogJ2dldHVzZXJNb3VudERldicsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6I635Y+WRFRV5L+h5oGvXG4gIGdldERUVUluZm8obWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxUZXJtaW5hbD4oeyB1cmw6ICdnZXREVFVJbmZvJywgZGF0YTogeyBtYWMgfSB9KVxuICB9XG5cbiAgLy8g57uR5a6aRFRVXG4gIGJpbmREZXYobWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnYmluZERldicsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuXG4gIC8vIOiOt+WPluWRiuitpuS/oeaBr1xuICBnZXRBbGFybShzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHVhcnRBbGFybU9iamVjdFtdPih7IHVybDogJ2dldEFsYXJtJywgZGF0YTogeyBzdGFydCwgZW5kIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIflrp7ml7bov5DooYzkv6Hmga9cbiAgZ2V0RGV2c1J1bkluZm8obWFjOiBzdHJpbmcsIHBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8cXVlcnlSZXN1bHQ+KHsgdXJsOiBcImdldERldnNSdW5JbmZvXCIsIGRhdGE6IHsgbWFjLCBwaWQgfSB9KVxuICB9XG4gIC8vIOiOt+WPluiuvuWkh+WOhuWPsui/kOihjOaVsOaNrlxuICBnZXREZXZzSGlzdG9yeUluZm8obWFjOiBzdHJpbmcsIHBpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGRhdGF0aW1lOiBzdHJpbmcgPSAnJykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICdnZXREZXZzSGlzdG9yeUluZm8nLCBkYXRhOiB7IG1hYywgcGlkLCBuYW1lLCBkYXRhdGltZSB9IH0pXG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBSZXF1ZXN0VWFydDxUPihvYmplY3Q6IHsgdXJsOiB1cmwsIGRhdGE6IE9iamVjdCwgbWV0aG9kPzogXCJHRVRcIiB8IFwiUE9TVFwiIH0pIHtcbiAgICAvL3d4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjmn6Xor6InIH0pXG4gICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8QXBvbGxvTW9uZ29SZXN1bHQ8VD4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHRoaXMudXJsICsgb2JqZWN0LnVybCxcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7IHRva2VuOiB0aGlzLnRva2VuIH0sIG9iamVjdC5kYXRhKSxcbiAgICAgICAgbWV0aG9kOiBvYmplY3QubWV0aG9kIHx8IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgIC8vd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoeyB0aXRsZTogU3RyaW5nKHJlcy5zdGF0dXNDb2RlKSwgY29udGVudDogcmVzLmVyck1zZyB9KVxuICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEgYXMgYW55KVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGUgPT4ge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7IHRpdGxlOiAn5pyN5Yqh5Zmo6ZSZ6K+vJywgY29udGVudDogZS5lcnJNc2cgfSlcbiAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6KCk9PntcbiAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGFwaSgpXG4iXX0=