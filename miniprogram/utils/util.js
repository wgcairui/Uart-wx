"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeMessage = exports.parseTime = exports.RgexpMail = exports.RgexpTel = exports.ObjectToStrquery = void 0;
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
const SubscribeMessage = (Subscribes) => {
    const Subscribe = {
        "设备告警提醒": '8NX6ji8ABlNAOEMcU7v2jtD4sgCB7NMHguWzxZn3HO4',
        "注册成功提醒": 'XPN75P-0F3so8dE__e5bxS9xznCyNGx4TKX0Fl-i_b4'
    };
    return new Promise((resolve, reject) => {
        wx.requestSubscribeMessage({
            tmplIds: Subscribes.map(sub => Subscribe[sub]),
            success(res) {
                console.log(res);
                resolve(res);
            },
            fail(e) {
                console.log('接口调用失败', e);
                reject(e);
            }
        });
    });
};
exports.SubscribeMessage = SubscribeMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSU8sTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQXlCLEVBQUUsRUFBRTtJQUM1RCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDckUsT0FBTyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUE7QUFIWSxRQUFBLGdCQUFnQixvQkFHNUI7QUFNTSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO0lBQ3RDLE9BQU8sbUVBQW1FLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQTtBQUZZLFFBQUEsUUFBUSxZQUVwQjtBQUtNLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDeEMsT0FBTyx1R0FBdUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDM0gsQ0FBQyxDQUFBO0FBRlksUUFBQSxTQUFTLGFBRXJCO0FBT00sTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUE2QixFQUFFLEVBQUU7SUFDekQsSUFBSSxJQUFJLEVBQUU7UUFDUixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQzNCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUMzQixPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtLQUNyRDs7UUFDSSxPQUFPLEVBQUUsQ0FBQTtBQUNoQixDQUFDLENBQUE7QUFUWSxRQUFBLFNBQVMsYUFTckI7QUFNTSxNQUFNLGdCQUFnQixHQUFHLENBQUMsVUFBMkIsRUFBRSxFQUFFO0lBQzlELE1BQU0sU0FBUyxHQUFHO1FBQ2hCLFFBQVEsRUFBRSw2Q0FBNkM7UUFDdkQsUUFBUSxFQUFFLDZDQUE2QztLQUN4RCxDQUFBO0lBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBaUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckcsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBRXpCLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxHQUFHO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNkLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBbkJZLFFBQUEsZ0JBQWdCLG9CQW1CNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOi9rOaNouWvueixoeS4uui3r+eUseWPguaVsFxuICogQHBhcmFtIE9iaiBqc29u5a+56LGhXG4gKi9cbmV4cG9ydCBjb25zdCBPYmplY3RUb1N0cnF1ZXJ5ID0gKE9iajogeyBbeDogc3RyaW5nXTogYW55IH0pID0+IHtcbiAgY29uc3Qgb2JqQXJyID0gT2JqZWN0LmtleXMoT2JqKS5tYXAoZWwgPT4gYCR7ZWx9PSR7U3RyaW5nKE9ialtlbF0pfWApXG4gIHJldHVybiBcIj9cIiArIG9iakFyci5qb2luKFwiJlwiKVxufVxuXG4vKipcbiAqIOmqjOivgXRlbOaYr+WQpuWQiOinhFxuICogQHBhcmFtIHRlbCBcbiAqL1xuZXhwb3J0IGNvbnN0IFJnZXhwVGVsID0gKHRlbDogc3RyaW5nKSA9PiB7XG4gIHJldHVybiAvXigxM1swLTldfDE0WzUtOV18MTVbMC0zNS05XXwxNjZ8MTdbMC04XXwxOFswLTldfDE5Wzg5XSlbMC05XXs4fSQvLnRlc3QodGVsKVxufVxuLyoqXG4gKiDpqozor4Hpgq7nrrHmmK/lkKblkIjop4RcbiAqIEBwYXJhbSBtYWlsIFxuICovXG5leHBvcnQgY29uc3QgUmdleHBNYWlsID0gKG1haWw6IHN0cmluZykgPT4ge1xuICByZXR1cm4gL1tcXHchIyQlJicqKy89P15fYHt8fX4tXSsoPzpcXC5bXFx3ISMkJSYnKisvPT9eX2B7fH1+LV0rKSpAKD86W1xcd10oPzpbXFx3LV0qW1xcd10pP1xcLikrW1xcd10oPzpbXFx3LV0qW1xcd10pPy8udGVzdChtYWlsKVxufVxuXG4vKipcbiAqIOi9rOaNokRhdGXmoIflh4bml7bpl7TkuLrmmJPor7vnmoQyNOWwj+aXtuaXtumXtFxuICogQHBhcmFtIHRpbWUgXG4gKiBAcmV0dXJucyBsaWtlIDIwMjEvMy82IDA5OjE4OjMzXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZVRpbWUgPSAodGltZT86IHN0cmluZyB8IG51bWJlciB8IERhdGUpID0+IHtcbiAgaWYgKHRpbWUpIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZSlcbiAgICBjb25zdCBoID0gZGF0ZS5nZXRIb3VycygpXG4gICAgY29uc3QgbSA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgY29uc3QgcyA9IGRhdGUuZ2V0U2Vjb25kcygpXG4gICAgcmV0dXJuIGAke2RhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCl9ICR7aH06JHttfToke3N9YFxuICB9XG4gIGVsc2UgcmV0dXJuICcnXG59XG5cbi8qKlxuICog5byA6YCa6K6i6ZiF5raI5oGvXG4gKi9cbnR5cGUgU3Vic2NyaWJlVHlwZSA9IFwi6K6+5aSH5ZGK6K2m5o+Q6YaSXCIgfCBcIuazqOWGjOaIkOWKn+aPkOmGklwiXG5leHBvcnQgY29uc3QgU3Vic2NyaWJlTWVzc2FnZSA9IChTdWJzY3JpYmVzOiBTdWJzY3JpYmVUeXBlW10pID0+IHtcbiAgY29uc3QgU3Vic2NyaWJlID0ge1xuICAgIFwi6K6+5aSH5ZGK6K2m5o+Q6YaSXCI6ICc4Tlg2amk4QUJsTkFPRU1jVTd2Mmp0RDRzZ0NCN05NSGd1V3p4Wm4zSE80JyxcbiAgICBcIuazqOWGjOaIkOWKn+aPkOmGklwiOiAnWFBONzVQLTBGM3NvOGRFX19lNWJ4Uzl4em5DeU5HeDRUS1gwRmwtaV9iNCdcbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2U8V2VjaGF0TWluaXByb2dyYW0uUmVxdWVzdFN1YnNjcmliZU1lc3NhZ2VTdWNjZXNzQ2FsbGJhY2tSZXN1bHQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3eC5yZXF1ZXN0U3Vic2NyaWJlTWVzc2FnZSh7XG4gICAgICAvLyDorqLpmIXmtojmga9pZFxuICAgICAgdG1wbElkczogU3Vic2NyaWJlcy5tYXAoc3ViID0+IFN1YnNjcmliZVtzdWJdKSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgfSxcbiAgICAgIGZhaWwoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygn5o6l5Y+j6LCD55So5aSx6LSlJywgZSk7XG4gICAgICAgIHJlamVjdChlKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59Il19