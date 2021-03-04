"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../utils/util");
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
        wx.getStorage({
            key: 'Uts'
        }).then(({ data }) => {
            this.setData({
                devs: data
            });
        }).catch(() => {
            wx.showModal({
                title: '设备错误',
                content: '缓存被清理或没有绑定设备,请在首页下拉刷新',
                success() {
                    wx.switchTab({ url: '/pages/index/index' });
                }
            });
        });
    },
    async getuserTels() {
        const el = await api_1.default.getUserAlarmTels();
        this.setData({
            tels: el.arg.tels.join('\n'),
            mails: el.arg.mails.join('\n')
        });
    },
    modifyTell(event) {
        const { detail, currentTarget: { dataset } } = event;
        const value = Array.from(new Set(detail.value.replace(/(\,|\，)/g, '\n').split('\n').filter(el => el)));
        const key = dataset.key;
        console.log(value);
        switch (key) {
            case 'tel':
                {
                    const ok = value.every(el => util_1.RgexpTel(el));
                    if (value.length > 3) {
                        wx.showModal({
                            title: "错误",
                            content: "最多只能保存3个号码！！"
                        });
                        return;
                    }
                    if (ok) {
                        this.pushuserTels(value, null);
                    }
                    else {
                        wx.showModal({
                            title: '格式错误',
                            content: '手机号码格式不正确'
                        });
                    }
                }
                break;
            case "mail":
                {
                    const ok = value.every(el => util_1.RgexpMail(el));
                    if (ok) {
                        this.pushuserTels(null, value);
                    }
                    else {
                        wx.showModal({
                            title: '格式错误',
                            content: '邮箱格式不正确'
                        });
                    }
                }
                break;
        }
    },
    pushuserTels(tels, mails) {
        this.setData({
            tels: tels ? tels.join('\n') : this.data.tels,
            mails: mails ? mails.join('\n') : this.data.mails
        });
        api_1.default.setUserSetupContact(this.data.tels.split('\n'), this.data.mails.split('\n')).then(() => {
            wx.startPullDownRefresh();
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
    onPullDownRefresh: async function () {
        await this.getuserTels();
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUF5RDtBQUN6RCw0Q0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQWdCO1FBQ3RCLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7S0FDVjtJQUtELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELFlBQVk7UUFDVixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLEtBQUs7U0FDWCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQXdCLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNaLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLHVCQUF1QjtnQkFDaEMsT0FBTztvQkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtnQkFDN0MsQ0FBQzthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDNUIsS0FBSyxFQUFFLEVB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QUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFLEtBQUs7UUFDdEIsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmdleHBNYWlsLCBSZ2V4cFRlbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy91dGlsXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5cbi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9pbmRleC5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGRldnM6IFtdIGFzIFRlcm1pbmFsW10sXG4gICAgdGVsczogJycsXG4gICAgbWFpbHM6ICcnXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNvcnREZXZzbGlzdCgpXG4gICAgdGhpcy5nZXR1c2VyVGVscygpXG4gIH0sXG5cbiAgc29ydERldnNsaXN0KCkge1xuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnVXRzJ1xuICAgIH0pLnRoZW4oKHsgZGF0YSB9OiB7IGRhdGE6IFRlcm1pbmFsW10gfSkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgZGV2czogZGF0YVxuICAgICAgfSlcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+iuvuWkh+mUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6ICfnvJPlrZjooqvmuIXnkIbmiJbmsqHmnInnu5Hlrprorr7lpIcs6K+35Zyo6aaW6aG15LiL5ouJ5Yi35pawJyxcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgYXN5bmMgZ2V0dXNlclRlbHMoKSB7XG4gICAgY29uc3QgZWwgPSBhd2FpdCBhcGkuZ2V0VXNlckFsYXJtVGVscygpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRlbHM6IGVsLmFyZy50ZWxzLmpvaW4oJ1xcbicpLFxuICAgICAgbWFpbHM6IGVsLmFyZy5tYWlscy5qb2luKCdcXG4nKVxuICAgIH0pXG4gIH0sXG4gIC8vIOS/ruaUueeUqOaIt+iBlOezu+aWueW8j1xuICBtb2RpZnlUZWxsKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCB7IGRldGFpbCwgY3VycmVudFRhcmdldDogeyBkYXRhc2V0IH0gfSA9IGV2ZW50XG4gICAgY29uc3QgdmFsdWUgPSBBcnJheS5mcm9tKG5ldyBTZXQoKGRldGFpbC52YWx1ZSBhcyBzdHJpbmcpLnJlcGxhY2UoLyhcXCx8XFzvvIwpL2csICdcXG4nKS5zcGxpdCgnXFxuJykuZmlsdGVyKGVsID0+IGVsKSkpXG4gICAgY29uc3Qga2V5ID0gZGF0YXNldC5rZXkgYXMgc3RyaW5nXG4gICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICd0ZWwnOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3Qgb2sgPSB2YWx1ZS5ldmVyeShlbCA9PiBSZ2V4cFRlbChlbCkpXG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIumUmeivr1wiLFxuICAgICAgICAgICAgICBjb250ZW50OiBcIuacgOWkmuWPquiDveS/neWtmDPkuKrlj7fnoIHvvIHvvIFcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgIHRoaXMucHVzaHVzZXJUZWxzKHZhbHVlLCBudWxsKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+agvOW8j+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmiYvmnLrlj7fnoIHmoLzlvI/kuI3mraPnoa4nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBcIm1haWxcIjpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IG9rID0gdmFsdWUuZXZlcnkoZWwgPT4gUmdleHBNYWlsKGVsKSlcbiAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgIHRoaXMucHVzaHVzZXJUZWxzKG51bGwsIHZhbHVlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+agvOW8j+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfpgq7nrrHmoLzlvI/kuI3mraPnoa4nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSxcbiAgLy8g5o+Q5Lqk5L+u5pS56IGU57O75pa55byPXG4gIHB1c2h1c2VyVGVscyh0ZWxzOiBzdHJpbmdbXSB8IG51bGwsIG1haWxzOiBzdHJpbmdbXSB8IG51bGwpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdGVsczogdGVscyA/IHRlbHMuam9pbignXFxuJykgOiB0aGlzLmRhdGEudGVscyxcbiAgICAgIG1haWxzOiBtYWlscyA/IG1haWxzLmpvaW4oJ1xcbicpIDogdGhpcy5kYXRhLm1haWxzXG4gICAgfSlcbiAgICBhcGkuc2V0VXNlclNldHVwQ29udGFjdCh0aGlzLmRhdGEudGVscy5zcGxpdCgnXFxuJyksIHRoaXMuZGF0YS5tYWlscy5zcGxpdCgnXFxuJykpLnRoZW4oKCkgPT4ge1xuICAgICAgd3guc3RhcnRQdWxsRG93blJlZnJlc2goKVxuICAgIH0pXG5cbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLmdldHVzZXJUZWxzKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH1cbn0pIl19