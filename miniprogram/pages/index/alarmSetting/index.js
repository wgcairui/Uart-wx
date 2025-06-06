"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
Page({
    data: {
        devs: [],
        tels: '',
        mails: ''
    },
    onLoad: function () {
        this.sortDevslist();
        this.getuserTels();
    },
    sortDevslist() {
        api_1.default.BindDev().then(el => {
            if (el.code) {
                this.setData({
                    devs: el.data.UTs
                });
            }
        });
    },
    async getuserTels() {
        const el = await api_1.default.getUserAlarmSetup();
        this.setData({
            tels: el.data.tels.join('\n'),
            mails: el.data.mails.join('\n')
        });
    },
    modifyTell(event) {
        const [tel, mail] = event.currentTarget.dataset.item;
        wx.navigateTo({
            url: "/pages/index/alarmSetting/modifyTel/modifyTel",
            events: {
                modifyOk: ({ tel, mail }) => {
                    this.pushuserTels(tel, mail);
                }
            },
            success(res) {
                res.eventChannel.emit('alarm', { tel: tel.split("\n"), mail: mail.split("\n") });
            }
        });
    },
    pushuserTels(tels, mails) {
        this.setData({
            tels: tels.join('\n'),
            mails: mails.join('\n')
        });
        wx.startPullDownRefresh();
    },
    async subMessage() {
        const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd');
        wx.navigateTo({ url: '/pages/index/web/web?url=' + url });
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: async function () {
        await this.getuserTels();
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvQztBQUdwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBcUI7UUFDM0IsSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBS0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBRUQsWUFBWTtRQUNWLGFBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFVO2lCQUN6QixDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsS0FBSyxDQUFDLFdBQVc7UUFDZixNQUFNLEVBQUUsR0FBRyxNQUFNLGFBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM3QixLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNoQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQTBCO1FBQ25DLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBRXBELEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsK0NBQStDO1lBQ3BELE1BQU0sRUFBQztnQkFDTCxRQUFRLEVBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQXFDLEVBQUMsRUFBRTtvQkFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQzlCLENBQUM7YUFDRjtZQUNELE9BQU8sQ0FBQyxHQUFHO2dCQUNULEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNsRixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBeUNKLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBYyxFQUFFLEtBQWU7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDeEIsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUtELEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsZ01BQWdNLENBQUMsQ0FBQTtRQUNoTyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDM0QsQ0FBQztJQUlELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3hCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5cbi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9pbmRleC5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGRldnM6IFtdIGFzIFVhcnQuVGVybWluYWxbXSxcbiAgICB0ZWxzOiAnJyxcbiAgICBtYWlsczogJydcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc29ydERldnNsaXN0KClcbiAgICB0aGlzLmdldHVzZXJUZWxzKClcbiAgfSxcblxuICBzb3J0RGV2c2xpc3QoKSB7XG4gICAgYXBpLkJpbmREZXYoKS50aGVuKGVsID0+IHtcbiAgICAgIGlmIChlbC5jb2RlKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgZGV2czogZWwuZGF0YS5VVHMgYXMgYW55XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgYXN5bmMgZ2V0dXNlclRlbHMoKSB7XG4gICAgY29uc3QgZWwgPSBhd2FpdCBhcGkuZ2V0VXNlckFsYXJtU2V0dXAoKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0ZWxzOiBlbC5kYXRhLnRlbHMuam9pbignXFxuJyksXG4gICAgICBtYWlsczogZWwuZGF0YS5tYWlscy5qb2luKCdcXG4nKVxuICAgIH0pXG4gIH0sXG4gIC8vIOS/ruaUueeUqOaIt+iBlOezu+aWueW8j1xuICBtb2RpZnlUZWxsKGV2ZW50OiB2YW50RXZlbnQ8c3RyaW5nW10+KSB7XG4gICAgY29uc3QgW3RlbCwgbWFpbF0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIC8vY29uc3QgYSA9IHRoaXMucHVzaHVzZXJUZWxzLy8odGVsLCBtYWlsKVxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiBcIi9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvbW9kaWZ5VGVsL21vZGlmeVRlbFwiLC8vK09iamVjdFRvU3RycXVlcnkoe3RlbCxtYWlsfSksXG4gICAgICBldmVudHM6e1xuICAgICAgICBtb2RpZnlPazooeyB0ZWwsIG1haWwgfTogeyB0ZWw6IHN0cmluZ1tdLCBtYWlsOiBzdHJpbmdbXSB9KT0+IHtcbiAgICAgICAgICB0aGlzLnB1c2h1c2VyVGVscyh0ZWwsIG1haWwpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICByZXMuZXZlbnRDaGFubmVsLmVtaXQoJ2FsYXJtJywgeyB0ZWw6IHRlbC5zcGxpdChcIlxcblwiKSwgbWFpbDogbWFpbC5zcGxpdChcIlxcblwiKSB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvKiBjb25zdCB7IGRldGFpbCwgY3VycmVudFRhcmdldDogeyBkYXRhc2V0IH0gfSA9IGV2ZW50XG4gICAgY29uc3QgdmFsdWUgPSBBcnJheS5mcm9tKG5ldyBTZXQoKGRldGFpbC52YWx1ZSBhcyBzdHJpbmcpLnJlcGxhY2UoLyhcXCx8XFzvvIwpL2csICdcXG4nKS5zcGxpdCgnXFxuJykuZmlsdGVyKGVsID0+IGVsKSkpXG4gICAgY29uc3Qga2V5ID0gZGF0YXNldC5rZXkgYXMgc3RyaW5nXG4gICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICd0ZWwnOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3Qgb2sgPSB2YWx1ZS5ldmVyeShlbCA9PiBSZ2V4cFRlbChlbCkpXG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIumUmeivr1wiLFxuICAgICAgICAgICAgICBjb250ZW50OiBcIuacgOWkmuWPquiDveS/neWtmDPkuKrlj7fnoIHvvIHvvIFcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgIHRoaXMucHVzaHVzZXJUZWxzKHZhbHVlLCBudWxsKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+agvOW8j+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmiYvmnLrlj7fnoIHmoLzlvI/kuI3mraPnoa4nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBcIm1haWxcIjpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG9rID0gdmFsdWUuZXZlcnkoZWwgPT4gUmdleHBNYWlsKGVsKSlcbiAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgIHRoaXMucHVzaHVzZXJUZWxzKG51bGwsIHZhbHVlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+agvOW8j+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfpgq7nrrHmoLzlvI/kuI3mraPnoa4nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgIH0gKi9cbiAgfSxcbiAgLy8g5o+Q5Lqk5L+u5pS56IGU57O75pa55byPXG4gIHB1c2h1c2VyVGVscyh0ZWxzOiBzdHJpbmdbXSwgbWFpbHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRlbHM6IHRlbHMuam9pbignXFxuJyksXG4gICAgICBtYWlsczogbWFpbHMuam9pbignXFxuJylcbiAgICB9KVxuICAgIHd4LnN0YXJ0UHVsbERvd25SZWZyZXNoKClcbiAgfSxcblxuICAvKipcbiAgICog6K6i6ZiF5LiL5qyh5ZGK6K2mXG4gICAqL1xuICBhc3luYyBzdWJNZXNzYWdlKCkge1xuICAgIGNvbnN0IHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCgnaHR0cDovL21wLndlaXhpbi5xcS5jb20vcz9fX2Jpej1Nak01TWpBMU1UZ3hPUT09Jm1pZD0zMDQ4MTk5MzkmaWR4PTEmc249ZDBiY2Q5MjIwMzMwNzVhZmEyYjUyMTlmYzk1ZWJiMWUmY2hrc209MzE3M2E5ZTcwNjA0MjBmMWE5OGQwMDQwZDk2NGEyZjgyYWYyNTI4OWE3MzFkMTQwMGM1MjI0Y2E5YmIzZDIyNWQ3Mzc3MDA3MDBhOCNyZCcpXG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9pbmRleC93ZWIvd2ViP3VybD0nICsgdXJsIH0pXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5nZXR1c2VyVGVscygpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==