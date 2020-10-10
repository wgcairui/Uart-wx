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
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return api;
}());
exports.default = new api();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUE7SUFHRTtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsa0NBQWtDLENBQUE7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUVLLG1CQUFLLEdBQVgsVUFBWSxJQUF5Qjs7Ozs7NEJBQ3hCLFdBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBL0QsRUFBRSxHQUFHLFNBQTBEO3dCQUNyRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzRCQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7d0JBQzNCLFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFFRCx1QkFBUyxHQUFULFVBQVUsSUFBdUU7UUFDL0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVELHNCQUFRLEdBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCw0QkFBYyxHQUFkLFVBQWtCLElBQTJEO1FBQzNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELDBCQUFZLEdBQVosVUFBYSxJQUFrRTtRQUM3RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFB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QUE7eUNBQ047b0NBQ0gsQ0FBQztvQ0FDRCxJQUFJLEVBQUUsVUFBQSxDQUFDO3dDQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTt3Q0FDbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO29DQUNYLENBQUM7b0NBQ0QsUUFBUSxFQUFFO3dDQUNSLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO29DQUMvQixDQUFDO2lDQUNGLENBQUMsQ0FBQTs0QkFDSixDQUFDLENBQUMsRUFBQTs0QkF6QkYsV0FBTyxTQXlCTCxFQUFBOzs7O0tBQ0g7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQTFGRCxJQTBGQztBQUVELGtCQUFlLElBQUksR0FBRyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIHVybCA9ICdnZXR1c2VyTW91bnREZXYnXG4gIHwgJ2NvZGUyU2Vzc2lvbidcbiAgfCAnZ2V0cGhvbmVudW1iZXInXG4gIHwgJ3JlZ2lzdGVyJ1xuICB8ICdnZXREVFVJbmZvJ1xuICB8ICdiaW5kRGV2J1xuICB8ICdnZXRBbGFybSdcbiAgfCAnZ2V0RGV2c1J1bkluZm8nXG4gIHwgJ2dldERldnNIaXN0b3J5SW5mbydcbiAgfCAndXNlcmxvZ2luJ1xuICB8ICdnZXRVc2VySW5mbydcbiAgfCAndW5iaW5kd3gnXG5jbGFzcyBhcGkge1xuICByZWFkb25seSB1cmw6IHN0cmluZ1xuICB0b2tlbjogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudXJsID0gXCJodHRwczovL3Rlc3QubGFkaXNoYi5jb20vYXBpL3d4L1wiXG4gICAgdGhpcy50b2tlbiA9IFwiXCJcbiAgfVxuICAvLyDnmbvlvZUt55So5LqO5bCP56iL5bqP5ZCv5Yqo5YWz6IGU5b6u5L+h6Ieq5Yqo55m75b2VXG4gIGFzeW5jIGxvZ2luKGRhdGE6IHsganNfY29kZTogc3RyaW5nIH0pIHtcbiAgICBjb25zdCBlbCA9IGF3YWl0IHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogXCJjb2RlMlNlc3Npb25cIiwgZGF0YSB9KVxuICAgIGlmIChlbC5vaylcbiAgICAgIHRoaXMudG9rZW4gPSBlbC5hcmcudG9rZW5cbiAgICByZXR1cm4gZWxcbiAgfVxuICAvLyAg55m75b2VLeeUqOS6juWwj+eoi+W6j+eZu+W9lemhtemdoueZu+W9lVxuICB1c2VybG9naW4oZGF0YTogeyBvcGVuaWQ6IHN0cmluZywgYXZhbnRlcjogc3RyaW5nLCB1c2VyOiBzdHJpbmcsIHBhc3N3ZDogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAndXNlcmxvZ2luJywgZGF0YSB9KVxuICB9XG4gIC8vIOeUqOS6juino+e7keW+ruS/oeWSjOmAj+S8oOi0puWPt+eahOe7keWumuWFs+ezu1xuICB1bmJpbmR3eCgpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAndW5iaW5kd3gnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOino+WvhueUteivneWtl+espuS4slxuICBnZXRwaG9uZW51bWJlcjxUPihkYXRhOiB7IG9wZW5pZDogc3RyaW5nLCBlbmNyeXB0ZWREYXRhOiBzdHJpbmcsIGl2OiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFQ+KHsgdXJsOiBcImdldHBob25lbnVtYmVyXCIsIGRhdGEgfSlcbiAgfVxuICAvLyDms6jlhoxcbiAgcmVnaXN0ZXJVc2VyKGRhdGE6IHsgdXNlcjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHRlbDogc3RyaW5nLCBhdmFudGVyOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0KHsgdXJsOiBcInJlZ2lzdGVyXCIsIGRhdGEgfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfnu5Hlrprorr7lpIdcbiAgZ2V0dXNlck1vdW50RGV2KCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHsgVVRzOiBUZXJtaW5hbFtdIH0+KHsgdXJsOiAnZ2V0dXNlck1vdW50RGV2JywgZGF0YToge30gfSlcbiAgfVxuICAvLyDojrflj5ZEVFXkv6Hmga9cbiAgZ2V0RFRVSW5mbyhtYWM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFRlcm1pbmFsPih7IHVybDogJ2dldERUVUluZm8nLCBkYXRhOiB7IG1hYyB9IH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gIGdldFVzZXJJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PFVzZXJJbmZvPih7IHVybDogJ2dldFVzZXJJbmZvJywgZGF0YToge30gfSlcbiAgfVxuXG4gIC8vIOe7keWumkRUVVxuICBiaW5kRGV2KG1hYzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8YW55Pih7IHVybDogJ2JpbmREZXYnLCBkYXRhOiB7IG1hYyB9IH0pXG4gIH1cblxuICAvLyDojrflj5blkYrorabkv6Hmga9cbiAgZ2V0QWxhcm0oc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx1YXJ0QWxhcm1PYmplY3RbXT4oeyB1cmw6ICdnZXRBbGFybScsIGRhdGE6IHsgc3RhcnQsIGVuZCB9IH0pXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH5a6e5pe26L+Q6KGM5L+h5oGvXG4gIGdldERldnNSdW5JbmZvKG1hYzogc3RyaW5nLCBwaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHF1ZXJ5UmVzdWx0Pih7IHVybDogXCJnZXREZXZzUnVuSW5mb1wiLCBkYXRhOiB7IG1hYywgcGlkIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIfljoblj7Lov5DooYzmlbDmja5cbiAgZ2V0RGV2c0hpc3RvcnlJbmZvKG1hYzogc3RyaW5nLCBwaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkYXRhdGltZTogc3RyaW5nID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnZ2V0RGV2c0hpc3RvcnlJbmZvJywgZGF0YTogeyBtYWMsIHBpZCwgbmFtZSwgZGF0YXRpbWUgfSB9KVxuICB9XG4gIHByaXZhdGUgYXN5bmMgUmVxdWVzdFVhcnQ8VD4ob2JqZWN0OiB7IHVybDogdXJsLCBkYXRhOiBPYmplY3QsIG1ldGhvZD86IFwiR0VUXCIgfCBcIlBPU1RcIiB9KSB7XG4gICAgLy93eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5q2j5Zyo5p+l6K+iJyB9KVxuICAgIHd4LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPEFwb2xsb01vbmdvUmVzdWx0PFQ+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB0aGlzLnVybCArIG9iamVjdC51cmwsXG4gICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oeyB0b2tlbjogdGhpcy50b2tlbiB9LCBvYmplY3QuZGF0YSksXG4gICAgICAgIG1ldGhvZDogb2JqZWN0Lm1ldGhvZCB8fCBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAvL3d4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6IFN0cmluZyhyZXMuc3RhdHVzQ29kZSksIGNvbnRlbnQ6IHJlcy5kYXRhLnRvU3RyaW5nKCkgfHwgcmVzLmVyck1zZyB9KVxuICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEgYXMgYW55KVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGUgPT4ge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7IHRpdGxlOiAn5pyN5Yqh5Zmo6ZSZ6K+vJywgY29udGVudDogZS5lcnJNc2cgfSlcbiAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGFwaSgpXG4iXX0=