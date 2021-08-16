"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
Page({
    data: {
        name: '',
        avanter: '',
        rgwx: false,
        rgTime: '',
        wxId: ''
    },
    onLoad: async function () {
        this.start();
    },
    async start() {
        api_1.default.userInfo().then(({ code, data }) => {
            if (code) {
                this.setData({
                    name: data.name,
                    avanter: data.avanter,
                    rgwx: data.rgtype === 'wx',
                    rgTime: new Date(data.creatTime).toLocaleDateString(),
                    wxId: data.wxId
                });
                wx.setStorage({ key: 'userinfo', data });
            }
        });
    },
    updateAvanter() {
        wx.getUserProfile({
            desc: '用于更新用户头像和昵称',
            success: (info) => {
                const { nickName, avatarUrl } = info.userInfo;
                api_1.default.updateAvanter(nickName, avatarUrl).then(() => {
                    wx.showToast({ title: '更新成功' });
                    this.start();
                });
            }
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
                            wx.showToast({
                                title: '缓存清理成功',
                                content: '清除缓存' + size.toFixed(5) + 'MB',
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
    async subMessage() {
        const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd');
        wx.navigateTo({ url: '/pages/index/web/web?url=' + url });
    },
    onPullDownRefresh: async function () {
        await this.start();
        wx.stopPullDownRefresh();
    },
    onShow() {
        this.start();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtLQUNUO0lBS0QsTUFBTSxFQUFFLEtBQUs7UUFDWCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDZCxDQUFDO0lBR0QsS0FBSyxDQUFDLEtBQUs7UUFDVCxhQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNyQyxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUk7b0JBQzFCLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBVSxDQUFDLENBQUMsa0JBQWtCLEVBQUU7b0JBQ3RELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDaEIsQ0FBQyxDQUFBO2dCQUNGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7YUFDekM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVKLENBQUM7SUFHRCxhQUFhO1FBQ1gsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUNoQixJQUFJLEVBQUUsYUFBYTtZQUNuQixPQUFPLEVBQUUsQ0FBQyxJQUE4QyxFQUFFLEVBQUU7Z0JBQzFELE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtnQkFDN0MsYUFBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDL0MsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO29CQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ2QsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRO1FBQ1osTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQzNCLEtBQUssRUFBRSxNQUFNO1lBQ2IsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsb0JBQW9CO1NBQ3JFLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNiLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLGFBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUNyQyxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7Z0JBQ2pCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDakIsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLE9BQU8sRUFBRSxlQUFlO2lCQUN6QixDQUFDLENBQUM7Z0JBQ0YsRUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFBO2FBQzlCO1NBQ0Y7SUFDSCxDQUFDO0lBR0QsV0FBVztRQUNULEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDYixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJO1lBQ1osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUNoQixPQUFPLENBQUMsR0FBRztnQkFDVCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtnQkFDbkMsSUFBSTtvQkFDRixFQUFFLENBQUMsWUFBWSxDQUFDO3dCQUNkLE9BQU87NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsUUFBUTtnQ0FDZixPQUFPLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSTtnQ0FDeEMsT0FBTztvQ0FDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtnQ0FDNUMsQ0FBQzs2QkFDRixDQUFDLENBQUE7d0JBQ0osQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsUUFBUTt3QkFDZixPQUFPLEVBQUUsS0FBSzt3QkFDZCxPQUFPOzRCQUNMLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO3dCQUM1QyxDQUFDO3FCQUNGLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxnTUFBZ00sQ0FBQyxDQUFBO1FBQ2hPLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsMkJBQTJCLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0lBS0QsaUJBQWlCLEVBQUUsS0FBSztRQUN0QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNsQixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNkLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC91c2VyL3VzZXIuanNcblxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG5hbWU6ICcnLFxuICAgIGF2YW50ZXI6ICcnLFxuICAgIHJnd3g6IGZhbHNlLFxuICAgIHJnVGltZTogJycsXG4gICAgd3hJZDogJydcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuXG4gIC8vXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGFwaS51c2VySW5mbygpLnRoZW4oKHsgY29kZSwgZGF0YSB9KSA9PiB7XG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICBhdmFudGVyOiBkYXRhLmF2YW50ZXIsXG4gICAgICAgICAgcmd3eDogZGF0YS5yZ3R5cGUgPT09ICd3eCcsXG4gICAgICAgICAgcmdUaW1lOiBuZXcgRGF0ZShkYXRhLmNyZWF0VGltZSEpLnRvTG9jYWxlRGF0ZVN0cmluZygpLFxuICAgICAgICAgIHd4SWQ6IGRhdGEud3hJZFxuICAgICAgICB9KVxuICAgICAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAndXNlcmluZm8nLCBkYXRhIH0pXG4gICAgICB9XG4gICAgfSlcblxuICB9LFxuXG4gIC8vIOabtOaWsOeUqOaIt+WktOWDj+WSjOWQjeensFxuICB1cGRhdGVBdmFudGVyKCkge1xuICAgIHd4LmdldFVzZXJQcm9maWxlKHtcbiAgICAgIGRlc2M6ICfnlKjkuo7mm7TmlrDnlKjmiLflpLTlg4/lkozmmLXnp7AnLFxuICAgICAgc3VjY2VzczogKGluZm86IHsgdXNlckluZm86IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvIH0pID0+IHtcbiAgICAgICAgY29uc3QgeyBuaWNrTmFtZSwgYXZhdGFyVXJsIH0gPSBpbmZvLnVzZXJJbmZvXG4gICAgICAgIGFwaS51cGRhdGVBdmFudGVyKG5pY2tOYW1lLCBhdmF0YXJVcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn5pu05paw5oiQ5YqfJyB9KVxuICAgICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOino+e7keW+ruS/oVxuICBhc3luYyB1bmJpbmR3eCgpIHtcbiAgICBjb25zdCBkID0gYXdhaXQgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn6Kej57uR5b6u5L+hJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuZGF0YS5yZ3d4ID8gJ+i/meWwhuS8muWIoOmZpOaCqOaJgOacieeahOmFjee9ruWSjOS/oeaBryEhIScgOiAn6L+Z5bCG5Lya6Kej6Zmk5bCP56iL5bqP5ZKM6YCP5Lyg6LSm5Y+35LmL6Ze055qE6L+e5o6lJyxcbiAgICB9KVxuXG4gICAgaWYgKGQuY29uZmlybSkge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSBhd2FpdCBhcGkudW5iaW5kd3goKVxuICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgdGhpcy5jbGVhckNhY2hlKClcbiAgICAgICAgYXdhaXQgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGNvbnRlbnQ6ICflt7LmiJDlip/op6Pnu5Es56Gu5a6a6YCA5Ye65bCP56iL5bqPJ1xuICAgICAgICB9KTtcbiAgICAgICAgKHd4IGFzIGFueSkuZXhpdE1pbmlQcm9ncmFtKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8g5omT5byA5b6u5L+h6K6+572uXG4gIG9wZW5TZXR0aW5nKCkge1xuICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgIHdpdGhTdWJzY3JpcHRpb25zOiB0cnVlLFxuICAgICAgc3VjY2VzcyhfcmVzKSB7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g5riF6Zmk57yT5a2YXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgd3guZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHJlcy5jdXJyZW50U2l6ZSAvIDEwMjRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3eC5jbGVhclN0b3JhZ2Uoe1xuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuaIkOWKnycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+a4hemZpOe8k+WtmCcgKyBzaXplLnRvRml4ZWQoNSkgKyAnTUInLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfnvJPlrZjmuIXnkIblpLHotKUnLFxuICAgICAgICAgICAgY29udGVudDogZXJyb3IsXG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog6K6i6ZiF5LiL5qyh5ZGK6K2mXG4gICAqL1xuICBhc3luYyBzdWJNZXNzYWdlKCkge1xuICAgIGNvbnN0IHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCgnaHR0cDovL21wLndlaXhpbi5xcS5jb20vcz9fX2Jpej1Nak01TWpBMU1UZ3hPUT09Jm1pZD0zMDQ4MTk5MzkmaWR4PTEmc249ZDBiY2Q5MjIwMzMwNzVhZmEyYjUyMTlmYzk1ZWJiMWUmY2hrc209MzE3M2E5ZTcwNjA0MjBmMWE5OGQwMDQwZDk2NGEyZjgyYWYyNTI4OWE3MzFkMTQwMGM1MjI0Y2E5YmIzZDIyNWQ3Mzc3MDA3MDBhOCNyZCcpXG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9pbmRleC93ZWIvd2ViP3VybD0nICsgdXJsIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHRoaXMuc3RhcnQoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5zdGFydCgpXG4gIH1cbn0pIl19