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
        var unitObject = this.cache.get(unit);
        var valueStr = String(value);
        if (unitObject) {
            return unitObject[valueStr];
        }
        else {
            var parseObject = this.parse(unit);
            this.cache.set(unit, parseObject);
            return parseObject[valueStr];
        }
    };
    unit.prototype.parse = function (unit) {
        var arr = unit.replace(/(\{|\}| )/g, "")
            .split(",")
            .map(function (el) {
            var _a;
            var _b = el.split(":"), key = _b[0], val = _b[1];
            return _a = {}, _a[key] = val, _a;
        });
        return Object.assign.apply(Object, __spreadArrays([{}], arr));
    };
    return unit;
}());
exports.default = new unit();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdENhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidW5pdENhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBO0lBRUU7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUNELGtCQUFHLEdBQUgsVUFBSSxLQUFzQixFQUFFLElBQVk7UUFDdEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlCLElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDNUI7YUFBTTtZQUNMLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBQ2pDLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzdCO0lBQ0gsQ0FBQztJQUVPLG9CQUFLLEdBQWIsVUFBYyxJQUFZO1FBQ3hCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQzthQUN2QyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLFVBQUEsRUFBRTs7WUFDQyxJQUFBLEtBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBekIsR0FBRyxRQUFBLEVBQUUsR0FBRyxRQUFpQixDQUFBO1lBQ2hDLGdCQUFTLEdBQUMsR0FBRyxJQUFHLEdBQUcsS0FBRTtRQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNKLE9BQU8sTUFBTSxDQUFDLE1BQU0sT0FBYixNQUFNLGtCQUFRLEVBQUUsR0FBSyxHQUFHLEdBQUM7SUFDbEMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBRUQsa0JBQWUsSUFBSSxJQUFJLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIOS/neWtmOiuvuWkh+WPguaVsOino+aekOeKtuaAgVxuXG5jbGFzcyB1bml0IHtcbiAgcHJpdmF0ZSBjYWNoZTogTWFwPHN0cmluZywgeyBbeDogc3RyaW5nXTogc3RyaW5nIH0+XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FjaGUgPSBuZXcgTWFwKClcbiAgfVxuICBnZXQodmFsdWU6IHN0cmluZyB8IG51bWJlciwgdW5pdDogc3RyaW5nKSB7XG4gICAgY29uc3QgdW5pdE9iamVjdCA9IHRoaXMuY2FjaGUuZ2V0KHVuaXQpXG4gICAgY29uc3QgdmFsdWVTdHIgPSBTdHJpbmcodmFsdWUpXG4gICAgaWYgKHVuaXRPYmplY3QpIHtcbiAgICAgIHJldHVybiB1bml0T2JqZWN0W3ZhbHVlU3RyXVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXJzZU9iamVjdCA9IHRoaXMucGFyc2UodW5pdClcbiAgICAgIHRoaXMuY2FjaGUuc2V0KHVuaXQsIHBhcnNlT2JqZWN0KVxuICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0W3ZhbHVlU3RyXVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGFyc2UodW5pdDogc3RyaW5nKTogeyBbeDogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIGNvbnN0IGFyciA9IHVuaXQucmVwbGFjZSgvKFxce3xcXH18ICkvZywgXCJcIilcbiAgICAgIC5zcGxpdChcIixcIilcbiAgICAgIC5tYXAoZWwgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWxdID0gZWwuc3BsaXQoXCI6XCIpXG4gICAgICAgIHJldHVybiB7IFtrZXldOiB2YWwgfVxuICAgICAgfSlcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgLi4uYXJyKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyB1bml0KCkiXX0=