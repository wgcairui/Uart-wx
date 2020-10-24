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
        mac: '',
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
                                terminal: arg
                            });
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
                                content: "\u7ED1\u5B9ADTU:" + this.data.mac + " \u6210\u529F\uFF0C\u662F\u5426\u73B0\u5728\u6DFB\u52A0\u6302\u8F7D\u8BBE\u5907\uFF1F",
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.navigateTo({ url: '/pages/index/manageDev/manageDev' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZERldi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmREZXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQXlCO1NBQ3pCO0tBQ2Q7SUFFSyxPQUFPOzs7Ozs0QkFDUSxXQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUE7O3dCQUFsQyxVQUFVLEdBQUcsU0FBcUI7d0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsR0FBRyxFQUFFLFVBQVUsQ0FBQyxNQUFNO3lCQUN2QixDQUFDLENBQUE7d0JBQ0YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBOzs7OztLQUNsQjtJQUVLLFVBQVU7Ozs7OzRCQUNNLFdBQU0sYUFBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFBOzt3QkFBakQsS0FBYyxTQUFtQyxFQUEvQyxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsSUFBSSxFQUFFLEVBQUU7NEJBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxRQUFRLEVBQUUsR0FBRzs2QkFDZCxDQUFDLENBQUE7eUJBQ0g7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsUUFBUTtnQ0FDZixPQUFPLEVBQUUsd0JBQXdCOzZCQUNsQyxDQUFDLENBQUE7eUJBQ0g7Ozs7O0tBQ0Y7SUFFSyxPQUFPOzs7Ozs0QkFDUyxXQUFNLGFBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQTlDLEtBQWMsU0FBZ0MsRUFBNUMsRUFBRSxRQUFBLEVBQUUsR0FBRyxTQUFBO3dCQUNmLElBQUksRUFBRSxFQUFFOzRCQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLGNBQWM7Z0NBQ3JCLE9BQU8sRUFBRSxxQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsMEZBQWlCO2dDQUNoRCxPQUFPLFlBQUMsR0FBRztvQ0FDVCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0NBQ2YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxrQ0FBa0MsRUFBRSxDQUFDLENBQUE7cUNBQzNEO2dDQUNILENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3lCQUNIOzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLFlBQVk7Z0NBQ25CLE9BQU8sRUFBRSxxQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsK0JBQVcsR0FBSzs2QkFDaEQsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtYWM6ICcnLFxuICAgIHRlcm1pbmFsOiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIG1vdW50Tm9kZTogJycsXG4gICAgICBtb3VudERldnM6IFtdIGFzIFRlcm1pbmFsTW91bnREZXZzW11cbiAgICB9IGFzIFRlcm1pbmFsXG4gIH0sXG4gIC8vIOiwg+eUqOW+ruS/oWFwae+8jOaJq+aPj0RUVeadoeW9oueggVxuICBhc3luYyBzY2FuTWFjKCkge1xuICAgIGNvbnN0IHNjYW5SZXN1bHQgPSBhd2FpdCB3eC5zY2FuQ29kZSh7fSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWFjOiBzY2FuUmVzdWx0LnJlc3VsdFxuICAgIH0pXG4gICAgdGhpcy5zY2FuUmVxdXN0KClcbiAgfSxcbiAgLy8g5p+l6K+iRFRV6K6+5aSH5L+h5oGvXG4gIGFzeW5jIHNjYW5SZXF1c3QoKSB7XG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0RFRVSW5mbyh0aGlzLmRhdGEubWFjKVxuICAgIGlmIChvaykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdGVybWluYWw6IGFyZ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdzZWFyY2gnLFxuICAgICAgICBjb250ZW50OiAn5q2k6K6+5aSH5rKh5pyJ5rOo5YaM77yM6K+35qC45a+56K6+5aSH5piv5ZCm5Zyo5oiR5Y+45rig6YGT6LSt5LmwJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOe7keWumuiuvuWkh1xuICBhc3luYyBiaW5kRGV2KCkge1xuICAgIGNvbnN0IHsgb2ssIG1zZyB9ID0gYXdhaXQgYXBpLmJpbmREZXYodGhpcy5kYXRhLm1hYylcbiAgICBpZiAob2spIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnYmluZCBzdWNjZXNzJyxcbiAgICAgICAgY29udGVudDogYOe7keWumkRUVToke3RoaXMuZGF0YS5tYWN9IOaIkOWKn++8jOaYr+WQpueOsOWcqOa3u+WKoOaMgui9veiuvuWkh++8n2AsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L21hbmFnZURldi9tYW5hZ2VEZXYnIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ2JpbmQgZXJyb3InLFxuICAgICAgICBjb250ZW50OiBg57uR5a6aRFRVOiR7dGhpcy5kYXRhLm1hY30g5aSx6LSl77yMdGlwOiR7bXNnfWAsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkiXX0=