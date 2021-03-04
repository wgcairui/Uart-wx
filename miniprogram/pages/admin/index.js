"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../utils/api");
Page({
    data: {
        name: '',
        avanter: ''
    },
    onLoad: async function () {
        this.start();
    },
    async start() {
        const { arg } = await api_1.default.getUserInfo();
        this.setData({
            name: arg.name,
            avanter: arg.avanter
        });
        wx.setStorage({ key: 'userinfo', data: arg });
    },
    async unbindwx() {
        const { ok, msg } = await api_1.default.unbindwx();
        if (ok) {
            this.clearCache();
            wx.reLaunch({ url: '/pages/index/index' });
        }
        else {
            wx.showModal({
                title: '操作失败',
                content: msg
            });
        }
    },
    openSetting() {
        wx.openSetting({
            withSubscriptions: true,
            success(_res) {
            }
        });
    },
    clearCache() {
        wx.getStorageInfo({
            success(res) {
                const size = res.currentSize / 1024;
                try {
                    wx.clearStorage({
                        success() {
                            wx.showModal({
                                title: '缓存清理成功',
                                content: '清除缓存' + size + 'MB',
                                success() {
                                    wx.reLaunch({ url: '/pages/index/index' });
                                }
                            });
                        }
                    });
                }
                catch (error) {
                    wx.showModal({
                        title: '缓存清理失败',
                        content: error,
                        success() {
                            wx.reLaunch({ url: '/pages/index/index' });
                        }
                    });
                }
            }
        });
    },
    onPullDownRefresh: async function () {
        await this.start();
        wx.stopPullDownRefresh();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFpQztBQUNqQyxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBRTtRQUNSLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFLRCxNQUFNLEVBQUUsS0FBSztRQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNkLENBQUM7SUFHRCxLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLGFBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUTtRQUNaLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDeEMsSUFBSSxFQUFFLEVBQUU7WUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7WUFDakIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7U0FDM0M7YUFBTTtZQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLEdBQUc7YUFDYixDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxDQUFDLElBQUk7WUFDWixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFVBQVU7UUFDUixFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHO2dCQUNULE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO2dCQUNuQyxJQUFJO29CQUNGLEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxRQUFRO2dDQUNmLE9BQU8sRUFBRSxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUk7Z0NBQzdCLE9BQU87b0NBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0NBQzVDLENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTt3QkFDNUMsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUlELGlCQUFpQixFQUFFLEtBQUs7UUFDdEIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDbEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L3VzZXIvdXNlci5qc1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCJcblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJydcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuXG4gIC8vXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGNvbnN0IHsgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0VXNlckluZm8oKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBuYW1lOiBhcmcubmFtZSxcbiAgICAgIGF2YW50ZXI6IGFyZy5hdmFudGVyXG4gICAgfSlcbiAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAndXNlcmluZm8nLCBkYXRhOiBhcmcgfSlcbiAgfSxcbiAgLy8g6Kej57uR5b6u5L+hXG4gIGFzeW5jIHVuYmluZHd4KCkge1xuICAgIGNvbnN0IHsgb2ssIG1zZyB9ID0gYXdhaXQgYXBpLnVuYmluZHd4KClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuY2xlYXJDYWNoZSgpXG4gICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmk43kvZzlpLHotKUnLFxuICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvL1xuICBvcGVuU2V0dGluZygpIHtcbiAgICB3eC5vcGVuU2V0dGluZyh7XG4gICAgICB3aXRoU3Vic2NyaXB0aW9uczogdHJ1ZSxcbiAgICAgIHN1Y2Nlc3MoX3Jlcykge1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgd3guZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHJlcy5jdXJyZW50U2l6ZSAvIDEwMjRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3eC5jbGVhclN0b3JhZ2Uoe1xuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuaIkOWKnycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+a4hemZpOe8k+WtmCcgKyBzaXplICsgJ01CJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn57yT5a2Y5riF55CG5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yLFxuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLnN0YXJ0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfVxufSkiXX0=