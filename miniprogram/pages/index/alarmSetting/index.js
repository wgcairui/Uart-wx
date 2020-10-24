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
var util_1 = require("../../../utils/util");
var api_1 = require("../../../utils/api");
Page({
    data: {
        devs: [],
        tels: '',
        mails: ''
    },
    onLoad: function () {
        this.sortDevslist();
        this.getuserTels();
    },
    sortDevslist: function () {
        var _this = this;
        wx.getStorage({
            key: 'Uts'
        }).then(function (_a) {
            var data = _a.data;
            _this.setData({
                devs: data
            });
        }).catch(function (e) {
            console.log(e);
            wx.switchTab({ url: '/pages/index/index' });
        });
    },
    getuserTels: function () {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_1.default.getUserAlarmTels()];
                    case 1:
                        el = _a.sent();
                        this.setData({
                            tels: el.arg.tels.join('\n'),
                            mails: el.arg.mails.join('\n')
                        });
                        return [2];
                }
            });
        });
    },
    modifyTell: function (event) {
        var detail = event.detail, dataset = event.currentTarget.dataset;
        var value = Array.from(new Set(detail.value.replace(/(\,|\，)/g, '\n').split('\n').filter(function (el) { return el; })));
        var key = dataset.key;
        console.log(value);
        switch (key) {
            case 'tel':
                {
                    var ok = value.every(function (el) { return util_1.RgexpTel(el); });
                    if (value.length > 3) {
                        wx.showModal({
                            title: "错误",
                            content: "最多只能保存3个号码！！"
                        });
                        return;
                    }
                    if (ok) {
                        this.pushuserTels(value, null);
                    }
                    else {
                        wx.showModal({
                            title: '格式错误',
                            content: '手机号码格式不正确'
                        });
                    }
                }
                break;
            case "mail":
                {
                    var ok = value.every(function (el) { return util_1.RgexpMail(el); });
                    if (ok) {
                        this.pushuserTels(null, value);
                    }
                    else {
                        wx.showModal({
                            title: '格式错误',
                            content: '邮箱格式不正确'
                        });
                    }
                }
                break;
        }
    },
    pushuserTels: function (tels, mails) {
        this.setData({
            tels: tels ? tels.join('\n') : this.data.tels,
            mails: mails ? mails.join('\n') : this.data.mails
        });
        api_1.default.setUserSetupContact(this.data.tels.split('\n'), this.data.mails.split('\n')).then(function () {
            wx.startPullDownRefresh();
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getuserTels()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF5RDtBQUN6RCwwQ0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQWdCO1FBQ3RCLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUtELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELFlBQVksRUFBWjtRQUFBLGlCQVdDO1FBVkMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxLQUFLO1NBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQThCO2dCQUE1QixjQUFJO1lBQ2IsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxJQUFJLEVBQUUsSUFBSTthQUNYLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUM7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7UUFDN0MsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0ssV0FBVzs7Ozs7NEJBQ0osV0FBTSxhQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7d0JBQWpDLEVBQUUsR0FBRyxTQUE0Qjt3QkFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWCxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDNUIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMs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QUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7Ozs7NEJBQ2pCLFdBQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFBOzt3QkFBeEIsU0FBd0IsQ0FBQTt3QkFDeEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7Ozs7O0tBQ3pCO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZ2V4cE1haWwsIFJnZXhwVGVsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIlxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2luZGV4LmpzXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgZGV2czogW10gYXMgVGVybWluYWxbXSxcbiAgICB0ZWxzOiAnJyxcbiAgICBtYWlsczogJydcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc29ydERldnNsaXN0KClcbiAgICB0aGlzLmdldHVzZXJUZWxzKClcbiAgfSxcblxuICBzb3J0RGV2c2xpc3QoKSB7XG4gICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICBrZXk6ICdVdHMnXG4gICAgfSkudGhlbigoeyBkYXRhIH06IHsgZGF0YTogVGVybWluYWxbXSB9KSA9PiB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBkZXZzOiBkYXRhXG4gICAgICB9KVxuICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIHd4LnN3aXRjaFRhYih7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICB9KVxuICB9LFxuICBhc3luYyBnZXR1c2VyVGVscygpIHtcbiAgICBjb25zdCBlbCA9IGF3YWl0IGFwaS5nZXRVc2VyQWxhcm1UZWxzKClcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdGVsczogZWwuYXJnLnRlbHMuam9pbignXFxuJyksXG4gICAgICBtYWlsczogZWwuYXJnLm1haWxzLmpvaW4oJ1xcbicpXG4gICAgfSlcbiAgfSxcbiAgLy8g5L+u5pS555So5oi36IGU57O75pa55byPXG4gIG1vZGlmeVRlbGwoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHsgZGV0YWlsLCBjdXJyZW50VGFyZ2V0OiB7IGRhdGFzZXQgfSB9ID0gZXZlbnRcbiAgICBjb25zdCB2YWx1ZSA9IEFycmF5LmZyb20obmV3IFNldCgoZGV0YWlsLnZhbHVlIGFzIHN0cmluZykucmVwbGFjZSgvKFxcLHxcXO+8jCkvZywgJ1xcbicpLnNwbGl0KCdcXG4nKS5maWx0ZXIoZWwgPT4gZWwpKSlcbiAgICBjb25zdCBrZXkgPSBkYXRhc2V0LmtleSBhcyBzdHJpbmdcbiAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgJ3RlbCc6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBvayA9IHZhbHVlLmV2ZXJ5KGVsID0+IFJnZXhwVGVsKGVsKSlcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwi6ZSZ6K+vXCIsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFwi5pyA5aSa5Y+q6IO95L+d5a2YM+S4quWPt+egge+8ge+8gVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgdGhpcy5wdXNodXNlclRlbHModmFsdWUsIG51bGwpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5qC85byP6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+aJi+acuuWPt+eggeagvOW8j+S4jeato+ehridcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwibWFpbFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3Qgb2sgPSB2YWx1ZS5ldmVyeShlbCA9PiBSZ2V4cE1haWwoZWwpKVxuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgdGhpcy5wdXNodXNlclRlbHMobnVsbCwgdmFsdWUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5qC85byP6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+mCrueuseagvOW8j+S4jeato+ehridcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9LFxuICAvLyDmj5DkuqTkv67mlLnogZTns7vmlrnlvI9cbiAgcHVzaHVzZXJUZWxzKHRlbHM6IHN0cmluZ1tdIHwgbnVsbCwgbWFpbHM6IHN0cmluZ1tdIHwgbnVsbCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0ZWxzOiB0ZWxzID8gdGVscy5qb2luKCdcXG4nKSA6IHRoaXMuZGF0YS50ZWxzLFxuICAgICAgbWFpbHM6IG1haWxzID8gbWFpbHMuam9pbignXFxuJykgOiB0aGlzLmRhdGEubWFpbHNcbiAgICB9KVxuICAgIGFwaS5zZXRVc2VyU2V0dXBDb250YWN0KHRoaXMuZGF0YS50ZWxzLnNwbGl0KCdcXG4nKSwgdGhpcy5kYXRhLm1haWxzLnNwbGl0KCdcXG4nKSkudGhlbigoKSA9PiB7XG4gICAgICB3eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpXG4gICAgfSlcblxuICB9LFxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHRoaXMuZ2V0dXNlclRlbHMoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICovXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfVxufSkiXX0=