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
                        _a = this.data.date.split('-'), start = _a[0], end = _a[1];
                        return [4, api_1.default.getAlarm(start + ' 00:00:00', end + " 23:59:59")];
                    case 1:
                        _b = _c.sent(), ok = _b.ok, msg = _b.msg, arg = _b.arg;
                        if (ok) {
                            Alarm = arg.map(function (el) {
                                el.time = _this.formattime(el.timeStamp);
                                return el;
                            });
                            this.setData({
                                Alarm: Alarm
                            });
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
    },
    showalarm: function (event) {
        var _this = this;
        var alarm = event.currentTarget.dataset.item;
        wx.showModal({
            title: alarm.devName,
            content: alarm.msg,
            showCancel: !alarm.isOk,
            confirmColor: 'green',
            confirmText: alarm.isOk ? '确定' : '确认消息',
            success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(res.confirm && !alarm.isOk)) return [3, 2];
                            return [4, api_1.default.alarmConfirmed(alarm._id)];
                        case 1:
                            _a.sent();
                            wx.startPullDownRefresh();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGFybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFvQztBQUNwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBdUI7UUFDOUIsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3BCO0lBS0QsTUFBTSxFQUFFOzs7OztnQkFDQSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtnQkFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksRUFBRSxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUc7aUJBQ3hCLENBQUMsQ0FBQTtnQkFDRixFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSxZQUFZO29CQUNqQixPQUFPLEVBQUUsVUFBQyxFQUFFO3dCQUNWLEtBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJO3lCQUNmLENBQUMsQ0FBQTtvQkFDSixDQUFDO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7b0JBQ3JCLENBQUM7aUJBQ0YsQ0FBQyxDQUFBOzs7O0tBQ0g7SUFFSyxZQUFZOzs7Ozs7O3dCQUNWLEtBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUF2QyxLQUFLLFFBQUEsRUFBRSxHQUFHLFFBQUEsQ0FBNkI7d0JBQ3JCLFdBQU0sYUFBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsV0FBVyxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsRUFBQTs7d0JBQTdFLEtBQW1CLFNBQTBELEVBQTNFLEVBQUUsUUFBQSxFQUFFLEdBQUcsU0FBQSxFQUFFLEdBQUcsU0FBQTt3QkFDcEIsSUFBSSxFQUFFLEVBQUU7NEJBQ0EsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFO2dDQUN0QixFQUFFLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dDQUN2QyxPQUFPLEVBQUUsQ0FBQTs0QkFDWCxDQUFDLENBQUMsQ0FBQTs0QkFDRixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLEtBQUssT0FBQTs2QkFDTixDQUFDLENBQUE7NEJBQ0YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7eUJBQ2xEOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsT0FBTyxFQUFFLEdBQUcsSUFBSSxNQUFNOzZCQUN2QixDQUFDLENBQUE7eUJBQ0g7Ozs7O0tBQ0Y7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELFVBQVUsRUFBVixVQUFXLElBQVU7UUFDbkIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLE9BQVUsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQUksSUFBSSxDQUFDLE9BQU8sRUFBSSxDQUFDO0lBQzFFLENBQUM7SUFFRCxTQUFTLEVBQVQsVUFBVSxLQUFVO1FBQ1osSUFBQSxpQkFBMkIsRUFBMUIsYUFBSyxFQUFFLFdBQW1CLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUc7U0FDNUQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFNBQVMsRUFBVCxVQUFVLEtBQWlDO1FBQTNDLGlCQWVDO1FBZEMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQzlDLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDWCxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDcEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2xCLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ3ZCLFlBQVksRUFBRSxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDdkMsT0FBTyxFQUFFLFVBQU8sR0FBRzs7OztpQ0FDYixDQUFBLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBLEVBQTFCLGNBQTBCOzRCQUM1QixXQUFNLGFBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFBOzs0QkFBbkMsU0FBbUMsQ0FBQTs0QkFDbkMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUE7Ozs7O2lCQUU1QjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxpQkFBaUI7Ozs7NEJBQ3JCLFdBQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFBOzt3QkFBekIsU0FBeUIsQ0FBQTt3QkFDekIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0lBRUQsVUFBVSxFQUFWLFVBQVcsSUFBWTtRQUNyQixJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixPQUFVLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFNBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBSSxLQUFLLENBQUMsVUFBVSxFQUFFLFNBQUksS0FBSyxDQUFDLFVBQVUsRUFBSSxDQUFBO0lBQ3JILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybS9hbGFybS5qc1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBBbGFybTogW10gYXMgdWFydEFsYXJtT2JqZWN0W10sXG4gICAgZmlsdGVyOiAnJyxcbiAgICBkYXRlOiAnJyxcbiAgICBkYXRlU2hvdzogZmFsc2UsXG4gICAgbWluRGF0ZTogbmV3IERhdGUoMjAyMCwgMCwgMSkuZ2V0VGltZSgpLFxuICAgIG1heERhdGU6IERhdGUubm93KClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLmZvcm1hdERhdGUoZGF0ZSlcbiAgICBjb25zdCBlbmQgPSB0aGlzLmZvcm1hdERhdGUoZGF0ZSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGF0ZTogc3RhcnQgKyAnLScgKyBlbmRcbiAgICB9KVxuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnYWxhcm1fbGlzdCcsXG4gICAgICBzdWNjZXNzOiAoZWwpID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBBbGFybTogZWwuZGF0YVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRBbGFybUluZm8oKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOiOt+WPluWRiuitpuS/oeaBr1xuICBhc3luYyBnZXRBbGFybUluZm8oKSB7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gdGhpcy5kYXRhLmRhdGUuc3BsaXQoJy0nKVxuICAgIGNvbnN0IHsgb2ssIG1zZywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0QWxhcm0oc3RhcnQgKyAnIDAwOjAwOjAwJywgZW5kICsgXCIgMjM6NTk6NTlcIilcbiAgICBpZiAob2spIHtcbiAgICAgIGNvbnN0IEFsYXJtID0gYXJnLm1hcChlbCA9PiB7XG4gICAgICAgIGVsLnRpbWUgPSB0aGlzLmZvcm1hdHRpbWUoZWwudGltZVN0YW1wKVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBBbGFybVxuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2UoeyBrZXk6ICdhbGFybV9saXN0JywgZGF0YTogQWxhcm0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflj5HnlJ/plJnor68nLFxuICAgICAgICBjb250ZW50OiBtc2cgfHwgJ+acquefpemUmeivrydcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDmmL7npLrml6XmnJ/pgInmi6nlmahcbiAgc2hvd0NhbGVuZGFyKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlU2hvdzogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIC8vICDlhbPpl63ml6XmnJ/pgInmi6nlmahcbiAgb25DbG9zZSgpIHtcbiAgICB0aGlzLnNldERhdGEoeyBkYXRlU2hvdzogZmFsc2UgfSk7XG4gIH0sXG4gIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS8ke2RhdGUuZ2V0TW9udGgoKSArIDF9LyR7ZGF0ZS5nZXREYXRlKCl9YDtcbiAgfSxcbiAgLy8g56Gu5a6a5pel5pyfXG4gIG9uQ29uZmlybShldmVudDogYW55KSB7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gZXZlbnQuZGV0YWlsO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlU2hvdzogZmFsc2UsXG4gICAgICBkYXRlOiBgJHt0aGlzLmZvcm1hdERhdGUoc3RhcnQpfSAtICR7dGhpcy5mb3JtYXREYXRlKGVuZCl9YCxcbiAgICB9KTtcbiAgfSxcblxuICBzaG93YWxhcm0oZXZlbnQ6IHZhbnRFdmVudDx1YXJ0QWxhcm1PYmplY3Q+KSB7XG4gICAgY29uc3QgYWxhcm0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogYWxhcm0uZGV2TmFtZSxcbiAgICAgIGNvbnRlbnQ6IGFsYXJtLm1zZyxcbiAgICAgIHNob3dDYW5jZWw6ICFhbGFybS5pc09rLFxuICAgICAgY29uZmlybUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgY29uZmlybVRleHQ6IGFsYXJtLmlzT2sgPyAn56Gu5a6aJyA6ICfnoa7orqTmtojmga8nLFxuICAgICAgc3VjY2VzczogYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0gJiYgIWFsYXJtLmlzT2spIHtcbiAgICAgICAgICBhd2FpdCBhcGkuYWxhcm1Db25maXJtZWQoYWxhcm0uX2lkKVxuICAgICAgICAgIHd4LnN0YXJ0UHVsbERvd25SZWZyZXNoKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOS4i+aLieWIt+aWsFxuICBhc3luYyBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICBhd2FpdCB0aGlzLmdldEFsYXJtSW5mbygpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH1cbiAgLFxuICBmb3JtYXR0aW1lKHRpbWU6IG51bWJlcikge1xuICAgIGNvbnN0IERhdGVzID0gbmV3IERhdGUodGltZSlcbiAgICByZXR1cm4gYCR7RGF0ZXMuZ2V0TW9udGgoKSArIDF9LSR7RGF0ZXMuZ2V0RGF0ZSgpfSAke0RhdGVzLmdldEhvdXJzKCl9OiR7RGF0ZXMuZ2V0TWludXRlcygpfToke0RhdGVzLmdldFNlY29uZHMoKX1gXG4gIH1cbn0pIl19