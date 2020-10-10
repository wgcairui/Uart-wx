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
        mac: '714048953250',
        terminal: {
            name: '',
            mountNode: '',
            mountDevs: []
        }
    },
    scanMac: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    },
    scanRequst: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, arg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, api_1.default.getDTUInfo(this.data.mac)];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, arg = _a.arg;
                        if (ok) {
                            this.setData({
                                terminal: arg
                            });
                            console.log(this.data.terminal);
                        }
                        else {
                            wx.showModal({
                                title: 'search',
                                content: '此设备没有注册，请核对设备是否在我司渠道购买'
                            });
                        }
                        return [2];
                }
            });
        });
    },
    bindDev: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, api_1.default.bindDev(this.data.mac)];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, msg = _a.msg;
                        if (ok) {
                            wx.showModal({
                                title: 'bind success',
                                content: "\u7ED1\u5B9ADTU:" + this.data.mac + " \u6210\u529F\uFF0C\u662F\u5426\u8FD4\u56DE\u5230\u4E3B\u9875\uFF1F",
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.navigateTo({ url: '/pages/index/index' });
                                    }
                                }
                            });
                        }
                        else {
                            wx.showModal({
                                title: 'bind error',
                                content: "\u7ED1\u5B9ADTU:" + this.data.mac + " \u5931\u8D25\uFF0Ctip:" + msg,
                            });
                        }
                        return [2];
                }
            });
        });
    },
    onClickIcon: function () {
        return __awaiter(this, void 0, void 0, function () {
            var scanResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, wx.scanCode({})];
                    case 1:
                        scanResult = _a.sent();
                        this.setData({
                            mac: scanResult.result
                        });
                        this.scanRequst();
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZERldi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmREZXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLGNBQWM7UUFDbkIsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUF5QjtTQUN6QjtLQUNkO0lBRUssT0FBTzs7Ozs7O0tBRVo7SUFFSyxVQUFVOzs7Ozs0QkFDTSxXQUFNLGFBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQWpELEtBQWMsU0FBbUMsRUFBL0MsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsUUFBUSxFQUFFLEdBQUc7NkJBQ2QsQ0FBQyxDQUFBOzRCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFFakM7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsUUFBUTtnQ0FDZixPQUFPLEVBQUUsd0JBQXdCOzZCQUNsQyxDQUFDLENBQUE7eUJBQ0g7Ozs7O0tBQ0Y7SUFFSyxPQUFPOzs7Ozs0QkFDUyxXQUFNLGFBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQTlDLEtBQWMsU0FBZ0MsRUFBNUMsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLGNBQWM7Z0NBQ3JCLE9BQU8sRUFBRSxxQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsd0VBQWM7Z0NBQzdDLE9BQU8sWUFBQyxHQUFHO29DQUNULElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTt3Q0FDZixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtxQ0FDN0M7Z0NBQ0gsQ0FBQzs2QkFDRixDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsWUFBWTtnQ0FDbkIsT0FBTyxFQUFFLHFCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRywrQkFBVyxHQUFLOzZCQUNoRCxDQUFDLENBQUE7eUJBQ0g7Ozs7O0tBQ0Y7SUFFSyxXQUFXOzs7Ozs0QkFDSSxXQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUE7O3dCQUFsQyxVQUFVLEdBQUcsU0FBcUI7d0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsR0FBRyxFQUFFLFVBQVUsQ0FBQyxNQUFNO3lCQUN2QixDQUFDLENBQUE7d0JBQ0YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBOzs7OztLQUNsQjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgbWFjOiAnNzE0MDQ4OTUzMjUwJyxcbiAgICB0ZXJtaW5hbDoge1xuICAgICAgbmFtZTogJycsXG4gICAgICBtb3VudE5vZGU6ICcnLFxuICAgICAgbW91bnREZXZzOiBbXSBhcyBUZXJtaW5hbE1vdW50RGV2c1tdXG4gICAgfSBhcyBUZXJtaW5hbFxuICB9LFxuICAvLyDosIPnlKjlvq7kv6FhcGnvvIzmiavmj49EVFXmnaHlvaLnoIFcbiAgYXN5bmMgc2Nhbk1hYygpIHtcblxuICB9LFxuICAvLyDmn6Xor6JEVFXorr7lpIfkv6Hmga9cbiAgYXN5bmMgc2NhblJlcXVzdCgpIHtcbiAgICBjb25zdCB7IG9rLCBhcmcgfSA9IGF3YWl0IGFwaS5nZXREVFVJbmZvKHRoaXMuZGF0YS5tYWMpXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0ZXJtaW5hbDogYXJnXG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnRlcm1pbmFsKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ3NlYXJjaCcsXG4gICAgICAgIGNvbnRlbnQ6ICfmraTorr7lpIfmsqHmnInms6jlhozvvIzor7fmoLjlr7norr7lpIfmmK/lkKblnKjmiJHlj7jmuKDpgZPotK3kubAnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g57uR5a6a6K6+5aSHXG4gIGFzeW5jIGJpbmREZXYoKSB7XG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkuYmluZERldih0aGlzLmRhdGEubWFjKVxuICAgIGlmIChvaykge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdiaW5kIHN1Y2Nlc3MnLFxuICAgICAgICBjb250ZW50OiBg57uR5a6aRFRVOiR7dGhpcy5kYXRhLm1hY30g5oiQ5Yqf77yM5piv5ZCm6L+U5Zue5Yiw5Li76aG177yfYCxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ2JpbmQgZXJyb3InLFxuICAgICAgICBjb250ZW50OiBg57uR5a6aRFRVOiR7dGhpcy5kYXRhLm1hY30g5aSx6LSl77yMdGlwOiR7bXNnfWAsXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy9cbiAgYXN5bmMgb25DbGlja0ljb24oKSB7XG4gICAgY29uc3Qgc2NhblJlc3VsdCA9IGF3YWl0IHd4LnNjYW5Db2RlKHt9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtYWM6IHNjYW5SZXN1bHQucmVzdWx0XG4gICAgfSlcbiAgICB0aGlzLnNjYW5SZXF1c3QoKVxuICB9XG59KSJdfQ==