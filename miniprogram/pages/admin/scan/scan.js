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
var app = getApp();
Page({
    data: {
        mac: '',
        iccd: '',
        userInfo: {}
    },
    scanMac: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.scan()];
                    case 1:
                        result = _a.sent();
                        this.setData({ mac: result });
                        return [2];
                }
            });
        });
    },
    scanICCD: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.scan()];
                    case 1:
                        result = _a.sent();
                        this.setData({ iccd: result });
                        return [2];
                }
            });
        });
    },
    scan: function () {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, wx.scanCode({})];
                    case 1:
                        el = _a.sent();
                        return [2, el.result];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBQ2hDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEdBQUcsRUFBQyxFQUFFO1FBQ04sSUFBSSxFQUFDLEVBQUU7UUFDUCxRQUFRLEVBQUMsRUFBRTtLQUNaO0lBRUssT0FBTzs7Ozs7NEJBQ0ksV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUExQixNQUFNLEdBQUcsU0FBaUI7d0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQTs7Ozs7S0FDM0I7SUFDSyxRQUFROzs7Ozs0QkFDRyxXQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQTFCLE1BQU0sR0FBRyxTQUFpQjt3QkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFBOzs7OztLQUM1QjtJQUdLLElBQUk7Ozs7OzRCQUNFLFdBQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQTs7d0JBQTFCLEVBQUUsR0FBRyxTQUFxQjt3QkFDL0IsV0FBTyxFQUFFLENBQUMsTUFBTSxFQUFDOzs7O0tBQ2xCO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvYWRtaW4vc2Nhbi9zY2FuLmpzXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtYWM6JycsXG4gICAgaWNjZDonJyxcbiAgICB1c2VySW5mbzp7fVxuICB9LFxuICBcbiAgYXN5bmMgc2Nhbk1hYygpe1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2NhbigpXG4gICAgdGhpcy5zZXREYXRhKHttYWM6cmVzdWx0fSlcbiAgfSxcbiAgYXN5bmMgc2NhbklDQ0QoKXtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnNjYW4oKVxuICAgIHRoaXMuc2V0RGF0YSh7aWNjZDpyZXN1bHR9KVxuICB9LFxuXG4gIC8vIOaJq+eggVxuICBhc3luYyBzY2FuKCl7IFxuICAgY29uc3QgZWwgPSBhd2FpdCB3eC5zY2FuQ29kZSh7fSk7XG4gICAgcmV0dXJuIGVsLnJlc3VsdDtcbiAgfVxufSkiXX0=