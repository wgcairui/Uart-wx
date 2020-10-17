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
            else
                return this.parse(value, unit);
        }
        else {
            return {
                value: value,
                unit: unit
            };
        }
    };
    unit.prototype.getunitObject = function (value, unit) {
        var unitObject = this.cache.get(unit);
        if (unitObject)
            return unitObject.parseArray;
        else {
            return this.parse(value, unit).parseArray;
        }
    };
    unit.prototype.parse = function (value, unit) {
        var arr = unit.replace(/(\{|\}| )/g, "")
            .split(",")
            .map(function (el) {
            var _a;
            var _b = el.split(":"), key = _b[0], text = _b[1];
            return _a = {}, _a[key] = text, _a.key = key, _a.text = text, _a;
        });
        var valueStr = String(value);
        var parseObject = Object.assign.apply(Object, __spreadArrays([{}], arr));
        var result = {
            value: parseObject[valueStr],
            unit: '',
            parse: parseObject,
            parseArray: arr
        };
        this.cache.set(unit, result);
        return result;
    };
    return unit;
}());
exports.default = new unit();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdENhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidW5pdENhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBO0lBV0U7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUNELGtCQUFHLEdBQUgsVUFBSSxLQUFzQixFQUFFLElBQVk7UUFDdEMsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN2QyxJQUFJLFVBQVU7Z0JBQUUsT0FBTyxVQUFVLENBQUE7O2dCQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ3BDO2FBQU07WUFDTCxPQUFPO2dCQUNMLEtBQUssT0FBQTtnQkFDTCxJQUFJLE1BQUE7YUFDTCxDQUFBO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsNEJBQWEsR0FBYixVQUFjLEtBQXNCLEVBQUUsSUFBWTtRQUNoRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QyxJQUFJLFVBQVU7WUFBRSxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUE7YUFDdkM7WUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQTtTQUMxQztJQUNILENBQUM7SUFFTyxvQkFBSyxHQUFiLFVBQWMsS0FBc0IsRUFBRSxJQUFZO1FBQ2hELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQzthQUN2QyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLFVBQUEsRUFBRTs7WUFDQyxJQUFBLGtCQUEyQixFQUExQixXQUFHLEVBQUUsWUFBcUIsQ0FBQTtZQUNqQyxnQkFBUyxHQUFDLEdBQUcsSUFBRyxJQUFJLEVBQUMsTUFBRyxNQUFBLEVBQUMsT0FBSSxPQUFBLEtBQUU7UUFDakMsQ0FBQyxDQUFDLENBQUE7UUFDSixJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDOUIsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sT0FBYixNQUFNLGtCQUFRLEVBQUUsR0FBSyxHQUFHLEVBQTRCLENBQUE7UUFDeEUsSUFBTSxNQUFNLEdBQUc7WUFDYixLQUFLLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFJLEVBQUUsRUFBRTtZQUNSLEtBQUssRUFBRSxXQUFXO1lBQ2xCLFVBQVUsRUFBRSxHQUFHO1NBQ2hCLENBQUE7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDNUIsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFyREQsSUFxREM7QUFFRCxrQkFBZSxJQUFJLElBQUksRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5L+d5a2Y6K6+5aSH5Y+C5pWw6Kej5p6Q54q25oCBXG5cbmNsYXNzIHVuaXQge1xuICBwcml2YXRlIGNhY2hlOiBNYXA8c3RyaW5nLCB7XG4gICAgdmFsdWU6IHN0cmluZyxcbiAgICB1bml0OiBzdHJpbmcsXG4gICAgcGFyc2U6IHtcbiAgICAgIFt4OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICBwYXJzZUFycmF5OiB7XG4gICAgICBbeDogc3RyaW5nXTogc3RyaW5nO1xuICAgIH1bXTtcbiAgfT5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYWNoZSA9IG5ldyBNYXAoKVxuICB9XG4gIGdldCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCB1bml0OiBzdHJpbmcpIHtcbiAgICBpZiAodW5pdCAmJiAvXnsuKn0kLy50ZXN0KHVuaXQpKSB7XG4gICAgICBjb25zdCB1bml0T2JqZWN0ID0gdGhpcy5jYWNoZS5nZXQodW5pdClcbiAgICAgIGlmICh1bml0T2JqZWN0KSByZXR1cm4gdW5pdE9iamVjdFxuICAgICAgZWxzZSByZXR1cm4gdGhpcy5wYXJzZSh2YWx1ZSwgdW5pdClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHVuaXRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXR1bml0T2JqZWN0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIHVuaXQ6IHN0cmluZykge1xuICAgIGNvbnN0IHVuaXRPYmplY3QgPSB0aGlzLmNhY2hlLmdldCh1bml0KVxuICAgIGlmICh1bml0T2JqZWN0KSByZXR1cm4gdW5pdE9iamVjdC5wYXJzZUFycmF5XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJzZSh2YWx1ZSwgdW5pdCkucGFyc2VBcnJheVxuICAgIH1cbiAgfVxuICAvLyDovazmjaLorr7lpId1bml0XG4gIHByaXZhdGUgcGFyc2UodmFsdWU6IHN0cmluZyB8IG51bWJlciwgdW5pdDogc3RyaW5nKSB7XG4gICAgY29uc3QgYXJyID0gdW5pdC5yZXBsYWNlKC8oXFx7fFxcfXwgKS9nLCBcIlwiKVxuICAgICAgLnNwbGl0KFwiLFwiKVxuICAgICAgLm1hcChlbCA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHRleHRdID0gZWwuc3BsaXQoXCI6XCIpXG4gICAgICAgIHJldHVybiB7IFtrZXldOiB0ZXh0LGtleSx0ZXh0IH1cbiAgICAgIH0pXG4gICAgY29uc3QgdmFsdWVTdHIgPSBTdHJpbmcodmFsdWUpXG4gICAgY29uc3QgcGFyc2VPYmplY3QgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcnIpIGFzIHsgW3g6IHN0cmluZ106IHN0cmluZyB9XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgdmFsdWU6IHBhcnNlT2JqZWN0W3ZhbHVlU3RyXSxcbiAgICAgIHVuaXQ6ICcnLFxuICAgICAgcGFyc2U6IHBhcnNlT2JqZWN0LFxuICAgICAgcGFyc2VBcnJheTogYXJyXG4gICAgfVxuICAgIHRoaXMuY2FjaGUuc2V0KHVuaXQsIHJlc3VsdClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IHVuaXQoKSJdfQ==