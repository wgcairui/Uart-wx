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
var computed = require("miniprogram-computed");
var api_1 = require("../../utils/api");
Page({
    behaviors: [computed],
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
    computed: {
        isR: function (data) {
            var istel = /^1(3|4|5|7|8)\d{9}$/.test(data.tel);
            return istel;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBQ2hDLCtDQUFnRDtBQUNoRCx1Q0FBa0M7QUFDbEMsSUFBSSxDQUFDO0lBQ0gsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBSXJCLElBQUksRUFBRTtRQUNKLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO1FBQ25ELFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFFBQVEsRUFBRSxFQUFnQztRQUMxQyxHQUFHLEVBQUUsRUFBRTtRQUNQLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sRUFBRSxFQUFFO0tBQ1g7SUFDRCxNQUFNLFlBQUMsR0FBRztRQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFFBQVEsRUFBRTtRQUNSLEdBQUcsRUFBSCxVQUFJLElBQVM7WUFDWCxJQUFNLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2xELE9BQU8sS0FBSyxDQUFBO1FBQ2QsQ0FBQztLQUNGO0lBS0QsV0FBVyxFQUFYLFVBQVksQ0FBTTtRQUNoQixHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUMzQixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUssY0FBYyxFQUFwQixVQUFxQixDQUFNOzs7Ozs0QkFDVixXQUFNLGFBQUcsQ0FBQyxjQUFjLENBQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBQTs7d0JBQWxHLE1BQU0sR0FBRyxTQUF5Rjt3QkFDeEcsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXO3lCQUM1QixDQUFDLENBQUE7Ozs7O0tBQ0g7SUFFRCxRQUFRLEVBQVI7UUFDUSxJQUFBLEtBQTZDLElBQUksQ0FBQyxJQUFJLEVBQXBELGdCQUFpQyxFQUFyQixRQUFRLGNBQUEsRUFBRSxTQUFTLGVBQUEsRUFBSSxHQUFHLFNBQWMsQ0FBQTtRQUM1RCxhQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUM1RixJQUFJLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUUsTUFBSyxDQUFDLEVBQUU7Z0JBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRCxPQUFNO2FBQ1A7WUFDRCxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ2hDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUM3QixDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO0lBQzlDLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9sb2dpbi9sb2dpbi5qc1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcbmltcG9ydCAqIGFzIGNvbXB1dGVkIGZyb20gXCJtaW5pcHJvZ3JhbS1jb21wdXRlZFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIjtcblBhZ2Uoe1xuICBiZWhhdmlvcnM6IFtjb21wdXRlZF0sXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBoYXNVc2VySW5mbzogZmFsc2UsXG4gICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxuICAgIGlzcmVnaXN0ZXI6IGZhbHNlLFxuICAgIHVzZXJJbmZvOiB7fSBhcyBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbyxcbiAgICB0ZWw6ICcnLFxuICAgIHJlZ2lzdGVybG9hZGluZzogZmFsc2UsXG4gICAgb3BlbmlkOiAnJ1xuICB9LFxuICBvbkxvYWQob3B0KSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG9wZW5pZDogb3B0Lm9wZW5pZFxuICAgIH0pXG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBpc1IoZGF0YTogYW55KSB7XG4gICAgICBjb25zdCBpc3RlbCA9IC9eMSgzfDR8NXw3fDgpXFxkezl9JC8udGVzdChkYXRhLnRlbClcbiAgICAgIHJldHVybiBpc3RlbFxuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICB9KVxuICB9LFxuICAvLyDojrflj5bnlKjmiLfmiYvmnLrlj7fnoIFcbiAgYXN5bmMgZ2V0cGhvbmVudW1iZXIoZTogYW55KSB7XG4gICAgY29uc3QgdGVsT2JqID0gYXdhaXQgYXBpLmdldHBob25lbnVtYmVyPGFueT4oeyBlbmNyeXB0ZWREYXRhOiBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLCBpdjogZS5kZXRhaWwuaXYgfSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdGVsOiB0ZWxPYmouYXJnLnBob25lTnVtYmVyLy9yZXMuYXJnLmNvdW50cnlDb2RlICsgcmVzLmFyZy5waG9uZU51bWJlclxuICAgIH0pXG4gIH0sXG4gIC8vIOazqOWGjOeUqOaIt1xuICByZWdpc3RlcigpIHtcbiAgICBjb25zdCB7IHVzZXJJbmZvOiB7IG5pY2tOYW1lLCBhdmF0YXJVcmwgfSwgdGVsIH0gPSB0aGlzLmRhdGFcbiAgICBhcGkucmVnaXN0ZXJVc2VyKHsgdXNlcjogdGhpcy5kYXRhLm9wZW5pZCwgbmFtZTogbmlja05hbWUsIGF2YW50ZXI6IGF2YXRhclVybCwgdGVsIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXM/Lm9rICE9PSAxKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiByZXMgYXMgYW55LCBpY29uOiBcIm5vbmVcIiB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiByZXMubXNnIH0pXG4gICAgICB3eC5yZWRpcmVjdFRvKHsgdXJsOiBcIi9cIiB9KVxuICAgIH0pXG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgfVxufSkiXX0=