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
    api.prototype.RequestUart = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({ title: '正在查询' });
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: _this.url + object.url,
                                    data: Object.assign({ token: _this.token }, object.data),
                                    method: object.method || "GET",
                                    success: function (res) {
                                        console.log(res);
                                        wx.hideLoading();
                                        if (res.statusCode !== 200) {
                                            wx.showModal({ title: String(res.statusCode), content: res.errMsg });
                                            reject(res);
                                        }
                                        else
                                            resolve(res.data);
                                    },
                                    fail: function (e) {
                                        wx.hideLoading();
                                        reject(e);
                                    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUE7SUFHRTtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsa0NBQWtDLENBQUE7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUVLLG1CQUFLLEdBQVgsVUFBWSxJQUF5Qjs7Ozs7NEJBQ3hCLFdBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBL0QsRUFBRSxHQUFHLFNBQTBEO3dCQUNyRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzRCQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7d0JBQzNCLFdBQU8sRUFBRSxFQUFBOzs7O0tBQ1Y7SUFFRCw0QkFBYyxHQUFkLFVBQWtCLElBQTJDO1FBQzNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELDBCQUFZLEdBQVosVUFBYSxJQUFrRTtRQUM3RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBRUQsNkJBQWUsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBc0IsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDcEYsQ0FBQztJQUVELHdCQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBVyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxLQUFBLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekUsQ0FBQztJQUdELHFCQUFPLEdBQVAsVUFBUSxHQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxLQUFBLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUdELHNCQUFRLEdBQVIsVUFBUyxLQUFhLEVBQUUsR0FBVztRQUNqQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQW9CLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN2RixDQUFDO0lBRUQsNEJBQWMsR0FBZCxVQUFlLEdBQVcsRUFBRSxHQUFXO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBYyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEtBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNyRixDQUFDO0lBQ2EseUJBQVcsR0FBekIsVUFBNkIsTUFBMkQ7Ozs7Ozt3QkFDdEYsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO3dCQUMxQixXQUFNLElBQUksT0FBTyxDQUF1QixVQUFDLE9BQU8sRUFBRSxNQUFNO2dDQUM3RCxFQUFFLENBQUMsT0FBTyxDQUFDO29DQUNULEdBQUcsRUFBRSxLQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHO29DQUMxQixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztvQ0FDdkQsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSztvQ0FDOUIsT0FBTyxFQUFFLFVBQUEsR0FBRzt3Q0FDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dDQUNqQixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7d0NBQ2hCLElBQUcsR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUM7NENBQ3hCLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUE7NENBQy9ELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTt5Q0FDWjs7NENBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFXLENBQUMsQ0FBQTtvQ0FDaEMsQ0FBQztvQ0FDRCxJQUFJLEVBQUUsVUFBQSxDQUFDO3dDQUNMLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTt3Q0FDaEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO29DQUNYLENBQUM7aUNBQ0YsQ0FBQyxDQUFBOzRCQUNKLENBQUMsQ0FBQyxFQUFBOzRCQWxCRixXQUFPLFNBa0JMLEVBQUE7Ozs7S0FDSDtJQUNILFVBQUM7QUFBRCxDQUFDLEFBbEVELElBa0VDO0FBRUQsa0JBQWUsSUFBSSxHQUFHLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbInR5cGUgdXJsID0gJ2dldHVzZXJNb3VudERldidcbiAgfCAnY29kZTJTZXNzaW9uJ1xuICB8ICdnZXRwaG9uZW51bWJlcidcbiAgfCAncmVnaXN0ZXInXG4gIHwgJ2dldERUVUluZm8nXG4gIHwgJ2JpbmREZXYnXG4gIHwgJ2dldEFsYXJtJ1xuICB8ICdnZXREZXZzUnVuSW5mbydcbmNsYXNzIGFwaSB7XG4gIHJlYWRvbmx5IHVybDogc3RyaW5nXG4gIHRva2VuOiBzdHJpbmdcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy51cmwgPSBcImh0dHBzOi8vdGVzdC5sYWRpc2hiLmNvbS9hcGkvd3gvXCJcbiAgICB0aGlzLnRva2VuID0gXCJcIlxuICB9XG4gIC8vIOeZu+W9lVxuICBhc3luYyBsb2dpbihkYXRhOiB7IGpzX2NvZGU6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgZWwgPSBhd2FpdCB0aGlzLlJlcXVlc3RVYXJ0PGFueT4oeyB1cmw6IFwiY29kZTJTZXNzaW9uXCIsIGRhdGEgfSlcbiAgICBpZiAoZWwub2spXG4gICAgICB0aGlzLnRva2VuID0gZWwuYXJnLnRva2VuXG4gICAgcmV0dXJuIGVsXG4gIH1cbiAgLy8g6Kej5a+G55S16K+d5a2X56ym5LiyXG4gIGdldHBob25lbnVtYmVyPFQ+KGRhdGE6IHsgZW5jcnlwdGVkRGF0YTogc3RyaW5nLCBpdjogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxUPih7IHVybDogXCJnZXRwaG9uZW51bWJlclwiLCBkYXRhIH0pXG4gIH1cbiAgLy8g5rOo5YaMXG4gIHJlZ2lzdGVyVXNlcihkYXRhOiB7IHVzZXI6IHN0cmluZywgbmFtZTogc3RyaW5nLCB0ZWw6IHN0cmluZywgYXZhbnRlcjogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydCh7IHVybDogXCJyZWdpc3RlclwiLCBkYXRhIH0pXG4gIH1cbiAgLy8g6I635Y+W55So5oi357uR5a6a6K6+5aSHXG4gIGdldHVzZXJNb3VudERldigpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDx7IFVUczogVGVybWluYWxbXSB9Pih7IHVybDogJ2dldHVzZXJNb3VudERldicsIGRhdGE6IHt9IH0pXG4gIH1cbiAgLy8g6I635Y+WRFRV5L+h5oGvXG4gIGdldERUVUluZm8obWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxUZXJtaW5hbD4oeyB1cmw6ICdnZXREVFVJbmZvJywgZGF0YTogeyBtYWMgfSB9KVxuICB9XG5cbiAgLy8g57uR5a6aRFRVXG4gIGJpbmREZXYobWFjOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5SZXF1ZXN0VWFydDxhbnk+KHsgdXJsOiAnYmluZERldicsIGRhdGE6IHsgbWFjIH0gfSlcbiAgfVxuXG4gIC8vIOiOt+WPluWRiuitpuS/oeaBr1xuICBnZXRBbGFybShzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLlJlcXVlc3RVYXJ0PHVhcnRBbGFybU9iamVjdFtdPih7IHVybDogJ2dldEFsYXJtJywgZGF0YTogeyBzdGFydCwgZW5kIH0gfSlcbiAgfVxuICAvLyDojrflj5borr7lpIflrp7ml7bov5DooYzkv6Hmga9cbiAgZ2V0RGV2c1J1bkluZm8obWFjOiBzdHJpbmcsIHBpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVhcnQ8cXVlcnlSZXN1bHQ+KHsgdXJsOiBcImdldERldnNSdW5JbmZvXCIsIGRhdGE6IHsgbWFjLCBwaWQgfSB9KVxuICB9XG4gIHByaXZhdGUgYXN5bmMgUmVxdWVzdFVhcnQ8VD4ob2JqZWN0OiB7IHVybDogdXJsLCBkYXRhOiBPYmplY3QsIG1ldGhvZD86IFwiR0VUXCIgfCBcIlBPU1RcIiB9KSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+ato+WcqOafpeivoicgfSlcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8QXBvbGxvTW9uZ29SZXN1bHQ8VD4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHRoaXMudXJsICsgb2JqZWN0LnVybCxcbiAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7IHRva2VuOiB0aGlzLnRva2VuIH0sIG9iamVjdC5kYXRhKSxcbiAgICAgICAgbWV0aG9kOiBvYmplY3QubWV0aG9kIHx8IFwiR0VUXCIsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGUgIT09IDIwMCl7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe3RpdGxlOlN0cmluZyhyZXMuc3RhdHVzQ29kZSksY29udGVudDpyZXMuZXJyTXNnfSlcbiAgICAgICAgICAgIHJlamVjdChyZXMpXG4gICAgICAgICAgfWVsc2UgcmVzb2x2ZShyZXMuZGF0YSBhcyBhbnkpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGUgPT4ge1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgYXBpKClcbiJdfQ==