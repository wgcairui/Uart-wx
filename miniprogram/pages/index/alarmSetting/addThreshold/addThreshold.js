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
        columns: [],
    },
    onLoad: function (options) {
        var _this = this;
        wx.getStorage({
            key: 'protocolSetup' + options.protocol,
            success: function (_a) {
                var data = _a.data;
                var setups = data.instruct.map(function (el) { return el.formResize.filter(function (el2) { return !el2.isState; }); })
                    .reduce(function (pre, cur) { return __spreadArrays(pre, cur); });
                var cache = new Map(setups.map(function (el) { return [el.name, el]; }));
                var keysSet = new Set(options.keys.split(","));
                _this.setData({
                    columns: Array.from(cache.keys()).filter(function (el) { return !keysSet.has(el); }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkVGhyZXNob2xkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkVGhyZXNob2xkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0EsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUU7UUFDaEIsSUFBSSxFQUFFLEVBQUU7UUFDUixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxFQUFDLE1BQU07UUFDWCxPQUFPLEVBQUUsRUFBYztLQUN4QjtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFBakIsaUJBaUJQO1FBaEJDLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsZUFBZSxHQUFHLE9BQU8sQ0FBQyxRQUFRO1lBQ3ZDLE9BQU8sRUFBRSxVQUFDLEVBQTRCO29CQUExQixjQUFJO2dCQUNkLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQVosQ0FBWSxDQUFDLEVBQXpDLENBQXlDLENBQUM7cUJBQzlFLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssc0JBQUksR0FBRyxFQUFLLEdBQUcsR0FBZixDQUFnQixDQUFDLENBQUE7Z0JBQ3pDLElBQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQTtnQkFDdEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQVUsT0FBTyxDQUFDLElBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDMUQsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxFQUFFLElBQUUsT0FBQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQWhCLENBQWdCLENBQUM7b0JBQzlELEtBQUssT0FBQTtpQkFDTixDQUFDLENBQUE7WUFDSixDQUFDO1lBQ0QsSUFBSTtnQkFDRixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7WUFDbkIsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxXQUFXLEVBQVgsVUFBWSxLQUFnQjtRQUMxQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUN6QixJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBZ0IsQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRyxLQUFBO1lBQ0gsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7U0FDeEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFdBQVcsRUFBWCxVQUFZLEtBQWdCO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFFBQVEsRUFBUixVQUFTLEtBQWdCOztRQUN2QixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsSUFBSSxNQUFBO1lBQ0osSUFBSSxFQUFFLE9BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywwQ0FBRSxJQUFJLEtBQUksRUFBRTtTQUM1QyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUNKLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvYWRkVGhyZXNob2xkL2FkZFRocmVzaG9sZC5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG5hbWU6ICcnLFxuICAgIGNhY2hlOiBuZXcgTWFwKCksXG4gICAgdW5pdDogJycsXG4gICAgbWluOiAwLFxuICAgIG1heDogMCxcbiAgICBpY29uOidzdGFyJyxcbiAgICBjb2x1bW5zOiBbXSBhcyBzdHJpbmdbXSxcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgIGtleTogJ3Byb3RvY29sU2V0dXAnICsgb3B0aW9ucy5wcm90b2NvbCxcbiAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfTogeyBkYXRhOiBwcm90b2NvbCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNldHVwcyA9IGRhdGEuaW5zdHJ1Y3QubWFwKGVsID0+IGVsLmZvcm1SZXNpemUuZmlsdGVyKGVsMiA9PiAhZWwyLmlzU3RhdGUpKVxuICAgICAgICAgIC5yZWR1Y2UoKHByZSwgY3VyKSA9PiBbLi4ucHJlLCAuLi5jdXJdKVxuICAgICAgICBjb25zdCBjYWNoZSA9IG5ldyBNYXAoc2V0dXBzLm1hcChlbCA9PiBbZWwubmFtZSwgZWxdKSlcbiAgICAgICAgY29uc3Qga2V5c1NldCA9IG5ldyBTZXQoKDxzdHJpbmc+b3B0aW9ucy5rZXlzKS5zcGxpdChcIixcIikpXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgY29sdW1uczogQXJyYXkuZnJvbShjYWNoZS5rZXlzKCkpLmZpbHRlcihlbD0+IWtleXNTZXQuaGFzKGVsKSksXG4gICAgICAgICAgY2FjaGVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBmYWlsKCkge1xuICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIG1pbm9uQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBtYXggPSB0aGlzLmRhdGEubWF4XG4gICAgY29uc3QgbWluID0gZXZlbnQuZGV0YWlsIGFzIG51bWJlclxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtaW4sXG4gICAgICBtYXg6IG1pbiA+PSBtYXggPyBOdW1iZXIobWluKSArIDEgOiBtYXhcbiAgICB9KVxuICB9LFxuICBtYXhvbkNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1heDogZXZlbnQuZGV0YWlsXG4gICAgfSlcbiAgfSxcbiAgb25DaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC5kZXRhaWwudmFsdWVcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbmFtZSxcbiAgICAgIHVuaXQ6IHRoaXMuZGF0YS5jYWNoZS5nZXQobmFtZSk/LnVuaXQgfHwgJydcbiAgICB9KVxuICB9LFxuICBzdWJtaXQoKSB7XG4gICAgY29uc3QgZXZlbnRzID0gdGhpcy5nZXRPcGVuZXJFdmVudENoYW5uZWwoKVxuICAgIGV2ZW50cy5lbWl0KFwiYWRkVGhyZXNob2xkXCIsIHRoaXMuZGF0YSlcbiAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH1cbn0pIl19