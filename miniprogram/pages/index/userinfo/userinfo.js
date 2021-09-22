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
                const ad = await api_1.default.getGPSaddress(jw.data.split(',').reverse().join(","));
                this.setData({
                    address: ad.data.address
                });
            }
        });
    },
    bindViewTap() {
    },
    telChange(event) {
        const value = event.detail.value;
        if (util_1.RgexpTel(value)) {
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
        if (util_1.RgexpMail(value)) {
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
        if (/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(value)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvQztBQUNwQyw4Q0FBeUQ7QUFDekQsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLEVBQUUsRUFBRTtLQUNYO0lBS0QsTUFBTSxFQUFFLFVBQVUsUUFBYTtRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDZCxDQUFDO0lBRUQsS0FBSztRQUNILGFBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxJQUFJLEVBQUU7Z0JBRVIsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQWdCLENBQUMsQ0FBQyxjQUFjLEVBQUU7b0JBQzNELFVBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBaUIsQ0FBQyxDQUFDLGNBQWMsRUFBRTtvQkFDN0QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFVO29CQUNwQixJQUFJLEVBQUUs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QUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IFJnZXhwTWFpbCwgUmdleHBUZWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgY3JlYXRUaW1lOiBcIlwiLFxuICAgIG1vZGlmeVRpbWU6IFwiXCIsXG4gICAgdXNlcjogXCJcIixcbiAgICB0ZWw6IFwiXCIsXG4gICAgbWFpbDogXCJcIixcbiAgICBwcm94eTogXCJcIixcbiAgICBjb21wYW55OiBcIlwiLFxuICAgIGFkZHJlc3M6IFwiXCIsXG4gICAgcmd0eXBlOiAnJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoX29wdGlvbnM6IGFueSkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuICAvL1xuICBzdGFydCgpIHtcbiAgICBhcGkudXNlckluZm8oKS50aGVuKGFzeW5jICh7IGNvZGUsIGRhdGEgfSkgPT4ge1xuICAgICAgaWYgKGNvZGUpIHtcblxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGF2YW50ZXI6IGRhdGEuYXZhbnRlcixcbiAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgY3JlYXRUaW1lOiBuZXcgRGF0ZShkYXRhLmNyZWF0VGltZSBhcyBhbnkpLnRvTG9jYWxlU3RyaW5nKCksXG4gICAgICAgICAgbW9kaWZ5VGltZTogbmV3IERhdGUoZGF0YS5tb2RpZnlUaW1lIGFzIGFueSkudG9Mb2NhbGVTdHJpbmcoKSxcbiAgICAgICAgICBtYWlsOiBkYXRhLm1haWwsXG4gICAgICAgICAgcHJveHk6IGRhdGEucHJveHksXG4gICAgICAgICAgdGVsOiBkYXRhLnRlbCBhcyBhbnksXG4gICAgICAgICAgdXNlcjogZGF0YS51c2VyLFxuICAgICAgICAgIGNvbXBhbnk6IGRhdGEuY29tcGFueSxcbiAgICAgICAgICByZ3R5cGU6IGRhdGEucmd0eXBlIHx8ICd3ZWInXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGp3ID0gYXdhaXQgYXBpLlYyX0FQSV9BYW1wX2lwMmxvY2FsKGRhdGEuYWRkcmVzcz8uc3BsaXQoXCI6XCIpLnJldmVyc2UoKVswXSEpXG4gICAgICAgIGNvbnN0IGFkID0gYXdhaXQgYXBpLmdldEdQU2FkZHJlc3MoancuZGF0YS5zcGxpdCgnLCcpLnJldmVyc2UoKS5qb2luKFwiLFwiKSlcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBhZGRyZXNzOiBhZC5kYXRhLmFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGJpbmRWaWV3VGFwKCkge1xuICB9LFxuICAvL1xuICB0ZWxDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGlmIChSZ2V4cFRlbCh2YWx1ZSkpIHtcbiAgICAgIGFwaS5tb2RpZnlVc2VySW5mbyh7IHRlbDogTnVtYmVyKHZhbHVlKSB9KS50aGVuKCh7IGNvZGUsIG1zZyB9KSA9PiB7XG4gICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHRlbDogdmFsdWVcbiAgICAgICAgICB9KVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgICAgY29udGVudDogbXNnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WAvOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IFwi5omL5py65Y+356CB5qC85byP5LiN5q2j56GuLOivt+mHjeaWsOi+k+WFpVwiXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbWFpbENoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWUgYXMgc3RyaW5nXG4gICAgaWYgKFJnZXhwTWFpbCh2YWx1ZSkpIHtcbiAgICAgIGFwaS5tb2RpZnlVc2VySW5mbyh7ICdtYWlsJzogdmFsdWUgfSkudGhlbigoeyBjb2RlLCBtc2cgfSkgPT4ge1xuICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBtYWlsOiB2YWx1ZVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WAvOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IFwi6YKu566x5qC85byP5LiN5q2j56GuLOivt+mHjeaWsOi+k+WFpVwiXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbmFtZUNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWUgYXMgc3RyaW5nXG4gICAgYXBpLm1vZGlmeVVzZXJJbmZvKHsgJ25hbWUnOiB2YWx1ZSB9KS50aGVuKCh7IGNvZGUsIG1zZyB9KSA9PiB7XG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG5hbWU6IHZhbHVlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgcHJveHlDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGlmICgvXmh0dHBzPzpcXC9cXC8oKFthLXpBLVowLTlfLV0pKyhcXC4pPykqKDpcXGQrKT8oXFwvKChcXC4pPyhcXD8pPz0/Jj9bYS16QS1aMC05Xy1dKFxcPyk/KSopKiQvaS50ZXN0KHZhbHVlKSkge1xuICAgICAgYXBpLm1vZGlmeVVzZXJJbmZvKHsgJ3Byb3h5JzogdmFsdWUgfSkudGhlbigoeyBjb2RlLCBtc2cgfSkgPT4ge1xuICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBwcm94eTogdmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5YC86ZSZ6K+vJyxcbiAgICAgICAgY29udGVudDogXCJ1cmzmoLzlvI/kuI3mraPnoa4s6K+36YeN5paw6L6T5YWlXCJcbiAgICAgIH0pXG4gICAgfVxuXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFydCgpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==