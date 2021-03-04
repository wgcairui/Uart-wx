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
        wx.getStorage({
            key: 'userinfo',
            success: ({ data }) => {
                this.setData({
                    avanter: data.avanter,
                    name: data.name,
                    creatTime: new Date(data.creatTime).toLocaleString(),
                    modifyTime: new Date(data.modifyTime).toLocaleString(),
                    mail: data.mail,
                    tel: data.tel,
                    user: data.user,
                    company: data.company,
                    address: data.address,
                    rgtype: data.rgtype || 'web'
                });
            },
            fail() {
                wx.navigateBack();
            }
        });
    },
    bindViewTap() {
    },
    telChange(event) {
        const value = event.detail.value;
        if (util_1.RgexpTel(value)) {
            api_1.default.modifyUserInfo("tel", value).then(({ ok, msg }) => {
                if (ok) {
                    this.setData({
                        tel: value
                    });
                    const userinfo = wx.getStorageSync('userinfo');
                    wx.setStorage({
                        key: 'userinfo',
                        data: Object.assign(userinfo, { tel: value })
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
            api_1.default.modifyUserInfo('mail', value).then(({ ok, msg }) => {
                if (ok) {
                    this.setData({
                        mail: value
                    });
                    const userinfo = wx.getStorageSync('userinfo');
                    wx.setStorage({
                        key: 'userinfo',
                        data: Object.assign(userinfo, { mail: value })
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
        api_1.default.modifyUserInfo('name', value).then(({ ok, msg }) => {
            if (ok) {
                this.setData({
                    name: value
                });
                const userinfo = wx.getStorageSync('userinfo');
                wx.setStorage({
                    key: 'userinfo',
                    data: Object.assign(userinfo, { name: value })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvQztBQUNwQyw4Q0FBeUQ7QUFHekQsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUtELE1BQU0sRUFBRSxVQUFVLFFBQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUVELEtBQUs7UUFDSCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLFVBQVU7WUFDZixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBc0IsRUFBRSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBZ0IsQ0FBQyxDQUFDLGNBQWMsRUFBRTtvQkFDM0QsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFpQixDQUFDLENBQUMsY0FBYyxFQUFFO29CQUM3RCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFVO29CQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixPQUFPLEVBQUUsSUFB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RCxJQUFJLEVBQUUsRUFBRTtnQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksRUFBRSxLQUFLO2lCQUNaLENBQUMsQ0FBQTtnQkFDRixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUM5QyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSxVQUFVO29CQUNmLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDL0MsQ0FBQyxDQUFBO2FBQ0g7aUJBQU07Z0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsT0FBTztvQkFDZCxPQUFPLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUE7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUlELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtRQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDWixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuaW1wb3J0IHsgUmdleHBNYWlsLCBSZ2V4cFRlbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy91dGlsXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvdXNlcmluZm8vdXNlcmluZm8uanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBuYW1lOiAnJyxcbiAgICBhdmFudGVyOiAnJyxcbiAgICBjcmVhdFRpbWU6IFwiXCIsXG4gICAgbW9kaWZ5VGltZTogXCJcIixcbiAgICB1c2VyOiBcIlwiLFxuICAgIHRlbDogXCJcIixcbiAgICBtYWlsOiBcIlwiLFxuICAgIGNvbXBhbnk6IFwiXCIsXG4gICAgYWRkcmVzczogXCJcIixcbiAgICByZ3R5cGU6ICcnXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChfb3B0aW9uczogYW55KSB7XG4gICAgdGhpcy5zdGFydCgpXG4gIH0sXG4gIC8vXG4gIHN0YXJ0KCkge1xuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAndXNlcmluZm8nLFxuICAgICAgc3VjY2VzczogKHsgZGF0YSB9OiB7IGRhdGE6IFVzZXJJbmZvIH0pID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBhdmFudGVyOiBkYXRhLmF2YW50ZXIsXG4gICAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgIGNyZWF0VGltZTogbmV3IERhdGUoZGF0YS5jcmVhdFRpbWUgYXMgYW55KS50b0xvY2FsZVN0cmluZygpLFxuICAgICAgICAgIG1vZGlmeVRpbWU6IG5ldyBEYXRlKGRhdGEubW9kaWZ5VGltZSBhcyBhbnkpLnRvTG9jYWxlU3RyaW5nKCksXG4gICAgICAgICAgbWFpbDogZGF0YS5tYWlsLFxuICAgICAgICAgIHRlbDogZGF0YS50ZWwgYXMgYW55LFxuICAgICAgICAgIHVzZXI6IGRhdGEudXNlcixcbiAgICAgICAgICBjb21wYW55OiBkYXRhLmNvbXBhbnksXG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLFxuICAgICAgICAgIHJndHlwZTogZGF0YS5yZ3R5cGUgfHwgJ3dlYidcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBmYWlsKCl7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgIC8qIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICforr7lpIfplJnor68nLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnvJPlrZjooqvmuIXnkIYs6K+35Zyo6aaW6aG15LiL5ouJ5Yi35pawJyxcbiAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSkgKi9cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGJpbmRWaWV3VGFwKCl7XG4gIH0sXG4gIC8vXG4gIHRlbENoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWUgYXMgc3RyaW5nXG4gICAgaWYgKFJnZXhwVGVsKHZhbHVlKSkge1xuICAgICAgYXBpLm1vZGlmeVVzZXJJbmZvKFwidGVsXCIsIHZhbHVlKS50aGVuKCh7IG9rLCBtc2cgfSkgPT4ge1xuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgdGVsOiB2YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3QgdXNlcmluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAga2V5OiAndXNlcmluZm8nLFxuICAgICAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih1c2VyaW5mbywgeyB0ZWw6IHZhbHVlIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5YC86ZSZ6K+vJyxcbiAgICAgICAgY29udGVudDogXCLmiYvmnLrlj7fnoIHmoLzlvI/kuI3mraPnoa4s6K+36YeN5paw6L6T5YWlXCJcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBtYWlsQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZSBhcyBzdHJpbmdcbiAgICBpZiAoUmdleHBNYWlsKHZhbHVlKSkge1xuICAgICAgYXBpLm1vZGlmeVVzZXJJbmZvKCdtYWlsJywgdmFsdWUpLnRoZW4oKHsgb2ssIG1zZyB9KSA9PiB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBtYWlsOiB2YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3QgdXNlcmluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAga2V5OiAndXNlcmluZm8nLFxuICAgICAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih1c2VyaW5mbywgeyBtYWlsOiB2YWx1ZSB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgICAgY29udGVudDogbXNnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflgLzplJnor68nLFxuICAgICAgICBjb250ZW50OiBcIumCrueuseagvOW8j+S4jeato+ehrizor7fph43mlrDovpPlhaVcIlxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG5hbWVDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGFwaS5tb2RpZnlVc2VySW5mbygnbmFtZScsIHZhbHVlKS50aGVuKCh7IG9rLCBtc2cgfSkgPT4ge1xuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgbmFtZTogdmFsdWVcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgdXNlcmluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKVxuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6ICd1c2VyaW5mbycsXG4gICAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih1c2VyaW5mbywgeyBuYW1lOiB2YWx1ZSB9KVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICovXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfVxufSkiXX0=