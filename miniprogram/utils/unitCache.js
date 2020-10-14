"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var unit = (function () {
    function unit() {
        this.cache = new Map();
    }
    unit.prototype.get = function (value, unit) {
        if (unit && /^{.*}$/.test(unit)) {
            var unitObject = this.cache.get(unit);
            if (unitObject)
                return unitObject;
            else {
                var parseObject = this.parse(value, unit);
                this.cache.set(unit, parseObject);
                return parseObject;
            }
        }
        else {
            return {
                value: value,
                unit: unit
            };
        }
    };
    unit.prototype.parse = function (value, unit) {
        var arr = unit.replace(/(\{|\}| )/g, "")
            .split(",")
            .map(function (el) {
            var _a;
            var _b = el.split(":"), key = _b[0], val = _b[1];
            return _a = {}, _a[key] = val, _a;
        });
        var valueStr = String(value);
        return {
            value: Object.assign.apply(Object, __spreadArrays([{}], arr))[valueStr],
            unit: ''
        };
    };
    return unit;
}());
exports.default = new unit();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdENhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidW5pdENhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBO0lBS0U7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUNELGtCQUFHLEdBQUgsVUFBSSxLQUFzQixFQUFFLElBQVk7UUFDdEMsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN2QyxJQUFJLFVBQVU7Z0JBQUUsT0FBTyxVQUFVLENBQUE7aUJBQzVCO2dCQUNILElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUE7Z0JBQ2pDLE9BQU8sV0FBVyxDQUFBO2FBQ25CO1NBQ0Y7YUFBTTtZQUNMLE9BQU87Z0JBQ0wsS0FBSyxPQUFBO2dCQUNMLElBQUksTUFBQTthQUNMLENBQUE7U0FDRjtJQUVILENBQUM7SUFFTyxvQkFBSyxHQUFiLFVBQWMsS0FBc0IsRUFBRSxJQUFZO1FBQ2hELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQzthQUN2QyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLFVBQUEsRUFBRTs7WUFDQyxJQUFBLGtCQUEwQixFQUF6QixXQUFHLEVBQUUsV0FBb0IsQ0FBQTtZQUNoQyxnQkFBUyxHQUFDLEdBQUcsSUFBRyxHQUFHLEtBQUU7UUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFDSixJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDOUIsT0FBTztZQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxPQUFiLE1BQU0sa0JBQVEsRUFBRSxHQUFLLEdBQUcsR0FBRSxRQUFRLENBQVc7WUFDcEQsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFBO0lBQ0gsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBRUQsa0JBQWUsSUFBSSxJQUFJLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIOS/neWtmOiuvuWkh+WPguaVsOino+aekOeKtuaAgVxuXG5jbGFzcyB1bml0IHtcbiAgcHJpdmF0ZSBjYWNoZTogTWFwPHN0cmluZywge1xuICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgdW5pdDogc3RyaW5nXG4gIH0+XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FjaGUgPSBuZXcgTWFwKClcbiAgfVxuICBnZXQodmFsdWU6IHN0cmluZyB8IG51bWJlciwgdW5pdDogc3RyaW5nKSB7XG4gICAgaWYgKHVuaXQgJiYgL157Lip9JC8udGVzdCh1bml0KSkge1xuICAgICAgY29uc3QgdW5pdE9iamVjdCA9IHRoaXMuY2FjaGUuZ2V0KHVuaXQpXG4gICAgICBpZiAodW5pdE9iamVjdCkgcmV0dXJuIHVuaXRPYmplY3RcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJzZU9iamVjdCA9IHRoaXMucGFyc2UodmFsdWUsIHVuaXQpXG4gICAgICAgIHRoaXMuY2FjaGUuc2V0KHVuaXQsIHBhcnNlT2JqZWN0KVxuICAgICAgICByZXR1cm4gcGFyc2VPYmplY3RcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHVuaXRcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgcGFyc2UodmFsdWU6IHN0cmluZyB8IG51bWJlciwgdW5pdDogc3RyaW5nKSB7XG4gICAgY29uc3QgYXJyID0gdW5pdC5yZXBsYWNlKC8oXFx7fFxcfXwgKS9nLCBcIlwiKVxuICAgICAgLnNwbGl0KFwiLFwiKVxuICAgICAgLm1hcChlbCA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbF0gPSBlbC5zcGxpdChcIjpcIilcbiAgICAgICAgcmV0dXJuIHsgW2tleV06IHZhbCB9XG4gICAgICB9KVxuICAgIGNvbnN0IHZhbHVlU3RyID0gU3RyaW5nKHZhbHVlKVxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogT2JqZWN0LmFzc2lnbih7fSwgLi4uYXJyKVt2YWx1ZVN0cl0gYXMgc3RyaW5nLFxuICAgICAgdW5pdDogJydcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IHVuaXQoKSJdfQ==