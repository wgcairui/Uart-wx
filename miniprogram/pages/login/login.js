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
var app = getApp();
var api_1 = require("../../utils/api");
Page({
    data: {
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isregister: false,
        userInfo: {},
        tel: '',
        registerloading: false,
        openid: ''
    },
    onLoad: function (opt) {
        this.setData({
            openid: opt.openid
        });
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },
    getphonenumber: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var telObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, api_1.default.getphonenumber({ encryptedData: e.detail.encryptedData, iv: e.detail.iv })];
                    case 1:
                        telObj = _a.sent();
                        this.setData({
                            tel: telObj.arg.phoneNumber
                        });
                        return [2];
                }
            });
        });
    },
    register: function () {
        var _a = this.data, _b = _a.userInfo, nickName = _b.nickName, avatarUrl = _b.avatarUrl, tel = _a.tel;
        api_1.default.registerUser({ user: this.data.openid, name: nickName, avanter: avatarUrl, tel: tel }).then(function (res) {
            if ((res === null || res === void 0 ? void 0 : res.ok) !== 1) {
                wx.showToast({ title: res, icon: "none" });
                return;
            }
            wx.showToast({ title: res.msg });
            wx.redirectTo({ url: "/" });
        });
        wx.navigateTo({ url: '/pages/index/index' });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBQ2hDLHVDQUFrQztBQUNsQyxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixXQUFXLEVBQUUsS0FBSztRQUNsQixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztRQUNuRCxVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsRUFBZ0M7UUFDMUMsR0FBRyxFQUFFLEVBQUU7UUFDUCxlQUFlLEVBQUUsS0FBSztRQUN0QixNQUFNLEVBQUUsRUFBRTtLQUNYO0lBQ0QsTUFBTSxZQUFDLEdBQUc7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1NBQ25CLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFNRCxXQUFXLEVBQVgsVUFBWSxDQUFNO1FBQ2hCLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzNCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxjQUFjLEVBQXBCLFVBQXFCLENBQU07Ozs7OzRCQUNWLFdBQU0sYUFBRyxDQUFDLGNBQWMsQ0FBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFBOzt3QkFBbEcsTUFBTSxHQUFHLFNBQXlGO3dCQUN4RyxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVc7eUJBQzVCLENBQUMsQ0FBQTs7Ozs7S0FDSDtJQUVELFFBQVEsRUFBUjtRQUNRLElBQUEsS0FBNkMsSUFBSSxDQUFDLElBQUksRUFBcEQsZ0JBQWlDLEVBQXJCLFFBQVEsY0FBQSxFQUFFLFNBQVMsZUFBQSxFQUFJLEdBQUcsU0FBYyxDQUFBO1FBQzVELGFBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQzVGLElBQUksQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsRUFBRSxNQUFLLENBQUMsRUFBRTtnQkFDakIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7Z0JBQ2pELE9BQU07YUFDUDtZQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7WUFDaEMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7SUFDOUMsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2xvZ2luL2xvZ2luLmpzXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCI7XG5QYWdlKHtcbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgaXNyZWdpc3RlcjogZmFsc2UsXG4gICAgdXNlckluZm86IHt9IGFzIFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvLFxuICAgIHRlbDogJycsXG4gICAgcmVnaXN0ZXJsb2FkaW5nOiBmYWxzZSxcbiAgICBvcGVuaWQ6ICcnXG4gIH0sXG4gIG9uTG9hZChvcHQpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgb3BlbmlkOiBvcHQub3BlbmlkXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcbiAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgIH0pXG4gIH0sXG4gIC8vIOiOt+WPlueUqOaIt+aJi+acuuWPt+eggVxuICBhc3luYyBnZXRwaG9uZW51bWJlcihlOiBhbnkpIHtcbiAgICBjb25zdCB0ZWxPYmogPSBhd2FpdCBhcGkuZ2V0cGhvbmVudW1iZXI8YW55Pih7IGVuY3J5cHRlZERhdGE6IGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsIGl2OiBlLmRldGFpbC5pdiB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0ZWw6IHRlbE9iai5hcmcucGhvbmVOdW1iZXIvL3Jlcy5hcmcuY291bnRyeUNvZGUgKyByZXMuYXJnLnBob25lTnVtYmVyXG4gICAgfSlcbiAgfSxcbiAgLy8g5rOo5YaM55So5oi3XG4gIHJlZ2lzdGVyKCkge1xuICAgIGNvbnN0IHsgdXNlckluZm86IHsgbmlja05hbWUsIGF2YXRhclVybCB9LCB0ZWwgfSA9IHRoaXMuZGF0YVxuICAgIGFwaS5yZWdpc3RlclVzZXIoeyB1c2VyOiB0aGlzLmRhdGEub3BlbmlkLCBuYW1lOiBuaWNrTmFtZSwgYXZhbnRlcjogYXZhdGFyVXJsLCB0ZWwgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcz8ub2sgIT09IDEpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IHJlcyBhcyBhbnksIGljb246IFwibm9uZVwiIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IHJlcy5tc2cgfSlcbiAgICAgIHd4LnJlZGlyZWN0VG8oeyB1cmw6IFwiL1wiIH0pXG4gICAgfSlcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICB9XG59KSJdfQ==