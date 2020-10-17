"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Page({
    data: {
        name: '',
        cache: new Map(),
        unit: '',
        min: 0,
        max: 0,
        icon: 'star',
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    },
    onLoad: function (options) {
        var _this = this;
        wx.getStorage({
            key: 'protocolSetup' + options.protocol,
            success: function (_a) {
                var data = _a.data;
                var hasKeys = new Set();
                data.sys.Threshold.forEach(function (el) { return hasKeys.add(el.name); });
                data.user.Threshold.forEach(function (el) { return hasKeys.add(el.name); });
                var setups = data.protocol.instruct.map(function (el) { return el.formResize.filter(function (el2) { return !el2.isState && !hasKeys.has(el2.name); }); })
                    .reduce(function (pre, cur) { return __spreadArrays(pre, cur); });
                var cache = new Map(setups.map(function (el) { return [el.name, el]; }));
                _this.setData({
                    columns: Array.from(cache.keys()),
                    cache: cache
                });
            },
            fail: function () {
                wx.navigateBack();
            }
        });
    },
    minonChange: function (event) {
        var max = this.data.max;
        var min = event.detail;
        this.setData({
            min: min,
            max: min >= max ? Number(min) + 1 : max
        });
    },
    maxonChange: function (event) {
        this.setData({
            max: event.detail
        });
    },
    onChange: function (event) {
        var _a;
        var name = event.detail.value;
        this.setData({
            name: name,
            unit: ((_a = this.data.cache.get(name)) === null || _a === void 0 ? void 0 : _a.unit) || ''
        });
    },
    submit: function () {
        var events = this.getOpenerEventChannel();
        events.emit("addThreshold", this.data);
        wx.navigateBack();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkVGhyZXNob2xkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkVGhyZXNob2xkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0EsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUU7UUFDaEIsSUFBSSxFQUFFLEVBQUU7UUFDUixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxFQUFDLE1BQU07UUFDWCxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0tBQ3hDO0lBS0QsTUFBTSxFQUFFLFVBQVUsT0FBTztRQUFqQixpQkFtQlA7UUFsQkMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxlQUFlLEdBQUcsT0FBTyxDQUFDLFFBQVE7WUFDdkMsT0FBTyxFQUFFLFVBQUMsRUFBMkc7b0JBQXpHLGNBQUk7Z0JBQ2QsSUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtnQkFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQTtnQkFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQTtnQkFDdkQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxFQUFuRSxDQUFtRSxDQUFDO3FCQUNqSCxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxJQUFLLHNCQUFJLEdBQUcsRUFBSyxHQUFHLEdBQWYsQ0FBZ0IsQ0FBQyxDQUFBO2dCQUN6QyxJQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFDLENBQUE7Z0JBQ3RELEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNqQyxLQUFLLE9BQUE7aUJBQ04sQ0FBQyxDQUFBO1lBQ0osQ0FBQztZQUNELElBQUk7Z0JBQ0YsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO1lBQ25CLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsV0FBVyxFQUFYLFVBQVksS0FBZ0I7UUFDMUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDekIsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQWdCLENBQUE7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsS0FBQTtZQUNILEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO1NBQ3hDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxXQUFXLEVBQVgsVUFBWSxLQUFnQjtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxRQUFRLEVBQVIsVUFBUyxLQUFnQjs7UUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLElBQUksTUFBQTtZQUNKLElBQUksRUFBRSxPQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMENBQUUsSUFBSSxLQUFJLEVBQUU7U0FDNUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELE1BQU07UUFDSixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFLRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2FkZFRocmVzaG9sZC9hZGRUaHJlc2hvbGQuanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBuYW1lOiAnJyxcbiAgICBjYWNoZTogbmV3IE1hcCgpLFxuICAgIHVuaXQ6ICcnLFxuICAgIG1pbjogMCxcbiAgICBtYXg6IDAsXG4gICAgaWNvbjonc3RhcicsXG4gICAgY29sdW1uczogWyfmna3lt54nLCAn5a6B5rOiJywgJ+a4qeW3nicsICflmInlhbQnLCAn5rmW5beeJ10sXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICBrZXk6ICdwcm90b2NvbFNldHVwJyArIG9wdGlvbnMucHJvdG9jb2wsXG4gICAgICBzdWNjZXNzOiAoeyBkYXRhIH06IHsgZGF0YTogeyB1c2VyOiBQcm90b2NvbENvbnN0YW50VGhyZXNob2xkLCBzeXM6IFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsIHByb3RvY29sOiBwcm90b2NvbCB9IH0pID0+IHtcbiAgICAgICAgY29uc3QgaGFzS2V5cyA9IG5ldyBTZXQoKVxuICAgICAgICBkYXRhLnN5cy5UaHJlc2hvbGQuZm9yRWFjaChlbCA9PiBoYXNLZXlzLmFkZChlbC5uYW1lKSlcbiAgICAgICAgZGF0YS51c2VyLlRocmVzaG9sZC5mb3JFYWNoKGVsID0+IGhhc0tleXMuYWRkKGVsLm5hbWUpKVxuICAgICAgICBjb25zdCBzZXR1cHMgPSBkYXRhLnByb3RvY29sLmluc3RydWN0Lm1hcChlbCA9PiBlbC5mb3JtUmVzaXplLmZpbHRlcihlbDIgPT4gIWVsMi5pc1N0YXRlICYmICFoYXNLZXlzLmhhcyhlbDIubmFtZSkpKVxuICAgICAgICAgIC5yZWR1Y2UoKHByZSwgY3VyKSA9PiBbLi4ucHJlLCAuLi5jdXJdKVxuICAgICAgICBjb25zdCBjYWNoZSA9IG5ldyBNYXAoc2V0dXBzLm1hcChlbCA9PiBbZWwubmFtZSwgZWxdKSlcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBjb2x1bW5zOiBBcnJheS5mcm9tKGNhY2hlLmtleXMoKSksXG4gICAgICAgICAgY2FjaGVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBmYWlsKCkge1xuICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIG1pbm9uQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBtYXggPSB0aGlzLmRhdGEubWF4XG4gICAgY29uc3QgbWluID0gZXZlbnQuZGV0YWlsIGFzIG51bWJlclxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtaW4sXG4gICAgICBtYXg6IG1pbiA+PSBtYXggPyBOdW1iZXIobWluKSArIDEgOiBtYXhcbiAgICB9KVxuICB9LFxuICBtYXhvbkNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1heDogZXZlbnQuZGV0YWlsXG4gICAgfSlcbiAgfSxcbiAgb25DaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC5kZXRhaWwudmFsdWVcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbmFtZSxcbiAgICAgIHVuaXQ6IHRoaXMuZGF0YS5jYWNoZS5nZXQobmFtZSk/LnVuaXQgfHwgJydcbiAgICB9KVxuICB9LFxuICBzdWJtaXQoKSB7XG4gICAgY29uc3QgZXZlbnRzID0gdGhpcy5nZXRPcGVuZXJFdmVudENoYW5uZWwoKVxuICAgIGV2ZW50cy5lbWl0KFwiYWRkVGhyZXNob2xkXCIsIHRoaXMuZGF0YSlcbiAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH1cbn0pIl19