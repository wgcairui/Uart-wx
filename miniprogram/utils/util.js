"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTime = exports.RgexpMail = exports.RgexpTel = exports.ObjectToStrquery = void 0;
const ObjectToStrquery = (Obj) => {
    const objArr = Object.keys(Obj).map(el => `${el}=${String(Obj[el])}`);
    return "?" + objArr.join("&");
};
exports.ObjectToStrquery = ObjectToStrquery;
const RgexpTel = (tel) => {
    return /^(13[0-9]|14[5-9]|15[0-35-9]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/.test(tel);
};
exports.RgexpTel = RgexpTel;
const RgexpMail = (mail) => {
    return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(mail);
};
exports.RgexpMail = RgexpMail;
const parseTime = (time) => {
    if (time) {
        const date = new Date(time);
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        return `${date.toLocaleDateString()} ${h}:${m}:${s}`;
    }
    else
        return '';
};
exports.parseTime = parseTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ08sTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQXlCLEVBQUUsRUFBRTtJQUM1RCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDckUsT0FBTyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUE7QUFIWSxRQUFBLGdCQUFnQixvQkFHNUI7QUFFTSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO0lBQ3RDLE9BQU8sbUVBQW1FLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsUUFBUSxZQUVwQjtBQUNNLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDeEMsT0FBTyx1R0FBdUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDM0gsQ0FBQyxDQUFBO0FBRlksUUFBQSxTQUFTLGFBRXJCO0FBRU0sTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUE2QixFQUFFLEVBQUU7SUFDekQsSUFBSSxJQUFJLEVBQUU7UUFDUixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQzNCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUMzQixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtLQUNyRDs7UUFDSSxPQUFPLEVBQUUsQ0FBQTtBQUNoQixDQUFDLENBQUE7QUFUWSxRQUFBLFNBQVMsYUFTckIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDovazmjaLlr7nosaHkuLrot6/nlLHlj4LmlbBcbmV4cG9ydCBjb25zdCBPYmplY3RUb1N0cnF1ZXJ5ID0gKE9iajogeyBbeDogc3RyaW5nXTogYW55IH0pID0+IHtcbiAgY29uc3Qgb2JqQXJyID0gT2JqZWN0LmtleXMoT2JqKS5tYXAoZWwgPT4gYCR7ZWx9PSR7U3RyaW5nKE9ialtlbF0pfWApXG4gIHJldHVybiBcIj9cIiArIG9iakFyci5qb2luKFwiJlwiKVxufVxuXG5leHBvcnQgY29uc3QgUmdleHBUZWwgPSAodGVsOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIC9eKDEzWzAtOV18MTRbNS05XXwxNVswLTM1LTldfDE2NnwxN1swLThdfDE4WzAtOV18MTlbODldKVswLTldezh9JC8udGVzdCh0ZWwpXG59XG5leHBvcnQgY29uc3QgUmdleHBNYWlsID0gKG1haWw6IHN0cmluZykgPT4ge1xuICByZXR1cm4gL1tcXHchIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bXFx3ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W1xcd10oPzpbXFx3LV0qW1xcd10pP1xcLikrW1xcd10oPzpbXFx3LV0qW1xcd10pPy8udGVzdChtYWlsKVxufVxuXG5leHBvcnQgY29uc3QgcGFyc2VUaW1lID0gKHRpbWU/OiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlKSA9PiB7XG4gIGlmICh0aW1lKSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWUpXG4gICAgY29uc3QgaCA9IGRhdGUuZ2V0SG91cnMoKVxuICAgIGNvbnN0IG0gPSBkYXRlLmdldE1pbnV0ZXMoKVxuICAgIGNvbnN0IHMgPSBkYXRlLmdldFNlY29uZHMoKVxuICAgIHJldHVybiBgJHtkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpfSAke2h9OiR7bX06JHtzfWBcbiAgfVxuICBlbHNlIHJldHVybiAnJ1xufSJdfQ==