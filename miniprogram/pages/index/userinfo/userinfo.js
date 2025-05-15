"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
const util_1 = require("../../../utils/util");
Page({
    data: {
        name: '',
        avanter: '',
        creatTime: "",
        modifyTime: "",
        user: "",
        tel: "",
        mail: "",
        proxy: "",
        company: "",
        address: "",
        rgtype: ''
    },
    onLoad: function (_options) {
        this.start();
    },
    start() {
        api_1.default.userInfo().then(async ({ code, data }) => {
            if (code) {
                this.setData({
                    avanter: data.avanter,
                    name: data.name,
                    creatTime: new Date(data.creatTime).toLocaleString(),
                    modifyTime: new Date(data.modifyTime).toLocaleString(),
                    mail: data.mail,
                    proxy: data.proxy,
                    tel: data.tel,
                    user: data.user,
                    company: data.company,
                    rgtype: data.rgtype || 'web'
                });
                const jw = await api_1.default.V2_API_Aamp_ip2local(data.address?.split(":").reverse()[0]);
                console.log(jw.data);
                const jwFormat = jw.data.split(',').reverse();
                if (jwFormat && jwFormat.length === 2) {
                    const ad = await api_1.default.getGPSaddress(jw.data.split(',').reverse().join(","));
                    this.setData({
                        address: ad.data.address
                    });
                }
            }
        });
    },
    bindViewTap() {
    },
    telChange(event) {
        const value = event.detail.value;
        if ((0, util_1.RgexpTel)(value)) {
            api_1.default.modifyUserInfo({ tel: Number(value) }).then(({ code, msg }) => {
                if (code) {
                    this.setData({
                        tel: value
                    });
                }
                else {
                    wx.showModal({
                        title: 'Error',
                        content: msg
                    });
                }
            });
        }
        else {
            wx.showModal({
                title: '值错误',
                content: "手机号码格式不正确,请重新输入"
            });
        }
    },
    mailChange(event) {
        const value = event.detail.value;
        if ((0, util_1.RgexpMail)(value)) {
            api_1.default.modifyUserInfo({ 'mail': value }).then(({ code, msg }) => {
                if (code) {
                    this.setData({
                        mail: value
                    });
                }
                else {
                    wx.showModal({
                        title: 'Error',
                        content: msg
                    });
                }
            });
        }
        else {
            wx.showModal({
                title: '值错误',
                content: "邮箱格式不正确,请重新输入"
            });
        }
    },
    nameChange(event) {
        const value = event.detail.value;
        api_1.default.modifyUserInfo({ 'name': value }).then(({ code, msg }) => {
            if (code) {
                this.setData({
                    name: value
                });
            }
            else {
                wx.showModal({
                    title: 'Error',
                    content: msg
                });
            }
        });
    },
    proxyChange(event) {
        const value = event.detail.value;
        if (value === '' || /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(value)) {
            api_1.default.modifyUserInfo({ 'proxy': value }).then(({ code, msg }) => {
                if (code) {
                    this.setData({
                        proxy: value
                    });
                }
                else {
                    wx.showModal({
                        title: 'Error',
                        content: msg
                    });
                }
            });
        }
        else {
            wx.showModal({
                title: '值错误',
                content: "url格式不正确,请重新输入"
            });
        }
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
        this.start();
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvQztBQUNwQyw4Q0FBeUQ7QUFDekQsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLEVBQUUsRUFBRTtLQUNYO0lBS0QsTUFBTSxFQUFFLFVBQVUsUUFBYTtRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDZCxDQUFDO0lBRUQsS0FBSztRQUNILGFBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFFVCxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBZ0IsQ0FBQyxDQUFDLGNBQWMsRUFBRTtvQkFDM0QsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFpQixDQUFDLENBQUMsY0FBYyxFQUFFO29CQUM3RCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQVU7b0JBQ3BCLElBQUks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QUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLE9BQU87d0JBQ2QsT0FBTyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQyxDQUFBO2dCQUNKLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7YUFBTSxDQUFDO1lBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsS0FBSztnQkFDWixPQUFPLEVBQUUsZ0JBQWdCO2FBQzFCLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFFSCxDQUFDO0lBSUQsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNaLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5pbXBvcnQgeyBSZ2V4cE1haWwsIFJnZXhwVGVsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIlxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG5hbWU6ICcnLFxuICAgIGF2YW50ZXI6ICcnLFxuICAgIGNyZWF0VGltZTogXCJcIixcbiAgICBtb2RpZnlUaW1lOiBcIlwiLFxuICAgIHVzZXI6IFwiXCIsXG4gICAgdGVsOiBcIlwiLFxuICAgIG1haWw6IFwiXCIsXG4gICAgcHJveHk6IFwiXCIsXG4gICAgY29tcGFueTogXCJcIixcbiAgICBhZGRyZXNzOiBcIlwiLFxuICAgIHJndHlwZTogJydcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKF9vcHRpb25zOiBhbnkpIHtcbiAgICB0aGlzLnN0YXJ0KClcbiAgfSxcbiAgLy9cbiAgc3RhcnQoKSB7XG4gICAgYXBpLnVzZXJJbmZvKCkudGhlbihhc3luYyAoeyBjb2RlLCBkYXRhIH0pID0+IHtcbiAgICAgIGlmIChjb2RlKSB7XG5cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBhdmFudGVyOiBkYXRhLmF2YW50ZXIsXG4gICAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgIGNyZWF0VGltZTogbmV3IERhdGUoZGF0YS5jcmVhdFRpbWUgYXMgYW55KS50b0xvY2FsZVN0cmluZygpLFxuICAgICAgICAgIG1vZGlmeVRpbWU6IG5ldyBEYXRlKGRhdGEubW9kaWZ5VGltZSBhcyBhbnkpLnRvTG9jYWxlU3RyaW5nKCksXG4gICAgICAgICAgbWFpbDogZGF0YS5tYWlsLFxuICAgICAgICAgIHByb3h5OiBkYXRhLnByb3h5LFxuICAgICAgICAgIHRlbDogZGF0YS50ZWwgYXMgYW55LFxuICAgICAgICAgIHVzZXI6IGRhdGEudXNlcixcbiAgICAgICAgICBjb21wYW55OiBkYXRhLmNvbXBhbnksXG4gICAgICAgICAgcmd0eXBlOiBkYXRhLnJndHlwZSB8fCAnd2ViJ1xuICAgICAgICB9KVxuICAgICAgICBjb25zdCBqdyA9IGF3YWl0IGFwaS5WMl9BUElfQWFtcF9pcDJsb2NhbChkYXRhLmFkZHJlc3M/LnNwbGl0KFwiOlwiKS5yZXZlcnNlKClbMF0hKVxuICAgICAgICBjb25zb2xlLmxvZyhqdy5kYXRhKTtcbiAgICAgICAgY29uc3QgandGb3JtYXQgPSBqdy5kYXRhLnNwbGl0KCcsJykucmV2ZXJzZSgpXG4gICAgICAgIGlmKGp3Rm9ybWF0ICYmIGp3Rm9ybWF0Lmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgY29uc3QgYWQgPSBhd2FpdCBhcGkuZ2V0R1BTYWRkcmVzcyhqdy5kYXRhLnNwbGl0KCcsJykucmV2ZXJzZSgpLmpvaW4oXCIsXCIpKVxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZC5kYXRhLmFkZHJlc3NcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBiaW5kVmlld1RhcCgpIHtcbiAgfSxcbiAgLy9cbiAgdGVsQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZSBhcyBzdHJpbmdcbiAgICBpZiAoUmdleHBUZWwodmFsdWUpKSB7XG4gICAgICBhcGkubW9kaWZ5VXNlckluZm8oeyB0ZWw6IE51bWJlcih2YWx1ZSkgfSkudGhlbigoeyBjb2RlLCBtc2cgfSkgPT4ge1xuICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB0ZWw6IHZhbHVlXG4gICAgICAgICAgfSlcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflgLzplJnor68nLFxuICAgICAgICBjb250ZW50OiBcIuaJi+acuuWPt+eggeagvOW8j+S4jeato+ehrizor7fph43mlrDovpPlhaVcIlxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1haWxDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGlmIChSZ2V4cE1haWwodmFsdWUpKSB7XG4gICAgICBhcGkubW9kaWZ5VXNlckluZm8oeyAnbWFpbCc6IHZhbHVlIH0pLnRoZW4oKHsgY29kZSwgbXNnIH0pID0+IHtcbiAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgbWFpbDogdmFsdWVcbiAgICAgICAgICB9KVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgICAgY29udGVudDogbXNnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflgLzplJnor68nLFxuICAgICAgICBjb250ZW50OiBcIumCrueuseagvOW8j+S4jeato+ehrizor7fph43mlrDovpPlhaVcIlxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG5hbWVDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGFwaS5tb2RpZnlVc2VySW5mbyh7ICduYW1lJzogdmFsdWUgfSkudGhlbigoeyBjb2RlLCBtc2cgfSkgPT4ge1xuICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBuYW1lOiB2YWx1ZVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHByb3h5Q2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZSBhcyBzdHJpbmdcbiAgICBpZiAodmFsdWUgPT09ICcnIHx8IC9eaHR0cHM/OlxcL1xcLygoW2EtekEtWjAtOV8tXSkrKFxcLik/KSooOlxcZCspPyhcXC8oKFxcLik/KFxcPyk/PT8mP1thLXpBLVowLTlfLV0oXFw/KT8pKikqJC9pLnRlc3QodmFsdWUpKSB7XG4gICAgICBhcGkubW9kaWZ5VXNlckluZm8oeyAncHJveHknOiB2YWx1ZSB9KS50aGVuKCh7IGNvZGUsIG1zZyB9KSA9PiB7XG4gICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHByb3h5OiB2YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgICAgY29udGVudDogbXNnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflgLzplJnor68nLFxuICAgICAgICBjb250ZW50OiBcInVybOagvOW8j+S4jeato+ehrizor7fph43mlrDovpPlhaVcIlxuICAgICAgfSlcbiAgICB9XG5cbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN0YXJ0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH1cbn0pIl19