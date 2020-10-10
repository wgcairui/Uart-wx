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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdENhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidW5pdENhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBO0lBRUU7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUNELGtCQUFHLEdBQUgsVUFBSSxLQUFzQixFQUFFLElBQVk7UUFDdEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlCLElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDNUI7YUFBTTtZQUNMLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBQ2pDLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzdCO0lBQ0gsQ0FBQztJQUVPLG9CQUFLLEdBQWIsVUFBYyxJQUFZO1FBQ3hCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQzthQUN2QyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLFVBQUEsRUFBRTs7WUFDQyxJQUFBLGtCQUEwQixFQUF6QixXQUFHLEVBQUUsV0FBb0IsQ0FBQTtZQUNoQyxnQkFBUyxHQUFDLEdBQUcsSUFBRyxHQUFHLEtBQUU7UUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFDSixPQUFPLE1BQU0sQ0FBQyxNQUFNLE9BQWIsTUFBTSxrQkFBUSxFQUFFLEdBQUssR0FBRyxHQUFDO0lBQ2xDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQztBQUVELGtCQUFlLElBQUksSUFBSSxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDkv53lrZjorr7lpIflj4LmlbDop6PmnpDnirbmgIFcblxuY2xhc3MgdW5pdCB7XG4gIHByaXZhdGUgY2FjaGU6IE1hcDxzdHJpbmcsIHsgW3g6IHN0cmluZ106IHN0cmluZyB9PlxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNhY2hlID0gbmV3IE1hcCgpXG4gIH1cbiAgZ2V0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIHVuaXQ6IHN0cmluZykge1xuICAgIGNvbnN0IHVuaXRPYmplY3QgPSB0aGlzLmNhY2hlLmdldCh1bml0KVxuICAgIGNvbnN0IHZhbHVlU3RyID0gU3RyaW5nKHZhbHVlKVxuICAgIGlmICh1bml0T2JqZWN0KSB7XG4gICAgICByZXR1cm4gdW5pdE9iamVjdFt2YWx1ZVN0cl1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGFyc2VPYmplY3QgPSB0aGlzLnBhcnNlKHVuaXQpXG4gICAgICB0aGlzLmNhY2hlLnNldCh1bml0LCBwYXJzZU9iamVjdClcbiAgICAgIHJldHVybiBwYXJzZU9iamVjdFt2YWx1ZVN0cl1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBhcnNlKHVuaXQ6IHN0cmluZyk6IHsgW3g6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgICBjb25zdCBhcnIgPSB1bml0LnJlcGxhY2UoLyhcXHt8XFx9fCApL2csIFwiXCIpXG4gICAgICAuc3BsaXQoXCIsXCIpXG4gICAgICAubWFwKGVsID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsXSA9IGVsLnNwbGl0KFwiOlwiKVxuICAgICAgICByZXR1cm4geyBba2V5XTogdmFsIH1cbiAgICAgIH0pXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLmFycilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgdW5pdCgpIl19