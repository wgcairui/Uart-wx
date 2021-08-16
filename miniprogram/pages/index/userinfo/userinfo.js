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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvQztBQUNwQyw4Q0FBeUQ7QUFDekQsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUtELE1BQU0sRUFBRSxVQUFVLFFBQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUVELEtBQUs7UUFDSCxhQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzNDLElBQUksSUFBSSxFQUFFO2dCQUVSLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFnQixDQUFDLENBQUMsY0FBYyxFQUFFO29CQUMzRCxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQWlCLENBQUMsQ0FBQyxjQUFjLEVBQUU7b0JBQzdELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQVU7b0JBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JC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LENBQUMsQ0FBQTthQUNIO2lCQUFNO2dCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1gsS0FBSyxFQUFFLE9BQU87b0JBQ2QsT0FBTyxFQUFFLEdBQUc7aUJBQ2IsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFJRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7UUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ1osRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IFJnZXhwTWFpbCwgUmdleHBUZWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgY3JlYXRUaW1lOiBcIlwiLFxuICAgIG1vZGlmeVRpbWU6IFwiXCIsXG4gICAgdXNlcjogXCJcIixcbiAgICB0ZWw6IFwiXCIsXG4gICAgbWFpbDogXCJcIixcbiAgICBjb21wYW55OiBcIlwiLFxuICAgIGFkZHJlc3M6IFwiXCIsXG4gICAgcmd0eXBlOiAnJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoX29wdGlvbnM6IGFueSkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuICAvL1xuICBzdGFydCgpIHtcbiAgICBhcGkudXNlckluZm8oKS50aGVuKGFzeW5jICh7IGNvZGUsIGRhdGEgfSkgPT4ge1xuICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYXZhbnRlcjogZGF0YS5hdmFudGVyLFxuICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICBjcmVhdFRpbWU6IG5ldyBEYXRlKGRhdGEuY3JlYXRUaW1lIGFzIGFueSkudG9Mb2NhbGVTdHJpbmcoKSxcbiAgICAgICAgICBtb2RpZnlUaW1lOiBuZXcgRGF0ZShkYXRhLm1vZGlmeVRpbWUgYXMgYW55KS50b0xvY2FsZVN0cmluZygpLFxuICAgICAgICAgIG1haWw6IGRhdGEubWFpbCxcbiAgICAgICAgICB0ZWw6IGRhdGEudGVsIGFzIGFueSxcbiAgICAgICAgICB1c2VyOiBkYXRhLnVzZXIsXG4gICAgICAgICAgY29tcGFueTogZGF0YS5jb21wYW55LFxuICAgICAgICAgIHJndHlwZTogZGF0YS5yZ3R5cGUgfHwgJ3dlYidcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3Qganc9IGF3YWl0IGFwaS5WMl9BUElfQWFtcF9pcDJsb2NhbChkYXRhLmFkZHJlc3M/LnNwbGl0KFwiOlwiKS5yZXZlcnNlKClbMF0hKVxuICAgICAgICBjb25zdCBhZCA9IGF3YWl0IGFwaS5nZXRHUFNhZGRyZXNzKGp3LmRhdGEuc3BsaXQoJywnKS5yZXZlcnNlKCkuam9pbihcIixcIikpXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYWRkcmVzczphZC5kYXRhLmFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGJpbmRWaWV3VGFwKCkge1xuICB9LFxuICAvL1xuICB0ZWxDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGlmIChSZ2V4cFRlbCh2YWx1ZSkpIHtcbiAgICAgIGFwaS5tb2RpZnlVc2VySW5mbyh7IHRlbDogTnVtYmVyKHZhbHVlKSB9KS50aGVuKCh7IGNvZGUsIG1zZyB9KSA9PiB7XG4gICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHRlbDogdmFsdWVcbiAgICAgICAgICB9KVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgICAgY29udGVudDogbXNnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WAvOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IFwi5omL5py65Y+356CB5qC85byP5LiN5q2j56GuLOivt+mHjeaWsOi+k+WFpVwiXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbWFpbENoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWUgYXMgc3RyaW5nXG4gICAgaWYgKFJnZXhwTWFpbCh2YWx1ZSkpIHtcbiAgICAgIGFwaS5tb2RpZnlVc2VySW5mbyh7ICdtYWlsJzogdmFsdWUgfSkudGhlbigoeyBjb2RlLCBtc2cgfSkgPT4ge1xuICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBtYWlsOiB2YWx1ZVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WAvOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IFwi6YKu566x5qC85byP5LiN5q2j56GuLOivt+mHjeaWsOi+k+WFpVwiXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbmFtZUNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWUgYXMgc3RyaW5nXG4gICAgYXBpLm1vZGlmeVVzZXJJbmZvKHsgJ25hbWUnOiB2YWx1ZSB9KS50aGVuKCh7IGNvZGUsIG1zZyB9KSA9PiB7XG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG5hbWU6IHZhbHVlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFydCgpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==