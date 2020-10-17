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
        usersetup: {},
        syssetup: {},
        Protocols: {},
        alarmStat: [],
        Threshold: []
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
            wx.getStorage({
                key: 'protocolSetup' + options.protocol,
                success: function (res) {
                    _this.setData({
                        usersetup: res.data.user,
                        syssetup: res.data.sys,
                        Protocols: res.data.protocol
                    });
                    _this.mergeProtocolSetup();
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
                            this.mergeProtocolSetup();
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
    mergeProtocolSetup: function () {
        var _a = this.data, usersetup = _a.usersetup, syssetup = _a.syssetup;
        var user_alarmStatMap = usersetup.AlarmStat ? new Map(usersetup.AlarmStat.map(function (el) { return [el.name, el]; })) : new Map();
        var sys_alarmStatMap = new Map(syssetup.AlarmStat.map(function (el) { return [el.name, el]; }));
        sys_alarmStatMap.forEach(function (val, key) {
            if (!user_alarmStatMap.has(key))
                user_alarmStatMap.set(key, val);
        });
        var parse = this.parseProtocol();
        user_alarmStatMap.forEach(function (el, key) {
            el.parse = parse[key];
        });
        var user_ThresholdMap = usersetup.Threshold ? new Map(usersetup.Threshold.map(function (el) { return [el.name, el]; })) : new Map();
        var sys_ThresholdMap = new Map(syssetup.Threshold.map(function (el) { return [el.name, el]; }));
        sys_ThresholdMap.forEach(function (val, key) {
            if (!user_ThresholdMap.has(key))
                user_ThresholdMap.set(key, val);
        });
        this.setData({
            alarmStat: Array.from(user_alarmStatMap.values()),
            Threshold: Array.from(user_ThresholdMap.values())
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, ShowTag, alarmStat, Threshold, protocol, showtag, alarm, thre;
            return __generator(this, function (_b) {
                _a = this.data, ShowTag = _a.usersetup.ShowTag, alarmStat = _a.alarmStat, Threshold = _a.Threshold, protocol = _a.protocol;
                showtag = api_1.default.pushThreshold(ShowTag, 'ShowTag', protocol);
                alarm = api_1.default.pushThreshold(alarmStat, 'AlarmStat', protocol);
                thre = api_1.default.pushThreshold(Threshold.map(function (el) { return ({ name: el.name, min: el.min, max: el.max }); }), "Threshold", protocol);
                Promise.all([showtag, alarm, thre]).then(function (_res) {
                    var key = 'protocolSetup' + protocol;
                    wx.getStorage({
                        key: key,
                        success: function (_a) {
                            var data = _a.data;
                            data.user.ShowTag = ShowTag;
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
                    wx.showToast({
                        title: '修改用户设定成功'
                    });
                }).catch(function (_e) {
                    wx.showToast({
                        title: '上传用户设定失败，请稍后再试',
                        icon: "none"
                    });
                    wx.removeStorage({ key: 'protocolSetup' + protocol });
                });
                return [2];
            });
        });
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
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
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm1TZXR0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxhcm1TZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWdEO0FBQ2hELDBDQUFvQztBQUNwQyw0Q0FBc0Q7QUFHdEQsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUErQjtRQUMxQyxRQUFRLEVBQUUsRUFBK0I7UUFDekMsU0FBUyxFQUFFLEVBQWM7UUFDekIsU0FBUyxFQUFFLEVBQXlCO1FBQ3BDLFNBQVMsRUFBRSxFQUFpQjtLQUM3QjtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFBakIsaUJBMkJQO1FBMUJDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RDLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osR0FBRyxFQUFFLGlDQUFpQzthQUN2QyxDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLFVBQUE7YUFDVCxDQUFDLENBQUE7WUFDRixFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNaLEdBQUcsRUFBRSxlQUFlLEdBQUcsT0FBTyxDQUFDLFFBQVE7Z0JBQ3ZDLE9BQU8sRUFBRSxVQUFDLEdBQUc7b0JBQ1gsS0FBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxTQUFTLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN4QixRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUks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QUM7d0JBQ1gsS0FBSyxFQUFFLFVBQVU7cUJBQ2xCLENBQUMsQ0FBQTtnQkFDSixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxFQUFFO29CQUNULEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLGdCQUFnQjt3QkFDdkIsSUFBSSxFQUFFLE1BQU07cUJBQ2IsQ0FBQyxDQUFBO29CQUNGLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsZUFBZSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0JBQ3ZELENBQUMsQ0FBQyxDQUFBOzs7O0tBQ0g7SUFJRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBQ1IsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7UUFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUtELGlCQUFpQixFQUFFOzs7OzRCQUNqQixXQUFNLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFBOzt3QkFBakMsU0FBaUMsQ0FBQTt3QkFDakMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdW5pdENhY2hlIGZyb20gXCIuLi8uLi8uLi91dGlscy91bml0Q2FjaGVcIlxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IE9iamVjdFRvU3RycXVlcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5cbi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9hbGFybVNldHRpbmcuanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBhY3RpdmU6IDAsXG4gICAgcHJvdG9jb2w6ICcnLFxuICAgIHVzZXJzZXR1cDoge30gYXMgUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCxcbiAgICBzeXNzZXR1cDoge30gYXMgUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCxcbiAgICBQcm90b2NvbHM6IHt9IGFzIHByb3RvY29sLFxuICAgIGFsYXJtU3RhdDogW10gYXMgQ29uc3RhbnRBbGFybVN0YXRbXSxcbiAgICBUaHJlc2hvbGQ6IFtdIGFzIFRocmVzaG9sZFtdXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgY29uc3QgdHlwZSA9IE51bWJlcihvcHRpb25zLnR5cGUpIHx8IDBcbiAgICBjb25zdCBwcm90b2NvbCA9IG9wdGlvbnMucHJvdG9jb2xcbiAgICBpZiAoIXByb3RvY29sKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9pbmRleCdcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFjdGl2ZTogdHlwZSxcbiAgICAgICAgcHJvdG9jb2xcbiAgICAgIH0pXG4gICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAncHJvdG9jb2xTZXR1cCcgKyBvcHRpb25zLnByb3RvY29sLFxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHVzZXJzZXR1cDogcmVzLmRhdGEudXNlcixcbiAgICAgICAgICAgIHN5c3NldHVwOiByZXMuZGF0YS5zeXMsXG4gICAgICAgICAgICBQcm90b2NvbHM6IHJlcy5kYXRhLnByb3RvY29sXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLm1lcmdlUHJvdG9jb2xTZXR1cCgpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IChfZSkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0VXNlclByb3RvY29sU2V0dXAoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvLyDojrflj5bnlKjmiLfljY/orq7phY3nva5cbiAgYXN5bmMgZ2V0VXNlclByb3RvY29sU2V0dXAoKSB7XG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0VXNlckRldkNvbnN0YW50KHRoaXMuZGF0YS5wcm90b2NvbClcbiAgICBpZiAob2sgJiYgYXJnKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB1c2Vyc2V0dXA6IGFyZy51c2VyIHx8IHt9LFxuICAgICAgICBzeXNzZXR1cDogYXJnLnN5cyxcbiAgICAgICAgUHJvdG9jb2xzOiBhcmcucHJvdG9jb2xcbiAgICAgIH0pXG4gICAgICB0aGlzLm1lcmdlUHJvdG9jb2xTZXR1cCgpXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAncHJvdG9jb2xTZXR1cCcgKyB0aGlzLmRhdGEucHJvdG9jb2wsXG4gICAgICAgIGRhdGE6IGFyZ1xuICAgICAgfSlcblxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICBjb250ZW50OiAn5pyq5a6a5LmJ6YWN572uJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOWQiOW5tuWPguaVsOmZkOWAvO+8jOWPguaVsOeKtuaAgeiuvue9rlxuICBtZXJnZVByb3RvY29sU2V0dXAoKSB7XG4gICAgY29uc3QgeyB1c2Vyc2V0dXAsIHN5c3NldHVwIH0gPSB0aGlzLmRhdGFcbiAgICBjb25zdCB1c2VyX2FsYXJtU3RhdE1hcCA9IHVzZXJzZXR1cC5BbGFybVN0YXQgPyBuZXcgTWFwKHVzZXJzZXR1cC5BbGFybVN0YXQubWFwKGVsID0+IFtlbC5uYW1lLCBlbF0pKSA6IG5ldyBNYXAoKVxuICAgIGNvbnN0IHN5c19hbGFybVN0YXRNYXAgPSBuZXcgTWFwKHN5c3NldHVwLkFsYXJtU3RhdC5tYXAoZWwgPT4gW2VsLm5hbWUsIGVsXSkpXG4gICAgc3lzX2FsYXJtU3RhdE1hcC5mb3JFYWNoKCh2YWwsIGtleSkgPT4ge1xuICAgICAgaWYgKCF1c2VyX2FsYXJtU3RhdE1hcC5oYXMoa2V5KSkgdXNlcl9hbGFybVN0YXRNYXAuc2V0KGtleSwgdmFsKVxuICAgIH0pXG4gICAgY29uc3QgcGFyc2UgPSB0aGlzLnBhcnNlUHJvdG9jb2woKVxuICAgIHVzZXJfYWxhcm1TdGF0TWFwLmZvckVhY2goKGVsLCBrZXkpID0+IHtcbiAgICAgIGVsLnBhcnNlID0gcGFyc2Vba2V5XVxuICAgIH0pXG4gICAgLy8gXG4gICAgY29uc3QgdXNlcl9UaHJlc2hvbGRNYXAgPSB1c2Vyc2V0dXAuVGhyZXNob2xkID8gbmV3IE1hcCh1c2Vyc2V0dXAuVGhyZXNob2xkLm1hcChlbCA9PiBbZWwubmFtZSwgZWxdKSkgOiBuZXcgTWFwKClcbiAgICBjb25zdCBzeXNfVGhyZXNob2xkTWFwID0gbmV3IE1hcChzeXNzZXR1cC5UaHJlc2hvbGQubWFwKGVsID0+IFtlbC5uYW1lLCBlbF0pKVxuICAgIHN5c19UaHJlc2hvbGRNYXAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIGlmICghdXNlcl9UaHJlc2hvbGRNYXAuaGFzKGtleSkpIHVzZXJfVGhyZXNob2xkTWFwLnNldChrZXksIHZhbClcbiAgICB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhbGFybVN0YXQ6IEFycmF5LmZyb20odXNlcl9hbGFybVN0YXRNYXAudmFsdWVzKCkpLFxuICAgICAgVGhyZXNob2xkOiBBcnJheS5mcm9tKHVzZXJfVGhyZXNob2xkTWFwLnZhbHVlcygpKVxuICAgIH0pXG5cbiAgfSxcbiAgLy8g6L+U5Zue5Y2P6K6u5Y+C5pWw5a+56LGh6Kej5p6QXG4gIHBhcnNlUHJvdG9jb2woKSB7XG4gICAgY29uc3QgcHJvdG9jb2xBcnJheSA9IHRoaXMuZGF0YS5Qcm90b2NvbHMuaW5zdHJ1Y3QubWFwKGluc3RydWN0ID0+IHtcbiAgICAgIHJldHVybiBpbnN0cnVjdC5mb3JtUmVzaXplLm1hcChlbCA9PiAoeyBbZWwubmFtZV06IGVsLmlzU3RhdGUgPyB1bml0Q2FjaGUuZ2V0dW5pdE9iamVjdCgxLCBlbC51bml0IGFzIHN0cmluZykgOiB7fSB9KSlcbiAgICB9KS5yZWR1Y2UoKHByZSwgY3VyKSA9PiB7XG4gICAgICByZXR1cm4gWy4uLnByZSwgLi4uY3VyXVxuICAgIH0pXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLnByb3RvY29sQXJyYXkpIGFzIHsgW3g6IHN0cmluZ106IHsgW3g6IHN0cmluZ106IHN0cmluZyB9W10gfVxuICB9LFxuICAvLyDkv67mlLnmoIfpophcbiAgdGFiY2xpY2soZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiAn5Y2P6K6u6YWN572uLScgKyBldmVudC5kZXRhaWwudGl0bGUgfSlcbiAgfSxcbiAgLy8gIOebkeWQrOaYvuekuuWPguaVsOWPmOWMllxuICBhc3luYyBTaG93VGFnb25DaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHRhZ3MgPSBldmVudC5kZXRhaWwgYXMgc3RyaW5nW11cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgXCJ1c2Vyc2V0dXAuU2hvd1RhZ1wiOiB0YWdzXG4gICAgfSlcbiAgfSxcbiAgLy8g5L+u5pS55pi+56S65Y+C5pWw5Y+Y5YyW5YC8XG4gIFNob3dUYWd0b2dnbGUoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHsgaW5kZXggfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICBjb25zdCBjaGVja2JveCA9IHRoaXMuc2VsZWN0Q29tcG9uZW50KGAuY2hlY2tib3hlcy0ke2luZGV4fWApO1xuICAgIGNoZWNrYm94LnRvZ2dsZSgpO1xuICB9LFxuICAvLyDnm5HlkKzlj4LmlbDnirbmgIHlj5jljJZcbiAgYXN5bmMgQWxhcm1TdGF0b25DaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudDxDb25zdGFudEFsYXJtU3RhdD4pIHtcbiAgICBjb25zdCBpdGVtID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lml0ZW1cbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LmRldGFpbCBhcyBzdHJpbmdbXVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhLmFsYXJtU3RhdC5maW5kSW5kZXgoZWwgPT4gZWwubmFtZSA9PT0gaXRlbS5uYW1lKVxuICAgIC8vIHRoaXMuZGF0YS5hbGFybVN0YXRbaW5kZXhdLmFsYXJtU3RhdCA9IHZhbHVlXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFtcImFsYXJtU3RhdFtcIiArIGluZGV4ICsgXCJdLmFsYXJtU3RhdFwiXTogdmFsdWVcbiAgICB9KVxuICB9LFxuICAvLyDot7PovazliLDlj4LmlbDpmZDlgLzkv67mlLnpobXpnaJcbiAgVGhyZXNob2xkQ2xpY2soZXZlbnQ6IHZhbnRFdmVudDxUaHJlc2hvbGQ+KSB7XG4gICAgY29uc3QgaXRlbSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtXG4gICAgY29uc3QgaW5kZXggPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvdGhyZXNob2xkL3RocmVzaG9sZCcgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgLi4uaXRlbSB9KSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBtb2RpZnlUaHJlc2hvbGQ6IChkYXRhOiBUaHJlc2hvbGQpID0+IHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgW2BUaHJlc2hvbGRbJHtpbmRleH1dYF06IHsgLi4uZGF0YSwgaWNvbjogXCJzdGFyXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvL1xuICBhZGRUaHJlc2hvbGQoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2FkZFRocmVzaG9sZC9hZGRUaHJlc2hvbGQnICsgT2JqZWN0VG9TdHJxdWVyeSh7IHByb3RvY29sOiB0aGlzLmRhdGEucHJvdG9jb2wgfSksXG4gICAgICBldmVudHM6IHtcbiAgICAgICAgYWRkVGhyZXNob2xkOiAoZGF0YTogVGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3VGhyZSA9IHRoaXMuZGF0YS5UaHJlc2hvbGQuY29uY2F0KGRhdGEpXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIFRocmVzaG9sZDogbmV3VGhyZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDkv53lrZjphY3nva5cbiAgYXN5bmMgc2F2ZVNldHVwKCkge1xuICAgIGNvbnN0IHsgdXNlcnNldHVwOiB7IFNob3dUYWcgfSwgYWxhcm1TdGF0LCBUaHJlc2hvbGQsIHByb3RvY29sIH0gPSB0aGlzLmRhdGFcbiAgICBjb25zdCBzaG93dGFnID0gYXBpLnB1c2hUaHJlc2hvbGQoU2hvd1RhZywgJ1Nob3dUYWcnLCBwcm90b2NvbClcbiAgICBjb25zdCBhbGFybSA9IGFwaS5wdXNoVGhyZXNob2xkKGFsYXJtU3RhdCwgJ0FsYXJtU3RhdCcsIHByb3RvY29sKVxuICAgIGNvbnN0IHRocmUgPSBhcGkucHVzaFRocmVzaG9sZChUaHJlc2hvbGQubWFwKGVsID0+ICh7IG5hbWU6IGVsLm5hbWUsIG1pbjogZWwubWluLCBtYXg6IGVsLm1heCB9KSksIFwiVGhyZXNob2xkXCIsIHByb3RvY29sKVxuICAgIFByb21pc2UuYWxsKFtzaG93dGFnLCBhbGFybSwgdGhyZV0pLnRoZW4oX3JlcyA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAncHJvdG9jb2xTZXR1cCcgKyBwcm90b2NvbFxuICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgIGtleSxcbiAgICAgICAgc3VjY2Vzcyh7IGRhdGEgfTogeyBkYXRhOiB7IHVzZXI6IFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsIHN5czogUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCwgcHJvdG9jb2w6IHByb3RvY29sIH0gfSkge1xuICAgICAgICAgIGRhdGEudXNlci5TaG93VGFnID0gU2hvd1RhZ1xuICAgICAgICAgIGRhdGEudXNlci5BbGFybVN0YXQgPSBhbGFybVN0YXRcbiAgICAgICAgICBkYXRhLnVzZXIuVGhyZXNob2xkID0gVGhyZXNob2xkXG4gICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICAgICAgd3gucmVtb3ZlU3RvcmFnZSh7IGtleSB9KVxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogXCLkv53lrZjlpLHotKVcIiB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+S/ruaUueeUqOaIt+iuvuWumuaIkOWKnydcbiAgICAgIH0pXG4gICAgfSkuY2F0Y2goX2UgPT4ge1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfkuIrkvKDnlKjmiLforr7lrprlpLHotKXvvIzor7fnqI3lkI7lho3or5UnLFxuICAgICAgICBpY29uOiBcIm5vbmVcIlxuICAgICAgfSlcbiAgICAgIHd4LnJlbW92ZVN0b3JhZ2UoeyBrZXk6ICdwcm90b2NvbFNldHVwJyArIHByb3RvY29sIH0pXG4gICAgfSlcbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgLy90aGlzLnNhdmVTZXR1cCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2F2ZVNldHVwKClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRVc2VyUHJvdG9jb2xTZXR1cCgpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==