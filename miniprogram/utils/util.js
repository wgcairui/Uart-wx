"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectToStrquery = function (Obj) {
    var objArr = Object.keys(Obj).map(function (el) { return el + "=" + String(Obj[el]); });
    return "?" + objArr.join("&");
};
exports.RgexpTel = function (tel) {
    return /^(13[0-9]|14[5-9]|15[0-35-9]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/.test(tel);
};
exports.RgexpMail = function (mail) {
    return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(mail);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDYSxRQUFBLGdCQUFnQixHQUFHLFVBQUMsR0FBeUI7SUFDeEQsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBRyxFQUFFLFNBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBRyxFQUExQixDQUEwQixDQUFDLENBQUE7SUFDckUsT0FBTyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRyxVQUFDLEdBQVc7SUFDbEMsT0FBTyxtRUFBbUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDdEYsQ0FBQyxDQUFBO0FBQ1ksUUFBQSxTQUFTLEdBQUcsVUFBQyxJQUFZO0lBQ3BDLE9BQU8sdUdBQXVHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIOi9rOaNouWvueixoeS4uui3r+eUseWPguaVsFxuZXhwb3J0IGNvbnN0IE9iamVjdFRvU3RycXVlcnkgPSAoT2JqOiB7IFt4OiBzdHJpbmddOiBhbnkgfSkgPT4ge1xuICBjb25zdCBvYmpBcnIgPSBPYmplY3Qua2V5cyhPYmopLm1hcChlbCA9PiBgJHtlbH09JHtTdHJpbmcoT2JqW2VsXSl9YClcbiAgcmV0dXJuIFwiP1wiICsgb2JqQXJyLmpvaW4oXCImXCIpXG59XG5cbmV4cG9ydCBjb25zdCBSZ2V4cFRlbCA9ICh0ZWw6IHN0cmluZykgPT4ge1xuICByZXR1cm4gL14oMTNbMC05XXwxNFs1LTldfDE1WzAtMzUtOV18MTY2fDE3WzAtOF18MThbMC05XXwxOVs4OV0pWzAtOV17OH0kLy50ZXN0KHRlbClcbn1cbmV4cG9ydCBjb25zdCBSZ2V4cE1haWwgPSAobWFpbDogc3RyaW5nKSA9PiB7XG4gIHJldHVybiAvW1xcdyEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlxcLltcXHchIyQlJicqKy89P15fYHt8fX4tXSspKkAoPzpbXFx3XSg/OltcXHctXSpbXFx3XSk/XFwuKStbXFx3XSg/OltcXHctXSpbXFx3XSk/Ly50ZXN0KG1haWwpXG59Il19