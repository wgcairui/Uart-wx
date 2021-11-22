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
        const a = 10;
        a.toFixed;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFpQztBQUNqQyxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBRTtRQUNSLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLEtBQUs7S0FDWjtJQUtELE1BQU0sRUFBRSxLQUFLO1FBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUdELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtTQUMzQixDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDWixDQUFDLENBQUMsT0FBTyxDQUFBO0lBQ1gsQ0FBQztJQUVELGFBQWE7UUFDWCxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2hCLElBQUksRUFBRSxhQUFhO1lBQ25CLE9BQU8sRUFBRSxDQUFDLElBQThDLEVBQUUsRUFBRTtnQkFDMUQsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO2dCQUM3QyxhQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUMvQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7b0JBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFDZCxDQUFDLENBQUMsQ0FBQTtZQUNKLENB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Q0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFJRCxpQkFBaUIsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2xCLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQzFCLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC91c2VyL3VzZXIuanNcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uL3V0aWxzL2FwaVwiXG5QYWdlKHtcbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG5hbWU6ICcnLFxuICAgIGF2YW50ZXI6ICcnLFxuICAgIHJnd3g6IGZhbHNlXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN0YXJ0KClcbiAgfSxcblxuICAvL1xuICBhc3luYyBzdGFydCgpIHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGFwaS51c2VySW5mbygpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGF2YW50ZXI6IGRhdGEuYXZhbnRlcixcbiAgICAgIHJnd3g6IGRhdGEucmd0eXBlID09PSAnd3gnLFxuICAgIH0pXG5cbiAgICBjb25zdCBhID0gMTBcbiAgICBhLnRvRml4ZWRcbiAgfSxcbiAgLy8g5pu05paw55So5oi35aS05YOP5ZKM5ZCN56ewXG4gIHVwZGF0ZUF2YW50ZXIoKSB7XG4gICAgd3guZ2V0VXNlclByb2ZpbGUoe1xuICAgICAgZGVzYzogJ+eUqOS6juabtOaWsOeUqOaIt+WktOWDj+WSjOaYteensCcsXG4gICAgICBzdWNjZXNzOiAoaW5mbzogeyB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gfSkgPT4ge1xuICAgICAgICBjb25zdCB7IG5pY2tOYW1lLCBhdmF0YXJVcmwgfSA9IGluZm8udXNlckluZm9cbiAgICAgICAgYXBpLnVwZGF0ZUF2YW50ZXIobmlja05hbWUsIGF2YXRhclVybCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfmm7TmlrDmiJDlip8nIH0pXG4gICAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvL+ajgOafpeabtOaWsFxuICBhc3luYyBjaGVja1ZlcnNpb24oKXtcbiAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpXG4gICAgICAgIHVwZGF0ZU1hbmFnZXIub25DaGVja0ZvclVwZGF0ZShmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAvLyDor7fmsYLlrozmlrDniYjmnKzkv6Hmga/nmoTlm57osINcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiByZXMuaGFzVXBkYXRlID8gJ+acieaWsOeJiOacrCzmraPlnKjlkI7lj7Dmm7TmlrAnIDogJ+acgOaWsOeJiCcsIGljb246ICdub25lJyB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlrDniYjmnKzvvJpcIiArIHJlcy5oYXNVcGRhdGUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmm7TmlrDmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmlrDniYjmnKzlt7Lnu4/lh4blpIflpb3vvIzmmK/lkKbph43lkK/lupTnlKjvvJ8nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5paw55qE54mI5pys5bey57uP5LiL6L295aW977yM6LCD55SoIGFwcGx5VXBkYXRlIOW6lOeUqOaWsOeJiOacrOW5tumHjeWQr1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5hcHBseVVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVGYWlsZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8g5paw54mI5pys5LiL6L295aSx6LSlXG4gICAgICAgIH0pXG4gIH0sXG4gIC8vIOino+e7keW+ruS/oVxuICBhc3luYyB1bmJpbmR3eCgpIHtcbiAgICBjb25zdCBkID0gYXdhaXQgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn6Kej57uR5b6u5L+hJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuZGF0YS5yZ3d4ID8gJ+i/meWwhuS8muWIoOmZpOaCqOaJgOacieeahOmFjee9ruWSjOS/oeaBryEhIScgOiAn6L+Z5bCG5Lya6Kej6Zmk5bCP56iL5bqP5ZKM6YCP5Lyg6LSm5Y+35LmL6Ze055qE6L+e5o6lJyxcbiAgICB9KVxuXG4gICAgaWYgKGQuY29uZmlybSkge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSBhd2FpdCBhcGkudW5iaW5kd3goKVxuICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgdGhpcy5jbGVhckNhY2hlKClcbiAgICAgICAgYXdhaXQgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGNvbnRlbnQ6ICflt7LmiJDlip/op6Pnu5Es56Gu5a6a6YCA5Ye65bCP56iL5bqPJ1xuICAgICAgICB9KTtcbiAgICAgICAgKHd4IGFzIGFueSkuZXhpdE1pbmlQcm9ncmFtKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vXG4gIG9wZW5TZXR0aW5nKCkge1xuICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgIHdpdGhTdWJzY3JpcHRpb25zOiB0cnVlLFxuICAgICAgc3VjY2VzcyhfcmVzKSB7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgY2xlYXJDYWNoZSgpIHtcbiAgICB3eC5nZXRTdG9yYWdlSW5mbyh7XG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBjb25zdCBzaXplID0gcmVzLmN1cnJlbnRTaXplIC8gMTAyNFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZSh7XG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn57yT5a2Y5riF55CG5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5riF6Zmk57yT5a2YJyArIHNpemUgKyAnTUInLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfnvJPlrZjmuIXnkIblpLHotKUnLFxuICAgICAgICAgICAgY29udGVudDogZXJyb3IsXG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHRoaXMuc3RhcnQoKVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICB9XG59KSJdfQ==