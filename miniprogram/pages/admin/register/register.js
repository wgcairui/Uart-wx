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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../../../utils/api");
Page({
    data: {
        mac: '',
        dtus: [],
        nodes: [],
        radio: ''
    },
    onLoad: function () {
        this.getNodes();
    },
    scanMac: function () {
        return __awaiter(this, void 0, void 0, function () {
            var scanResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, wx.scanCode({})];
                    case 1:
                        scanResult = _a.sent();
                        this.setData({
                            mac: scanResult.result
                        });
                        this.addDtus();
                        return [2];
                }
            });
        });
    },
    scanRequst: function () {
        this.addDtus();
    },
    addDtus: function () {
        var mac = this.data.mac;
        if (this.data.dtus.includes(mac)) {
            console.log('重复扫描');
        }
        else {
            this.setData({
                mac: mac,
                dtus: __spreadArrays(this.data.dtus, [mac])
            });
            var dtulen = this.data.dtus.length;
            for (var _i = 0, _a = this.data.nodes; _i < _a.length; _i++) {
                var node = _a[_i];
                if (node.MaxConnections - node.count > dtulen) {
                    this.setData({
                        radio: node.Name
                    });
                    break;
                }
            }
        }
    },
    onChange_Node: function (event) {
        console.log(event);
    },
    rmDtu: function (event) {
        var _this = this;
        var key = event.currentTarget.dataset.key;
        wx.showModal({
            title: '删除dtu',
            content: "\u786E\u5B9A\u5220\u9664dtu:" + key + " ??",
            success: function (res) {
                if (res.confirm) {
                    _this.setData({
                        dtus: _this.data.dtus.filter(function (el) { return el !== key; })
                    });
                }
            }
        });
    },
    getNodes: function () {
        return __awaiter(this, void 0, void 0, function () {
            var arg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_1.default.getNodes()];
                    case 1:
                        arg = (_a.sent()).arg;
                        this.setData({
                            nodes: arg,
                            radio: arg[0].Name
                        });
                        return [2];
                }
            });
        });
    },
    changeNode: function (event) {
        this.setData({
            radio: event.detail,
        });
    },
    selectNode: function (event) {
        var item = event.currentTarget.dataset.item;
        this.setData({
            radio: item.Name
        });
    },
    submit: function () {
        var _this = this;
        var _a = this.data, dtus = _a.dtus, radio = _a.radio;
        wx.showModal({
            title: '提交核对',
            content: "\u672C\u6B21\u63D0\u4EA4\u7684dtu\u6570\u76EE:" + dtus.length + ",\u6302\u8F7D\u7684\u8282\u70B9\u4E3A:" + radio + ",",
            success: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, ok, msg;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, api_1.default.bacthRegisterDTU(radio, dtus)];
                        case 1:
                            _a = _b.sent(), ok = _a.ok, msg = _a.msg;
                            if (ok) {
                                wx.showToast({
                                    title: '提交成功'
                                });
                                this.setData({
                                    dtus: [],
                                    mac: ''
                                });
                            }
                            else {
                                wx.showModal({
                                    title: '提交错误',
                                    content: msg
                                });
                            }
                            return [2];
                    }
                });
            }); }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBcUM7QUFHckMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxJQUFJLEVBQUUsRUFBYztRQUNwQixLQUFLLEVBQUUsRUFBa0I7UUFDekIsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUtELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNqQixDQUFDO0lBR0ssT0FBTzs7Ozs7NEJBQ1EsV0FBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFBOzt3QkFBbEMsVUFBVSxHQUFHLFNBQXFCO3dCQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLEdBQUcsRUFBRSxVQUFVLENBQUMsTUFBTTt5QkFDdkIsQ0FBQyxDQUFBO3dCQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTs7Ozs7S0FDZjtJQUdELFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUdELE9BQU87UUFDTCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLEdBQUcsS0FBQTtnQkFDSCxJQUFJLGlCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFFLEdBQUcsRUFBQzthQUMvQixDQUFDLENBQUE7WUFDRixJQUFNLE1BQU0sR0FBRyxJQUFJLENB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RUFBRSxNQUFNO29DQUNiLE9BQU8sRUFBRSxHQUFHO2lDQUNiLENBQUMsQ0FBQTs2QkFDSDs7OztpQkFDRjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIjtcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvYWRtaW4vcmVnaXN0ZXIvcmVnaXN0ZXIuanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBtYWM6ICcnLFxuICAgIGR0dXM6IFtdIGFzIHN0cmluZ1tdLFxuICAgIG5vZGVzOiBbXSBhcyBOb2RlQ2xpZW50W10sXG4gICAgcmFkaW86ICcnXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdldE5vZGVzKClcbiAgfSxcblxuICAvLyDosIPnlKjlvq7kv6FhcGnvvIzmiavmj49EVFXmnaHlvaLnoIFcbiAgYXN5bmMgc2Nhbk1hYygpIHtcbiAgICBjb25zdCBzY2FuUmVzdWx0ID0gYXdhaXQgd3guc2NhbkNvZGUoe30pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1hYzogc2NhblJlc3VsdC5yZXN1bHRcbiAgICB9KVxuICAgIHRoaXMuYWRkRHR1cygpXG4gIH0sXG5cbiAgLy8g5Yqg5YWlZHR1c1xuICBzY2FuUmVxdXN0KCkge1xuICAgIHRoaXMuYWRkRHR1cygpXG4gIH0sXG5cbiAgLy8gYWRkXG4gIGFkZER0dXMoKSB7XG4gICAgY29uc3QgbWFjID0gdGhpcy5kYXRhLm1hY1xuICAgIGlmICh0aGlzLmRhdGEuZHR1cy5pbmNsdWRlcyhtYWMpKSB7XG4gICAgICBjb25zb2xlLmxvZygn6YeN5aSN5omr5o+PJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIG1hYyxcbiAgICAgICAgZHR1czogWy4uLnRoaXMuZGF0YS5kdHVzLCBtYWNdXG4gICAgICB9KVxuICAgICAgY29uc3QgZHR1bGVuID0gdGhpcy5kYXRhLmR0dXMubGVuZ3RoXG4gICAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMuZGF0YS5ub2Rlcykge1xuICAgICAgICBpZiAobm9kZS5NYXhDb25uZWN0aW9ucyAtIG5vZGUuY291bnQgPiBkdHVsZW4pIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgcmFkaW86IG5vZGUuTmFtZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyDpgInmi6noioLngrlcbiAgb25DaGFuZ2VfTm9kZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gIH0sXG5cbiAgLy8g5Yig6Zmk6YCJ5oup55qERFRVXG4gIHJtRHR1KGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBrZXkgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQua2V5XG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5Yig6ZmkZHR1JyxcbiAgICAgIGNvbnRlbnQ6IGDnoa7lrprliKDpmaRkdHU6JHtrZXl9ID8/YCxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGR0dXM6IHRoaXMuZGF0YS5kdHVzLmZpbHRlcihlbCA9PiBlbCAhPT0ga2V5KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8vIOiOt+WPluiKgueCueWIl+ihqFxuICBhc3luYyBnZXROb2RlcygpIHtcbiAgICBjb25zdCB7IGFyZyB9ID0gYXdhaXQgYXBpLmdldE5vZGVzKClcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbm9kZXM6IGFyZyxcbiAgICAgIHJhZGlvOiBhcmdbMF0uTmFtZVxuICAgIH0pXG4gIH0sXG4gIC8vIOWPmOabtOmAieaLqeiKgueCuVxuICBjaGFuZ2VOb2RlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgcmFkaW86IGV2ZW50LmRldGFpbCxcbiAgICB9KTtcbiAgfSxcblxuICAvLyDpgInmi6noioLngrlcbiAgc2VsZWN0Tm9kZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgaXRlbTogTm9kZUNsaWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHJhZGlvOiBpdGVtLk5hbWVcbiAgICB9KTtcbiAgfSxcbiAgLy8g5o+Q5LqkXG4gIHN1Ym1pdCgpIHtcbiAgICBjb25zdCB7IGR0dXMsIHJhZGlvIH0gPSB0aGlzLmRhdGFcbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmj5DkuqTmoLjlr7knLFxuICAgICAgY29udGVudDogYOacrOasoeaPkOS6pOeahGR0deaVsOebrjoke2R0dXMubGVuZ3RofSzmjILovb3nmoToioLngrnkuLo6JHtyYWRpb30sYCxcbiAgICAgIHN1Y2Nlc3M6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkuYmFjdGhSZWdpc3RlckRUVShyYWRpbywgZHR1cylcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q5Lqk5oiQ5YqfJ1xuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGR0dXM6IFtdLFxuICAgICAgICAgICAgbWFjOiAnJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q5Lqk6ZSZ6K+vJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59KSJdfQ==