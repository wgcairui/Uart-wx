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
    allQuest: function () {
        var _this = this;
        wx.showModal({
            title: "Tips",
            content: "是否确认全部告警信息?",
            success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!res.confirm) return [3, 2];
                            wx.showLoading({ title: '确认告警信息' });
                            return [4, api_1.default.alarmConfirmed()];
                        case 1:
                            _a.sent();
                            wx.startPullDownRefresh();
                            wx.hideLoading();
                            _a.label = 2;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGFybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFvQztBQUNwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBdUI7UUFDOUIsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3BCO0lBS0QsTUFBTSxFQUFFOzs7OztnQkFDQSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtnQkFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksRUFBRSxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUc7aUJBQ3hCLENBQUMsQ0FBQTtnQkFDRixFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSxZQUFZO29CQUNqQixPQUFPLEVBQUUsVUFBQyxFQUFFO3dCQUNWLEtBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJO3lCQUNmLENBQUMsQ0FBQTt3QkFDRixFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxFQUFFLENBQUMs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LEVBQUUsTUFBTTtZQUNiLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLE9BQU8sRUFBRSxVQUFPLEdBQUc7Ozs7aUNBQ2IsR0FBRyxDQUFDLE9BQU8sRUFBWCxjQUFXOzRCQUNiLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTs0QkFDbkMsV0FBTSxhQUFHLENBQUMsY0FBYyxFQUFFLEVBQUE7OzRCQUExQixTQUEwQixDQUFBOzRCQUMxQixFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTs0QkFDekIsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7OztpQkFFbkI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUssaUJBQWlCOzs7OzRCQUNyQixXQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBQTs7d0JBQXpCLFNBQXlCLENBQUE7d0JBQ3pCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBOzs7OztLQUN6QjtJQUVELFVBQVUsRUFBVixVQUFXLElBQVk7UUFDckIsSUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUIsT0FBVSxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxTQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBSSxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxTQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUksQ0FBQTtJQUNySCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvYWxhcm0vYWxhcm0uanNcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgQWxhcm06IFtdIGFzIHVhcnRBbGFybU9iamVjdFtdLFxuICAgIGZpbHRlcjogJycsXG4gICAgZGF0ZTogJycsXG4gICAgZGF0ZVNob3c6IGZhbHNlLFxuICAgIG1pbkRhdGU6IG5ldyBEYXRlKDIwMjAsIDAsIDEpLmdldFRpbWUoKSxcbiAgICBtYXhEYXRlOiBEYXRlLm5vdygpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5mb3JtYXREYXRlKGRhdGUpXG4gICAgY29uc3QgZW5kID0gdGhpcy5mb3JtYXREYXRlKGRhdGUpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGRhdGU6IHN0YXJ0ICsgJy0nICsgZW5kXG4gICAgfSlcbiAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgIGtleTogJ2FsYXJtX2xpc3QnLFxuICAgICAgc3VjY2VzczogKGVsKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgQWxhcm06IGVsLmRhdGFcbiAgICAgICAgfSlcbiAgICAgICAgd3guc2V0VGFiQmFyQmFkZ2UoeyBpbmRleDogMSwgdGV4dDogdGhpcy5kYXRhLkFsYXJtLmZpbHRlcihlbCA9PiAhZWwuaXNPaykubGVuZ3RoLnRvU3RyaW5nKCkgfSlcbiAgICAgIH0sXG4gICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0QWxhcm1JbmZvKClcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDojrflj5blkYrorabkv6Hmga9cbiAgYXN5bmMgZ2V0QWxhcm1JbmZvKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3mlbDmja4nIH0pXG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gdGhpcy5kYXRhLmRhdGUuc3BsaXQoJy0nKVxuICAgIGNvbnN0IHsgb2ssIG1zZywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0QWxhcm0oc3RhcnQgKyAnIDAwOjAwOjAwJywgZW5kICsgXCIgMjM6NTk6NTlcIilcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKG9rKSB7XG4gICAgICBjb25zdCBBbGFybSA9IGFyZy5tYXAoZWwgPT4ge1xuICAgICAgICBlbC50aW1lID0gdGhpcy5mb3JtYXR0aW1lKGVsLnRpbWVTdGFtcClcbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9KVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgQWxhcm1cbiAgICAgIH0pXG4gICAgICB3eC5zZXRUYWJCYXJCYWRnZSh7IGluZGV4OiAxLCB0ZXh0OiBBbGFybS5maWx0ZXIoZWwgPT4gIWVsLmlzT2spLmxlbmd0aC50b1N0cmluZygpIH0pXG4gICAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAnYWxhcm1fbGlzdCcsIGRhdGE6IEFsYXJtIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5Y+R55Sf6ZSZ6K+vJyxcbiAgICAgICAgY29udGVudDogbXNnIHx8ICfmnKrnn6XplJnor68nXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g5pi+56S65pel5pyf6YCJ5oup5ZmoXG4gIHNob3dDYWxlbmRhcigpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGF0ZVNob3c6IHRydWVcbiAgICB9KVxuICB9LFxuICAvLyAg5YWz6Zet5pel5pyf6YCJ5oup5ZmoXG4gIG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5zZXREYXRhKHsgZGF0ZVNob3c6IGZhbHNlIH0pO1xuICB9LFxuICBmb3JtYXREYXRlKGRhdGU6IERhdGUpIHtcbiAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgcmV0dXJuIGAke2RhdGUuZ2V0RnVsbFllYXIoKX0vJHtkYXRlLmdldE1vbnRoKCkgKyAxfS8ke2RhdGUuZ2V0RGF0ZSgpfWA7XG4gIH0sXG4gIC8vIOehruWumuaXpeacn1xuICBvbkNvbmZpcm0oZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IGV2ZW50LmRldGFpbDtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGF0ZVNob3c6IGZhbHNlLFxuICAgICAgZGF0ZTogYCR7dGhpcy5mb3JtYXREYXRlKHN0YXJ0KX0gLSAke3RoaXMuZm9ybWF0RGF0ZShlbmQpfWAsXG4gICAgfSk7XG4gICAgdGhpcy5nZXRBbGFybUluZm8oKVxuICB9LFxuICAvLyDnoa7orqTlkYrorabkv6Hmga9cbiAgc2hvd2FsYXJtKGV2ZW50OiB2YW50RXZlbnQ8dWFydEFsYXJtT2JqZWN0Pikge1xuICAgIGNvbnN0IGFsYXJtID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lml0ZW1cbiAgICBjb25zdCBrZXkgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQua2V5IGFzIG51bWJlclxuXG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiBhbGFybS5kZXZOYW1lLFxuICAgICAgY29udGVudDogYWxhcm0ubXNnLFxuICAgICAgc2hvd0NhbmNlbDogIWFsYXJtLmlzT2ssXG4gICAgICAvLyBjb25maXJtQ29sb3I6ICdncmVlbicsXG4gICAgICBjb25maXJtVGV4dDogYWxhcm0uaXNPayA/ICfnoa7lrponIDogJ+ehruiupOa2iOaBrycsXG4gICAgICBzdWNjZXNzOiBhc3luYyAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSAmJiAhYWxhcm0uaXNPaykge1xuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfnoa7orqTlkYrorabkv6Hmga8nIH0pXG4gICAgICAgICAgYXdhaXQgYXBpLmFsYXJtQ29uZmlybWVkKGFsYXJtLl9pZClcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgW2BBbGFybVske2tleX1dLmlzT2tgXTogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgd3guc2V0VGFiQmFyQmFkZ2UoeyBpbmRleDogMSwgdGV4dDogdGhpcy5kYXRhLkFsYXJtLmZpbHRlcihlbCA9PiAhZWwuaXNPaykubGVuZ3RoLnRvU3RyaW5nKCkgfSlcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDlhajpg6jnoa7orqRcbiAgYWxsUXVlc3QoKSB7XG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiBcIlRpcHNcIixcbiAgICAgIGNvbnRlbnQ6IFwi5piv5ZCm56Gu6K6k5YWo6YOo5ZGK6K2m5L+h5oGvP1wiLFxuICAgICAgc3VjY2VzczogYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn56Gu6K6k5ZGK6K2m5L+h5oGvJyB9KVxuICAgICAgICAgIGF3YWl0IGFwaS5hbGFybUNvbmZpcm1lZCgpXG4gICAgICAgICAgd3guc3RhcnRQdWxsRG93blJlZnJlc2goKVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOS4i+aLieWIt+aWsFxuICBhc3luYyBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICBhd2FpdCB0aGlzLmdldEFsYXJtSW5mbygpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH1cbiAgLFxuICBmb3JtYXR0aW1lKHRpbWU6IG51bWJlcikge1xuICAgIGNvbnN0IERhdGVzID0gbmV3IERhdGUodGltZSlcbiAgICByZXR1cm4gYCR7RGF0ZXMuZ2V0TW9udGgoKSArIDF9LSR7RGF0ZXMuZ2V0RGF0ZSgpfSAke0RhdGVzLmdldEhvdXJzKCl9OiR7RGF0ZXMuZ2V0TWludXRlcygpfToke0RhdGVzLmdldFNlY29uZHMoKX1gXG4gIH1cbn0pIl19