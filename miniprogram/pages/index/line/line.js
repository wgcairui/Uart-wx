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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBSUgsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFO1lBQ04sVUFBVSxFQUFFLEVBQUU7WUFDZCxNQUFNLEVBQUUsRUFBRTtTQUNxQjtRQUNqQyxRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRSxFQUFFO1FBQ1IsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUVQLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3BCO0lBTUQsTUFBTSxFQUFFLFVBQVUsT0FBTztRQUNmLElBQUEsbUJBQUksRUFBRSxpQkFBRyxFQUFFLGlCQUFHLENBQVk7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsS0FBQTtZQUNILEdBQUcsS0FBQTtZQUNILElBQUksTUFBQTtTQUNMLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3RDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSyxrQkFBa0I7Ozs7Ozt3QkFDaEIsS0FBK0IsSUFBSSxDQUFDLElBQUksRUFBdEMsSUFBSSxVQUFBLEVBQUUsR0FBRyxTQUFBLEVBQUUsR0FBRyxTQUFBLEVBQUUsUUFBUSxjQUFBLENBQWM7d0JBQzFCLFdBQU0sYUFBRyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBcEUsS0FBYyxTQUFzRCxFQUFsRSxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsSUFBSSxFQUFFLEVBQUU7NEJBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxNQUFNLEVBQUU7b0NBQ04sVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztvQ0FDMUIsTUFBTSxFQUFFLEdBQUc7aUNBQ1o7NkJBQ0YsQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE9BQU87Z0NBQ2QsT0FBTyxFQUFFLFFBQVE7NkJBQ2xCLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsVUFBVSxFQUFWLFVBQVcsSUFBVTtRQUNuQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBVSxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBSSxJQUFJLENBQUMsT0FBTyxFQUFJLENBQUM7SUFDMUUsQ0FBQztJQUVELFNBQVMsRUFBVCxVQUFVLEtBQWdCO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUN4QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFOzs7OzRCQUNqQixXQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzt3QkFBL0IsU0FBK0IsQ0FBQTt3QkFDL0IsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5cbi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2xpbmUvbGluZS5qc1xuUGFnZSh7XG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBvcHRpb246IHtcbiAgICAgIGRpbWVuc2lvbnM6IFtdLFxuICAgICAgc291cmNlOiBbXVxuICAgIH0gYXMgZWNoYXJ0cy5FQ2hhcnRPcHRpb24uRGF0YXNldCxcbiAgICBkYXRhdGltZTogJycsXG4gICAgbmFtZTogJycsXG4gICAgbWFjOiAnJyxcbiAgICBwaWQ6ICcnLFxuICAgIC8vXG4gICAgZGF0ZVNob3c6IGZhbHNlLFxuICAgIG1pbkRhdGU6IG5ldyBEYXRlKDIwMjAsIDAsIDEpLmdldFRpbWUoKSxcbiAgICBtYXhEYXRlOiBEYXRlLm5vdygpXG4gIH0sXG5cblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IG5hbWUsIG1hYywgcGlkIH0gPSBvcHRpb25zXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1hYyxcbiAgICAgIHBpZCxcbiAgICAgIG5hbWVcbiAgICB9KVxuICAgIHRoaXMuZ2V0RGV2c0hpc3RvcnlJbmZvKClcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGF0YXRpbWU6IHRoaXMuZm9ybWF0RGF0ZShuZXcgRGF0ZSgpKVxuICAgIH0pXG4gIH0sXG4gIGFzeW5jIGdldERldnNIaXN0b3J5SW5mbygpIHtcbiAgICBjb25zdCB7IG5hbWUsIG1hYywgcGlkLCBkYXRhdGltZSB9ID0gdGhpcy5kYXRhXG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0RGV2c0hpc3RvcnlJbmZvKG1hYywgcGlkLCBuYW1lLCBkYXRhdGltZSlcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIG9wdGlvbjoge1xuICAgICAgICAgIGRpbWVuc2lvbnM6IFsndGltZScsIG5hbWVdLFxuICAgICAgICAgIHNvdXJjZTogYXJnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnZXJyb3InLFxuICAgICAgICBjb250ZW50OiAn6I635Y+W5pWw5o2u5Ye66ZSZJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8g5pi+56S65pel5pyf6YCJ5oup5ZmoXG4gIHNob3dDYWxlbmRhcigpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGF0ZVNob3c6IHRydWVcbiAgICB9KVxuICB9LFxuICAvLyAg5YWz6Zet5pel5pyf6YCJ5oup5ZmoXG4gIG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5zZXREYXRhKHsgZGF0ZVNob3c6IGZhbHNlIH0pO1xuICB9LFxuICBmb3JtYXREYXRlKGRhdGU6IERhdGUpIHtcbiAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgcmV0dXJuIGAke2RhdGUuZ2V0RnVsbFllYXIoKX0vJHtkYXRlLmdldE1vbnRoKCkgKyAxfS8ke2RhdGUuZ2V0RGF0ZSgpfWA7XG4gIH0sXG4gIC8vIOehruWumuaXpeacn1xuICBvbkNvbmZpcm0oZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZGF0ZVNob3c6IGZhbHNlLFxuICAgICAgZGF0YXRpbWU6IHRoaXMuZm9ybWF0RGF0ZShldmVudC5kZXRhaWwpLFxuICAgIH0pO1xuICAgIHRoaXMuZ2V0RGV2c0hpc3RvcnlJbmZvKClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHRoaXMuZ2V0RGV2c0hpc3RvcnlJbmZvKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfVxufSkiXX0=