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
    onShow: function () {
        wx.startPullDownRefresh();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGFybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFvQztBQUNwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBdUI7UUFDOUIsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3BCO0lBS0QsTUFBTSxFQUFFOzs7OztnQkFDQSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtnQkFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksRUFBRSxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUc7aUJBQ3hCLENBQUMsQ0FBQTtnQkFDRixFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSxZQUFZO29CQUNqQixPQUFPLEVBQUUsVUFBQyxFQUFFO3dCQUNWLEtBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJO3lCQUNmLENBQUMsQ0FBQTt3QkFDRixFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFSLENBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7b0JBQ2pHLENBQUM7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtvQkFDckIsQ0FBQztpQkFDRixDQUFDLENBQUE7Ozs7S0FDSDtJQUVLLFlBQVk7Ozs7Ozs7d0JBQ2hCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTt3QkFDM0IsS0FBZSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXZDLEtBQUssUUFBQSxFQUFFLEdBQUcsUUFBQSxDQUE2Qjt3QkFDckIsV0FBTSxhQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLEVBQUUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxFQUFBOzt3QkFBN0UsS0FBbUIsU0FBMEQsRUFBM0UsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNwQixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7d0JBQ2hCLElBQUksRUFBRSxFQUFFOzRCQUNBLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRTtnQ0FDdEIsRUFBRSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQ0FDdkMsT0FBTyxFQUFFLENBQUE7NEJBQ1gsQ0FBQyxDQUFDLENBQUE7NEJBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxLQUFLLE9BQUE7NkJBQ04sQ0FBQyxDQUFBOzRCQUNGLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFSLENBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7NEJBQ3JGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO3lCQUNsRDs2QkFBTTs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxNQUFNO2dDQUNiLE9BQU8sRUFBRSxHQUFHLElBQUksTUFBTTs2QkFDdkIsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxVQUFVLEVBQVYsVUFBVyxJQUFVO1FBQ25CLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFVLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFJLElBQUksQ0FBQyxPQUFPLEVBQUksQ0FBQztJQUMxRSxDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsS0FBVTtRQUNaLElBQUEsaUJBQTJCLEVBQTFCLGFBQUssRUFBRSxXQUFtQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFHO1NBQzVELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsS0FBaUM7UUFBM0MsaUJBc0JDO1FBckJDLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUM5QyxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFhLENBQUE7UUFFckQsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNYLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTztZQUNwQixPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDbEIsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUk7WUFFdkIsV0FBVyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUN2QyxPQUFPLEVBQUUsVUFBTyxHQUFHOzs7OztpQ0FDYixDQUFBLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBLEVBQTFCLGNBQTBCOzRCQUM1QixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7NEJBQ25DLFdBQU0sYUFBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUE7OzRCQUFuQyxTQUFtQyxDQUFBOzRCQUNuQyxJQUFJLENBQUMsT0FBTztnQ0FDVixHQUFDLFdBQVMsR0FBRyxXQUFRLElBQUcsSUFBSTtvQ0FDNUIsQ0FBQTs0QkFDRixFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFSLENBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7NEJBQy9GLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTs7Ozs7aUJBRW5CO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFFBQVE7UUFBUixpQkFhQztRQVpDLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDWCxLQUFLLEVBQUUsTUFBTTtZQUNiLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLE9BQU8sRUFBRSxVQUFPLEdBQUc7Ozs7aUNBQ2IsR0FBRyxDQUFDLE9BQU8sRUFBWCxjQUFXOzRCQUNiLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTs0QkFDbkMsV0FBTSxhQUFHLENBQUMsY0FBYyxFQUFFLEVBQUE7OzRCQUExQixTQUEwQixDQUFBOzRCQUMxQixFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTs0QkFDekIsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBOzs7OztpQkFFbkI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFBO0lBQzNCLENBQUM7SUFFSyxpQkFBaUI7Ozs7NEJBQ3JCLFdBQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFBOzt3QkFBekIsU0FBeUIsQ0FBQTt3QkFDekIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0lBRUQsVUFBVSxFQUFWLFVBQVcsSUFBWTtRQUNyQixJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixPQUFVLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFNBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBSSxLQUFLLENBQUMsVUFBVSxFQUFFLFNBQUksS0FBSyxDQUFDLFVBQVUsRUFBSSxDQUFBO0lBQ3JILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybS9hbGFybS5qc1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBBbGFybTogW10gYXMgdWFydEFsYXJtT2JqZWN0W10sXG4gICAgZmlsdGVyOiAnJyxcbiAgICBkYXRlOiAnJyxcbiAgICBkYXRlU2hvdzogZmFsc2UsXG4gICAgbWluRGF0ZTogbmV3IERhdGUoMjAyMCwgMCwgMSkuZ2V0VGltZSgpLFxuICAgIG1heERhdGU6IERhdGUubm93KClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLmZvcm1hdERhdGUoZGF0ZSlcbiAgICBjb25zdCBlbmQgPSB0aGlzLmZvcm1hdERhdGUoZGF0ZSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGF0ZTogc3RhcnQgKyAnLScgKyBlbmRcbiAgICB9KVxuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnYWxhcm1fbGlzdCcsXG4gICAgICBzdWNjZXNzOiAoZWwpID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBBbGFybTogZWwuZGF0YVxuICAgICAgICB9KVxuICAgICAgICB3eC5zZXRUYWJCYXJCYWRnZSh7IGluZGV4OiAxLCB0ZXh0OiB0aGlzLmRhdGEuQWxhcm0uZmlsdGVyKGVsID0+ICFlbC5pc09rKS5sZW5ndGgudG9TdHJpbmcoKSB9KVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRBbGFybUluZm8oKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOiOt+WPluWRiuitpuS/oeaBr1xuICBhc3luYyBnZXRBbGFybUluZm8oKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+WKoOi9veaVsOaNricgfSlcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSB0aGlzLmRhdGEuZGF0ZS5zcGxpdCgnLScpXG4gICAgY29uc3QgeyBvaywgbXNnLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXRBbGFybShzdGFydCArICcgMDA6MDA6MDAnLCBlbmQgKyBcIiAyMzo1OTo1OVwiKVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICBpZiAob2spIHtcbiAgICAgIGNvbnN0IEFsYXJtID0gYXJnLm1hcChlbCA9PiB7XG4gICAgICAgIGVsLnRpbWUgPSB0aGlzLmZvcm1hdHRpbWUoZWwudGltZVN0YW1wKVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBBbGFybVxuICAgICAgfSlcbiAgICAgIHd4LnNldFRhYkJhckJhZGdlKHsgaW5kZXg6IDEsIHRleHQ6IEFsYXJtLmZpbHRlcihlbCA9PiAhZWwuaXNPaykubGVuZ3RoLnRvU3RyaW5nKCkgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2UoeyBrZXk6ICdhbGFybV9saXN0JywgZGF0YTogQWxhcm0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflj5HnlJ/plJnor68nLFxuICAgICAgICBjb250ZW50OiBtc2cgfHwgJ+acquefpemUmeivrydcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDmmL7npLrml6XmnJ/pgInmi6nlmahcbiAgc2hvd0NhbGVuZGFyKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlU2hvdzogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIC8vICDlhbPpl63ml6XmnJ/pgInmi6nlmahcbiAgb25DbG9zZSgpIHtcbiAgICB0aGlzLnNldERhdGEoeyBkYXRlU2hvdzogZmFsc2UgfSk7XG4gIH0sXG4gIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS8ke2RhdGUuZ2V0TW9udGgoKSArIDF9LyR7ZGF0ZS5nZXREYXRlKCl9YDtcbiAgfSxcbiAgLy8g56Gu5a6a5pel5pyfXG4gIG9uQ29uZmlybShldmVudDogYW55KSB7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gZXZlbnQuZGV0YWlsO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlU2hvdzogZmFsc2UsXG4gICAgICBkYXRlOiBgJHt0aGlzLmZvcm1hdERhdGUoc3RhcnQpfSAtICR7dGhpcy5mb3JtYXREYXRlKGVuZCl9YCxcbiAgICB9KTtcbiAgICB0aGlzLmdldEFsYXJtSW5mbygpXG4gIH0sXG4gIC8vIOehruiupOWRiuitpuS/oeaBr1xuICBzaG93YWxhcm0oZXZlbnQ6IHZhbnRFdmVudDx1YXJ0QWxhcm1PYmplY3Q+KSB7XG4gICAgY29uc3QgYWxhcm0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIGNvbnN0IGtleSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5rZXkgYXMgbnVtYmVyXG5cbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6IGFsYXJtLmRldk5hbWUsXG4gICAgICBjb250ZW50OiBhbGFybS5tc2csXG4gICAgICBzaG93Q2FuY2VsOiAhYWxhcm0uaXNPayxcbiAgICAgIC8vIGNvbmZpcm1Db2xvcjogJ2dyZWVuJyxcbiAgICAgIGNvbmZpcm1UZXh0OiBhbGFybS5pc09rID8gJ+ehruWumicgOiAn56Gu6K6k5raI5oGvJyxcbiAgICAgIHN1Y2Nlc3M6IGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5jb25maXJtICYmICFhbGFybS5pc09rKSB7XG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+ehruiupOWRiuitpuS/oeaBrycgfSlcbiAgICAgICAgICBhd2FpdCBhcGkuYWxhcm1Db25maXJtZWQoYWxhcm0uX2lkKVxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBbYEFsYXJtWyR7a2V5fV0uaXNPa2BdOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB3eC5zZXRUYWJCYXJCYWRnZSh7IGluZGV4OiAxLCB0ZXh0OiB0aGlzLmRhdGEuQWxhcm0uZmlsdGVyKGVsID0+ICFlbC5pc09rKS5sZW5ndGgudG9TdHJpbmcoKSB9KVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOWFqOmDqOehruiupFxuICBhbGxRdWVzdCgpIHtcbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6IFwiVGlwc1wiLFxuICAgICAgY29udGVudDogXCLmmK/lkKbnoa7orqTlhajpg6jlkYrorabkv6Hmga8/XCIsXG4gICAgICBzdWNjZXNzOiBhc3luYyAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfnoa7orqTlkYrorabkv6Hmga8nIH0pXG4gICAgICAgICAgYXdhaXQgYXBpLmFsYXJtQ29uZmlybWVkKClcbiAgICAgICAgICB3eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBvblNob3coKSB7XG4gICAgd3guc3RhcnRQdWxsRG93blJlZnJlc2goKVxuICB9LFxuICAvLyDkuIvmi4nliLfmlrBcbiAgYXN5bmMgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgYXdhaXQgdGhpcy5nZXRBbGFybUluZm8oKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9XG4gICxcbiAgZm9ybWF0dGltZSh0aW1lOiBudW1iZXIpIHtcbiAgICBjb25zdCBEYXRlcyA9IG5ldyBEYXRlKHRpbWUpXG4gICAgcmV0dXJuIGAke0RhdGVzLmdldE1vbnRoKCkgKyAxfS0ke0RhdGVzLmdldERhdGUoKX0gJHtEYXRlcy5nZXRIb3VycygpfToke0RhdGVzLmdldE1pbnV0ZXMoKX06JHtEYXRlcy5nZXRTZWNvbmRzKCl9YFxuICB9XG59KSJdfQ==