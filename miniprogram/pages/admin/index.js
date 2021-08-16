"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../utils/api");
Page({
    data: {
        name: '',
        avanter: '',
        rgwx: false
    },
    onLoad: async function () {
        this.start();
    },
    async start() {
        const { data } = await api_1.default.userInfo();
        this.setData({
            name: data.name,
            avanter: data.avanter,
            rgwx: data.rgtype === 'wx',
        });
    },
    async unbindwx() {
        const d = await wx.showModal({
            title: '解绑微信',
            content: this.data.rgwx ? '这将会删除您所有的配置和信息!!!' : '这将会解除小程序和透传账号之间的连接',
        });
        if (d.confirm) {
            const { code } = await api_1.default.unbindwx();
            if (code) {
                this.clearCache();
                await wx.showModal({
                    title: 'success',
                    content: '已成功解绑,确定退出小程序'
                });
                wx.exitMiniProgram();
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFpQztBQUNqQyxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBRTtRQUNSLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLEtBQUs7S0FDWjtJQUtELE1BQU0sRUFBRSxLQUFLO1FBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUdELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtTQUMzQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVE7UUFDWixNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDM0IsS0FBSyxFQUFFLE1BQU07WUFDYixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxvQkFBb0I7U0FDckUsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ2IsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ3JDLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtnQkFDakIsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNqQixLQUFLLEVBQUUsU0FBUztvQkFDaEIsT0FBTyxFQUFFLGVBQWU7aUJBQ3pCLENBQUMsQ0FBQztnQkFDRixFQUFVLENBQUMsZUFBZSxFQUFFLENBQUE7YUFDOUI7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxDQUFDLElBQUk7WUFDWixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFVBQVU7UUFDUixFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHO2dCQUNULE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO2dCQUNuQyxJQUFJO29CQUNGLEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxRQUFRO2dDQUNmLE9BQU8sRUFBRSxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUk7Z0NBQzdCLE9BQU87b0NBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0NBQzVDLENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTt3QkFDNUMsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUlELGlCQUFpQixFQUFFLEtBQUs7UUFDdEIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDbEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L3VzZXIvdXNlci5qc1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCJcblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgcmd3eDogZmFsc2VcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuXG4gIC8vXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXBpLnVzZXJJbmZvKClcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgYXZhbnRlcjogZGF0YS5hdmFudGVyLFxuICAgICAgcmd3eDogZGF0YS5yZ3R5cGUgPT09ICd3eCcsXG4gICAgfSlcbiAgfSxcbiAgLy8g6Kej57uR5b6u5L+hXG4gIGFzeW5jIHVuYmluZHd4KCkge1xuICAgIGNvbnN0IGQgPSBhd2FpdCB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfop6Pnu5Hlvq7kv6EnLFxuICAgICAgY29udGVudDogdGhpcy5kYXRhLnJnd3ggPyAn6L+Z5bCG5Lya5Yig6Zmk5oKo5omA5pyJ55qE6YWN572u5ZKM5L+h5oGvISEhJyA6ICfov5nlsIbkvJrop6PpmaTlsI/nqIvluo/lkozpgI/kvKDotKblj7fkuYvpl7TnmoTov57mjqUnLFxuICAgIH0pXG5cbiAgICBpZiAoZC5jb25maXJtKSB7XG4gICAgICBjb25zdCB7IGNvZGUgfSA9IGF3YWl0IGFwaS51bmJpbmR3eCgpXG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKVxuICAgICAgICBhd2FpdCB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAnc3VjY2VzcycsXG4gICAgICAgICAgY29udGVudDogJ+W3suaIkOWKn+ino+e7kSznoa7lrprpgIDlh7rlsI/nqIvluo8nXG4gICAgICAgIH0pO1xuICAgICAgICAod3ggYXMgYW55KS5leGl0TWluaVByb2dyYW0oKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy9cbiAgb3BlblNldHRpbmcoKSB7XG4gICAgd3gub3BlblNldHRpbmcoe1xuICAgICAgd2l0aFN1YnNjcmlwdGlvbnM6IHRydWUsXG4gICAgICBzdWNjZXNzKF9yZXMpIHtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBjbGVhckNhY2hlKCkge1xuICAgIHd4LmdldFN0b3JhZ2VJbmZvKHtcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSByZXMuY3VycmVudFNpemUgLyAxMDI0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgd3guY2xlYXJTdG9yYWdlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfnvJPlrZjmuIXnkIbmiJDlip8nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmuIXpmaTnvJPlrZgnICsgc2l6ZSArICdNQicsXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuWksei0pScsXG4gICAgICAgICAgICBjb250ZW50OiBlcnJvcixcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5zdGFydCgpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH1cbn0pIl19