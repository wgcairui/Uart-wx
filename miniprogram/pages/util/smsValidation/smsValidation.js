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
        tel: '',
        sms: '',
        senddisable: false,
        sendtext: '发送验证码'
    },
    onLoad: function () {
        this.getTel();
    },
    getTel: function () {
        return __awaiter(this, void 0, void 0, function () {
            var arg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({ title: '获取用户手机号码' });
                        return [4, api_1.default.getUserTel()];
                    case 1:
                        arg = (_a.sent()).arg;
                        wx.hideLoading();
                        this.setData({
                            tel: arg
                        });
                        return [2];
                }
            });
        });
    },
    sendValidation: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ok, msg;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wx.showLoading({ title: '正在发送' });
                        return [4, api_1.default.sendValidation()];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, msg = _a.msg;
                        wx.hideLoading();
                        if (!ok)
                            wx.showModal({ title: '发送失败', content: msg });
                        this.setData({
                            senddisable: true,
                            sendtext: '60秒后再试'
                        });
                        setTimeout(function () {
                            _this.setData({
                                senddisable: false,
                                sendtext: '发送验证码'
                            });
                        }, 1000 * 60);
                        return [2];
                }
            });
        });
    },
    checkSms: function (_event) {
        var _this = this;
        if (this.data.sms.length > 3) {
            api_1.default.ValidationCode(Number(this.data.sms)).then(function (el) {
                if (el.ok) {
                    var event_1 = _this.getOpenerEventChannel();
                    event_1.emit("validationSuccess", { code: _this.data.sms });
                    wx.navigateBack();
                }
                else {
                    wx.showModal({
                        title: '检验失败',
                        content: el.msg
                    });
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21zVmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNtc1ZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFFBQVEsRUFBRSxPQUFPO0tBQ2xCO0lBS0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVLLE1BQU07Ozs7Ozt3QkFDVixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7d0JBQ3JCLFdBQU0sYUFBRyxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBOUIsR0FBRyxHQUFLLENBQUEsU0FBc0IsQ0FBQSxJQUEzQjt3QkFDWCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7d0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsR0FBRyxFQUFFLEdBQUc7eUJBQ1QsQ0FBQyxDQUFBOzs7OztLQUNIO0lBRUssY0FBYzs7Ozs7Ozt3QkFDbEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO3dCQUNiLFdBQU0sYUFBRyxDQUFDLGNBQWMsRUFBRSxFQUFBOzt3QkFBeEMsS0FBYyxTQUEwQixFQUF0QyxFQUFFLFFBQUEsRUFBRSxHQUFHLFNBQUE7d0JBQ2YsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO3dCQUNoQixJQUFJLENBQUMsRUFBRTs0QkFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTt3QkFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWCxXQUFXLEVBQUUsSUFBSTs0QkFDakIsUUFBUSxFQUFFLFFBQVE7eUJBQ25CLENBQUMsQ0FBQTt3QkFDRixVQUFVLENBQUM7NEJBQ1QsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxXQUFXLEVBQUUsS0FBSztnQ0FDbEIsUUFBUSxFQUFFLE9BQU87NkJBQ2xCLENBQUMsQ0FBQTt3QkFDSixDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBOzs7OztLQUNkO0lBRUQsUUFBUSxFQUFSLFVBQVMsTUFBaUI7UUFBMUIsaUJBZUM7UUFkQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUIsYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7Z0JBQy9DLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDVCxJQUFNLE9BQUssR0FBRyxLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtvQkFDMUMsT0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7b0JBQ3hELEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtpQkFDbEI7cUJBQU07b0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsTUFBTTt3QkFDYixPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUc7cUJBQ2hCLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvdXRpbC9zbXNWYWxpZGF0aW9uL3Ntc1ZhbGlkYXRpb24uanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICB0ZWw6ICcnLFxuICAgIHNtczogJycsXG4gICAgc2VuZGRpc2FibGU6IGZhbHNlLFxuICAgIHNlbmR0ZXh0OiAn5Y+R6YCB6aqM6K+B56CBJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5nZXRUZWwoKVxuICB9LFxuICAvLyDojrflj5bnlKjmiLfmiYvmnLrlj7fnoIFcbiAgYXN5bmMgZ2V0VGVsKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfojrflj5bnlKjmiLfmiYvmnLrlj7fnoIEnIH0pXG4gICAgY29uc3QgeyBhcmcgfSA9IGF3YWl0IGFwaS5nZXRVc2VyVGVsKClcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRlbDogYXJnXG4gICAgfSlcbiAgfSxcbiAgLy8g5Y+R6YCB55+t5L+h6aqM6K+B56CBXG4gIGFzeW5jIHNlbmRWYWxpZGF0aW9uKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjlj5HpgIEnIH0pXG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkuc2VuZFZhbGlkYXRpb24oKVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICBpZiAoIW9rKSB3eC5zaG93TW9kYWwoeyB0aXRsZTogJ+WPkemAgeWksei0pScsIGNvbnRlbnQ6IG1zZyB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzZW5kZGlzYWJsZTogdHJ1ZSxcbiAgICAgIHNlbmR0ZXh0OiAnNjDnp5LlkI7lho3or5UnXG4gICAgfSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHNlbmRkaXNhYmxlOiBmYWxzZSxcbiAgICAgICAgc2VuZHRleHQ6ICflj5HpgIHpqozor4HnoIEnXG4gICAgICB9KVxuICAgIH0sIDEwMDAgKiA2MClcbiAgfSxcbiAgLy8g5qOA5p+l6aqM6K+B56CB77yM5aaC5p6c5pivNOS9jeWImeS4iuS8oOmqjOivgVxuICBjaGVja1NtcyhfZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGlmICh0aGlzLmRhdGEuc21zLmxlbmd0aCA+IDMpIHtcbiAgICAgIGFwaS5WYWxpZGF0aW9uQ29kZShOdW1iZXIodGhpcy5kYXRhLnNtcykpLnRoZW4oZWwgPT4ge1xuICAgICAgICBpZiAoZWwub2spIHtcbiAgICAgICAgICBjb25zdCBldmVudCA9IHRoaXMuZ2V0T3BlbmVyRXZlbnRDaGFubmVsKClcbiAgICAgICAgICBldmVudC5lbWl0KFwidmFsaWRhdGlvblN1Y2Nlc3NcIiwgeyBjb2RlOiB0aGlzLmRhdGEuc21zIH0pXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmo4DpqozlpLHotKUnLFxuICAgICAgICAgICAgY29udGVudDogZWwubXNnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pIl19