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
        showTag: [],
        alarmStat: [] || undefined,
        Threshold: [] || undefined
    },
    onLoad: function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var protocol, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        protocol = options.protocol;
                        if (!!protocol) return [3, 1];
                        wx.navigateTo({
                            url: '/pages/index/alarmSetting/index'
                        });
                        return [3, 3];
                    case 1:
                        active = Number(options.type) || 0;
                        this.setData({
                            active: active,
                            protocol: protocol
                        });
                        return [4, this.getUserProtocolSetup()];
                    case 2:
                        _a.sent();
                        if (active === 1)
                            this.updateThre();
                        if (active === 2)
                            this.updateAlarm();
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    },
    getUserProtocolSetup: function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, ok, arg;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        wx.showLoading({ title: '获取协议配置' });
                        return [4, api_1.default.getUserDevConstant(this.data.protocol)];
                    case 1:
                        _c = _d.sent(), ok = _c.ok, arg = _c.arg;
                        wx.hideLoading();
                        if (ok && arg) {
                            this.setData({
                                usersetup: arg.user || {},
                                syssetup: arg.sys,
                                Protocols: arg.protocol,
                                showTag: ((_b = (_a = arg) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.ShowTag) || []
                            });
                            wx.setStorage({
                                key: 'protocolSetup' + this.data.protocol,
                                data: arg.protocol
                            });
                        }
                        else {
                            wx.showModal({
                                title: "Error",
                                content: '设备协议b不支持配置'
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
        wx.setNavigationBarTitle({ title: '协议配置-' + event.detail.title });
        switch (event.detail.title) {
            case "参数限值":
                this.updateThre();
                break;
            case "参数状态":
                this.updateAlarm();
                break;
        }
    },
    updateThre: function () {
        var _a;
        var _b = this.data, usersetup = _b.usersetup, syssetup = _b.syssetup;
        var sys_ThresholdMap = new Map(syssetup.Threshold.map(function (el) { return [el.name, el]; }));
        if ((_a = usersetup) === null || _a === void 0 ? void 0 : _a.Threshold) {
            __spreadArrays(this.data.Threshold, usersetup.Threshold).forEach(function (val) {
                sys_ThresholdMap.set(val.name, val);
            });
        }
        this.setData({
            Threshold: Array.from(sys_ThresholdMap.values())
        });
    },
    updateAlarm: function () {
        var _a;
        var _b = this.data, usersetup = _b.usersetup, syssetup = _b.syssetup;
        var sys_alarmStatMap = new Map(syssetup.AlarmStat.map(function (el) { return [el.name, el]; }));
        if ((_a = usersetup) === null || _a === void 0 ? void 0 : _a.AlarmStat) {
            __spreadArrays(usersetup.AlarmStat, this.data.alarmStat).forEach(function (val) {
                sys_alarmStatMap.set(val.name, val);
            });
        }
        var parse = this.parseProtocol();
        sys_alarmStatMap.forEach(function (el, key) {
            el.parse = parse[key];
        });
        this.setData({
            alarmStat: Array.from(sys_alarmStatMap.values())
        });
    },
    ShowTagonChange: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var tags;
            return __generator(this, function (_a) {
                tags = event.detail;
                this.setData({
                    showTag: tags
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
        var _a;
        var ua = ((_a = this.data.usersetup) === null || _a === void 0 ? void 0 : _a.AlarmStat) || [];
        var keys = new Set(__spreadArrays(this.data.alarmStat.map(function (el) { return el.name; }), ua.map(function (el) { return el.name; })));
        wx.navigateTo({
            url: '/pages/index/alarmSetting/addThreshold/addThreshold' + util_1.ObjectToStrquery({ protocol: this.data.protocol, keys: Array.from(keys) }),
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, usersetup, alarmStat, Threshold, protocol, userShowtags, showtag, userAlarm, alarm, b1, ua, ka_1, compare, userThre, thre, b1, ua, ka_2, compare;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.data, usersetup = _a.usersetup, alarmStat = _a.alarmStat, Threshold = _a.Threshold, protocol = _a.protocol;
                        userShowtags = usersetup.ShowTag || [];
                        showtag = this.data.showTag || [];
                        if (!(userShowtags.sort().join("") !== showtag.sort().join(''))) return [3, 2];
                        return [4, api_1.default.pushThreshold(showtag || [], 'ShowTag', protocol)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        userAlarm = usersetup.AlarmStat || [];
                        alarm = alarmStat || [];
                        b1 = userAlarm.map(function (el) { return el.name; }).sort().join('') !== alarm.map(function (el) { return el.name; }).sort().join('');
                        if (!b1) return [3, 4];
                        return [4, api_1.default.pushThreshold(alarmStat, 'AlarmStat', protocol)];
                    case 3:
                        _b.sent();
                        return [3, 6];
                    case 4:
                        if (!(alarm.length !== 0)) return [3, 6];
                        ua = userAlarm.sort();
                        ka_1 = alarm.sort();
                        compare = ua.every(function (el, index) { return el.alarmStat.sort().join('') !== ka_1[index].alarmStat.sort().join(''); });
                        if (!compare) return [3, 6];
                        return [4, api_1.default.pushThreshold(alarmStat, 'AlarmStat', protocol)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        userThre = usersetup.Threshold || [];
                        thre = Threshold || [];
                        b1 = userThre.map(function (el) { return el.name; }).sort().join('') !== thre.map(function (el) { return el.name; }).sort().join('');
                        if (!b1) return [3, 8];
                        return [4, api_1.default.pushThreshold(thre.map(function (el) { return ({ name: el.name, min: el.min, max: el.max }); }), "Threshold", protocol)];
                    case 7:
                        _b.sent();
                        return [3, 10];
                    case 8:
                        if (!(thre.length !== 0)) return [3, 10];
                        ua = userThre.sort();
                        ka_2 = thre.sort();
                        compare = ua.every(function (el, index) { return el.min !== ka_2[index].min || el.max !== ka_2[index].max; });
                        if (!compare) return [3, 10];
                        return [4, api_1.default.pushThreshold(thre.map(function (el) { return ({ name: el.name, min: el.min, max: el.max }); }), "Threshold", protocol)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [2];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm1TZXR0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxhcm1TZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWdEO0FBQ2hELDBDQUFvQztBQUNwQyw0Q0FBc0Q7QUFHdEQsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUErQixJQUFJLFNBQVM7UUFDdkQsUUFBUSxFQUFFLEVBQStCO1FBQ3pDLFNBQVMsRUFBRSxFQUFjO1FBQ3pCLE9BQU8sRUFBRSxFQUFjO1FBQ3ZCLFNBQVMsRUFBRSxFQUF5QixJQUFJLFNBQVM7UUFDakQsU0FBUyxFQUFFLEVBQWlCLElBQUksU0FBUztLQUMxQztJQUtELE1BQU0sRUFBRSxVQUFnQixPQUFPOzs7Ozs7d0JBQ3ZCLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBOzZCQUM3QixDQUFDLFFBQVEsRUFBVCxjQUFTO3dCQUNYLEVBQUUsQ0FBQyxVQUFVLENBQUM7NEJBQ1osR0FBRyxFQUFFLGlDQUFpQzt5QkFDdkMsQ0FBQyxDQUFBOzs7d0JBRUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO3dCQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLE1BQU0sRUFBRSxNQUFNOzRCQUNkLFFBQVEsVUFBQTt5QkFDVCxDQUFDLENBQUE7d0JBQ0YsV0FBTSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBQTs7d0JBQWpDLFNBQWlDLENBQUE7d0JBQ2pDLElBQUksTUFBTSxLQUFLLENBQUM7NEJBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO3dCQUNuQyxJQUFJLE1BQU0sS0FBSyxDQUFDOzRCQUFFLElBQUksQ0FBQyxX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RixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdW5pdENhY2hlIGZyb20gXCIuLi8uLi8uLi91dGlscy91bml0Q2FjaGVcIlxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IE9iamVjdFRvU3RycXVlcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5cbi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9hbGFybVNldHRpbmcuanNcblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgYWN0aXZlOiAwLFxuICAgIHByb3RvY29sOiAnJyxcbiAgICB1c2Vyc2V0dXA6IHt9IGFzIFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQgfHwgdW5kZWZpbmVkLFxuICAgIHN5c3NldHVwOiB7fSBhcyBQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLFxuICAgIFByb3RvY29sczoge30gYXMgcHJvdG9jb2wsXG4gICAgc2hvd1RhZzogW10gYXMgc3RyaW5nW10sXG4gICAgYWxhcm1TdGF0OiBbXSBhcyBDb25zdGFudEFsYXJtU3RhdFtdIHx8IHVuZGVmaW5lZCxcbiAgICBUaHJlc2hvbGQ6IFtdIGFzIFRocmVzaG9sZFtdIHx8IHVuZGVmaW5lZFxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBhc3luYyBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGNvbnN0IHByb3RvY29sID0gb3B0aW9ucy5wcm90b2NvbFxuICAgIGlmICghcHJvdG9jb2wpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2luZGV4J1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWN0aXZlID0gTnVtYmVyKG9wdGlvbnMudHlwZSkgfHwgMFxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYWN0aXZlOiBhY3RpdmUsXG4gICAgICAgIHByb3RvY29sXG4gICAgICB9KVxuICAgICAgYXdhaXQgdGhpcy5nZXRVc2VyUHJvdG9jb2xTZXR1cCgpXG4gICAgICBpZiAoYWN0aXZlID09PSAxKSB0aGlzLnVwZGF0ZVRocmUoKVxuICAgICAgaWYgKGFjdGl2ZSA9PT0gMikgdGhpcy51cGRhdGVBbGFybSgpXG4gICAgICAvKiB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAncHJvdG9jb2xTZXR1cCcgKyBwcm90b2NvbCxcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2Vyc2V0dXA6IHJlcy5kYXRhLnVzZXIsXG4gICAgICAgICAgICBzeXNzZXR1cDogcmVzLmRhdGEuc3lzLFxuICAgICAgICAgICAgUHJvdG9jb2xzOiByZXMuZGF0YS5wcm90b2NvbFxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IChfZSkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0VXNlclByb3RvY29sU2V0dXAoKVxuICAgICAgICB9XG4gICAgICB9KSAqL1xuICAgIH1cbiAgfSxcblxuICAvLyDojrflj5bnlKjmiLfljY/orq7phY3nva5cbiAgYXN5bmMgZ2V0VXNlclByb3RvY29sU2V0dXAoKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+iOt+WPluWNj+iurumFjee9ricgfSlcbiAgICBjb25zdCB7IG9rLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXRVc2VyRGV2Q29uc3RhbnQodGhpcy5kYXRhLnByb3RvY29sKVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICBpZiAob2sgJiYgYXJnKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB1c2Vyc2V0dXA6IGFyZy51c2VyIHx8IHt9LFxuICAgICAgICBzeXNzZXR1cDogYXJnLnN5cyxcbiAgICAgICAgUHJvdG9jb2xzOiBhcmcucHJvdG9jb2wsXG4gICAgICAgIHNob3dUYWc6IGFyZz8udXNlcj8uU2hvd1RhZyB8fCBbXVxuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdwcm90b2NvbFNldHVwJyArIHRoaXMuZGF0YS5wcm90b2NvbCxcbiAgICAgICAgZGF0YTogYXJnLnByb3RvY29sXG4gICAgICB9KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgIGNvbnRlbnQ6ICforr7lpIfljY/orq5i5LiN5pSv5oyB6YWN572uJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8g6L+U5Zue5Y2P6K6u5Y+C5pWw5a+56LGh6Kej5p6QXG4gIHBhcnNlUHJvdG9jb2woKSB7XG4gICAgY29uc3QgcHJvdG9jb2xBcnJheSA9IHRoaXMuZGF0YS5Qcm90b2NvbHMuaW5zdHJ1Y3QubWFwKGluc3RydWN0ID0+IHtcbiAgICAgIHJldHVybiBpbnN0cnVjdC5mb3JtUmVzaXplLm1hcChlbCA9PiAoeyBbZWwubmFtZV06IGVsLmlzU3RhdGUgPyB1bml0Q2FjaGUuZ2V0dW5pdE9iamVjdCgxLCBlbC51bml0IGFzIHN0cmluZykgOiB7fSB9KSlcbiAgICB9KS5yZWR1Y2UoKHByZSwgY3VyKSA9PiB7XG4gICAgICByZXR1cm4gWy4uLnByZSwgLi4uY3VyXVxuICAgIH0pXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLnByb3RvY29sQXJyYXkpIGFzIHsgW3g6IHN0cmluZ106IHsgW3g6IHN0cmluZ106IHN0cmluZyB9W10gfVxuICB9LFxuICAvLyDkv67mlLnmoIfpophcbiAgdGFiY2xpY2soZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiAn5Y2P6K6u6YWN572uLScgKyBldmVudC5kZXRhaWwudGl0bGUgfSlcbiAgICBzd2l0Y2ggKGV2ZW50LmRldGFpbC50aXRsZSkge1xuICAgICAgY2FzZSBcIuWPguaVsOmZkOWAvFwiOlxuICAgICAgICB0aGlzLnVwZGF0ZVRocmUoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBcIuWPguaVsOeKtuaAgVwiOlxuICAgICAgICB0aGlzLnVwZGF0ZUFsYXJtKClcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH0sXG4gIC8vIOabtOaWsHRocmXliJfooahcbiAgdXBkYXRlVGhyZSgpIHtcbiAgICBjb25zdCB7IHVzZXJzZXR1cCwgc3lzc2V0dXAgfSA9IHRoaXMuZGF0YVxuICAgIGNvbnN0IHN5c19UaHJlc2hvbGRNYXAgPSBuZXcgTWFwKHN5c3NldHVwLlRocmVzaG9sZC5tYXAoZWwgPT4gW2VsLm5hbWUsIGVsXSkpXG4gICAgaWYgKHVzZXJzZXR1cD8uVGhyZXNob2xkKSB7XG4gICAgICAvLyDov63ku6PnlKjmiLfphY3nva7vvIzopobnm5bns7vnu5/phY3nva5cbiAgICAgIFsuLi50aGlzLmRhdGEuVGhyZXNob2xkLCAuLi51c2Vyc2V0dXAuVGhyZXNob2xkXS5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgc3lzX1RocmVzaG9sZE1hcC5zZXQodmFsLm5hbWUsIHZhbClcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBUaHJlc2hvbGQ6IEFycmF5LmZyb20oc3lzX1RocmVzaG9sZE1hcC52YWx1ZXMoKSlcbiAgICB9KVxuICB9LFxuICAvLyDmm7TmlrBhbGFybeWIl+ihqFxuICB1cGRhdGVBbGFybSgpIHtcbiAgICBjb25zdCB7IHVzZXJzZXR1cCwgc3lzc2V0dXAgfSA9IHRoaXMuZGF0YVxuICAgIGNvbnN0IHN5c19hbGFybVN0YXRNYXAgPSBuZXcgTWFwKHN5c3NldHVwLkFsYXJtU3RhdC5tYXAoZWwgPT4gW2VsLm5hbWUsIGVsXSkpXG4gICAgaWYgKHVzZXJzZXR1cD8uQWxhcm1TdGF0KSB7XG4gICAgICBbLi4udXNlcnNldHVwLkFsYXJtU3RhdCwgLi4udGhpcy5kYXRhLmFsYXJtU3RhdF0uZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICBzeXNfYWxhcm1TdGF0TWFwLnNldCh2YWwubmFtZSwgdmFsKVxuICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgcGFyc2UgPSB0aGlzLnBhcnNlUHJvdG9jb2woKVxuICAgIHN5c19hbGFybVN0YXRNYXAuZm9yRWFjaCgoZWwsIGtleSkgPT4ge1xuICAgICAgZWwucGFyc2UgPSBwYXJzZVtrZXldXG4gICAgfSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgYWxhcm1TdGF0OiBBcnJheS5mcm9tKHN5c19hbGFybVN0YXRNYXAudmFsdWVzKCkpXG4gICAgfSlcbiAgfSxcbiAgLy8gIOebkeWQrOaYvuekuuWPguaVsOWPmOWMllxuICBhc3luYyBTaG93VGFnb25DaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHRhZ3MgPSBldmVudC5kZXRhaWwgYXMgc3RyaW5nW11cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc2hvd1RhZzogdGFnc1xuICAgIH0pXG4gIH0sXG4gIC8vIOS/ruaUueaYvuekuuWPguaVsOWPmOWMluWAvFxuICBTaG93VGFndG9nZ2xlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCB7IGluZGV4IH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgY29uc3QgY2hlY2tib3ggPSB0aGlzLnNlbGVjdENvbXBvbmVudChgLmNoZWNrYm94ZXMtJHtpbmRleH1gKTtcbiAgICBjaGVja2JveC50b2dnbGUoKTtcbiAgfSxcbiAgLy8g55uR5ZCs5Y+C5pWw54q25oCB5Y+Y5YyWXG4gIGFzeW5jIEFsYXJtU3RhdG9uQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQ8Q29uc3RhbnRBbGFybVN0YXQ+KSB7XG4gICAgY29uc3QgaXRlbSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtXG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwgYXMgc3RyaW5nW11cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YS5hbGFybVN0YXQuZmluZEluZGV4KGVsID0+IGVsLm5hbWUgPT09IGl0ZW0ubmFtZSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgW1wiYWxhcm1TdGF0W1wiICsgaW5kZXggKyBcIl0uYWxhcm1TdGF0XCJdOiB2YWx1ZVxuICAgIH0pXG4gIH0sXG4gIC8vIOi3s+i9rOWIsOWPguaVsOmZkOWAvOS/ruaUuemhtemdolxuICBUaHJlc2hvbGRDbGljayhldmVudDogdmFudEV2ZW50PFRocmVzaG9sZD4pIHtcbiAgICBjb25zdCBpdGVtID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lml0ZW1cbiAgICBjb25zdCBpbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy90aHJlc2hvbGQvdGhyZXNob2xkJyArIE9iamVjdFRvU3RycXVlcnkoeyAuLi5pdGVtIH0pLFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG1vZGlmeVRocmVzaG9sZDogKGRhdGE6IFRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBbYFRocmVzaG9sZFske2luZGV4fV1gXTogeyAuLi5kYXRhLCBpY29uOiBcInN0YXJcIiB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOi3s+i9rOWIsOaWsOWinuWPguaVsOmZkOWAvOmhtemdolxuICBhZGRUaHJlc2hvbGQoKSB7XG4gICAgLy8g6I635Y+W546w5pyJ55qEdGhyZeWQjeensFxuICAgIGNvbnN0IHVhID0gdGhpcy5kYXRhLnVzZXJzZXR1cD8uQWxhcm1TdGF0IHx8IFtdXG4gICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoWy4uLnRoaXMuZGF0YS5hbGFybVN0YXQubWFwKGVsID0+IGVsLm5hbWUpLCAuLi51YS5tYXAoZWwgPT4gZWwubmFtZSldKVxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9hZGRUaHJlc2hvbGQvYWRkVGhyZXNob2xkJyArIE9iamVjdFRvU3RycXVlcnkoeyBwcm90b2NvbDogdGhpcy5kYXRhLnByb3RvY29sLCBrZXlzOiBBcnJheS5mcm9tKGtleXMpIH0pLFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIGFkZFRocmVzaG9sZDogKGRhdGE6IFRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld1RocmUgPSB0aGlzLmRhdGEuVGhyZXNob2xkLmNvbmNhdChkYXRhKVxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBUaHJlc2hvbGQ6IG5ld1RocmVcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g5L+d5a2Y6YWN572uXG4gIGFzeW5jIHNhdmVTZXR1cCgpIHtcbiAgICBjb25zdCB7IHVzZXJzZXR1cCwgYWxhcm1TdGF0LCBUaHJlc2hvbGQsIHByb3RvY29sIH0gPSB0aGlzLmRhdGFcbiAgICAvLyDmm7TmlrDnlKjmiLdzaG93VGFnc+mFjee9rlxuICAgIHtcbiAgICAgIGNvbnN0IHVzZXJTaG93dGFncyA9IHVzZXJzZXR1cC5TaG93VGFnIHx8IFtdXG4gICAgICBjb25zdCBzaG93dGFnID0gdGhpcy5kYXRhLnNob3dUYWcgfHwgW11cbiAgICAgIGlmICh1c2VyU2hvd3RhZ3Muc29ydCgpLmpvaW4oXCJcIikgIT09IHNob3d0YWcuc29ydCgpLmpvaW4oJycpKSB7XG4gICAgICAgIGF3YWl0IGFwaS5wdXNoVGhyZXNob2xkKHNob3d0YWcgfHwgW10sICdTaG93VGFnJywgcHJvdG9jb2wpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIOabtOaWsOeUqOaIt2FsYXJtU3RhdOmFjee9rlxuICAgIHtcbiAgICAgIC8vIOavlOi+g+WQjeensGpvaW7mmK/lkKbkuIDoh7TvvIzkuIDoh7TnmoTor53mo4Dmn6XplK7mmK/lkKbkuIDoh7TvvIzkuI3kuIDoh7Tnm7TmjqXmm7TmlrDvvIzplK7kuIDoh7TliJnmr5TovoPlgLzvvIzlgLzkuI3kuIDoh7TkuZ/mm7TmlrBcbiAgICAgIGNvbnN0IHVzZXJBbGFybSA9IHVzZXJzZXR1cC5BbGFybVN0YXQgfHwgW11cbiAgICAgIGNvbnN0IGFsYXJtID0gYWxhcm1TdGF0IHx8IFtdXG4gICAgICBjb25zdCBiMSA9IHVzZXJBbGFybS5tYXAoZWwgPT4gZWwubmFtZSkuc29ydCgpLmpvaW4oJycpICE9PSBhbGFybS5tYXAoZWwgPT4gZWwubmFtZSkuc29ydCgpLmpvaW4oJycpXG4gICAgICBpZiAoYjEpIHtcbiAgICAgICAgYXdhaXQgYXBpLnB1c2hUaHJlc2hvbGQoYWxhcm1TdGF0LCAnQWxhcm1TdGF0JywgcHJvdG9jb2wpXG4gICAgICB9IGVsc2UgaWYgKGFsYXJtLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBjb25zdCB1YSA9IHVzZXJBbGFybS5zb3J0KClcbiAgICAgICAgY29uc3Qga2EgPSBhbGFybS5zb3J0KClcbiAgICAgICAgY29uc3QgY29tcGFyZSA9IHVhLmV2ZXJ5KChlbCwgaW5kZXgpID0+IGVsLmFsYXJtU3RhdC5zb3J0KCkuam9pbignJykgIT09IGthW2luZGV4XS5hbGFybVN0YXQuc29ydCgpLmpvaW4oJycpKVxuICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgIGF3YWl0IGFwaS5wdXNoVGhyZXNob2xkKGFsYXJtU3RhdCwgJ0FsYXJtU3RhdCcsIHByb3RvY29sKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIOabtOaWsOeUqOaIt3RocmVhZOmFjee9rlxuICAgIHtcbiAgICAgIC8vIOavlOi+g+WQjeensGpvaW7mmK/lkKbkuIDoh7TvvIzkuIDoh7TnmoTor53mo4Dmn6XplK7mmK/lkKbkuIDoh7TvvIzkuI3kuIDoh7Tnm7TmjqXmm7TmlrDvvIzplK7kuIDoh7TliJnmr5TovoPlgLzvvIzlgLzkuI3kuIDoh7TkuZ/mm7TmlrBcbiAgICAgIGNvbnN0IHVzZXJUaHJlID0gdXNlcnNldHVwLlRocmVzaG9sZCB8fCBbXVxuICAgICAgY29uc3QgdGhyZSA9IFRocmVzaG9sZCB8fCBbXVxuICAgICAgY29uc3QgYjEgPSB1c2VyVGhyZS5tYXAoZWwgPT4gZWwubmFtZSkuc29ydCgpLmpvaW4oJycpICE9PSB0aHJlLm1hcChlbCA9PiBlbC5uYW1lKS5zb3J0KCkuam9pbignJylcbiAgICAgIGlmIChiMSkge1xuICAgICAgICBhd2FpdCBhcGkucHVzaFRocmVzaG9sZCh0aHJlLm1hcChlbCA9PiAoeyBuYW1lOiBlbC5uYW1lLCBtaW46IGVsLm1pbiwgbWF4OiBlbC5tYXggfSkpLCBcIlRocmVzaG9sZFwiLCBwcm90b2NvbClcbiAgICAgIH0gZWxzZSBpZiAodGhyZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgY29uc3QgdWEgPSB1c2VyVGhyZS5zb3J0KClcbiAgICAgICAgY29uc3Qga2EgPSB0aHJlLnNvcnQoKVxuICAgICAgICBjb25zdCBjb21wYXJlID0gdWEuZXZlcnkoKGVsLCBpbmRleCkgPT4gZWwubWluICE9PSBrYVtpbmRleF0ubWluIHx8IGVsLm1heCAhPT0ga2FbaW5kZXhdLm1heClcbiAgICAgICAgaWYgKGNvbXBhcmUpIHtcbiAgICAgICAgICBhd2FpdCBhcGkucHVzaFRocmVzaG9sZCh0aHJlLm1hcChlbCA9PiAoeyBuYW1lOiBlbC5uYW1lLCBtaW46IGVsLm1pbiwgbWF4OiBlbC5tYXggfSkpLCBcIlRocmVzaG9sZFwiLCBwcm90b2NvbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zYXZlU2V0dXAoKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLmdldFVzZXJQcm90b2NvbFNldHVwKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfVxufSkiXX0=