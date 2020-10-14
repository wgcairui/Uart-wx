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
        this.RequestUart({ url: 'getAlarmunconfirmed', data: {} }).then(function (el) {
            if (Number(el.arg) > 0)
                wx.setTabBarBadge({ index: 1, text: el.arg });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBO0lBR0U7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLGtDQUFrQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBRWpCLENBQUM7SUFFSyxtQkFBSyxHQUFYLFVBQVksSUFBeUI7Ozs7OzRCQUN4QixXQUFNLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsRUFBQTs7d0JBQS9ELEVBQUUsR0FBRyxTQUEwRDt3QkFDckUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7NEJBQ3pCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7eUJBQ3BEO3dCQUNELFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFFRCx1QkFBUyxHQUFULFVBQVUsSUFBdUU7UUFDL0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVELHNCQUFRLEdBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCw0QkFBYyxHQUFkLFVBQWtCLElBQTJEO1FBQzNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFB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QUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0NBQ2xELE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUs7b0NBQzlCLE9BQU8sRUFBRSxVQUFBLEdBQUc7d0NBR1YsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTs0Q0FDMUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBOzRDQUMzRixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7eUNBQ1o7NkNBQU07NENBQ0wsVUFBVSxDQUFDO2dEQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBVyxDQUFDLENBQUE7NENBQzFCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTt5Q0FDTjtvQ0FDSCxDQUFDO29DQUNELElBQUksRUFBRSxVQUFBLENBQUM7d0NBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO3dDQUNuRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7b0NBQ1gsQ0FBQztvQ0FDRCxRQUFRLEVBQUU7d0NBQ1IsRUFBRSxDQUFDLHdCQUF3QixFQUFFLENBQUE7b0NBQy9CLENBQUM7aUNBQ0YsQ0FBQyxDQUFBOzRCQUNKLENBQUMsQ0FBQyxFQUFBOzRCQXpCRixXQUFPLFNBeUJMLEVBQUE7Ozs7S0FDSDtJQUNILFVBQUM7QUFBRCxDQUFDLEFBbkhELElBbUhDO0FBRUQsa0JBQWUsSUFBSSxHQUFHLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbInR5cGUgdXJsID0gJ2dldHVzZXJNb3VudERldidcbiAgfCAnY29kZTJTZXNzaW9uJ1xuICB8ICdnZXRwaG9uZW51bWJlcidcbiAgfCAncmVnaXN0ZXInXG4gIHwgJ2dldERUVUluZm8nXG4gIHwgJ2JpbmREZXYnXG4gIHwgJ2dldEFsYXJtJ1xuICB8ICdnZXREZXZzUnVuSW5mbydcbiAgfCAnZ2V0RGV2c0hpc3RvcnlJbmZvJ1xuICB8ICd1c2VybG9naW4nXG4gIHwgJ2dldFVzZXJJbmZvJ1xuICB8ICd1bmJpbmR3eCdcbiAgfCAnZ2V0QWxhcm11bmNvbmZpcm1lZCdcbiAgfCAnYWxhcm1Db25maXJtZWQnXG4gIHwgJ2dldERldk9wcmF0ZSdcbiAgfCAnU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQnXG4gIHwgJ2dldFVzZXJEZXZDb25zdGFudCdcbmNsYXNzIGFwaSB7XG4gIHJlYWRvbmx5IHVybDogc3RyaW5nXG4gIHRva2VuOiBzdHJpbmdcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmwgPSBcImh0dHBzOi8vdGVzdC5sYWRpc2hiLmNvbS9hcGkvd3gvXCJcbiAgICB0aGlzLnRva2VuID0gXCJcIlxuXG4gIH1cbiAgLy8g55m75b2VLeeUqOS6juWwj+eoi+W6j+WQr+WKqOWFs+iBlOW+ruS/oeiHquWKqOeZu+W9lVxuICBhc3luYyBsb2dpbihkYXRhOiB7IGpzX2NvZGU6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgZWwgPSBhd2FpdCB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6IFwiY29kZTJTZXNzaW9uXCIsIGRhdGEgfSlcbiAgICBpZiAoZWwub2spIHtcbiAgICAgIHRoaXMudG9rZW4gPSBlbC5hcmcudG9rZW5cbiAgICAgIHd4LnNldFN0b3JhZ2UoeyBrZXk6ICd0b2tlbicsIGRhdGE6IGVsLmFyZy50b2tlbiB9KVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfVxuICAvLyAg55m75b2VLeeUqOS6juWwj+eoi+W6j+eZu+W9lemhtemdoueZu+W9lVxuICB1c2VybG9naW4oZGF0YTogeyBvcGVuaWQ6IHN0cmluZywgYXZhbnRlcjogc3RyaW5nLCB1c2VyOiBzdHJpbmcsIHBhc3N3ZDogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAndXNlcmxvZ2luJywgZGF0YSB9KVxuICB9XG4gIC8vIOeUqOS6juino+e7keW+ruS/oeWSjOmAj+S8oOi0puWPt+eahOe7keWumuWFs+ezu1xuICB1bmJpbmR3eCgpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAndW5iaW5kd3gnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOino+WvhueUteivneWtl+espuS4slxuICBnZXRwaG9uZW51bWJlcjxUPihkYXRhOiB7IG9wZW5pZDogc3RyaW5nLCBlbmNyeXB0ZWREYXRhOiBzdHJpbmcsIGl2OiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFQ+KHsgdXJsOiBcImdldHBob25lbnVtYmVyXCIsIGRhdGEgfSlcbiAgfVxuICAvLyDms6jlhoxcbiAgcmVnaXN0ZXJVc2VyKGRhdGE6IHsgdXNlcjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHRlbDogc3RyaW5nLCBhdmFudGVyOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0KHsgdXJsOiBcInJlZ2lzdGVyXCIsIGRhdGEgfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfnu5Hlrprorr7lpIdcbiAgZ2V0dXNlck1vdW50RGV2KCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHsgVVRzOiBUZXJtaW5hbFtdIH0+KHsgdXJsOiAnZ2V0dXNlck1vdW50RGV2JywgZGF0YToge30gfSlcbiAgfVxuICAvLyDojrflj5ZEVFXkv6Hmga9cbiAgZ2V0RFRVSW5mbyhtYWM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFRlcm1pbmFsPih7IHVybDogJ2dldERUVUluZm8nLCBkYXRhOiB7IG1hYyB9IH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFVzZXJJbmZvPih7IHVybDogJ2dldFVzZXJJbmZvJywgZGF0YToge30gfSlcbiAgfVxuXG4gIC8vIOe7keWumkRUVVxuICBiaW5kRGV2KG1hYzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2JpbmREZXYnLCBkYXRhOiB7IG1hYyB9IH0pXG4gIH1cbiAgLy8g6I635Y+W5pyq56Gu6K6k5ZGK6K2m5pWw6YePXG4gIGdldEFsYXJtdW5jb25maXJtZWQoKSB7XG4gICAgdGhpcy5SZXF1ZXN0VWFydDxzdHJpbmc+KHsgdXJsOiAnZ2V0QWxhcm11bmNvbmZpcm1lZCcsIGRhdGE6IHt9IH0pLnRoZW4oZWwgPT4ge1xuICAgICAgaWYgKE51bWJlcihlbC5hcmcpID4gMCkgd3guc2V0VGFiQmFyQmFkZ2UoeyBpbmRleDogMSwgdGV4dDogZWwuYXJnIH0pXG4gICAgfSlcbiAgfVxuICAvLyDojrflj5blkYrorabkv6Hmga9cbiAgZ2V0QWxhcm0oc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx1YXJ0QWxhcm1PYmplY3RbXT4oeyB1cmw6ICdnZXRBbGFybScsIGRhdGE6IHsgc3RhcnQsIGVuZCB9IH0pXG4gIH1cbiAgLy8g56Gu6K6k5ZGK6K2m5L+h5oGvLOabtOaWsGJhclxuICBhbGFybUNvbmZpcm1lZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQoeyB1cmw6ICdhbGFybUNvbmZpcm1lZCcsIGRhdGE6IHsgaWQgfSB9KS5maW5hbGx5KCgpID0+IHRoaXMuZ2V0QWxhcm11bmNvbmZpcm1lZCgpKVxuICB9XG4gIC8vIOiOt+WPluiuvuWkh+WunuaXtui/kOihjOS/oeaBr1xuICBnZXREZXZzUnVuSW5mbyhtYWM6IHN0cmluZywgcGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxxdWVyeVJlc3VsdD4oeyB1cmw6IFwiZ2V0RGV2c1J1bkluZm9cIiwgZGF0YTogeyBtYWMsIHBpZCB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH5Y6G5Y+y6L+Q6KGM5pWw5o2uXG4gIGdldERldnNIaXN0b3J5SW5mbyhtYWM6IHN0cmluZywgcGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZGF0YXRpbWU6IHN0cmluZyA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2dldERldnNIaXN0b3J5SW5mbycsIGRhdGE6IHsgbWFjLCBwaWQsIG5hbWUsIGRhdGF0aW1lIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIfmk43mjqfmjIfku6RcbiAgZ2V0RGV2T3ByYXRlKHByb3RvY29sOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxQaWNrPFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsICdPcHJhdGVJbnN0cnVjdCc+Pih7IHVybDogJ2dldERldk9wcmF0ZScsIGRhdGE6IHsgcHJvdG9jb2wgfSB9KVxuICB9XG4gIC8vICDlm7rlrprlj5HpgIHorr7lpIfmk43kvZzmjIfku6RcbiAgU2VuZFByb2NvdG9sSW5zdHJ1Y3RTZXQocXVlcnk6IFBhcnRpYWw8aW5zdHJ1Y3RRdWVyeUFyZz4sIGl0ZW06IE9wcmF0ZUluc3RydWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ1NlbmRQcm9jb3RvbEluc3RydWN0U2V0JywgZGF0YTogeyBxdWVyeSwgaXRlbSB9LCBtZXRob2Q6ICdQT1NUJyB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+iHquWumuS5ieWNj+iurumFjee9rlxuICBnZXRVc2VyRGV2Q29uc3RhbnQocHJvdG9jb2w6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQ+KHsgdXJsOiAnZ2V0VXNlckRldkNvbnN0YW50JywgZGF0YTogeyBwcm90b2NvbCB9IH0pXG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBSZXF1ZXN0VWFydDxUPihvYmplY3Q6IHsgdXJsOiB1cmwsIGRhdGE6IE9iamVjdCwgbWV0aG9kPzogXCJHRVRcIiB8IFwiUE9TVFwiIH0pIHtcbiAgICAvL3d4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjmn6Xor6InIH0pXG4gICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICBjb25zdCB0b2tlbjogc3RyaW5nID0gdGhpcy50b2tlbiB8fCBhd2FpdCB3eC5nZXRTdG9yYWdlKHsga2V5OiAndG9rZW4nIH0pLnRoZW4oZWwgPT4gZWwuZGF0YSkuY2F0Y2goKCkgPT4gXCJcIilcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8QXBvbGxvTW9uZ29SZXN1bHQ8VD4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHRoaXMudXJsICsgb2JqZWN0LnVybCxcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7IHRva2VuOiB0b2tlbiB9LCBvYmplY3QuZGF0YSksXG4gICAgICAgIG1ldGhvZDogb2JqZWN0Lm1ldGhvZCB8fCBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAvL3d4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6IFN0cmluZyhyZXMuc3RhdHVzQ29kZSksIGNvbnRlbnQ6IHJlcy5kYXRhLnRvU3RyaW5nKCkgfHwgcmVzLmVyck1zZyB9KVxuICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEgYXMgYW55KVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGUgPT4ge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7IHRpdGxlOiAn5pyN5Yqh5Zmo6ZSZ6K+vJywgY29udGVudDogZS5lcnJNc2cgfSlcbiAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGFwaSgpXG4iXX0=