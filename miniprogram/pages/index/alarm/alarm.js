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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGFybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFvQztBQUNwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBdUI7UUFDOUIsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3BDLE9BQU8sRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ25CO0lBS0QsTUFBTSxFQUFFOzs7O2dCQUNBLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO2dCQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDN0IsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsSUFBSSxFQUFFLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRztpQkFDeEIsQ0FBQyxDQUFBO2dCQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTs7OztLQUNwQjtJQUVLLFlBQVk7Ozs7Ozt3QkFDVixLQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBdkMsS0FBSyxRQUFBLEVBQUUsR0FBRyxRQUFBLENBQTZCO3dCQUNyQixXQUFNLGFBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLEVBQUE7O3dCQUE3RSxLQUFtQixTQUEwRCxFQUEzRSxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ3BCLElBQUksRUFBRSxFQUFFOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLEdBQUc7NkJBQ1gsQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsT0FBTyxFQUFFLEdBQUcsSUFBSSxNQUFNOzZCQUN2QixDQUFDLENBQUE7eUJBQ0g7Ozs7O0tBQ0Y7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELFVBQVUsRUFBVixVQUFXLElBQVU7UUFDbkIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLE9BQVUsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQUksSUFBSSxDQUFDLE9BQU8sRUFBSSxDQUFDO0lBQzFFLENBQUM7SUFFRCxTQUFTLEVBQVQsVUFBVSxLQUFVO1FBQ1osSUFBQSxpQkFBMkIsRUFBMUIsYUFBSyxFQUFFLFdBQW1CLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUc7U0FDNUQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsRUFBVixVQUFXLEtBQVM7UUFDWCxJQUFBLHFCQUFNLEVBQUMscUJBQU0sQ0FBUztRQUM3QixRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssT0FBTztnQkFDVixJQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEVBQUUsSUFBRSxPQUFBLEVBQUUsQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFBO2dCQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFFakQsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybS9hbGFybS5qc1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBBbGFybTogW10gYXMgdWFydEFsYXJtT2JqZWN0W10sXG4gICAgZmlsdGVyOiAnJyxcbiAgICBkYXRlOiAnJyxcbiAgICBkYXRlU2hvdzogZmFsc2UsXG4gICAgbWluRGF0ZTpuZXcgRGF0ZSgyMDIwLDAsMSkuZ2V0VGltZSgpLFxuICAgIG1heERhdGU6RGF0ZS5ub3coKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuZm9ybWF0RGF0ZShkYXRlKVxuICAgIGNvbnN0IGVuZCA9IHRoaXMuZm9ybWF0RGF0ZShkYXRlKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlOiBzdGFydCArICctJyArIGVuZFxuICAgIH0pXG4gICAgdGhpcy5nZXRBbGFybUluZm8oKVxuICB9LFxuICAvLyDojrflj5blkYrorabkv6Hmga9cbiAgYXN5bmMgZ2V0QWxhcm1JbmZvKCkge1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHRoaXMuZGF0YS5kYXRlLnNwbGl0KCctJylcbiAgICBjb25zdCB7IG9rLCBtc2csIGFyZyB9ID0gYXdhaXQgYXBpLmdldEFsYXJtKHN0YXJ0ICsgJyAwMDowMDowMCcsIGVuZCArIFwiIDIzOjU5OjU5XCIpXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBBbGFybTogYXJnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WPkeeUn+mUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IG1zZyB8fCAn5pyq55+l6ZSZ6K+vJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOaYvuekuuaXpeacn+mAieaLqeWZqFxuICBzaG93Q2FsZW5kYXIoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGRhdGVTaG93OiB0cnVlXG4gICAgfSlcbiAgfSxcbiAgLy8gIOWFs+mXreaXpeacn+mAieaLqeWZqFxuICBvbkNsb3NlKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7IGRhdGVTaG93OiBmYWxzZSB9KTtcbiAgfSxcbiAgZm9ybWF0RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LyR7ZGF0ZS5nZXRNb250aCgpICsgMX0vJHtkYXRlLmdldERhdGUoKX1gO1xuICB9LFxuICAvLyDnoa7lrprml6XmnJ9cbiAgb25Db25maXJtKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBldmVudC5kZXRhaWw7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGRhdGVTaG93OiBmYWxzZSxcbiAgICAgIGRhdGU6IGAke3RoaXMuZm9ybWF0RGF0ZShzdGFydCl9IC0gJHt0aGlzLmZvcm1hdERhdGUoZW5kKX1gLFxuICAgIH0pO1xuICB9LFxuICAvLyDmu5Hliqjngrnlh7tcbiAgc3dpcGVDbG9zZShldmVudDphbnkpe1xuICAgIGNvbnN0IHt0YXJnZXQsZGV0YWlsfSA9IGV2ZW50XG4gICAgc3dpdGNoIChkZXRhaWwpIHtcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBjb25zdCBzZWxlY3RfYWxhcm1faW5kZXggPSB0aGlzLmRhdGEuQWxhcm0uZmluZEluZGV4KGVsPT5lbC5faWQgPT09IHRhcmdldC5pZClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLkFsYXJtW3NlbGVjdF9hbGFybV9pbmRleF0pO1xuICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn0pIl19