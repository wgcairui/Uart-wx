"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var unitCache_1 = require("../../../utils/unitCache");
var api_1 = require("../../../utils/api");
var util_1 = require("../../../utils/util");
Page({
    data: {
        active: 0,
        protocol: '',
        usersetup: {} || undefined,
        syssetup: {},
        Protocols: {},
        alarmStat: [] || undefined,
        Threshold: [] || undefined
    },
    onLoad: function (options) {
        var _this = this;
        var type = Number(options.type) || 0;
        var protocol = options.protocol;
        if (!protocol) {
            wx.navigateTo({
                url: '/pages/index/alarmSetting/index'
            });
        }
        else {
            this.setData({
                active: type,
                protocol: protocol
            });
            this.getUserProtocolSetup();
            wx.getStorage({
                key: 'protocolSetup' + options.protocol,
                success: function (res) {
                    _this.setData({
                        usersetup: res.data.user,
                        syssetup: res.data.sys,
                        Protocols: res.data.protocol
                    });
                },
                fail: function (_e) {
                    _this.getUserProtocolSetup();
                }
            });
        }
    },
    getUserProtocolSetup: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, arg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, api_1.default.getUserDevConstant(this.data.protocol)];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, arg = _a.arg;
                        if (ok && arg) {
                            this.setData({
                                usersetup: arg.user || {},
                                syssetup: arg.sys,
                                Protocols: arg.protocol
                            });
                            wx.setStorage({
                                key: 'protocolSetup' + this.data.protocol,
                                data: arg
                            });
                        }
                        else {
                            wx.showModal({
                                title: "Error",
                                content: '未定义配置'
                            });
                        }
                        return [2];
                }
            });
        });
    },
    parseProtocol: function () {
        var protocolArray = this.data.Protocols.instruct.map(function (instruct) {
            return instruct.formResize.map(function (el) {
                var _a;
                return (_a = {}, _a[el.name] = el.isState ? unitCache_1.default.getunitObject(1, el.unit) : {}, _a);
            });
        }).reduce(function (pre, cur) {
            return __spreadArrays(pre, cur);
        });
        return Object.assign.apply(Object, __spreadArrays([{}], protocolArray));
    },
    tabclick: function (event) {
        var _a, _b;
        wx.setNavigationBarTitle({ title: '协议配置-' + event.detail.title });
        switch (event.detail.title) {
            case "参数限值":
                {
                    if (this.data.Threshold) {
                        var _c = this.data, usersetup = _c.usersetup, syssetup = _c.syssetup;
                        var sys_ThresholdMap_1 = new Map(syssetup.Threshold.map(function (el) { return [el.name, el]; }));
                        if ((_a = usersetup) === null || _a === void 0 ? void 0 : _a.Threshold) {
                            var user_ThresholdMap_1 = new Map(usersetup.Threshold.map(function (el) { return [el.name, el]; }));
                            sys_ThresholdMap_1.forEach(function (val, key) {
                                var thr = user_ThresholdMap_1.get(key);
                                if (thr && (thr.max !== val.max || thr.min !== val.min))
                                    sys_ThresholdMap_1.set(key, thr);
                            });
                        }
                        this.setData({
                            Threshold: Array.from(sys_ThresholdMap_1.values())
                        });
                    }
                }
                break;
            case "参数状态":
                {
                    if (this.data.alarmStat) {
                        var _d = this.data, usersetup = _d.usersetup, syssetup = _d.syssetup;
                        var sys_alarmStatMap_1 = new Map(syssetup.AlarmStat.map(function (el) { return [el.name, el]; }));
                        if ((_b = usersetup) === null || _b === void 0 ? void 0 : _b.AlarmStat) {
                            var user_alarmStatMap_1 = new Map(usersetup.AlarmStat.map(function (el) { return [el.name, el]; }));
                            sys_alarmStatMap_1.forEach(function (val, key) {
                                var stat = user_alarmStatMap_1.get(key);
                                if (stat && stat.alarmStat.sort().toString() !== val.alarmStat.sort().toString()) {
                                    sys_alarmStatMap_1.set(key, stat);
                                }
                            });
                        }
                        var parse_1 = this.parseProtocol();
                        sys_alarmStatMap_1.forEach(function (el, key) {
                            el.parse = parse_1[key];
                        });
                        this.setData({
                            alarmStat: Array.from(sys_alarmStatMap_1.values())
                        });
                    }
                }
                break;
        }
    },
    ShowTagonChange: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var tags;
            return __generator(this, function (_a) {
                tags = event.detail;
                this.setData({
                    "usersetup.ShowTag": tags
                });
                return [2];
            });
        });
    },
    ShowTagtoggle: function (event) {
        var index = event.currentTarget.dataset.index;
        var checkbox = this.selectComponent(".checkboxes-" + index);
        checkbox.toggle();
    },
    AlarmStatonChange: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var item, value, index;
            var _a;
            return __generator(this, function (_b) {
                item = event.currentTarget.dataset.item;
                value = event.detail;
                index = this.data.alarmStat.findIndex(function (el) { return el.name === item.name; });
                this.setData((_a = {},
                    _a["alarmStat[" + index + "].alarmStat"] = value,
                    _a));
                return [2];
            });
        });
    },
    ThresholdClick: function (event) {
        var _this = this;
        var item = event.currentTarget.dataset.item;
        var index = event.currentTarget.dataset.index;
        wx.navigateTo({
            url: '/pages/index/alarmSetting/threshold/threshold' + util_1.ObjectToStrquery(__assign({}, item)),
            events: {
                modifyThreshold: function (data) {
                    var _a;
                    _this.setData((_a = {},
                        _a["Threshold[" + index + "]"] = __assign(__assign({}, data), { icon: "star" }),
                        _a));
                }
            }
        });
    },
    addThreshold: function () {
        var _this = this;
        wx.navigateTo({
            url: '/pages/index/alarmSetting/addThreshold/addThreshold' + util_1.ObjectToStrquery({ protocol: this.data.protocol }),
            events: {
                addThreshold: function (data) {
                    var newThre = _this.data.Threshold.concat(data);
                    _this.setData({
                        Threshold: newThre
                    });
                }
            }
        });
    },
    saveSetup: function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, usersetup, alarmStat, Threshold, protocol, key;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _d = this.data, usersetup = _d.usersetup, alarmStat = _d.alarmStat, Threshold = _d.Threshold, protocol = _d.protocol;
                        return [4, api_1.default.pushThreshold(((_a = usersetup) === null || _a === void 0 ? void 0 : _a.ShowTag) || [], 'ShowTag', protocol)];
                    case 1:
                        _f.sent();
                        if (!((alarmStat && alarmStat.length > 0 && !((_b = usersetup) === null || _b === void 0 ? void 0 : _b.AlarmStat)) || JSON.stringify(alarmStat) !== JSON.stringify(usersetup.AlarmStat))) return [3, 3];
                        return [4, api_1.default.pushThreshold(alarmStat, 'AlarmStat', protocol)];
                    case 2:
                        _f.sent();
                        _f.label = 3;
                    case 3:
                        if (!((Threshold && Threshold.length > 0 && ((_c = usersetup) === null || _c === void 0 ? void 0 : _c.Threshold)) || JSON.stringify(Threshold) !== JSON.stringify(usersetup.Threshold))) return [3, 5];
                        return [4, api_1.default.pushThreshold(Threshold.map(function (el) { return ({ name: el.name, min: el.min, max: el.max }); }), "Threshold", protocol)];
                    case 4:
                        _f.sent();
                        _f.label = 5;
                    case 5:
                        key = 'protocolSetup' + protocol;
                        wx.getStorage({
                            key: key,
                            success: function (_a) {
                                var data = _a.data;
                                var _b;
                                data.user.ShowTag = ((_b = usersetup) === null || _b === void 0 ? void 0 : _b.ShowTag) || [];
                                data.user.AlarmStat = alarmStat;
                                data.user.Threshold = Threshold;
                                wx.setStorage({
                                    key: key,
                                    data: data,
                                    fail: function () {
                                        wx.removeStorage({ key: key });
                                        wx.showToast({ title: "保存失败" });
                                    }
                                });
                            }
                        });
                        return [2];
                }
            });
        });
    },
    onUnload: function () {
        this.saveSetup();
    },
    onPullDownRefresh: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getUserProtocolSetup()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm1TZXR0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxhcm1TZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWdEO0FBQ2hELDBDQUFvQztBQUNwQyw0Q0FBc0Q7QUFHdEQsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUErQixJQUFJLFNBQVM7UUFDdkQsUUFBUSxFQUFFLEVBQStCO1FBQ3pDLFNBQVMsRUFBRSxFQUFjO1FBQ3pCLFNBQVMsRUFBRSxFQUF5QixJQUFJLFNBQVM7UUFDakQsU0FBUyxFQUFFLEVBQWlCLElBQUksU0FBUztLQUMxQztJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFBakIsaUJBMkJQO1FBMUJDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RDLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osR0FBRyxFQUFFLGlDQUFpQzthQUN2QyxDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLFVBQUE7YUFDVCxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtZQUMzQixFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNaLEdBQUcsRUFBRSxlQUFlLEdBQUcsT0FBTyxDQUFDLFFBQVE7Z0JBQ3ZDLE9BQU8sRUFBRSxVQUFDLEdBQUc7b0JBQ1gsS0FBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxTQUFT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U0FBUyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUtELGlCQUFpQixFQUFFOzs7OzRCQUNqQixXQUFNLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFBOzt3QkFBakMsU0FBaUMsQ0FBQTt3QkFDakMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVuaXRDYWNoZSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdW5pdENhY2hlXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5pbXBvcnQgeyBPYmplY3RUb1N0cnF1ZXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIlxuXG4vLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvYWxhcm1TZXR0aW5nLmpzXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgYWN0aXZlOiAwLFxuICAgIHByb3RvY29sOiAnJyxcbiAgICB1c2Vyc2V0dXA6IHt9IGFzIFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQgfHwgdW5kZWZpbmVkLFxuICAgIHN5c3NldHVwOiB7fSBhcyBQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLFxuICAgIFByb3RvY29sczoge30gYXMgcHJvdG9jb2wsXG4gICAgYWxhcm1TdGF0OiBbXSBhcyBDb25zdGFudEFsYXJtU3RhdFtdIHx8IHVuZGVmaW5lZCxcbiAgICBUaHJlc2hvbGQ6IFtdIGFzIFRocmVzaG9sZFtdIHx8IHVuZGVmaW5lZFxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGNvbnN0IHR5cGUgPSBOdW1iZXIob3B0aW9ucy50eXBlKSB8fCAwXG4gICAgY29uc3QgcHJvdG9jb2wgPSBvcHRpb25zLnByb3RvY29sXG4gICAgaWYgKCFwcm90b2NvbCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvaW5kZXgnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBhY3RpdmU6IHR5cGUsXG4gICAgICAgIHByb3RvY29sXG4gICAgICB9KVxuICAgICAgdGhpcy5nZXRVc2VyUHJvdG9jb2xTZXR1cCgpXG4gICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAncHJvdG9jb2xTZXR1cCcgKyBvcHRpb25zLnByb3RvY29sLFxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHVzZXJzZXR1cDogcmVzLmRhdGEudXNlcixcbiAgICAgICAgICAgIHN5c3NldHVwOiByZXMuZGF0YS5zeXMsXG4gICAgICAgICAgICBQcm90b2NvbHM6IHJlcy5kYXRhLnByb3RvY29sXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKF9lKSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRVc2VyUHJvdG9jb2xTZXR1cCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIOiOt+WPlueUqOaIt+WNj+iurumFjee9rlxuICBhc3luYyBnZXRVc2VyUHJvdG9jb2xTZXR1cCgpIHtcbiAgICBjb25zdCB7IG9rLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXRVc2VyRGV2Q29uc3RhbnQodGhpcy5kYXRhLnByb3RvY29sKVxuICAgIGlmIChvayAmJiBhcmcpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHVzZXJzZXR1cDogYXJnLnVzZXIgfHwge30sXG4gICAgICAgIHN5c3NldHVwOiBhcmcuc3lzLFxuICAgICAgICBQcm90b2NvbHM6IGFyZy5wcm90b2NvbFxuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdwcm90b2NvbFNldHVwJyArIHRoaXMuZGF0YS5wcm90b2NvbCxcbiAgICAgICAgZGF0YTogYXJnXG4gICAgICB9KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgIGNvbnRlbnQ6ICfmnKrlrprkuYnphY3nva4nXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvLyDov5Tlm57ljY/orq7lj4LmlbDlr7nosaHop6PmnpBcbiAgcGFyc2VQcm90b2NvbCgpIHtcbiAgICBjb25zdCBwcm90b2NvbEFycmF5ID0gdGhpcy5kYXRhLlByb3RvY29scy5pbnN0cnVjdC5tYXAoaW5zdHJ1Y3QgPT4ge1xuICAgICAgcmV0dXJuIGluc3RydWN0LmZvcm1SZXNpemUubWFwKGVsID0+ICh7IFtlbC5uYW1lXTogZWwuaXNTdGF0ZSA/IHVuaXRDYWNoZS5nZXR1bml0T2JqZWN0KDEsIGVsLnVuaXQgYXMgc3RyaW5nKSA6IHt9IH0pKVxuICAgIH0pLnJlZHVjZSgocHJlLCBjdXIpID0+IHtcbiAgICAgIHJldHVybiBbLi4ucHJlLCAuLi5jdXJdXG4gICAgfSlcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgLi4ucHJvdG9jb2xBcnJheSkgYXMgeyBbeDogc3RyaW5nXTogeyBbeDogc3RyaW5nXTogc3RyaW5nIH1bXSB9XG4gIH0sXG4gIC8vIOS/ruaUueagh+mimFxuICB0YWJjbGljayhldmVudDogdmFudEV2ZW50KSB7XG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6ICfljY/orq7phY3nva4tJyArIGV2ZW50LmRldGFpbC50aXRsZSB9KVxuICAgIHN3aXRjaCAoZXZlbnQuZGV0YWlsLnRpdGxlKSB7XG4gICAgICBjYXNlIFwi5Y+C5pWw6ZmQ5YC8XCI6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAodGhpcy5kYXRhLlRocmVzaG9sZCkge1xuICAgICAgICAgICAgY29uc3QgeyB1c2Vyc2V0dXAsIHN5c3NldHVwIH0gPSB0aGlzLmRhdGFcbiAgICAgICAgICAgIGNvbnN0IHN5c19UaHJlc2hvbGRNYXAgPSBuZXcgTWFwKHN5c3NldHVwLlRocmVzaG9sZC5tYXAoZWwgPT4gW2VsLm5hbWUsIGVsXSkpXG4gICAgICAgICAgICBpZiAodXNlcnNldHVwPy5UaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgY29uc3QgdXNlcl9UaHJlc2hvbGRNYXAgPSBuZXcgTWFwKHVzZXJzZXR1cC5UaHJlc2hvbGQubWFwKGVsID0+IFtlbC5uYW1lLCBlbF0pKVxuICAgICAgICAgICAgICBzeXNfVGhyZXNob2xkTWFwLmZvckVhY2goKHZhbCwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhyID0gdXNlcl9UaHJlc2hvbGRNYXAuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICBpZiAodGhyICYmICh0aHIubWF4ICE9PSB2YWwubWF4IHx8IHRoci5taW4gIT09IHZhbC5taW4pKSBzeXNfVGhyZXNob2xkTWFwLnNldChrZXksIHRocilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIFRocmVzaG9sZDogQXJyYXkuZnJvbShzeXNfVGhyZXNob2xkTWFwLnZhbHVlcygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCLlj4LmlbDnirbmgIFcIjpcbiAgICAgICAge1xuICAgICAgICAgIGlmICh0aGlzLmRhdGEuYWxhcm1TdGF0KSB7XG4gICAgICAgICAgICBjb25zdCB7IHVzZXJzZXR1cCwgc3lzc2V0dXAgfSA9IHRoaXMuZGF0YVxuICAgICAgICAgICAgY29uc3Qgc3lzX2FsYXJtU3RhdE1hcCA9IG5ldyBNYXAoc3lzc2V0dXAuQWxhcm1TdGF0Lm1hcChlbCA9PiBbZWwubmFtZSwgZWxdKSlcbiAgICAgICAgICAgIGlmICh1c2Vyc2V0dXA/LkFsYXJtU3RhdCkge1xuICAgICAgICAgICAgICBjb25zdCB1c2VyX2FsYXJtU3RhdE1hcCA9IG5ldyBNYXAodXNlcnNldHVwLkFsYXJtU3RhdC5tYXAoZWwgPT4gW2VsLm5hbWUsIGVsXSkpXG4gICAgICAgICAgICAgIHN5c19hbGFybVN0YXRNYXAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ID0gdXNlcl9hbGFybVN0YXRNYXAuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICBpZiAoc3RhdCAmJiBzdGF0LmFsYXJtU3RhdC5zb3J0KCkudG9TdHJpbmcoKSAhPT0gdmFsLmFsYXJtU3RhdC5zb3J0KCkudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgc3lzX2FsYXJtU3RhdE1hcC5zZXQoa2V5LCBzdGF0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBhcnNlID0gdGhpcy5wYXJzZVByb3RvY29sKClcbiAgICAgICAgICAgIHN5c19hbGFybVN0YXRNYXAuZm9yRWFjaCgoZWwsIGtleSkgPT4ge1xuICAgICAgICAgICAgICBlbC5wYXJzZSA9IHBhcnNlW2tleV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICBhbGFybVN0YXQ6IEFycmF5LmZyb20oc3lzX2FsYXJtU3RhdE1hcC52YWx1ZXMoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9LFxuICAvLyAg55uR5ZCs5pi+56S65Y+C5pWw5Y+Y5YyWXG4gIGFzeW5jIFNob3dUYWdvbkNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdGFncyA9IGV2ZW50LmRldGFpbCBhcyBzdHJpbmdbXVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBcInVzZXJzZXR1cC5TaG93VGFnXCI6IHRhZ3NcbiAgICB9KVxuICB9LFxuICAvLyDkv67mlLnmmL7npLrlj4LmlbDlj5jljJblgLxcbiAgU2hvd1RhZ3RvZ2dsZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgeyBpbmRleCB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgIGNvbnN0IGNoZWNrYm94ID0gdGhpcy5zZWxlY3RDb21wb25lbnQoYC5jaGVja2JveGVzLSR7aW5kZXh9YCk7XG4gICAgY2hlY2tib3gudG9nZ2xlKCk7XG4gIH0sXG4gIC8vIOebkeWQrOWPguaVsOeKtuaAgeWPmOWMllxuICBhc3luYyBBbGFybVN0YXRvbkNoYW5nZShldmVudDogdmFudEV2ZW50PENvbnN0YW50QWxhcm1TdGF0Pikge1xuICAgIGNvbnN0IGl0ZW0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsIGFzIHN0cmluZ1tdXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGEuYWxhcm1TdGF0LmZpbmRJbmRleChlbCA9PiBlbC5uYW1lID09PSBpdGVtLm5hbWUpXG4gICAgLy8gdGhpcy5kYXRhLmFsYXJtU3RhdFtpbmRleF0uYWxhcm1TdGF0ID0gdmFsdWVcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgW1wiYWxhcm1TdGF0W1wiICsgaW5kZXggKyBcIl0uYWxhcm1TdGF0XCJdOiB2YWx1ZVxuICAgIH0pXG4gIH0sXG4gIC8vIOi3s+i9rOWIsOWPguaVsOmZkOWAvOS/ruaUuemhtemdolxuICBUaHJlc2hvbGRDbGljayhldmVudDogdmFudEV2ZW50PFRocmVzaG9sZD4pIHtcbiAgICBjb25zdCBpdGVtID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lml0ZW1cbiAgICBjb25zdCBpbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy90aHJlc2hvbGQvdGhyZXNob2xkJyArIE9iamVjdFRvU3RycXVlcnkoeyAuLi5pdGVtIH0pLFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG1vZGlmeVRocmVzaG9sZDogKGRhdGE6IFRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBbYFRocmVzaG9sZFske2luZGV4fV1gXTogeyAuLi5kYXRhLCBpY29uOiBcInN0YXJcIiB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vXG4gIGFkZFRocmVzaG9sZCgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvYWRkVGhyZXNob2xkL2FkZFRocmVzaG9sZCcgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgcHJvdG9jb2w6IHRoaXMuZGF0YS5wcm90b2NvbCB9KSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBhZGRUaHJlc2hvbGQ6IChkYXRhOiBUaHJlc2hvbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdUaHJlID0gdGhpcy5kYXRhLlRocmVzaG9sZC5jb25jYXQoZGF0YSlcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgVGhyZXNob2xkOiBuZXdUaHJlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOS/neWtmOmFjee9rlxuICBhc3luYyBzYXZlU2V0dXAoKSB7XG4gICAgY29uc3QgeyB1c2Vyc2V0dXAsIGFsYXJtU3RhdCwgVGhyZXNob2xkLCBwcm90b2NvbCB9ID0gdGhpcy5kYXRhXG4gICAgYXdhaXQgYXBpLnB1c2hUaHJlc2hvbGQodXNlcnNldHVwPy5TaG93VGFnIHx8IFtdLCAnU2hvd1RhZycsIHByb3RvY29sKVxuICAgIC8vIOWmguaenOacieeUqOaIt+mFjee9rlxuICAgIGlmICgoYWxhcm1TdGF0ICYmIGFsYXJtU3RhdC5sZW5ndGggPiAwICYmICF1c2Vyc2V0dXA/LkFsYXJtU3RhdCkgfHwgSlNPTi5zdHJpbmdpZnkoYWxhcm1TdGF0KSAhPT0gSlNPTi5zdHJpbmdpZnkodXNlcnNldHVwLkFsYXJtU3RhdCkpIHtcbiAgICAgIGF3YWl0IGFwaS5wdXNoVGhyZXNob2xkKGFsYXJtU3RhdCwgJ0FsYXJtU3RhdCcsIHByb3RvY29sKVxuICAgIH1cbiAgICAvL1xuICAgIGlmICgoVGhyZXNob2xkICYmIFRocmVzaG9sZC5sZW5ndGggPiAwICYmIHVzZXJzZXR1cD8uVGhyZXNob2xkKSB8fCBKU09OLnN0cmluZ2lmeShUaHJlc2hvbGQpICE9PSBKU09OLnN0cmluZ2lmeSh1c2Vyc2V0dXAuVGhyZXNob2xkKSkge1xuICAgICAgYXdhaXQgYXBpLnB1c2hUaHJlc2hvbGQoVGhyZXNob2xkLm1hcChlbCA9PiAoeyBuYW1lOiBlbC5uYW1lLCBtaW46IGVsLm1pbiwgbWF4OiBlbC5tYXggfSkpLCBcIlRocmVzaG9sZFwiLCBwcm90b2NvbClcbiAgICB9XG4gICAgY29uc3Qga2V5ID0gJ3Byb3RvY29sU2V0dXAnICsgcHJvdG9jb2xcbiAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgIGtleSxcbiAgICAgIHN1Y2Nlc3MoeyBkYXRhIH06IHsgZGF0YTogeyB1c2VyOiBQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLCBzeXM6IFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsIHByb3RvY29sOiBwcm90b2NvbCB9IH0pIHtcbiAgICAgICAgZGF0YS51c2VyLlNob3dUYWcgPSB1c2Vyc2V0dXA/LlNob3dUYWcgfHwgW11cbiAgICAgICAgZGF0YS51c2VyLkFsYXJtU3RhdCA9IGFsYXJtU3RhdFxuICAgICAgICBkYXRhLnVzZXIuVGhyZXNob2xkID0gVGhyZXNob2xkXG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleSxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgICB3eC5yZW1vdmVTdG9yYWdlKHsga2V5IH0pXG4gICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogXCLkv53lrZjlpLHotKVcIiB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICAgIC8qIFByb21pc2UuYWxsKFtzaG93dGFnLCBhbGFybSwgdGhyZV0pLnRoZW4oX3JlcyA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAncHJvdG9jb2xTZXR1cCcgKyBwcm90b2NvbFxuICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgIGtleSxcbiAgICAgICAgc3VjY2Vzcyh7IGRhdGEgfTogeyBkYXRhOiB7IHVzZXI6IFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsIHN5czogUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCwgcHJvdG9jb2w6IHByb3RvY29sIH0gfSkge1xuICAgICAgICAgIGRhdGEudXNlci5TaG93VGFnID0gdXNlcnNldHVwPy5TaG93VGFnIHx8IFtdXG4gICAgICAgICAgZGF0YS51c2VyLkFsYXJtU3RhdCA9IGFsYXJtU3RhdFxuICAgICAgICAgIGRhdGEudXNlci5UaHJlc2hvbGQgPSBUaHJlc2hvbGRcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBmYWlsKCkge1xuICAgICAgICAgICAgICB3eC5yZW1vdmVTdG9yYWdlKHsga2V5IH0pXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiBcIuS/neWtmOWksei0pVwiIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn5L+u5pS555So5oi36K6+5a6a5oiQ5YqfJ1xuICAgICAgfSlcbiAgICB9KS5jYXRjaChfZSA9PiB7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+S4iuS8oOeUqOaIt+iuvuWumuWksei0pe+8jOivt+eojeWQjuWGjeivlScsXG4gICAgICAgIGljb246IFwibm9uZVwiXG4gICAgICB9KVxuICAgICAgd3gucmVtb3ZlU3RvcmFnZSh7IGtleTogJ3Byb3RvY29sU2V0dXAnICsgcHJvdG9jb2wgfSlcbiAgICB9KSAqL1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNhdmVTZXR1cCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHRoaXMuZ2V0VXNlclByb3RvY29sU2V0dXAoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9XG59KSJdfQ==