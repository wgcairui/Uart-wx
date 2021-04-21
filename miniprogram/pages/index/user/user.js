"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
Page({
    data: {
        name: '',
        avanter: '',
        rgwx: false,
        rgTime: ''
    },
    onLoad: async function () {
        this.start();
    },
    async start() {
        const { arg } = await api_1.default.getUserInfo();
        this.setData({
            name: arg.name,
            avanter: arg.avanter,
            rgwx: arg.rgtype === 'wx',
            rgTime: new Date(arg.creatTime).toLocaleDateString()
        });
        wx.setStorage({ key: 'userinfo', data: arg });
    },
    webLogin() {
        wx.showModal({
            title: 'Web登录',
            content: '打开https://uart.ladishb.com',
            success: (r) => {
                if (r.confirm) {
                    wx.scanCode({
                        success: async (res) => {
                            api_1.default.webLogin(res.result).then(result => {
                                if (result.ok) {
                                    wx.showModal({
                                        title: 'Scan',
                                        content: '扫码登录成功'
                                    });
                                }
                            });
                        }
                    });
                }
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
    async cancelwx() {
        wx.showModal({
            title: '注销操作',
            content: '是否确定注销此账号？',
            success: (res) => {
                if (res.confirm) {
                    api_1.default.cancelwx().then(({ ok, msg }) => {
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
                    });
                }
            }
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
    onPullDownRefresh: async function () {
        await this.start();
        wx.stopPullDownRefresh();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUtELE1BQU0sRUFBRSxLQUFLO1FBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUdELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEtBQUssSUFBSTtZQUN6QixNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVUsQ0FBQyxDQUFDLGtCQUFrQixFQUFFO1NBQ3RELENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRCxRQUFRO1FBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNYLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDYixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7b0JBQ2IsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNyQixhQUFHLENBQUMsUUFBUSxDQUFD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QUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJO2dDQUN4QyxPQUFPO29DQUNMLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO2dDQUM1QyxDQUFDOzZCQUNGLENBQUMsQ0FBQTt3QkFDSixDQUFDO3FCQUNGLENBQUMsQ0FBQTtpQkFDSDtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCxFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUNYLEtBQUssRUFBRSxRQUFRO3dCQUNmLE9BQU8sRUFBRSxLQUFLO3dCQUNkLE9BQU87NEJBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7d0JBQzVDLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFLRCxpQkFBaUIsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2xCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQzFCLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC91c2VyL3VzZXIuanNcblxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG5hbWU6ICcnLFxuICAgIGF2YW50ZXI6ICcnLFxuICAgIHJnd3g6IGZhbHNlLFxuICAgIHJnVGltZTogJydcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuXG4gIC8vXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGNvbnN0IHsgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0VXNlckluZm8oKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBuYW1lOiBhcmcubmFtZSxcbiAgICAgIGF2YW50ZXI6IGFyZy5hdmFudGVyLFxuICAgICAgcmd3eDogYXJnLnJndHlwZSA9PT0gJ3d4JyxcbiAgICAgIHJnVGltZTogbmV3IERhdGUoYXJnLmNyZWF0VGltZSEpLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gICAgfSlcbiAgICB3eC5zZXRTdG9yYWdlKHsga2V5OiAndXNlcmluZm8nLCBkYXRhOiBhcmcgfSlcbiAgfSxcbiAgLy8gd2ViTG9naW5cbiAgd2ViTG9naW4oKSB7XG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAnV2Vi55m75b2VJyxcbiAgICAgIGNvbnRlbnQ6ICfmiZPlvIBodHRwczovL3VhcnQubGFkaXNoYi5jb20nLFxuICAgICAgc3VjY2VzczogKHIpID0+IHtcbiAgICAgICAgaWYgKHIuY29uZmlybSkge1xuICAgICAgICAgIHd4LnNjYW5Db2RlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgYXBpLndlYkxvZ2luKHJlcy5yZXN1bHQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lm9rKSB7XG4gICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1NjYW4nLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5omr56CB55m75b2V5oiQ5YqfJ1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOabtOaWsOeUqOaIt+WktOWDj+WSjOWQjeensFxuICB1cGRhdGVBdmFudGVyKCkge1xuICAgIHd4LmdldFVzZXJQcm9maWxlKHtcbiAgICAgIGRlc2M6ICfnlKjkuo7mm7TmlrDnlKjmiLflpLTlg4/lkozmmLXnp7AnLFxuICAgICAgc3VjY2VzczogKGluZm86IHsgdXNlckluZm86IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvIH0pID0+IHtcbiAgICAgICAgY29uc3QgeyBuaWNrTmFtZSwgYXZhdGFyVXJsIH0gPSBpbmZvLnVzZXJJbmZvXG4gICAgICAgIGFwaS51cGRhdGVBdmFudGVyKG5pY2tOYW1lLCBhdmF0YXJVcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn5pu05paw5oiQ5YqfJyB9KVxuICAgICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOino+e7keW+ruS/oVxuICBhc3luYyB1bmJpbmR3eCgpIHtcbiAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS51bmJpbmR3eCgpXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLmNsZWFyQ2FjaGUoKVxuICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5pON5L2c5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogbXNnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g5rOo6ZSA6LSm5Y+3XG4gIGFzeW5jIGNhbmNlbHd4KCkge1xuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+azqOmUgOaTjeS9nCcsXG4gICAgICBjb250ZW50OiAn5piv5ZCm56Gu5a6a5rOo6ZSA5q2k6LSm5Y+377yfJyxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgYXBpLmNhbmNlbHd4KCkudGhlbigoeyBvaywgbXNnIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKVxuICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmk43kvZzlpLHotKUnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDmiZPlvIDlvq7kv6Horr7nva5cbiAgb3BlblNldHRpbmcoKSB7XG4gICAgd3gub3BlblNldHRpbmcoe1xuICAgICAgd2l0aFN1YnNjcmlwdGlvbnM6IHRydWUsXG4gICAgICBzdWNjZXNzKF9yZXMpIHtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDmuIXpmaTnvJPlrZhcbiAgY2xlYXJDYWNoZSgpIHtcbiAgICB3eC5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBjb25zdCBzaXplID0gcmVzLmN1cnJlbnRTaXplIC8gMTAyNFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZSh7XG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn57yT5a2Y5riF55CG5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5riF6Zmk57yT5a2YJyArIHNpemUudG9GaXhlZCg1KSArICdNQicsXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuWksei0pScsXG4gICAgICAgICAgICBjb250ZW50OiBlcnJvcixcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLnN0YXJ0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfVxufSkiXX0=