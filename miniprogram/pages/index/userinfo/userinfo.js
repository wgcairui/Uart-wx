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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvQztBQUNwQyw4Q0FBeUQ7QUFDekQsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLEVBQUUsRUFBRTtLQUNYO0lBS0QsTUFBTSxFQUFFLFVBQVUsUUFBYTtRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDZCxDQUFDO0lBRUQsS0FBSztRQUNILGFBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxJQUFJLEVBQUU7Z0JBRVIsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQWdCLENBQUMsQ0FBQyxjQUFjLEVBQUU7b0JBQzNELFVBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBaUIsQ0FBQyxDQUFDLGNBQWMsRUFBRTtvQkFDN0QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFVO29CQUNwQixJQUFJLEVBQUUs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QUFFLEtBQUs7Z0JBQ1osT0FBTyxFQUFFLGdCQUFnQjthQUMxQixDQUFDLENBQUE7U0FDSDtJQUVILENBQUM7SUFJRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7UUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ1osRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IFJnZXhwTWFpbCwgUmdleHBUZWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgY3JlYXRUaW1lOiBcIlwiLFxuICAgIG1vZGlmeVRpbWU6IFwiXCIsXG4gICAgdXNlcjogXCJcIixcbiAgICB0ZWw6IFwiXCIsXG4gICAgbWFpbDogXCJcIixcbiAgICBwcm94eTogXCJcIixcbiAgICBjb21wYW55OiBcIlwiLFxuICAgIGFkZHJlc3M6IFwiXCIsXG4gICAgcmd0eXBlOiAnJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoX29wdGlvbnM6IGFueSkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuICAvL1xuICBzdGFydCgpIHtcbiAgICBhcGkudXNlckluZm8oKS50aGVuKGFzeW5jICh7IGNvZGUsIGRhdGEgfSkgPT4ge1xuICAgICAgaWYgKGNvZGUpIHtcblxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGF2YW50ZXI6IGRhdGEuYXZhbnRlcixcbiAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgY3JlYXRUaW1lOiBuZXcgRGF0ZShkYXRhLmNyZWF0VGltZSBhcyBhbnkpLnRvTG9jYWxlU3RyaW5nKCksXG4gICAgICAgICAgbW9kaWZ5VGltZTogbmV3IERhdGUoZGF0YS5tb2RpZnlUaW1lIGFzIGFueSkudG9Mb2NhbGVTdHJpbmcoKSxcbiAgICAgICAgICBtYWlsOiBkYXRhLm1haWwsXG4gICAgICAgICAgcHJveHk6IGRhdGEucHJveHksXG4gICAgICAgICAgdGVsOiBkYXRhLnRlbCBhcyBhbnksXG4gICAgICAgICAgdXNlcjogZGF0YS51c2VyLFxuICAgICAgICAgIGNvbXBhbnk6IGRhdGEuY29tcGFueSxcbiAgICAgICAgICByZ3R5cGU6IGRhdGEucmd0eXBlIHx8ICd3ZWInXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGp3ID0gYXdhaXQgYXBpLlYyX0FQSV9BYW1wX2lwMmxvY2FsKGRhdGEuYWRkcmVzcz8uc3BsaXQoXCI6XCIpLnJldmVyc2UoKVswXSEpXG4gICAgICAgIGNvbnNvbGUubG9nKGp3LmRhdGEpO1xuICAgICAgICBjb25zdCBqd0Zvcm1hdCA9IGp3LmRhdGEuc3BsaXQoJywnKS5yZXZlcnNlKClcbiAgICAgICAgaWYoandGb3JtYXQgJiYgandGb3JtYXQubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICBjb25zdCBhZCA9IGF3YWl0IGFwaS5nZXRHUFNhZGRyZXNzKGp3LmRhdGEuc3BsaXQoJywnKS5yZXZlcnNlKCkuam9pbihcIixcIikpXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkLmRhdGEuYWRkcmVzc1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGJpbmRWaWV3VGFwKCkge1xuICB9LFxuICAvL1xuICB0ZWxDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGlmIChSZ2V4cFRlbCh2YWx1ZSkpIHtcbiAgICAgIGFwaS5tb2RpZnlVc2VySW5mbyh7IHRlbDogTnVtYmVyKHZhbHVlKSB9KS50aGVuKCh7IGNvZGUsIG1zZyB9KSA9PiB7XG4gICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHRlbDogdmFsdWVcbiAgICAgICAgICB9KVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgICAgY29udGVudDogbXNnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WAvOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IFwi5omL5py65Y+356CB5qC85byP5LiN5q2j56GuLOivt+mHjeaWsOi+k+WFpVwiXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbWFpbENoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWUgYXMgc3RyaW5nXG4gICAgaWYgKFJnZXhwTWFpbCh2YWx1ZSkpIHtcbiAgICAgIGFwaS5tb2RpZnlVc2VySW5mbyh7ICdtYWlsJzogdmFsdWUgfSkudGhlbigoeyBjb2RlLCBtc2cgfSkgPT4ge1xuICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBtYWlsOiB2YWx1ZVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WAvOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IFwi6YKu566x5qC85byP5LiN5q2j56GuLOivt+mHjeaWsOi+k+WFpVwiXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbmFtZUNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWUgYXMgc3RyaW5nXG4gICAgYXBpLm1vZGlmeVVzZXJJbmZvKHsgJ25hbWUnOiB2YWx1ZSB9KS50aGVuKCh7IGNvZGUsIG1zZyB9KSA9PiB7XG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG5hbWU6IHZhbHVlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgcHJveHlDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgL15odHRwcz86XFwvXFwvKChbYS16QS1aMC05Xy1dKSsoXFwuKT8pKig6XFxkKyk/KFxcLygoXFwuKT8oXFw/KT89PyY/W2EtekEtWjAtOV8tXShcXD8pPykqKSokL2kudGVzdCh2YWx1ZSkpIHtcbiAgICAgIGFwaS5tb2RpZnlVc2VySW5mbyh7ICdwcm94eSc6IHZhbHVlIH0pLnRoZW4oKHsgY29kZSwgbXNnIH0pID0+IHtcbiAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgcHJveHk6IHZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WAvOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IFwidXJs5qC85byP5LiN5q2j56GuLOivt+mHjeaWsOi+k+WFpVwiXG4gICAgICB9KVxuICAgIH1cblxuICB9LFxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICovXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfVxufSkiXX0=