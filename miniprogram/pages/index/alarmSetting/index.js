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
        }).catch(function () {
            wx.showModal({
                title: '设备错误',
                content: '缓存被清理或没有绑定设备,请在首页下拉刷新',
                success: function () {
                    wx.switchTab({ url: '/pages/index/index' });
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF5RDtBQUN6RCwwQ0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQWdCO1FBQ3RCLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUtELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELFlBQVksRUFBWjtRQUFBLGlCQWdCQztRQWZDLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsS0FBSztTQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUE4QjtnQkFBNUIsY0FBSTtZQUNiLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7YUFDWCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDUCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxNQUFNO2dCQUNiLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLE9BQU87b0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0JBQzdDLENBQUM7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSyxXQUFXOzs7Ozs0QkFDSixXQUFNLGFBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzt3QkFBakMsRUFBRSxHQUFHLFNBQTRCO3dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FB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QUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTs7Ozs0QkFDakIsV0FBTSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUF4QixTQUF3QixDQUFBO3dCQUN4QixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Ozs7S0FDekI7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJnZXhwTWFpbCwgUmdleHBUZWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG4vLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvaW5kZXguanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBkZXZzOiBbXSBhcyBUZXJtaW5hbFtdLFxuICAgIHRlbHM6ICcnLFxuICAgIG1haWxzOiAnJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zb3J0RGV2c2xpc3QoKVxuICAgIHRoaXMuZ2V0dXNlclRlbHMoKVxuICB9LFxuXG4gIHNvcnREZXZzbGlzdCgpIHtcbiAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgIGtleTogJ1V0cydcbiAgICB9KS50aGVuKCh7IGRhdGEgfTogeyBkYXRhOiBUZXJtaW5hbFtdIH0pID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGRldnM6IGRhdGFcbiAgICAgIH0pXG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICforr7lpIfplJnor68nLFxuICAgICAgICBjb250ZW50OiAn57yT5a2Y6KKr5riF55CG5oiW5rKh5pyJ57uR5a6a6K6+5aSHLOivt+WcqOmmlumhteS4i+aLieWIt+aWsCcsXG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgd3guc3dpdGNoVGFiKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIGFzeW5jIGdldHVzZXJUZWxzKCkge1xuICAgIGNvbnN0IGVsID0gYXdhaXQgYXBpLmdldFVzZXJBbGFybVRlbHMoKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0ZWxzOiBlbC5hcmcudGVscy5qb2luKCdcXG4nKSxcbiAgICAgIG1haWxzOiBlbC5hcmcubWFpbHMuam9pbignXFxuJylcbiAgICB9KVxuICB9LFxuICAvLyDkv67mlLnnlKjmiLfogZTns7vmlrnlvI9cbiAgbW9kaWZ5VGVsbChldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgeyBkZXRhaWwsIGN1cnJlbnRUYXJnZXQ6IHsgZGF0YXNldCB9IH0gPSBldmVudFxuICAgIGNvbnN0IHZhbHVlID0gQXJyYXkuZnJvbShuZXcgU2V0KChkZXRhaWwudmFsdWUgYXMgc3RyaW5nKS5yZXBsYWNlKC8oXFwsfFxc77yMKS9nLCAnXFxuJykuc3BsaXQoJ1xcbicpLmZpbHRlcihlbCA9PiBlbCkpKVxuICAgIGNvbnN0IGtleSA9IGRhdGFzZXQua2V5IGFzIHN0cmluZ1xuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSAndGVsJzpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG9rID0gdmFsdWUuZXZlcnkoZWwgPT4gUmdleHBUZWwoZWwpKVxuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogXCLplJnor69cIixcbiAgICAgICAgICAgICAgY29udGVudDogXCLmnIDlpJrlj6rog73kv53lrZgz5Liq5Y+356CB77yB77yBXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2h1c2VyVGVscyh2YWx1ZSwgbnVsbClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmoLzlvI/plJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5omL5py65Y+356CB5qC85byP5LiN5q2j56GuJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJtYWlsXCI6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBvayA9IHZhbHVlLmV2ZXJ5KGVsID0+IFJnZXhwTWFpbChlbCkpXG4gICAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2h1c2VyVGVscyhudWxsLCB2YWx1ZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmoLzlvI/plJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OiAn6YKu566x5qC85byP5LiN5q2j56GuJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH0sXG4gIC8vIOaPkOS6pOS/ruaUueiBlOezu+aWueW8j1xuICBwdXNodXNlclRlbHModGVsczogc3RyaW5nW10gfCBudWxsLCBtYWlsczogc3RyaW5nW10gfCBudWxsKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRlbHM6IHRlbHMgPyB0ZWxzLmpvaW4oJ1xcbicpIDogdGhpcy5kYXRhLnRlbHMsXG4gICAgICBtYWlsczogbWFpbHMgPyBtYWlscy5qb2luKCdcXG4nKSA6IHRoaXMuZGF0YS5tYWlsc1xuICAgIH0pXG4gICAgYXBpLnNldFVzZXJTZXR1cENvbnRhY3QodGhpcy5kYXRhLnRlbHMuc3BsaXQoJ1xcbicpLCB0aGlzLmRhdGEubWFpbHMuc3BsaXQoJ1xcbicpKS50aGVuKCgpID0+IHtcbiAgICAgIHd4LnN0YXJ0UHVsbERvd25SZWZyZXNoKClcbiAgICB9KVxuXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5nZXR1c2VyVGVscygpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==