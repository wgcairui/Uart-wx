"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectToStrquery = void 0;
exports.ObjectToStrquery = function (Obj) {
    var objArr = Object.keys(Obj).map(function (el) { return el + "=" + Obj[el]; });
    return "?" + objArr.join("&");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ2EsUUFBQSxnQkFBZ0IsR0FBRyxVQUFDLEdBQTRCO0lBQzNELElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUcsRUFBRSxTQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUcsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFBO0lBQzdELE9BQU8sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8g6L2s5o2i5a+56LGh5Li66Lev55Sx5Y+C5pWwXG5leHBvcnQgY29uc3QgT2JqZWN0VG9TdHJxdWVyeSA9IChPYmo6IHsgW3g6IHN0cmluZ106IHN0cmluZyB9KSA9PiB7XG4gIGNvbnN0IG9iakFyciA9IE9iamVjdC5rZXlzKE9iaikubWFwKGVsID0+IGAke2VsfT0ke09ialtlbF19YClcbiAgcmV0dXJuIFwiP1wiICsgb2JqQXJyLmpvaW4oXCImXCIpXG59Il19