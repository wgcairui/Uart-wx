"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../../../utils/api");
var util_1 = require("../../../utils/util");
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
    start: function () {
        var _this = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (_a) {
                var data = _a.data;
                _this.setData({
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
            }
        });
    },
    telChange: function (event) {
        var _this = this;
        var value = event.detail.value;
        if (util_1.RgexpTel(value)) {
            api_1.default.modifyUserInfo("tel", value).then(function (_a) {
                var ok = _a.ok, msg = _a.msg;
                if (ok) {
                    _this.setData({
                        tel: value
                    });
                    var userinfo = wx.getStorageSync('userinfo');
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
    mailChange: function (event) {
        var _this = this;
        var value = event.detail.value;
        if (util_1.RgexpMail(value)) {
            api_1.default.modifyUserInfo('mail', value).then(function (_a) {
                var ok = _a.ok, msg = _a.msg;
                if (ok) {
                    _this.setData({
                        mail: value
                    });
                    var userinfo = wx.getStorageSync('userinfo');
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
    nameChange: function (event) {
        var _this = this;
        var value = event.detail.value;
        api_1.default.modifyUserInfo('name', value).then(function (_a) {
            var ok = _a.ok, msg = _a.msg;
            if (ok) {
                _this.setData({
                    name: value
                });
                var userinfo = wx.getStorageSync('userinfo');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUFvQztBQUNwQyw0Q0FBeUQ7QUFHekQsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUtELE1BQU0sRUFBRSxVQUFVLFFBQVE7UUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUVELEtBQUssRUFBTDtRQUFBLGlCQWtCQztRQWpCQyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLFVBQVU7WUFDZixPQUFPLEVBQUUsVUFBQyxFQUE0QjtvQkFBMUIsY0FBSTtnQkFDZCxLQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBZ0IsQ0FBQyxDQUFDLGNBQWMsRUFBRTtvQkFDM0QsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFpQixDQUFDLENBQUMsY0FBYyxFQUFFO29CQUM3RCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFVO29CQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixPQUFP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TyxDQUFDO29CQUNYLElBQUksRUFBRSxLQUFLO2lCQUNaLENBQUMsQ0FBQTtnQkFDRixJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUM5QyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSxVQUFVO29CQUNmLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDL0MsQ0FBQyxDQUFBO2FBQ0g7aUJBQU07Z0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsT0FBTztvQkFDZCxPQUFPLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUE7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUlELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtRQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDWixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuaW1wb3J0IHsgUmdleHBNYWlsLCBSZ2V4cFRlbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy91dGlsXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvdXNlcmluZm8vdXNlcmluZm8uanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBuYW1lOiAnJyxcbiAgICBhdmFudGVyOiAnJyxcbiAgICBjcmVhdFRpbWU6IFwiXCIsXG4gICAgbW9kaWZ5VGltZTogXCJcIixcbiAgICB1c2VyOiBcIlwiLFxuICAgIHRlbDogXCJcIixcbiAgICBtYWlsOiBcIlwiLFxuICAgIGNvbXBhbnk6IFwiXCIsXG4gICAgYWRkcmVzczogXCJcIixcbiAgICByZ3R5cGU6ICcnXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChfb3B0aW9ucykge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuICAvL1xuICBzdGFydCgpIHtcbiAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgIGtleTogJ3VzZXJpbmZvJyxcbiAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfTogeyBkYXRhOiBVc2VySW5mbyB9KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYXZhbnRlcjogZGF0YS5hdmFudGVyLFxuICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICBjcmVhdFRpbWU6IG5ldyBEYXRlKGRhdGEuY3JlYXRUaW1lIGFzIGFueSkudG9Mb2NhbGVTdHJpbmcoKSxcbiAgICAgICAgICBtb2RpZnlUaW1lOiBuZXcgRGF0ZShkYXRhLm1vZGlmeVRpbWUgYXMgYW55KS50b0xvY2FsZVN0cmluZygpLFxuICAgICAgICAgIG1haWw6IGRhdGEubWFpbCxcbiAgICAgICAgICB0ZWw6IGRhdGEudGVsIGFzIGFueSxcbiAgICAgICAgICB1c2VyOiBkYXRhLnVzZXIsXG4gICAgICAgICAgY29tcGFueTogZGF0YS5jb21wYW55LFxuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcyxcbiAgICAgICAgICByZ3R5cGU6IGRhdGEucmd0eXBlIHx8ICd3ZWInXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy9cbiAgdGVsQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZSBhcyBzdHJpbmdcbiAgICBpZiAoUmdleHBUZWwodmFsdWUpKSB7XG4gICAgICBhcGkubW9kaWZ5VXNlckluZm8oXCJ0ZWxcIiwgdmFsdWUpLnRoZW4oKHsgb2ssIG1zZyB9KSA9PiB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB0ZWw6IHZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCB1c2VyaW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycpXG4gICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICBrZXk6ICd1c2VyaW5mbycsXG4gICAgICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHVzZXJpbmZvLCB7IHRlbDogdmFsdWUgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflgLzplJnor68nLFxuICAgICAgICBjb250ZW50OiBcIuaJi+acuuWPt+eggeagvOW8j+S4jeato+ehrizor7fph43mlrDovpPlhaVcIlxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1haWxDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlIGFzIHN0cmluZ1xuICAgIGlmIChSZ2V4cE1haWwodmFsdWUpKSB7XG4gICAgICBhcGkubW9kaWZ5VXNlckluZm8oJ21haWwnLCB2YWx1ZSkudGhlbigoeyBvaywgbXNnIH0pID0+IHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIG1haWw6IHZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCB1c2VyaW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycpXG4gICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICBrZXk6ICd1c2VyaW5mbycsXG4gICAgICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHVzZXJpbmZvLCB7IG1haWw6IHZhbHVlIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WAvOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6IFwi6YKu566x5qC85byP5LiN5q2j56GuLOivt+mHjeaWsOi+k+WFpVwiXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbmFtZUNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWUgYXMgc3RyaW5nXG4gICAgYXBpLm1vZGlmeVVzZXJJbmZvKCduYW1lJywgdmFsdWUpLnRoZW4oKHsgb2ssIG1zZyB9KSA9PiB7XG4gICAgICBpZiAob2spIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBuYW1lOiB2YWx1ZVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCB1c2VyaW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycpXG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTogJ3VzZXJpbmZvJyxcbiAgICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHVzZXJpbmZvLCB7IG5hbWU6IHZhbHVlIH0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFydCgpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==