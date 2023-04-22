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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksRUFBRSxLQUFLO0tBQ1o7SUFLRCxNQUFNLEVBQUUsS0FBSztRQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNkLENBQUM7SUFHRCxLQUFLLENBQUMsS0FBSztRQUNULGFBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtvQkFDMUIsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFVLENBQUMsQ0FBQyxrQkFBa0IsRUFBRTtvQkFDdEQsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUM7aUJBQ3pDLENBQUMsQ0FBQTtnQkFDRixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2FBQ3pDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFSixDQUFDO0lBR0QsYUFBYTtRQUNYLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDaEIsSUFBSSxF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Q1gsS0FBSyxFQUFFLFFBQVE7Z0NBQ2YsT0FBTyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUk7Z0NBQ3hDLE9BQU87b0NBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0NBQzVDLENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsT0FBTyxFQUFFLEtBQVk7d0JBQ3JCLE9BQU87NEJBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7d0JBQzVDLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFLRCxLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDLGdNQUFnTSxDQUFDLENBQUE7UUFDaE8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSwyQkFBMkIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFLRCxpQkFBaUIsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2xCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L3VzZXIvdXNlci5qc1xuXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgcmd3eDogZmFsc2UsXG4gICAgcmdUaW1lOiAnJyxcbiAgICB3eElkOiAnJyxcbiAgICB0ZXN0OiBmYWxzZVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFydCgpXG4gIH0sXG5cbiAgLy9cbiAgYXN5bmMgc3RhcnQoKSB7XG4gICAgYXBpLnVzZXJJbmZvKCkudGhlbigoeyBjb2RlLCBkYXRhIH0pID0+IHtcbiAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgIGF2YW50ZXI6IGRhdGEuYXZhbnRlcixcbiAgICAgICAgICByZ3d4OiBkYXRhLnJndHlwZSA9PT0gJ3d4JyxcbiAgICAgICAgICByZ1RpbWU6IG5ldyBEYXRlKGRhdGEuY3JlYXRUaW1lISkudG9Mb2NhbGVEYXRlU3RyaW5nKCksXG4gICAgICAgICAgd3hJZDogZGF0YS53eElkLFxuICAgICAgICAgIHRlc3Q6IEJvb2xlYW4oZGF0YS51c2VyR3JvdXAgPT09ICd0ZXN0JylcbiAgICAgICAgfSlcbiAgICAgICAgd3guc2V0U3RvcmFnZSh7IGtleTogJ3VzZXJpbmZvJywgZGF0YSB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgfSxcblxuICAvLyDmm7TmlrDnlKjmiLflpLTlg4/lkozlkI3np7BcbiAgdXBkYXRlQXZhbnRlcigpIHtcbiAgICB3eC5nZXRVc2VyUHJvZmlsZSh7XG4gICAgICBkZXNjOiAn55So5LqO5pu05paw55So5oi35aS05YOP5ZKM5pi156ewJyxcbiAgICAgIHN1Y2Nlc3M6IChpbmZvOiB7IHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbyB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmlja05hbWUsIGF2YXRhclVybCB9ID0gaW5mby51c2VySW5mb1xuICAgICAgICBhcGkudXBkYXRlQXZhbnRlcihuaWNrTmFtZSwgYXZhdGFyVXJsKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+abtOaWsOaIkOWKnycgfSlcbiAgICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDop6Pnu5Hlvq7kv6FcbiAgYXN5bmMgdW5iaW5kd3goKSB7XG4gICAgY29uc3QgZCA9IGF3YWl0IHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+ino+e7keW+ruS/oScsXG4gICAgICBjb250ZW50OiB0aGlzLmRhdGEucmd3eCA/ICfov5nlsIbkvJrliKDpmaTmgqjmiYDmnInnmoTphY3nva7lkozkv6Hmga8hISEnIDogJ+i/meWwhuS8muino+mZpOWwj+eoi+W6j+WSjOmAj+S8oOi0puWPt+S5i+mXtOeahOi/nuaOpScsXG4gICAgfSlcblxuICAgIGlmIChkLmNvbmZpcm0pIHtcbiAgICAgIGFwaS53cy5jbG9zZSh7fSlcbiAgICAgIGNvbnN0IHsgY29kZSB9ID0gYXdhaXQgYXBpLnVuYmluZHd4KClcbiAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpXG4gICAgICB9XG4gICAgICB3eC5leGl0TWluaVByb2dyYW0oKVxuICAgIH1cbiAgfSxcblxuICAvLyDpgIDlh7rmtYvor5XmqKHlvI9cbiAgYXN5bmMgZXhpdFRlc3QoKXtcbiAgICBhcGkuc2V0VG9rZW4oJycpXG4gICAgd3gucmVMYXVuY2goe1xuICAgICAgdXJsOlwiL3BhZ2VzL2luZGV4L2luZGV4XCJcbiAgICB9KVxuICB9LFxuXG4gIC8v5qOA5p+l5pu05pawXG4gIGFzeW5jIGNoZWNrVmVyc2lvbigpIHtcbiAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpXG4gICAgdXBkYXRlTWFuYWdlci5vbkNoZWNrRm9yVXBkYXRlKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIC8vIOivt+axguWujOaWsOeJiOacrOS/oeaBr+eahOWbnuiwg1xuICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IHJlcy5oYXNVcGRhdGUgPyAn5pyJ5paw54mI5pysLOato+WcqOWQjuWPsOabtOaWsCcgOiAn5pyA5paw54mIJywgaWNvbjogJ25vbmUnIH0pXG4gICAgICBjb25zb2xlLmxvZyhcIuaWsOeJiOacrO+8mlwiICsgcmVzLmhhc1VwZGF0ZSlcbiAgICB9KVxuXG4gICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5pu05paw5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+aWsOeJiOacrOW3sue7j+WHhuWkh+Wlve+8jOaYr+WQpumHjeWQr+W6lOeUqO+8nycsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAvLyDmlrDnmoTniYjmnKzlt7Lnu4/kuIvovb3lpb3vvIzosIPnlKggYXBwbHlVcGRhdGUg5bqU55So5paw54mI5pys5bm26YeN5ZCvXG4gICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVGYWlsZWQoZnVuY3Rpb24gKCkge1xuICAgICAgLy8g5paw54mI5pys5LiL6L295aSx6LSlXG4gICAgfSlcbiAgfSxcblxuICAvLyDmiZPlvIDlvq7kv6Horr7nva5cbiAgb3BlblNldHRpbmcoKSB7XG4gICAgd3gub3BlblNldHRpbmcoe1xuICAgICAgd2l0aFN1YnNjcmlwdGlvbnM6IHRydWUsXG4gICAgICBzdWNjZXNzKF9yZXMpIHtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDmuIXpmaTnvJPlrZhcbiAgY2xlYXJDYWNoZSgpIHtcbiAgICB3eC5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBjb25zdCBzaXplID0gcmVzLmN1cnJlbnRTaXplIC8gMTAyNFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZSh7XG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn57yT5a2Y5riF55CG5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5riF6Zmk57yT5a2YJyArIHNpemUudG9GaXhlZCg1KSArICdNQicsXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuWksei0pScsXG4gICAgICAgICAgICBjb250ZW50OiBlcnJvciBhcyBhbnksXG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog6K6i6ZiF5LiL5qyh5ZGK6K2mXG4gICAqL1xuICBhc3luYyBzdWJNZXNzYWdlKCkge1xuICAgIGNvbnN0IHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCgnaHR0cDovL21wLndlaXhpbi5xcS5jb20vcz9fX2Jpej1Nak01TWpBMU1UZ3hPUT09Jm1pZD0zMDQ4MTk5MzkmaWR4PTEmc249ZDBiY2Q5MjIwMzMwNzVhZmEyYjUyMTlmYzk1ZWJiMWUmY2hrc209MzE3M2E5ZTcwNjA0MjBmMWE5OGQwMDQwZDk2NGEyZjgyYWYyNTI4OWE3MzFkMTQwMGM1MjI0Y2E5YmIzZDIyNWQ3Mzc3MDA3MDBhOCNyZCcpXG4gICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9pbmRleC93ZWIvd2ViP3VybD0nICsgdXJsIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHRoaXMuc3RhcnQoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5zdGFydCgpXG4gIH1cbn0pIl19