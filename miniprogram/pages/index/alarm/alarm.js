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
            return __generator(this, function (_a) {
                date = new Date();
                start = this.formatDate(date);
                end = this.formatDate(date);
                this.setData({
                    date: start + '-' + end
                });
                this.getAlarmInfo();
                return [2];
            });
        });
    },
    getAlarmInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, start, end, _b, ok, msg, arg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.data.date.split('-'), start = _a[0], end = _a[1];
                        return [4, api_1.default.getAlarm(start + ' 00:00:00', end + " 23:59:59")];
                    case 1:
                        _b = _c.sent(), ok = _b.ok, msg = _b.msg, arg = _b.arg;
                        if (ok) {
                            this.setData({
                                Alarm: arg
                            });
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
    swipeClose: function (event) {
        var target = event.target, detail = event.detail;
        switch (detail) {
            case "right":
                var select_alarm_index = this.data.Alarm.findIndex(function (el) { return el._id === target.id; });
                console.log(this.data.Alarm[select_alarm_index]);
                break;
            default:
                break;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGFybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFvQztBQUNwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBdUI7UUFDOUIsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3BDLE9BQU8sRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ25CO0lBS0QsTUFBTSxFQUFFOzs7O2dCQUNBLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO2dCQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDN0IsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsSUFBSSxFQUFFLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRztpQkFDeEIsQ0FBQyxDQUFBO2dCQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTs7OztLQUNwQjtJQUVLLFlBQVk7Ozs7Ozt3QkFDVixLQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBdkMsS0FBSyxRQUFBLEVBQUUsR0FBRyxRQUFBLENBQTZCO3dCQUNyQixXQUFNLGFBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLEVBQUE7O3dCQUE3RSxLQUFtQixTQUEwRCxFQUEzRSxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ3BCLElBQUksRUFBRSxFQUFFOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLEdBQUc7NkJBQ1gsQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsT0FBTyxFQUFFLEdBQUcsSUFBSSxNQUFNOzZCQUN2QixDQUFDLENBQUE7eUJBQ0g7Ozs7O0tBQ0Y7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELFVBQVUsRUFBVixVQUFXLElBQVU7UUFDbkIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLE9BQVUsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQUksSUFBSSxDQUFDLE9BQU8sRUFBSSxDQUFDO0lBQzFFLENBQUM7SUFFRCxTQUFTLEVBQVQsVUFBVSxLQUFVO1FBQ1osSUFBQSxLQUFlLEtBQUssQ0FBQyxNQUFNLEVBQTFCLEtBQUssUUFBQSxFQUFFLEdBQUcsUUFBZ0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBRztTQUM1RCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxFQUFWLFVBQVcsS0FBUztRQUNYLElBQUEsTUFBTSxHQUFXLEtBQUssT0FBaEIsRUFBQyxNQUFNLEdBQUksS0FBSyxPQUFULENBQVM7UUFDN0IsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLE9BQU87Z0JBQ1YsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxFQUFFLElBQUUsT0FBQSxFQUFFLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQTtnQkFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBRWpELE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvYWxhcm0vYWxhcm0uanNcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgQWxhcm06IFtdIGFzIHVhcnRBbGFybU9iamVjdFtdLFxuICAgIGZpbHRlcjogJycsXG4gICAgZGF0ZTogJycsXG4gICAgZGF0ZVNob3c6IGZhbHNlLFxuICAgIG1pbkRhdGU6bmV3IERhdGUoMjAyMCwwLDEpLmdldFRpbWUoKSxcbiAgICBtYXhEYXRlOkRhdGUubm93KClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLmZvcm1hdERhdGUoZGF0ZSlcbiAgICBjb25zdCBlbmQgPSB0aGlzLmZvcm1hdERhdGUoZGF0ZSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGF0ZTogc3RhcnQgKyAnLScgKyBlbmRcbiAgICB9KVxuICAgIHRoaXMuZ2V0QWxhcm1JbmZvKClcbiAgfSxcbiAgLy8g6I635Y+W5ZGK6K2m5L+h5oGvXG4gIGFzeW5jIGdldEFsYXJtSW5mbygpIHtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSB0aGlzLmRhdGEuZGF0ZS5zcGxpdCgnLScpXG4gICAgY29uc3QgeyBvaywgbXNnLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXRBbGFybShzdGFydCArICcgMDA6MDA6MDAnLCBlbmQgKyBcIiAyMzo1OTo1OVwiKVxuICAgIGlmIChvaykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgQWxhcm06IGFyZ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflj5HnlJ/plJnor68nLFxuICAgICAgICBjb250ZW50OiBtc2cgfHwgJ+acquefpemUmeivrydcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDmmL7npLrml6XmnJ/pgInmi6nlmahcbiAgc2hvd0NhbGVuZGFyKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlU2hvdzogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIC8vICDlhbPpl63ml6XmnJ/pgInmi6nlmahcbiAgb25DbG9zZSgpIHtcbiAgICB0aGlzLnNldERhdGEoeyBkYXRlU2hvdzogZmFsc2UgfSk7XG4gIH0sXG4gIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS8ke2RhdGUuZ2V0TW9udGgoKSArIDF9LyR7ZGF0ZS5nZXREYXRlKCl9YDtcbiAgfSxcbiAgLy8g56Gu5a6a5pel5pyfXG4gIG9uQ29uZmlybShldmVudDogYW55KSB7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gZXZlbnQuZGV0YWlsO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlU2hvdzogZmFsc2UsXG4gICAgICBkYXRlOiBgJHt0aGlzLmZvcm1hdERhdGUoc3RhcnQpfSAtICR7dGhpcy5mb3JtYXREYXRlKGVuZCl9YCxcbiAgICB9KTtcbiAgfSxcbiAgLy8g5ruR5Yqo54K55Ye7XG4gIHN3aXBlQ2xvc2UoZXZlbnQ6YW55KXtcbiAgICBjb25zdCB7dGFyZ2V0LGRldGFpbH0gPSBldmVudFxuICAgIHN3aXRjaCAoZGV0YWlsKSB7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgY29uc3Qgc2VsZWN0X2FsYXJtX2luZGV4ID0gdGhpcy5kYXRhLkFsYXJtLmZpbmRJbmRleChlbD0+ZWwuX2lkID09PSB0YXJnZXQuaWQpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5BbGFybVtzZWxlY3RfYWxhcm1faW5kZXhdKTtcbiAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59KSJdfQ==