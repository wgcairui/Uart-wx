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
                                terminal: arg.terminal
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZERldi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmREZXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLGNBQWM7UUFDbkIsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUF5QjtTQUN6QjtLQUNkO0lBRUssT0FBTzs7Ozs7NEJBQ1EsV0FBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFBOzt3QkFBbEMsVUFBVSxHQUFHLFNBQXFCO3dCQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLEdBQUcsRUFBRSxVQUFVLENBQUMsTUFBTTt5QkFDdkIsQ0FBQyxDQUFBO3dCQUNGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTs7Ozs7S0FDbEI7SUFFSyxVQUFVOzs7Ozs0QkFDTSxXQUFNLGFBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQWpELEtBQWMsU0FBbUMsRUFBL0MsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFROzZCQUN2QixDQUFDLENBQUE7NEJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUVqQzs2QkFBTTs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxRQUFRO2dDQUNmLE9BQU8sRUFBRSx3QkFBd0I7NkJBQ2xDLENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtJQUVLLE9BQU87Ozs7OzRCQUNTLFdBQU0sYUFBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBOUMsS0FBYyxTQUFnQyxFQUE1QyxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsSUFBSSxFQUFFLEVBQUU7NEJBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsY0FBYztnQ0FDckIsT0FBTyxFQUFFLHFCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyx3RUFBYztnQ0FDN0MsT0FBTyxZQUFDLEdBQUc7b0NBQ1QsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO3dDQUNmLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3FDQUM3QztnQ0FDSCxDQUFDOzZCQUNGLENBQUMsQ0FBQTt5QkFDSDs2QkFBTTs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxZQUFZO2dDQUNuQixPQUFPLEVBQUUscUJBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLCtCQUFXLEdBQUs7NkJBQ2hELENBQUMsQ0FBQTt5QkFDSDs7Ozs7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgbWFjOiAnNzE0MDQ4OTUzMjUwJyxcbiAgICB0ZXJtaW5hbDoge1xuICAgICAgbmFtZTogJycsXG4gICAgICBtb3VudE5vZGU6ICcnLFxuICAgICAgbW91bnREZXZzOiBbXSBhcyBUZXJtaW5hbE1vdW50RGV2c1tdXG4gICAgfSBhcyBUZXJtaW5hbFxuICB9LFxuICAvLyDosIPnlKjlvq7kv6FhcGnvvIzmiavmj49EVFXmnaHlvaLnoIFcbiAgYXN5bmMgc2Nhbk1hYygpIHtcbiAgICBjb25zdCBzY2FuUmVzdWx0ID0gYXdhaXQgd3guc2NhbkNvZGUoe30pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1hYzogc2NhblJlc3VsdC5yZXN1bHRcbiAgICB9KVxuICAgIHRoaXMuc2NhblJlcXVzdCgpXG4gIH0sXG4gIC8vIOafpeivokRUVeiuvuWkh+S/oeaBr1xuICBhc3luYyBzY2FuUmVxdXN0KCkge1xuICAgIGNvbnN0IHsgb2ssIGFyZyB9ID0gYXdhaXQgYXBpLmdldERUVUluZm8odGhpcy5kYXRhLm1hYylcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHRlcm1pbmFsOiBhcmcudGVybWluYWxcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEudGVybWluYWwpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnc2VhcmNoJyxcbiAgICAgICAgY29udGVudDogJ+atpOiuvuWkh+ayoeacieazqOWGjO+8jOivt+aguOWvueiuvuWkh+aYr+WQpuWcqOaIkeWPuOa4oOmBk+i0reS5sCdcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDnu5Hlrprorr7lpIdcbiAgYXN5bmMgYmluZERldigpIHtcbiAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS5iaW5kRGV2KHRoaXMuZGF0YS5tYWMpXG4gICAgaWYgKG9rKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ2JpbmQgc3VjY2VzcycsXG4gICAgICAgIGNvbnRlbnQ6IGDnu5HlrppEVFU6JHt0aGlzLmRhdGEubWFjfSDmiJDlip/vvIzmmK/lkKbov5Tlm57liLDkuLvpobXvvJ9gLFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnYmluZCBlcnJvcicsXG4gICAgICAgIGNvbnRlbnQ6IGDnu5HlrppEVFU6JHt0aGlzLmRhdGEubWFjfSDlpLHotKXvvIx0aXA6JHttc2d9YCxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KSJdfQ==