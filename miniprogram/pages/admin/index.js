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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFpQztBQUNqQyxJQUFJLENBQUM7SUFJSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBRTtRQUNSLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLEtBQUs7S0FDWjtJQUtELE1BQU0sRUFBRSxLQUFLO1FBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUdELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtTQUMzQixDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDWixDQUFDLENBQUMsT0FBTyxDQUFBO0lBQ1gsQ0FBQztJQUVELGFBQWE7UUFDWCxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2hCLElBQUksRUFBRSxhQUFhO1lBQ25CLE9BQU8sRUFBRSxDQUFDLElBQThDLEVBQUUsRUFBRTtnQkFDMUQsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO2dCQUM3QyxhQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUMvQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7b0JBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFDZCxDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVE7UUFDWixNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDM0IsS0FBSyxFQUFFLE1BQU07WUFDYixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxvQkFBb0I7U0FDckUsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ2IsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ3JDLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtnQkFDakIsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNqQixLQUFLLEVBQUUsU0FBUztvQkFDaEIsT0FBTyxFQUFFLGVBQWU7aUJBQ3pCLENBQUMsQ0FBQztnQkFDRixFQUFVLENBQUMsZUFBZSxFQUFFLENBQUE7YUFDOUI7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxDQUFDLElBQUk7WUFDWixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFVBQVU7UUFDUixFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHO2dCQUNULE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO2dCQUNuQyxJQUFJO29CQUNGLEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxRQUFRO2dDQUNmLE9BQU8sRUFBRSxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUk7Z0NBQzdCLE9BQU87b0NBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0NBQzVDLENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTt3QkFDNUMsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUlELGlCQUFpQixFQUFFLEtBQUs7UUFDdEIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDbEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L3VzZXIvdXNlci5qc1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCJcblBhZ2Uoe1xuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgcmd3eDogZmFsc2VcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQoKVxuICB9LFxuXG4gIC8vXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXBpLnVzZXJJbmZvKClcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgYXZhbnRlcjogZGF0YS5hdmFudGVyLFxuICAgICAgcmd3eDogZGF0YS5yZ3R5cGUgPT09ICd3eCcsXG4gICAgfSlcblxuICAgIGNvbnN0IGEgPSAxMFxuICAgIGEudG9GaXhlZFxuICB9LFxuICAvLyDmm7TmlrDnlKjmiLflpLTlg4/lkozlkI3np7BcbiAgdXBkYXRlQXZhbnRlcigpIHtcbiAgICB3eC5nZXRVc2VyUHJvZmlsZSh7XG4gICAgICBkZXNjOiAn55So5LqO5pu05paw55So5oi35aS05YOP5ZKM5pi156ewJyxcbiAgICAgIHN1Y2Nlc3M6IChpbmZvOiB7IHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbyB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmlja05hbWUsIGF2YXRhclVybCB9ID0gaW5mby51c2VySW5mb1xuICAgICAgICBhcGkudXBkYXRlQXZhbnRlcihuaWNrTmFtZSwgYXZhdGFyVXJsKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+abtOaWsOaIkOWKnycgfSlcbiAgICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDop6Pnu5Hlvq7kv6FcbiAgYXN5bmMgdW5iaW5kd3goKSB7XG4gICAgY29uc3QgZCA9IGF3YWl0IHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+ino+e7keW+ruS/oScsXG4gICAgICBjb250ZW50OiB0aGlzLmRhdGEucmd3eCA/ICfov5nlsIbkvJrliKDpmaTmgqjmiYDmnInnmoTphY3nva7lkozkv6Hmga8hISEnIDogJ+i/meWwhuS8muino+mZpOWwj+eoi+W6j+WSjOmAj+S8oOi0puWPt+S5i+mXtOeahOi/nuaOpScsXG4gICAgfSlcblxuICAgIGlmIChkLmNvbmZpcm0pIHtcbiAgICAgIGNvbnN0IHsgY29kZSB9ID0gYXdhaXQgYXBpLnVuYmluZHd4KClcbiAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJDYWNoZSgpXG4gICAgICAgIGF3YWl0IHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICBjb250ZW50OiAn5bey5oiQ5Yqf6Kej57uRLOehruWumumAgOWHuuWwj+eoi+W6jydcbiAgICAgICAgfSk7XG4gICAgICAgICh3eCBhcyBhbnkpLmV4aXRNaW5pUHJvZ3JhbSgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvL1xuICBvcGVuU2V0dGluZygpIHtcbiAgICB3eC5vcGVuU2V0dGluZyh7XG4gICAgICB3aXRoU3Vic2NyaXB0aW9uczogdHJ1ZSxcbiAgICAgIHN1Y2Nlc3MoX3Jlcykge1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgd3guZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHJlcy5jdXJyZW50U2l6ZSAvIDEwMjRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3eC5jbGVhclN0b3JhZ2Uoe1xuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuaIkOWKnycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+a4hemZpOe8k+WtmCcgKyBzaXplICsgJ01CJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn57yT5a2Y5riF55CG5aSx6LSlJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yLFxuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLnN0YXJ0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfVxufSkiXX0=