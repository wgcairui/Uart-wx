"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var api_1 = require("../../utils/api");
Component({
    properties: {
        protocol: {
            type: String
        }
    },
    data: {
        actionShow: false,
        actionItems: []
    },
    lifetimes: {
        ready: function () {
        }
    },
    methods: {
        oprate: function () {
            var _this = this;
            wx.showLoading({ title: '获取指令列表' });
            api_1.default.getDevOprate(this.data.protocol).then(function (_a) {
                var arg = _a.arg;
                var _b;
                wx.hideLoading();
                var items = ((_b = arg.OprateInstruct) === null || _b === void 0 ? void 0 : _b.map(function (el) { return el; })) || [{ name: '设备不支持操作指令' }];
                _this.setData({
                    actionItems: items,
                    actionShow: true
                });
            });
        },
        actionClose: function () {
            this.setData({
                actionShow: false
            });
        },
        actionSelect: function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var oprate;
                return __generator(this, function (_a) {
                    oprate = event.detail;
                    if (oprate.value)
                        this.triggerEvent("oprate", __assign({}, oprate));
                    return [2];
                });
            });
        },
        opratealarm: function () {
            var _this = this;
            var itemList = ['显示参数', '参数限值', '参数状态'];
            wx.showActionSheet({
                itemList: itemList,
                success: function (res) {
                    _this.triggerEvent('alarm', { type: res.tapIndex });
                },
                fail: function (err) {
                    console.log(err);
                }
            });
        },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2T3ByYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV2T3ByYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBaUM7QUFHakMsU0FBUyxDQUFDO0lBSVIsVUFBVSxFQUFFO1FBQ1YsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDYjtLQUNGO0lBS0QsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLEtBQUs7UUFDakIsV0FBVyxFQUFFLEVBQVM7S0FDdkI7SUFFRCxTQUFTLEVBQUU7UUFDVCxLQUFLO1FBRUwsQ0FBQztLQUNGO0lBS0QsT0FBTyxFQUFFO1FBQ1AsTUFBTTtZQUFOLGlCQVVDO1lBVEMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQ25DLGFBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFPO29CQUFMLFlBQUc7O2dCQUM5QyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2hCLElBQU0sS0FBSyxHQUFHLE9BQUEsR0FBRyxDQUFDLGNBQWMsMENBQUUsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxFQUFGLENBQUUsTUFBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7Z0JBQzFFLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxVQUFVLEVBQUUsS0FBSzthQUNsQixDQUFDLENBQUE7UUFDSixDQUFDO1FBRUssWUFBWSxFQUFsQixVQUFtQixLQUFnQjs7OztvQkFDM0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUF3QixDQUFBO29CQUM3QyxJQUFJLE1BQU0sQ0FBQyxLQUFLO3dCQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxlQUFPLE1BQU0sRUFBRyxDQUFBOzs7O1NBQzdEO1FBR0QsV0FBVztZQUFYLGlCQVlDO1lBWEMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ3pDLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQ2pCLFFBQVEsVUFBQTtnQkFDUixPQUFPLEVBQUUsVUFBQyxHQUFHO29CQUNYLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO2dCQUNwRCxDQUFDO2dCQUNELElBQUksWUFBQyxHQUFHO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRW5CLENBQUM7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDO0tBRUY7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIlxuXG4vLyBjb21wb25lbnQvZGV2T3ByYXRlL2Rldk9wcmF0ZS5qc1xuQ29tcG9uZW50KHtcbiAgLyoqXG4gICAqIOe7hOS7tueahOWxnuaAp+WIl+ihqFxuICAgKi9cbiAgcHJvcGVydGllczoge1xuICAgIHByb3RvY29sOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGFjdGlvblNob3c6IGZhbHNlLFxuICAgIGFjdGlvbkl0ZW1zOiBbXSBhcyBhbnlcbiAgfSxcblxuICBsaWZldGltZXM6IHtcbiAgICByZWFkeSgpIHtcblxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog57uE5Lu255qE5pa55rOV5YiX6KGoXG4gICAqL1xuICBtZXRob2RzOiB7XG4gICAgb3ByYXRlKCkge1xuICAgICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+iOt+WPluaMh+S7pOWIl+ihqCcgfSlcbiAgICAgIGFwaS5nZXREZXZPcHJhdGUodGhpcy5kYXRhLnByb3RvY29sKS50aGVuKCh7IGFyZyB9KSA9PiB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgY29uc3QgaXRlbXMgPSBhcmcuT3ByYXRlSW5zdHJ1Y3Q/Lm1hcChlbCA9PiBlbCkgfHwgW3sgbmFtZTogJ+iuvuWkh+S4jeaUr+aMgeaTjeS9nOaMh+S7pCcgfV1cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBhY3Rpb25JdGVtczogaXRlbXMsXG4gICAgICAgICAgYWN0aW9uU2hvdzogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LFxuICAgIGFjdGlvbkNsb3NlKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYWN0aW9uU2hvdzogZmFsc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICAvLyDpgInmi6nlj5HpgIHmjIfku6RcbiAgICBhc3luYyBhY3Rpb25TZWxlY3QoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgICAgY29uc3Qgb3ByYXRlID0gZXZlbnQuZGV0YWlsIGFzIE9wcmF0ZUluc3RydWN0XG4gICAgICBpZiAob3ByYXRlLnZhbHVlKSB0aGlzLnRyaWdnZXJFdmVudChcIm9wcmF0ZVwiLCB7IC4uLm9wcmF0ZSB9KVxuICAgIH0sXG5cbiAgICAvL1xuICAgIG9wcmF0ZWFsYXJtKCkge1xuICAgICAgY29uc3QgaXRlbUxpc3QgPSBbJ+aYvuekuuWPguaVsCcsICflj4LmlbDpmZDlgLwnLCAn5Y+C5pWw54q25oCBJ11cbiAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgIGl0ZW1MaXN0LFxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2FsYXJtJywgeyB0eXBlOiByZXMudGFwSW5kZXggfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICB9XG59KVxuIl19