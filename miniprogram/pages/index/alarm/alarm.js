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
var api_1 = require("../../../utils/api");
Page({
    data: {
        Alarm: [],
        filter: '',
        date: '',
        dateShow: false,
        minDate: new Date(2020, 0, 1).getTime(),
        maxDate: Date.now()
    },
    onLoad: function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, start, end;
            var _this = this;
            return __generator(this, function (_a) {
                date = new Date();
                start = this.formatDate(date);
                end = this.formatDate(date);
                this.setData({
                    date: start + '-' + end
                });
                wx.getStorage({
                    key: 'alarm_list',
                    success: function (el) {
                        _this.setData({
                            Alarm: el.data
                        });
                        wx.setTabBarBadge({ index: 1, text: _this.data.Alarm.filter(function (el) { return !el.isOk; }).length.toString() });
                    },
                    fail: function () {
                        _this.getAlarmInfo();
                    }
                });
                return [2];
            });
        });
    },
    getAlarmInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, start, end, _b, ok, msg, arg, Alarm;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        wx.showLoading({ title: '加载数据' });
                        _a = this.data.date.split('-'), start = _a[0], end = _a[1];
                        return [4, api_1.default.getAlarm(start + ' 00:00:00', end + " 23:59:59")];
                    case 1:
                        _b = _c.sent(), ok = _b.ok, msg = _b.msg, arg = _b.arg;
                        wx.hideLoading();
                        if (ok) {
                            Alarm = arg.map(function (el) {
                                el.time = _this.formattime(el.timeStamp);
                                return el;
                            });
                            this.setData({
                                Alarm: Alarm
                            });
                            wx.setTabBarBadge({ index: 1, text: Alarm.filter(function (el) { return !el.isOk; }).length.toString() });
                            wx.setStorage({ key: 'alarm_list', data: Alarm });
                        }
                        else {
                            wx.showModal({
                                title: '发生错误',
                                content: msg || '未知错误'
                            });
                        }
                        return [2];
                }
            });
        });
    },
    showCalendar: function () {
        this.setData({
            dateShow: true
        });
    },
    onClose: function () {
        this.setData({ dateShow: false });
    },
    formatDate: function (date) {
        date = new Date(date);
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    },
    onConfirm: function (event) {
        var _a = event.detail, start = _a[0], end = _a[1];
        this.setData({
            dateShow: false,
            date: this.formatDate(start) + " - " + this.formatDate(end),
        });
        this.getAlarmInfo();
    },
    showalarm: function (event) {
        var _this = this;
        var alarm = event.currentTarget.dataset.item;
        var key = event.currentTarget.dataset.key;
        wx.showModal({
            title: alarm.devName,
            content: alarm.msg,
            showCancel: !alarm.isOk,
            confirmText: alarm.isOk ? '确定' : '确认消息',
            success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(res.confirm && !alarm.isOk)) return [3, 2];
                            wx.showLoading({ title: '确认告警信息' });
                            return [4, api_1.default.alarmConfirmed(alarm._id)];
                        case 1:
                            _b.sent();
                            this.setData((_a = {},
                                _a["Alarm[" + key + "].isOk"] = true,
                                _a));
                            wx.setTabBarBadge({ index: 1, text: this.data.Alarm.filter(function (el) { return !el.isOk; }).length.toString() });
                            wx.hideLoading();
                            _b.label = 2;
                        case 2: return [2];
                    }
                });
            }); }
        });
    },
    onPullDownRefresh: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getAlarmInfo()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    },
    formattime: function (time) {
        var Dates = new Date(time);
        return Dates.getMonth() + 1 + "-" + Dates.getDate() + " " + Dates.getHours() + ":" + Dates.getMinutes() + ":" + Dates.getSeconds();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGFybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFvQztBQUNwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBdUI7UUFDOUIsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3BCO0lBS0QsTUFBTSxFQUFFOzs7OztnQkFDQSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtnQkFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksRUFBRSxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUc7aUJBQ3hCLENBQUMsQ0FBQTtnQkFDRixFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSxZQUFZO29CQUNqQixPQUFPLEVBQUUsVUFBQyxFQUFFO3dCQUNWLEtBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJO3lCQUNmLENBQUMsQ0FBQTt3QkFDRixFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxFQUFFLENBQUMs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QUF6QixTQUF5QixDQUFBO3dCQUN6QixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7SUFFRCxVQUFVLEVBQVYsVUFBVyxJQUFZO1FBQ3JCLElBQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLE9BQVUsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsU0FBSSxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUUsU0FBSSxLQUFLLENBQUMsVUFBVSxFQUFJLENBQUE7SUFDckgsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2FsYXJtL2FsYXJtLmpzXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIEFsYXJtOiBbXSBhcyB1YXJ0QWxhcm1PYmplY3RbXSxcbiAgICBmaWx0ZXI6ICcnLFxuICAgIGRhdGU6ICcnLFxuICAgIGRhdGVTaG93OiBmYWxzZSxcbiAgICBtaW5EYXRlOiBuZXcgRGF0ZSgyMDIwLCAwLCAxKS5nZXRUaW1lKCksXG4gICAgbWF4RGF0ZTogRGF0ZS5ub3coKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuZm9ybWF0RGF0ZShkYXRlKVxuICAgIGNvbnN0IGVuZCA9IHRoaXMuZm9ybWF0RGF0ZShkYXRlKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlOiBzdGFydCArICctJyArIGVuZFxuICAgIH0pXG4gICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICBrZXk6ICdhbGFybV9saXN0JyxcbiAgICAgIHN1Y2Nlc3M6IChlbCkgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIEFsYXJtOiBlbC5kYXRhXG4gICAgICAgIH0pXG4gICAgICAgIHd4LnNldFRhYkJhckJhZGdlKHsgaW5kZXg6IDEsIHRleHQ6IHRoaXMuZGF0YS5BbGFybS5maWx0ZXIoZWwgPT4gIWVsLmlzT2spLmxlbmd0aC50b1N0cmluZygpIH0pXG4gICAgICB9LFxuICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICB0aGlzLmdldEFsYXJtSW5mbygpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g6I635Y+W5ZGK6K2m5L+h5oGvXG4gIGFzeW5jIGdldEFsYXJtSW5mbygpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295pWw5o2uJyB9KVxuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHRoaXMuZGF0YS5kYXRlLnNwbGl0KCctJylcbiAgICBjb25zdCB7IG9rLCBtc2csIGFyZyB9ID0gYXdhaXQgYXBpLmdldEFsYXJtKHN0YXJ0ICsgJyAwMDowMDowMCcsIGVuZCArIFwiIDIzOjU5OjU5XCIpXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIGlmIChvaykge1xuICAgICAgY29uc3QgQWxhcm0gPSBhcmcubWFwKGVsID0+IHtcbiAgICAgICAgZWwudGltZSA9IHRoaXMuZm9ybWF0dGltZShlbC50aW1lU3RhbXApXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIEFsYXJtXG4gICAgICB9KVxuICAgICAgd3guc2V0VGFiQmFyQmFkZ2UoeyBpbmRleDogMSwgdGV4dDogQWxhcm0uZmlsdGVyKGVsID0+ICFlbC5pc09rKS5sZW5ndGgudG9TdHJpbmcoKSB9KVxuICAgICAgd3guc2V0U3RvcmFnZSh7IGtleTogJ2FsYXJtX2xpc3QnLCBkYXRhOiBBbGFybSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WPkeeUn+mUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IG1zZyB8fCAn5pyq55+l6ZSZ6K+vJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOaYvuekuuaXpeacn+mAieaLqeWZqFxuICBzaG93Q2FsZW5kYXIoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGRhdGVTaG93OiB0cnVlXG4gICAgfSlcbiAgfSxcbiAgLy8gIOWFs+mXreaXpeacn+mAieaLqeWZqFxuICBvbkNsb3NlKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7IGRhdGVTaG93OiBmYWxzZSB9KTtcbiAgfSxcbiAgZm9ybWF0RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LyR7ZGF0ZS5nZXRNb250aCgpICsgMX0vJHtkYXRlLmdldERhdGUoKX1gO1xuICB9LFxuICAvLyDnoa7lrprml6XmnJ9cbiAgb25Db25maXJtKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBldmVudC5kZXRhaWw7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGRhdGVTaG93OiBmYWxzZSxcbiAgICAgIGRhdGU6IGAke3RoaXMuZm9ybWF0RGF0ZShzdGFydCl9IC0gJHt0aGlzLmZvcm1hdERhdGUoZW5kKX1gLFxuICAgIH0pO1xuICAgIHRoaXMuZ2V0QWxhcm1JbmZvKClcbiAgfSxcbiAgLy8g56Gu6K6k5ZGK6K2m5L+h5oGvXG4gIHNob3dhbGFybShldmVudDogdmFudEV2ZW50PHVhcnRBbGFybU9iamVjdD4pIHtcbiAgICBjb25zdCBhbGFybSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtXG4gICAgY29uc3Qga2V5ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleSBhcyBudW1iZXJcblxuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogYWxhcm0uZGV2TmFtZSxcbiAgICAgIGNvbnRlbnQ6IGFsYXJtLm1zZyxcbiAgICAgIHNob3dDYW5jZWw6ICFhbGFybS5pc09rLFxuICAgICAgLy8gY29uZmlybUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgY29uZmlybVRleHQ6IGFsYXJtLmlzT2sgPyAn56Gu5a6aJyA6ICfnoa7orqTmtojmga8nLFxuICAgICAgc3VjY2VzczogYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0gJiYgIWFsYXJtLmlzT2spIHtcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn56Gu6K6k5ZGK6K2m5L+h5oGvJyB9KVxuICAgICAgICAgIGF3YWl0IGFwaS5hbGFybUNvbmZpcm1lZChhbGFybS5faWQpXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIFtgQWxhcm1bJHtrZXl9XS5pc09rYF06IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHd4LnNldFRhYkJhckJhZGdlKHsgaW5kZXg6IDEsIHRleHQ6IHRoaXMuZGF0YS5BbGFybS5maWx0ZXIoZWwgPT4gIWVsLmlzT2spLmxlbmd0aC50b1N0cmluZygpIH0pXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g5LiL5ouJ5Yi35pawXG4gIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIGF3YWl0IHRoaXMuZ2V0QWxhcm1JbmZvKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfVxuICAsXG4gIGZvcm1hdHRpbWUodGltZTogbnVtYmVyKSB7XG4gICAgY29uc3QgRGF0ZXMgPSBuZXcgRGF0ZSh0aW1lKVxuICAgIHJldHVybiBgJHtEYXRlcy5nZXRNb250aCgpICsgMX0tJHtEYXRlcy5nZXREYXRlKCl9ICR7RGF0ZXMuZ2V0SG91cnMoKX06JHtEYXRlcy5nZXRNaW51dGVzKCl9OiR7RGF0ZXMuZ2V0U2Vjb25kcygpfWBcbiAgfVxufSkiXX0=