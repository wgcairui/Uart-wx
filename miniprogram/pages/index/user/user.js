"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
Page({
    data: {
        name: '',
        avanter: '',
        rgwx: false,
        rgTime: '',
        wxId: '',
        test: false
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
                    wxId: data.wxId,
                    test: Boolean(data.userGroup === 'test')
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
            api_1.default.ws.close({});
            const { code } = await api_1.default.unbindwx();
            if (code) {
                this.clearCache();
            }
            wx.exitMiniProgram();
        }
    },
    async exitTest() {
        api_1.default.setToken('');
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    async checkVersion() {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            wx.showToast({ title: res.hasUpdate ? '有新版本,正在后台更新' : '最新版', icon: 'none' });
            console.log("新版本：" + res.hasUpdate);
        });
        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success(res) {
                    if (res.confirm) {
                        updateManager.applyUpdate();
                    }
                }
            });
        });
        updateManager.onUpdateFailed(function () {
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxLQUFLO0tBQ1o7SUFLRCxNQUFNLEVBQUUsS0FBSztRQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNkLENBQUM7SUFHRCxLQUFLLENBQUMsS0FBSztRQUNULGFBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtvQkFDMUIsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFVLENBQUMsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDdEQsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUM7aUJBQ3pDLENBQUMsQ0FBQTtnQkFDRixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2FBQ3pDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFSixDQUFDO0lBR0QsYUFBYTtRQUNYLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDaEIsSUFBSSxF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Q1gsS0FBSyxFQUFFLFFBQVE7Z0NBQ2YsT0FBTyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUk7Z0NBQ3hDLE9BQU87b0NBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0NBQzVDLENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTt3QkFDNUMsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUtELEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsZ01BQWdNLENBQUMsQ0FBQTtRQUNoTyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDM0QsQ0FBQztJQUtELGlCQUFpQixFQUFFLEtBQUs7UUFDdEIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDbEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUNELE1BQU07UUFDSixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDZCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvdXNlci91c2VyLmpzXG5cbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5cblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBuYW1lOiAnJyxcbiAgICBhdmFudGVyOiAnJyxcbiAgICByZ3d4OiBmYWxzZSxcbiAgICByZ1RpbWU6ICcnLFxuICAgIHd4SWQ6ICcnLFxuICAgIHRlc3Q6IGZhbHNlXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN0YXJ0KClcbiAgfSxcblxuICAvL1xuICBhc3luYyBzdGFydCgpIHtcbiAgICBhcGkudXNlckluZm8oKS50aGVuKCh7IGNvZGUsIGRhdGEgfSkgPT4ge1xuICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgYXZhbnRlcjogZGF0YS5hdmFudGVyLFxuICAgICAgICAgIHJnd3g6IGRhdGEucmd0eXBlID09PSAnd3gnLFxuICAgICAgICAgIHJnVGltZTogbmV3IERhdGUoZGF0YS5jcmVhdFRpbWUhKS50b0xvY2FsZURhdGVTdHJpbmcoKSxcbiAgICAgICAgICB3eElkOiBkYXRhLnd4SWQsXG4gICAgICAgICAgdGVzdDogQm9vbGVhbihkYXRhLnVzZXJHcm91cCA9PT0gJ3Rlc3QnKVxuICAgICAgICB9KVxuICAgICAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAndXNlcmluZm8nLCBkYXRhIH0pXG4gICAgICB9XG4gICAgfSlcblxuICB9LFxuXG4gIC8vIOabtOaWsOeUqOaIt+WktOWDj+WSjOWQjeensFxuICB1cGRhdGVBdmFudGVyKCkge1xuICAgIHd4LmdldFVzZXJQcm9maWxlKHtcbiAgICAgIGRlc2M6ICfnlKjkuo7mm7TmlrDnlKjmiLflpLTlg4/lkozmmLXnp7AnLFxuICAgICAgc3VjY2VzczogKGluZm86IHsgdXNlckluZm86IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvIH0pID0+IHtcbiAgICAgICAgY29uc3QgeyBuaWNrTmFtZSwgYXZhdGFyVXJsIH0gPSBpbmZvLnVzZXJJbmZvXG4gICAgICAgIGFwaS51cGRhdGVBdmFudGVyKG5pY2tOYW1lLCBhdmF0YXJVcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn5pu05paw5oiQ5YqfJyB9KVxuICAgICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOino+e7keW+ruS/oVxuICBhc3luYyB1bmJpbmR3eCgpIHtcbiAgICBjb25zdCBkID0gYXdhaXQgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn6Kej57uR5b6u5L+hJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuZGF0YS5yZ3d4ID8gJ+i/meWwhuS8muWIoOmZpOaCqOaJgOacieeahOmFjee9ruWSjOS/oeaBryEhIScgOiAn6L+Z5bCG5Lya6Kej6Zmk5bCP56iL5bqP5ZKM6YCP5Lyg6LSm5Y+35LmL6Ze055qE6L+e5o6lJyxcbiAgICB9KVxuXG4gICAgaWYgKGQuY29uZmlybSkge1xuICAgICAgYXBpLndzLmNsb3NlKHt9KVxuICAgICAgY29uc3QgeyBjb2RlIH0gPSBhd2FpdCBhcGkudW5iaW5kd3goKVxuICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgdGhpcy5jbGVhckNhY2hlKClcbiAgICAgIH1cbiAgICAgIHd4LmV4aXRNaW5pUHJvZ3JhbSgpXG4gICAgfVxuICB9LFxuXG4gIC8vIOmAgOWHuua1i+ivleaooeW8j1xuICBhc3luYyBleGl0VGVzdCgpe1xuICAgIGFwaS5zZXRUb2tlbignJylcbiAgICB3eC5yZUxhdW5jaCh7XG4gICAgICB1cmw6XCIvcGFnZXMvaW5kZXgvaW5kZXhcIlxuICAgIH0pXG4gIH0sXG5cbiAgLy/mo4Dmn6Xmm7TmlrBcbiAgYXN5bmMgY2hlY2tWZXJzaW9uKCkge1xuICAgIGNvbnN0IHVwZGF0ZU1hbmFnZXIgPSB3eC5nZXRVcGRhdGVNYW5hZ2VyKClcbiAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8g6K+35rGC5a6M5paw54mI5pys5L+h5oGv55qE5Zue6LCDXG4gICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogcmVzLmhhc1VwZGF0ZSA/ICfmnInmlrDniYjmnKws5q2j5Zyo5ZCO5Y+w5pu05pawJyA6ICfmnIDmlrDniYgnLCBpY29uOiAnbm9uZScgfSlcbiAgICAgIGNvbnNvbGUubG9nKFwi5paw54mI5pys77yaXCIgKyByZXMuaGFzVXBkYXRlKVxuICAgIH0pXG5cbiAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlUmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmm7TmlrDmj5DnpLonLFxuICAgICAgICBjb250ZW50OiAn5paw54mI5pys5bey57uP5YeG5aSH5aW977yM5piv5ZCm6YeN5ZCv5bqU55So77yfJyxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIC8vIOaWsOeahOeJiOacrOW3sue7j+S4i+i9veWlve+8jOiwg+eUqCBhcHBseVVwZGF0ZSDlupTnlKjmlrDniYjmnKzlubbph43lkK9cbiAgICAgICAgICAgIHVwZGF0ZU1hbmFnZXIuYXBwbHlVcGRhdGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZUZhaWxlZChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyDmlrDniYjmnKzkuIvovb3lpLHotKVcbiAgICB9KVxuICB9LFxuXG4gIC8vIOaJk+W8gOW+ruS/oeiuvue9rlxuICBvcGVuU2V0dGluZygpIHtcbiAgICB3eC5vcGVuU2V0dGluZyh7XG4gICAgICB3aXRoU3Vic2NyaXB0aW9uczogdHJ1ZSxcbiAgICAgIHN1Y2Nlc3MoX3Jlcykge1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOa4hemZpOe8k+WtmFxuICBjbGVhckNhY2hlKCkge1xuICAgIHd4LmdldFN0b3JhZ2VJbmZvKHtcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSByZXMuY3VycmVudFNpemUgLyAxMDI0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgd3guY2xlYXJTdG9yYWdlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfnvJPlrZjmuIXnkIbmiJDlip8nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmuIXpmaTnvJPlrZgnICsgc2l6ZS50b0ZpeGVkKDUpICsgJ01CJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn57yT5a2Y5riF55CG5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yLFxuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOiuoumYheS4i+asoeWRiuitplxuICAgKi9cbiAgYXN5bmMgc3ViTWVzc2FnZSgpIHtcbiAgICBjb25zdCB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQoJ2h0dHA6Ly9tcC53ZWl4aW4ucXEuY29tL3M/X19iaXo9TWpNNU1qQTFNVGd4T1E9PSZtaWQ9MzA0ODE5OTM5JmlkeD0xJnNuPWQwYmNkOTIyMDMzMDc1YWZhMmI1MjE5ZmM5NWViYjFlJmNoa3NtPTMxNzNhOWU3MDYwNDIwZjFhOThkMDA0MGQ5NjRhMmY4MmFmMjUyODlhNzMxZDE0MDBjNTIyNGNhOWJiM2QyMjVkNzM3NzAwNzAwYTgjcmQnKVxuICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvaW5kZXgvd2ViL3dlYj91cmw9JyArIHVybCB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLnN0YXJ0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcbiAgb25TaG93KCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9XG59KSJdfQ==