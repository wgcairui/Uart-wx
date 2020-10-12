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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7SUFHRTtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsa0NBQWtDLENBQUE7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUVLLG1CQUFLLEdBQVgsVUFBWSxJQUF5Qjs7Ozs7NEJBQ3hCLFdBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBL0QsRUFBRSxHQUFHLFNBQTBEO3dCQUNyRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzRCQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7d0JBQzNCLFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFFRCx1QkFBUyxHQUFULFVBQVUsSUFBdUU7UUFDL0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVELHNCQUFRLEdBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCw0QkFBYyxHQUFkLFVBQWtCLElBQTJEO1FBQzNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELDBCQUFZLEdBQVosVUFBYSxJQUFrRTtRQUM3RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFB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dHlwZSB1cmwgPSAnZ2V0dXNlck1vdW50RGV2J1xuICB8ICdjb2RlMlNlc3Npb24nXG4gIHwgJ2dldHBob25lbnVtYmVyJ1xuICB8ICdyZWdpc3RlcidcbiAgfCAnZ2V0RFRVSW5mbydcbiAgfCAnYmluZERldidcbiAgfCAnZ2V0QWxhcm0nXG4gIHwgJ2dldERldnNSdW5JbmZvJ1xuICB8ICdnZXREZXZzSGlzdG9yeUluZm8nXG4gIHwgJ3VzZXJsb2dpbidcbiAgfCAnZ2V0VXNlckluZm8nXG4gIHwgJ3VuYmluZHd4J1xuICB8ICdnZXRBbGFybXVuY29uZmlybWVkJ1xuICB8ICdhbGFybUNvbmZpcm1lZCdcbmNsYXNzIGFwaSB7XG4gIHJlYWRvbmx5IHVybDogc3RyaW5nXG4gIHRva2VuOiBzdHJpbmdcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmwgPSBcImh0dHBzOi8vdGVzdC5sYWRpc2hiLmNvbS9hcGkvd3gvXCJcbiAgICB0aGlzLnRva2VuID0gXCJcIlxuICB9XG4gIC8vIOeZu+W9lS3nlKjkuo7lsI/nqIvluo/lkK/liqjlhbPogZTlvq7kv6Hoh6rliqjnmbvlvZVcbiAgYXN5bmMgbG9naW4oZGF0YTogeyBqc19jb2RlOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IGVsID0gYXdhaXQgdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiBcImNvZGUyU2Vzc2lvblwiLCBkYXRhIH0pXG4gICAgaWYgKGVsLm9rKVxuICAgICAgdGhpcy50b2tlbiA9IGVsLmFyZy50b2tlblxuICAgIHJldHVybiBlbFxuICB9XG4gIC8vICDnmbvlvZUt55So5LqO5bCP56iL5bqP55m75b2V6aG16Z2i55m75b2VXG4gIHVzZXJsb2dpbihkYXRhOiB7IG9wZW5pZDogc3RyaW5nLCBhdmFudGVyOiBzdHJpbmcsIHVzZXI6IHN0cmluZywgcGFzc3dkOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICd1c2VybG9naW4nLCBkYXRhIH0pXG4gIH1cbiAgLy8g55So5LqO6Kej57uR5b6u5L+h5ZKM6YCP5Lyg6LSm5Y+355qE57uR5a6a5YWz57O7XG4gIHVuYmluZHd4KCkge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6ICd1bmJpbmR3eCcsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6Kej5a+G55S16K+d5a2X56ym5LiyXG4gIGdldHBob25lbnVtYmVyPFQ+KGRhdGE6IHsgb3BlbmlkOiBzdHJpbmcsIGVuY3J5cHRlZERhdGE6IHN0cmluZywgaXY6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VD4oeyB1cmw6IFwiZ2V0cGhvbmVudW1iZXJcIiwgZGF0YSB9KVxuICB9XG4gIC8vIOazqOWGjFxuICByZWdpc3RlclVzZXIoZGF0YTogeyB1c2VyOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdGVsOiBzdHJpbmcsIGF2YW50ZXI6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQoeyB1cmw6IFwicmVnaXN0ZXJcIiwgZGF0YSB9KVxuICB9XG4gIC8vIOiOt+WPlueUqOaIt+e7keWumuiuvuWkh1xuICBnZXR1c2VyTW91bnREZXYoKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8eyBVVHM6IFRlcm1pbmFsW10gfT4oeyB1cmw6ICdnZXR1c2VyTW91bnREZXYnLCBkYXRhOiB7fSB9KVxuICB9XG4gIC8vIOiOt+WPlkRUVeS/oeaBr1xuICBnZXREVFVJbmZvKG1hYzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VGVybWluYWw+KHsgdXJsOiAnZ2V0RFRVSW5mbycsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8VXNlckluZm8+KHsgdXJsOiAnZ2V0VXNlckluZm8nLCBkYXRhOiB7fSB9KVxuICB9XG5cbiAgLy8g57uR5a6aRFRVXG4gIGJpbmREZXYobWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnYmluZERldicsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuICAvLyDojrflj5bmnKrnoa7orqTlkYrorabmlbDph49cbiAgZ2V0QWxhcm11bmNvbmZpcm1lZCgpIHtcbiAgICB0aGlzLlJlcXVlc3RVYXJ0PHN0cmluZz4oeyB1cmw6ICdnZXRBbGFybXVuY29uZmlybWVkJywgZGF0YToge30gfSkudGhlbihlbCA9PiB7XG4gICAgICBpZiAoTnVtYmVyKGVsLmFyZykgPiAwKSB3eC5zZXRUYWJCYXJCYWRnZSh7IGluZGV4OiAxLCB0ZXh0OiBlbC5hcmcgfSlcbiAgICB9KVxuICB9XG4gIC8vIOiOt+WPluWRiuitpuS/oeaBr1xuICBnZXRBbGFybShzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHVhcnRBbGFybU9iamVjdFtdPih7IHVybDogJ2dldEFsYXJtJywgZGF0YTogeyBzdGFydCwgZW5kIH0gfSlcbiAgfVxuICAvLyDnoa7orqTlkYrorabkv6Hmga8s5pu05pawYmFyXG4gIGFsYXJtQ29uZmlybWVkKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydCh7IHVybDogJ2FsYXJtQ29uZmlybWVkJywgZGF0YTogeyBpZCB9IH0pLmZpbmFsbHkoKCkgPT4gdGhpcy5nZXRBbGFybXVuY29uZmlybWVkKCkpXG4gIH1cbiAgLy8g6I635Y+W6K6+5aSH5a6e5pe26L+Q6KGM5L+h5oGvXG4gIGdldERldnNSdW5JbmZvKG1hYzogc3RyaW5nLCBwaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHF1ZXJ5UmVzdWx0Pih7IHVybDogXCJnZXREZXZzUnVuSW5mb1wiLCBkYXRhOiB7IG1hYywgcGlkIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIfljoblj7Lov5DooYzmlbDmja5cbiAgZ2V0RGV2c0hpc3RvcnlJbmZvKG1hYzogc3RyaW5nLCBwaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBkYXRhdGltZTogc3RyaW5nID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnZ2V0RGV2c0hpc3RvcnlJbmZvJywgZGF0YTogeyBtYWMsIHBpZCwgbmFtZSwgZGF0YXRpbWUgfSB9KVxuICB9XG4gIHByaXZhdGUgYXN5bmMgUmVxdWVzdFVhcnQ8VD4ob2JqZWN0OiB7IHVybDogdXJsLCBkYXRhOiBPYmplY3QsIG1ldGhvZD86IFwiR0VUXCIgfCBcIlBPU1RcIiB9KSB7XG4gICAgLy93eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5q2j5Zyo5p+l6K+iJyB9KVxuICAgIHd4LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPEFwb2xsb01vbmdvUmVzdWx0PFQ+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB0aGlzLnVybCArIG9iamVjdC51cmwsXG4gICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oeyB0b2tlbjogdGhpcy50b2tlbiB9LCBvYmplY3QuZGF0YSksXG4gICAgICAgIG1ldGhvZDogb2JqZWN0Lm1ldGhvZCB8fCBcIkdFVFwiLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAvL3d4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6IFN0cmluZyhyZXMuc3RhdHVzQ29kZSksIGNvbnRlbnQ6IHJlcy5kYXRhLnRvU3RyaW5nKCkgfHwgcmVzLmVyck1zZyB9KVxuICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEgYXMgYW55KVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGUgPT4ge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7IHRpdGxlOiAn5pyN5Yqh5Zmo6ZSZ6K+vJywgY29udGVudDogZS5lcnJNc2cgfSlcbiAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGFwaSgpXG4iXX0=