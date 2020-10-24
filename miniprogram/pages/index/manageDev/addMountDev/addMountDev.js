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
var api_1 = require("../../../../utils/api");
Page({
    data: {
        terminal: {},
        columns: [],
        devType: 'UPS',
        devTypes: [{ text: 'UPS', value: 'UPS' }, { text: '空调', value: '空调' }, { text: '电量仪', value: '电量仪' }, { text: '温湿度', value: '温湿度' }],
        devModal: '',
        devModals: [],
        devModesMap: new Map(),
        devProtocol: '',
        devProtocols: [],
        pid: 1
    },
    onLoad: function (options) {
        if (options.item) {
            var item = JSON.parse(options.item);
            var hasPid = new Set(item.mountDevs.map(function (el) { return el.pid; }));
            var columns = [];
            for (var i = 0; i < 255; i++) {
                columns.push({ text: i, disabled: hasPid.has(i) });
            }
            this.setData({
                terminal: item,
                columns: columns
            });
            this.devTypeChange();
            wx.setNavigationBarTitle({ title: item.name });
        }
        else {
            wx.switchTab({ url: '/pages/index/index' });
        }
    },
    devTypeChange: function () {
        return __awaiter(this, void 0, void 0, function () {
            var arg, devModals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_1.default.DevTypes(this.data.devType)];
                    case 1:
                        arg = (_a.sent()).arg;
                        devModals = arg.map(function (el) { return ({ text: el.DevModel, value: el.DevModel }); });
                        this.setData({
                            devModals: devModals,
                            devProtocols: [],
                            devModesMap: new Map(arg.map(function (el) { return [el.DevModel, el]; }))
                        });
                        return [2];
                }
            });
        });
    },
    devModalChange: function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, devModesMap, devModal, devProtocols;
            return __generator(this, function (_c) {
                _b = this.data, devModesMap = _b.devModesMap, devModal = _b.devModal;
                devProtocols = (_a = devModesMap.get(devModal)) === null || _a === void 0 ? void 0 : _a.Protocols.map(function (el) { return ({ text: el.Protocol, value: el.Protocol }); });
                this.setData({
                    devProtocols: devProtocols
                });
                return [2];
            });
        });
    },
    pidChange: function (event) {
        this.setData({
            pid: event.detail.value.text
        });
    },
    addMountDev: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, devModal, devType, devProtocol, pid, terminal, ok, event_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.data, devModal = _a.devModal, devType = _a.devType, devProtocol = _a.devProtocol, pid = _a.pid, terminal = _a.terminal;
                        if (!(devProtocol && devType && devProtocol)) return [3, 2];
                        return [4, api_1.default.addTerminalMountDe(terminal.DevMac, devType, devModal, devProtocol, pid)];
                    case 1:
                        ok = (_b.sent()).ok;
                        if (ok) {
                            event_1 = this.getOpenerEventChannel();
                            event_1.emit("addSuccess", { stat: true });
                            wx.navigateBack();
                        }
                        else {
                            wx.showModal({
                                title: '提交失败',
                                content: '请检查参数并重新提交'
                            });
                        }
                        _b.label = 2;
                    case 2: return [2];
                }
            });
        });
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
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkTW91bnREZXYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRNb3VudERldi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF1QztBQU12QyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsRUFBYztRQUN4QixPQUFPLEVBQUUsRUFBVztRQUNwQixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQWdCO1FBQ25KLFFBQVEsRUFBRSxFQUFFO1FBQ1osU0FBUyxFQUFFLEVBQWlCO1FBQzVCLFdBQVcsRUFBRSxJQUFJLEdBQUcsRUFBMkI7UUFDL0MsV0FBVyxFQUFFLEVBQUU7UUFDZixZQUFZLEVBQUUsRUFBaUI7UUFDL0IsR0FBRyxFQUFFLENBQUM7S0FDUDtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2hCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBYSxDQUFBO1lBQ2pELElBQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLEdBQUcsRUFBTixDQUFNLENBQUMsQ0FBQyxDQUFBO1lBQ3hELElBQUksT0FBTyxHQUFHLEVBQVcsQ0FBQTtZQUN6QixLQUFL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QUssQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7NEJBQ3hDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTt5QkFRbEI7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsWUFBWTs2QkFDdEIsQ0FBQyxDQUFBO3lCQUNIOzs7Ozs7S0FHSjtJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9hcGlcIlxuaW50ZXJmYWNlIGRldk1vZGFscyB7XG4gIHRleHQ6IHN0cmluZyxcbiAgdmFsdWU6IHN0cmluZ1xufVxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvbWFuYWdlRGV2L2FkZE1vdW50RGV2L2FkZE1vdW50RGV2LmpzXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgdGVybWluYWw6IHt9IGFzIFRlcm1pbmFsLFxuICAgIGNvbHVtbnM6IFtdIGFzIGFueVtdLFxuICAgIGRldlR5cGU6ICdVUFMnLFxuICAgIGRldlR5cGVzOiBbeyB0ZXh0OiAnVVBTJywgdmFsdWU6ICdVUFMnIH0sIHsgdGV4dDogJ+epuuiwgycsIHZhbHVlOiAn56m66LCDJyB9LCB7IHRleHQ6ICfnlLXph4/ku6onLCB2YWx1ZTogJ+eUtemHj+S7qicgfSwgeyB0ZXh0OiAn5rip5rm/5bqmJywgdmFsdWU6ICfmuKnmub/luqYnIH1dIGFzIGRldk1vZGFsc1tdLFxuICAgIGRldk1vZGFsOiAnJyxcbiAgICBkZXZNb2RhbHM6IFtdIGFzIGRldk1vZGFsc1tdLFxuICAgIGRldk1vZGVzTWFwOiBuZXcgTWFwKCkgYXMgTWFwPHN0cmluZywgRGV2c1R5cGU+LFxuICAgIGRldlByb3RvY29sOiAnJyxcbiAgICBkZXZQcm90b2NvbHM6IFtdIGFzIGRldk1vZGFsc1tdLFxuICAgIHBpZDogMVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLml0ZW0pIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBKU09OLnBhcnNlKG9wdGlvbnMuaXRlbSkgYXMgVGVybWluYWxcbiAgICAgIGNvbnN0IGhhc1BpZCA9IG5ldyBTZXQoaXRlbS5tb3VudERldnMubWFwKGVsID0+IGVsLnBpZCkpXG4gICAgICBsZXQgY29sdW1ucyA9IFtdIGFzIGFueVtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1NTsgaSsrKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaCh7IHRleHQ6IGksIGRpc2FibGVkOiBoYXNQaWQuaGFzKGkpIH0pXG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0ZXJtaW5hbDogaXRlbSxcbiAgICAgICAgY29sdW1uc1xuICAgICAgfSlcbiAgICAgIHRoaXMuZGV2VHlwZUNoYW5nZSgpXG4gICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZTogaXRlbS5uYW1lIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnN3aXRjaFRhYih7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOebkeWQrOiuvuWkh+exu+Wei+WPmOWMllxuICBhc3luYyBkZXZUeXBlQ2hhbmdlKCkge1xuICAgIGNvbnN0IHsgYXJnIH0gPSBhd2FpdCBhcGkuRGV2VHlwZXModGhpcy5kYXRhLmRldlR5cGUpXG4gICAgY29uc3QgZGV2TW9kYWxzID0gYXJnLm1hcChlbCA9PiAoeyB0ZXh0OiBlbC5EZXZNb2RlbCwgdmFsdWU6IGVsLkRldk1vZGVsIH0pKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkZXZNb2RhbHMsXG4gICAgICBkZXZQcm90b2NvbHM6IFtdLFxuICAgICAgZGV2TW9kZXNNYXA6IG5ldyBNYXAoYXJnLm1hcChlbCA9PiBbZWwuRGV2TW9kZWwsIGVsXSkpXG4gICAgfSlcbiAgfSxcbiAgLy8g55uR5ZCs6K6+5aSH5Z6L5Y+35Y+Y5YyWXG4gIGFzeW5jIGRldk1vZGFsQ2hhbmdlKCkge1xuICAgIGNvbnN0IHsgZGV2TW9kZXNNYXAsIGRldk1vZGFsIH0gPSB0aGlzLmRhdGFcbiAgICBjb25zdCBkZXZQcm90b2NvbHMgPSBkZXZNb2Rlc01hcC5nZXQoZGV2TW9kYWwpPy5Qcm90b2NvbHMubWFwKGVsID0+ICh7IHRleHQ6IGVsLlByb3RvY29sLCB2YWx1ZTogZWwuUHJvdG9jb2wgfSkpIVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBkZXZQcm90b2NvbHNcbiAgICB9KVxuICB9LFxuICAvLyDnm5HlkKxwaWRcbiAgcGlkQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgcGlkOiBldmVudC5kZXRhaWwudmFsdWUudGV4dFxuICAgIH0pXG4gIH0sXG4gIC8vIOaPkOS6pOaWsOWinlxuICBhc3luYyBhZGRNb3VudERldigpIHtcbiAgICBjb25zdCB7IGRldk1vZGFsLCBkZXZUeXBlLCBkZXZQcm90b2NvbCwgcGlkLCB0ZXJtaW5hbCB9ID0gdGhpcy5kYXRhXG4gICAgaWYgKGRldlByb3RvY29sICYmIGRldlR5cGUgJiYgZGV2UHJvdG9jb2wpIHtcbiAgICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IGFwaS5hZGRUZXJtaW5hbE1vdW50RGUodGVybWluYWwuRGV2TWFjLCBkZXZUeXBlLCBkZXZNb2RhbCwgZGV2UHJvdG9jb2wsIHBpZCBhcyBhbnkpXG4gICAgICBpZiAob2spIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmdldE9wZW5lckV2ZW50Q2hhbm5lbCgpXG4gICAgICAgIGV2ZW50LmVtaXQoXCJhZGRTdWNjZXNzXCIsIHsgc3RhdDogdHJ1ZSB9KVxuICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAvKiB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgY29udGVudDogJ+a3u+WKoOiuvuWkh+aIkOWKn++8jOaYr+WQpui/lOWbnuS4iuS4gOmhtemdoj8nLFxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pXG4gICAgICAgICAgfVxuICAgICAgICB9KSAqL1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOS6pOWksei0pScsXG4gICAgICAgICAgY29udGVudDogJ+ivt+ajgOafpeWPguaVsOW5tumHjeaWsOaPkOS6pCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==