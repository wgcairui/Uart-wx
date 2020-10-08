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
        option: {
            dimensions: [],
            source: []
        },
        datatime: '',
        name: '',
        mac: '',
        pid: '',
        dateShow: false,
        minDate: new Date(2020, 0, 1).getTime(),
        maxDate: Date.now()
    },
    onLoad: function (options) {
        var name = options.name, mac = options.mac, pid = options.pid;
        this.setData({
            mac: mac,
            pid: pid,
            name: name
        });
        this.getDevsHistoryInfo();
        this.setData({
            datatime: this.formatDate(new Date())
        });
    },
    getDevsHistoryInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, mac, pid, datatime, _b, ok, arg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.data, name = _a.name, mac = _a.mac, pid = _a.pid, datatime = _a.datatime;
                        return [4, api_1.default.getDevsHistoryInfo(mac, pid, name, datatime)];
                    case 1:
                        _b = _c.sent(), ok = _b.ok, arg = _b.arg;
                        if (ok) {
                            this.setData({
                                option: {
                                    dimensions: ['time', name],
                                    source: arg
                                }
                            });
                        }
                        else {
                            wx.showModal({
                                title: 'error',
                                content: '获取数据出错'
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
        console.log(event);
        this.setData({
            dateShow: false,
            datatime: this.formatDate(event.detail),
        });
        this.getDevsHistoryInfo();
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getDevsHistoryInfo()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    },
    onReachBottom: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFO1lBQ04sVUFBVSxFQUFFLEVBQUU7WUFDZCxNQUFNLEVBQUUsRUFBRTtTQUNxQjtRQUNqQyxRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRSxFQUFFO1FBQ1IsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUVQLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3BCO0lBTUQsTUFBTSxFQUFFLFVBQVUsT0FBTztRQUNmLElBQUEsSUFBSSxHQUFlLE9BQU8sS0FBdEIsRUFBRSxHQUFHLEdBQVUsT0FBTyxJQUFqQixFQUFFLEdBQUcsR0FBSyxPQUFPLElBQVosQ0FBWTtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRyxLQUFBO1lBQ0gsR0FBRyxLQUFBO1lBQ0gsSUFBSSxNQUFBO1NBQ0wsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUE7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7U0FDdEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNLLGtCQUFrQjs7Ozs7O3dCQUNoQixLQUErQixJQUFJLENBQUMsSUFBSSxFQUF0QyxJQUFJLFVBQUEsRUFBRSxHQUFHLFNBQUEsRUFBRSxHQUFHLFNBQUEsRUFBRSxRQUFRLGNBQUEsQ0FBYzt3QkFDMUIsV0FBTSxhQUFHLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUFwRSxLQUFjLFNBQXNELEVBQWxFLEVBQUUsUUFBQSxFQUFFLEdBQUcsU0FBQTt3QkFDZixJQUFJLEVBQUUsRUFBRTs0QkFDTixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLE1BQU0sRUFBRTtvQ0FDTixVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO29DQUMxQixNQUFNLEVBQUUsR0FBRztpQ0FDWjs2QkFDRixDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsT0FBTztnQ0FDZCxPQUFPLEVBQUUsUUFBUTs2QkFDbEIsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxVQUFVLEVBQVYsVUFBVyxJQUFVO1FBQ25CLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFVLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFJLElBQUksQ0FBQyxPQUFPLEVBQUksQ0FBQztJQUMxRSxDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsS0FBZ0I7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO0lBQzNCLENBQUM7SUFLRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7Ozs7NEJBQ2pCLFdBQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUE7O3dCQUEvQixTQUErQixDQUFBO3dCQUMvQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvbGluZS9saW5lLmpzXG5QYWdlKHtcbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG9wdGlvbjoge1xuICAgICAgZGltZW5zaW9uczogW10sXG4gICAgICBzb3VyY2U6IFtdXG4gICAgfSBhcyBlY2hhcnRzLkVDaGFydE9wdGlvbi5EYXRhc2V0LFxuICAgIGRhdGF0aW1lOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBtYWM6ICcnLFxuICAgIHBpZDogJycsXG4gICAgLy9cbiAgICBkYXRlU2hvdzogZmFsc2UsXG4gICAgbWluRGF0ZTogbmV3IERhdGUoMjAyMCwgMCwgMSkuZ2V0VGltZSgpLFxuICAgIG1heERhdGU6IERhdGUubm93KClcbiAgfSxcblxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGNvbnN0IHsgbmFtZSwgbWFjLCBwaWQgfSA9IG9wdGlvbnNcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWFjLFxuICAgICAgcGlkLFxuICAgICAgbmFtZVxuICAgIH0pXG4gICAgdGhpcy5nZXREZXZzSGlzdG9yeUluZm8oKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRhdGltZTogdGhpcy5mb3JtYXREYXRlKG5ldyBEYXRlKCkpXG4gICAgfSlcbiAgfSxcbiAgYXN5bmMgZ2V0RGV2c0hpc3RvcnlJbmZvKCkge1xuICAgIGNvbnN0IHsgbmFtZSwgbWFjLCBwaWQsIGRhdGF0aW1lIH0gPSB0aGlzLmRhdGFcbiAgICBjb25zdCB7IG9rLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXREZXZzSGlzdG9yeUluZm8obWFjLCBwaWQsIG5hbWUsIGRhdGF0aW1lKVxuICAgIGlmIChvaykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgb3B0aW9uOiB7XG4gICAgICAgICAgZGltZW5zaW9uczogWyd0aW1lJywgbmFtZV0sXG4gICAgICAgICAgc291cmNlOiBhcmdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdlcnJvcicsXG4gICAgICAgIGNvbnRlbnQ6ICfojrflj5bmlbDmja7lh7rplJknXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvLyDmmL7npLrml6XmnJ/pgInmi6nlmahcbiAgc2hvd0NhbGVuZGFyKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlU2hvdzogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIC8vICDlhbPpl63ml6XmnJ/pgInmi6nlmahcbiAgb25DbG9zZSgpIHtcbiAgICB0aGlzLnNldERhdGEoeyBkYXRlU2hvdzogZmFsc2UgfSk7XG4gIH0sXG4gIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS8ke2RhdGUuZ2V0TW9udGgoKSArIDF9LyR7ZGF0ZS5nZXREYXRlKCl9YDtcbiAgfSxcbiAgLy8g56Gu5a6a5pel5pyfXG4gIG9uQ29uZmlybShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkYXRlU2hvdzogZmFsc2UsXG4gICAgICBkYXRhdGltZTogdGhpcy5mb3JtYXREYXRlKGV2ZW50LmRldGFpbCksXG4gICAgfSk7XG4gICAgdGhpcy5nZXREZXZzSGlzdG9yeUluZm8oKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5nZXREZXZzSGlzdG9yeUluZm8oKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==