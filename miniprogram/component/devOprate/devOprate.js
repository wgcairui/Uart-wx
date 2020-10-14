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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2T3ByYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV2T3ByYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBaUM7QUFHakMsU0FBUyxDQUFDO0lBSVIsVUFBVSxFQUFFO1FBQ1YsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDYjtLQUNGO0lBS0QsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLEtBQUs7UUFDakIsV0FBVyxFQUFFLEVBQVM7S0FDdkI7SUFFRCxTQUFTLEVBQUU7UUFDVCxLQUFLO1FBRUwsQ0FBQztLQUNGO0lBS0QsT0FBTyxFQUFFO1FBQ1AsTUFBTTtZQUFOLGlCQVVDO1lBVEMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQ25DLGFBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxFQUFPO29CQUFMLFlBQUc7O2dCQUM5QyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2hCLElBQU0sS0FBSyxHQUFHLE9BQUEsR0FBRyxDQUFDLGNBQWMsMENBQUUsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxFQUFGLENBQUUsTUFBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7Z0JBQzFFLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsV0FBVyxFQUFFLEtBQUs7b0JBQ2xCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxVQUFVLEVBQUUsS0FBSzthQUNsQixDQUFDLENBQUE7UUFDSixDQUFDO1FBRUssWUFBWSxFQUFsQixVQUFtQixLQUFnQjs7OztvQkFDM0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUF3QixDQUFBO29CQUM3QyxJQUFJLE1BQU0sQ0FBQyxLQUFLO3dCQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxlQUFPLE1BQU0sRUFBRyxDQUFBOzs7O1NBQzdEO1FBR0QsV0FBVztZQUFYLGlCQVlDO1lBWEMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ3pDLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQ2pCLFFBQVEsVUFBQTtnQkFDUixPQUFPLEVBQUUsVUFBQyxHQUFHO29CQUNYLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO2dCQUNwRCxDQUFDO2dCQUNELElBQUksWUFBQyxHQUFHO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRW5CLENBQUM7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDO0tBRUY7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUb1N0cnF1ZXJ5IH0gZnJvbSBcIm1pbmlwcm9ncmFtL3V0aWxzL3V0aWxcIlxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gY29tcG9uZW50L2Rldk9wcmF0ZS9kZXZPcHJhdGUuanNcbkNvbXBvbmVudCh7XG4gIC8qKlxuICAgKiDnu4Tku7bnmoTlsZ7mgKfliJfooahcbiAgICovXG4gIHByb3BlcnRpZXM6IHtcbiAgICBwcm90b2NvbDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiDnu4Tku7bnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBhY3Rpb25TaG93OiBmYWxzZSxcbiAgICBhY3Rpb25JdGVtczogW10gYXMgYW55XG4gIH0sXG5cbiAgbGlmZXRpbWVzOiB7XG4gICAgcmVhZHkoKSB7XG5cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczoge1xuICAgIG9wcmF0ZSgpIHtcbiAgICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfojrflj5bmjIfku6TliJfooagnIH0pXG4gICAgICBhcGkuZ2V0RGV2T3ByYXRlKHRoaXMuZGF0YS5wcm90b2NvbCkudGhlbigoeyBhcmcgfSkgPT4ge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gYXJnLk9wcmF0ZUluc3RydWN0Py5tYXAoZWwgPT4gZWwpIHx8IFt7IG5hbWU6ICforr7lpIfkuI3mlK/mjIHmk43kvZzmjIfku6QnIH1dXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYWN0aW9uSXRlbXM6IGl0ZW1zLFxuICAgICAgICAgIGFjdGlvblNob3c6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBhY3Rpb25DbG9zZSgpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFjdGlvblNob3c6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sXG4gICAgLy8g6YCJ5oup5Y+R6YCB5oyH5LukXG4gICAgYXN5bmMgYWN0aW9uU2VsZWN0KGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICAgIGNvbnN0IG9wcmF0ZSA9IGV2ZW50LmRldGFpbCBhcyBPcHJhdGVJbnN0cnVjdFxuICAgICAgaWYgKG9wcmF0ZS52YWx1ZSkgdGhpcy50cmlnZ2VyRXZlbnQoXCJvcHJhdGVcIiwgeyAuLi5vcHJhdGUgfSlcbiAgICB9LFxuXG4gICAgLy9cbiAgICBvcHJhdGVhbGFybSgpIHtcbiAgICAgIGNvbnN0IGl0ZW1MaXN0ID0gWyfmmL7npLrlj4LmlbAnLCAn5Y+C5pWw6ZmQ5YC8JywgJ+WPguaVsOeKtuaAgSddXG4gICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICBpdGVtTGlzdCxcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdhbGFybScsIHsgdHlwZTogcmVzLnRhcEluZGV4IH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcblxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgfVxufSlcbiJdfQ==