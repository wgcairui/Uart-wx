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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFvQztBQUdwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBcUI7UUFDM0IsSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsRUFBRTtLQUNWO0lBS0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBRUQsWUFBWTtRQUNWLGFBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFO2dCQUNYLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBVTtpQkFDekIsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzdCLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2hDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBMEI7UUFDbkMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFFcEQsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSwrQ0FBK0M7WUFDcEQsTUFBTSxFQUFDO2dCQUNMLFFBQVEsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBcUMsRUFBQyxFQUFFO29CQUMzRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDOUIsQ0FBQzthQUNGO1lBQ0QsT0FBTyxDQUFDLEdBQUc7Z0JBQ1QsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2xGLENBQUM7U0FDRixDQUFDLENBQUE7SUF5Q0osQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFjLEVBQUUsS0FBZTtRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN4QixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBS0QsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxnTUFBZ00sQ0FBQyxDQUFBO1FBQ2hPLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsMkJBQTJCLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0lBSUQsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFLEtBQUs7UUFDdEIsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2luZGV4LmpzXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgZGV2czogW10gYXMgVWFydC5UZXJtaW5hbFtdLFxuICAgIHRlbHM6ICcnLFxuICAgIG1haWxzOiAnJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zb3J0RGV2c2xpc3QoKVxuICAgIHRoaXMuZ2V0dXNlclRlbHMoKVxuICB9LFxuXG4gIHNvcnREZXZzbGlzdCgpIHtcbiAgICBhcGkuQmluZERldigpLnRoZW4oZWwgPT4ge1xuICAgICAgaWYgKGVsLmNvZGUpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBkZXZzOiBlbC5kYXRhLlVUcyBhcyBhbnlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBhc3luYyBnZXR1c2VyVGVscygpIHtcbiAgICBjb25zdCBlbCA9IGF3YWl0IGFwaS5nZXRVc2VyQWxhcm1TZXR1cCgpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRlbHM6IGVsLmRhdGEudGVscy5qb2luKCdcXG4nKSxcbiAgICAgIG1haWxzOiBlbC5kYXRhLm1haWxzLmpvaW4oJ1xcbicpXG4gICAgfSlcbiAgfSxcbiAgLy8g5L+u5pS555So5oi36IGU57O75pa55byPXG4gIG1vZGlmeVRlbGwoZXZlbnQ6IHZhbnRFdmVudDxzdHJpbmdbXT4pIHtcbiAgICBjb25zdCBbdGVsLCBtYWlsXSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtXG4gICAgLy9jb25zdCBhID0gdGhpcy5wdXNodXNlclRlbHMvLyh0ZWwsIG1haWwpXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IFwiL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9tb2RpZnlUZWwvbW9kaWZ5VGVsXCIsLy8rT2JqZWN0VG9TdHJxdWVyeSh7dGVsLG1haWx9KSxcbiAgICAgIGV2ZW50czp7XG4gICAgICAgIG1vZGlmeU9rOih7IHRlbCwgbWFpbCB9OiB7IHRlbDogc3RyaW5nW10sIG1haWw6IHN0cmluZ1tdIH0pPT4ge1xuICAgICAgICAgIHRoaXMucHVzaHVzZXJUZWxzKHRlbCwgbWFpbClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHJlcy5ldmVudENoYW5uZWwuZW1pdCgnYWxhcm0nLCB7IHRlbDogdGVsLnNwbGl0KFwiXFxuXCIpLCBtYWlsOiBtYWlsLnNwbGl0KFwiXFxuXCIpIH0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8qIGNvbnN0IHsgZGV0YWlsLCBjdXJyZW50VGFyZ2V0OiB7IGRhdGFzZXQgfSB9ID0gZXZlbnRcbiAgICBjb25zdCB2YWx1ZSA9IEFycmF5LmZyb20obmV3IFNldCgoZGV0YWlsLnZhbHVlIGFzIHN0cmluZykucmVwbGFjZSgvKFxcLHxcXO+8jCkvZywgJ1xcbicpLnNwbGl0KCdcXG4nKS5maWx0ZXIoZWwgPT4gZWwpKSlcbiAgICBjb25zdCBrZXkgPSBkYXRhc2V0LmtleSBhcyBzdHJpbmdcbiAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgJ3RlbCc6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBvayA9IHZhbHVlLmV2ZXJ5KGVsID0+IFJnZXhwVGVsKGVsKSlcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwi6ZSZ6K+vXCIsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IFwi5pyA5aSa5Y+q6IO95L+d5a2YM+S4quWPt+egge+8ge+8gVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgdGhpcy5wdXNodXNlclRlbHModmFsdWUsIG51bGwpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5qC85byP6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+aJi+acuuWPt+eggeagvOW8j+S4jeato+ehridcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwibWFpbFwiOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3Qgb2sgPSB2YWx1ZS5ldmVyeShlbCA9PiBSZ2V4cE1haWwoZWwpKVxuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgdGhpcy5wdXNodXNlclRlbHMobnVsbCwgdmFsdWUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5qC85byP6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDogJ+mCrueuseagvOW8j+S4jeato+ehridcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgfSAqL1xuICB9LFxuICAvLyDmj5DkuqTkv67mlLnogZTns7vmlrnlvI9cbiAgcHVzaHVzZXJUZWxzKHRlbHM6IHN0cmluZ1tdLCBtYWlsczogc3RyaW5nW10pIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdGVsczogdGVscy5qb2luKCdcXG4nKSxcbiAgICAgIG1haWxzOiBtYWlscy5qb2luKCdcXG4nKVxuICAgIH0pXG4gICAgd3guc3RhcnRQdWxsRG93blJlZnJlc2goKVxuICB9LFxuXG4gIC8qKlxuICAgKiDorqLpmIXkuIvmrKHlkYroraZcbiAgICovXG4gIGFzeW5jIHN1Yk1lc3NhZ2UoKSB7XG4gICAgY29uc3QgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KCdodHRwOi8vbXAud2VpeGluLnFxLmNvbS9zP19fYml6PU1qTTVNakExTVRneE9RPT0mbWlkPTMwNDgxOTkzOSZpZHg9MSZzbj1kMGJjZDkyMjAzMzA3NWFmYTJiNTIxOWZjOTVlYmIxZSZjaGtzbT0zMTczYTllNzA2MDQyMGYxYTk4ZDAwNDBkOTY0YTJmODJhZjI1Mjg5YTczMWQxNDAwYzUyMjRjYTliYjNkMjI1ZDczNzcwMDcwMGE4I3JkJylcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L3dlYi93ZWI/dXJsPScgKyB1cmwgfSlcbiAgfSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLmdldHVzZXJUZWxzKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH1cbn0pIl19