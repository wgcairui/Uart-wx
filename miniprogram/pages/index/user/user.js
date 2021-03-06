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
                api_1.default.updateAvanter(nickName, avatarUrl).then(el => {
                    console.log(el);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUtELE1BQU0sRUFBRSxLQUFLO1FBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUdELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDcEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEtBQUssSUFBSTtZQUN6QixNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVUsQ0FBQyxDQUFDLGtCQUFrQixFQUFFO1NBQ3RELENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRCxRQUFRO1FBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNYLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDYixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7b0JBQ2IsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFDVixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNyQixhQUFHLENBQUMsUUFBUSxDQUFD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QUk7Z0NBQ3hDLE9BQU87b0NBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7Z0NBQzVDLENBQUM7NkJBQ0YsQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTzs0QkFDTCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTt3QkFDNUMsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUtELGlCQUFpQixFQUFFLEtBQUs7UUFDdEIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDbEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDMUIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L3VzZXIvdXNlci5qc1xuXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgYXZhbnRlcjogJycsXG4gICAgcmd3eDogZmFsc2UsXG4gICAgcmdUaW1lOiAnJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFydCgpXG4gIH0sXG5cbiAgLy9cbiAgYXN5bmMgc3RhcnQoKSB7XG4gICAgY29uc3QgeyBhcmcgfSA9IGF3YWl0IGFwaS5nZXRVc2VySW5mbygpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG5hbWU6IGFyZy5uYW1lLFxuICAgICAgYXZhbnRlcjogYXJnLmF2YW50ZXIsXG4gICAgICByZ3d4OiBhcmcucmd0eXBlID09PSAnd3gnLFxuICAgICAgcmdUaW1lOiBuZXcgRGF0ZShhcmcuY3JlYXRUaW1lISkudG9Mb2NhbGVEYXRlU3RyaW5nKClcbiAgICB9KVxuICAgIHd4LnNldFN0b3JhZ2UoeyBrZXk6ICd1c2VyaW5mbycsIGRhdGE6IGFyZyB9KVxuICB9LFxuICAvLyB3ZWJMb2dpblxuICB3ZWJMb2dpbigpIHtcbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICdXZWLnmbvlvZUnLFxuICAgICAgY29udGVudDogJ+aJk+W8gGh0dHBzOi8vdWFydC5sYWRpc2hiLmNvbScsXG4gICAgICBzdWNjZXNzOiAocikgPT4ge1xuICAgICAgICBpZiAoci5jb25maXJtKSB7XG4gICAgICAgICAgd3guc2NhbkNvZGUoe1xuICAgICAgICAgICAgc3VjY2VzczogYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgICBhcGkud2ViTG9naW4ocmVzLnJlc3VsdCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQub2spIHtcbiAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU2NhbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmiavnoIHnmbvlvZXmiJDlip8nXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g5pu05paw55So5oi35aS05YOP5ZKM5ZCN56ewXG4gIHVwZGF0ZUF2YW50ZXIoKSB7XG4gICAgKHd4IGFzIGFueSkuZ2V0VXNlclByb2ZpbGUoe1xuICAgICAgZGVzYzogJ+eUqOS6juabtOaWsOeUqOaIt+WktOWDj+WSjOaYteensCcsXG4gICAgICBzdWNjZXNzOiAoaW5mbzogeyB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gfSkgPT4ge1xuICAgICAgICBjb25zdCB7IG5pY2tOYW1lLCBhdmF0YXJVcmwgfSA9IGluZm8udXNlckluZm9cbiAgICAgICAgYXBpLnVwZGF0ZUF2YW50ZXIobmlja05hbWUsIGF2YXRhclVybCkudGhlbihlbD0+e1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVsKTtcbiAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDop6Pnu5Hlvq7kv6FcbiAgYXN5bmMgdW5iaW5kd3goKSB7XG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkudW5iaW5kd3goKVxuICAgIGlmIChvaykge1xuICAgICAgdGhpcy5jbGVhckNhY2hlKClcbiAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aTjeS9nOWksei0pScsXG4gICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOazqOmUgOi0puWPt1xuICBhc3luYyBjYW5jZWx3eCgpIHtcbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfms6jplIDmk43kvZwnLFxuICAgICAgY29udGVudDogJ+aYr+WQpuehruWumuazqOmUgOatpOi0puWPt++8nycsXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIGFwaS5jYW5jZWx3eCgpLnRoZW4oKHsgb2ssIG1zZyB9KSA9PiB7XG4gICAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgICAgdGhpcy5jbGVhckNhY2hlKClcbiAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5pON5L2c5aSx6LSlJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g5omT5byA5b6u5L+h6K6+572uXG4gIG9wZW5TZXR0aW5nKCkge1xuICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgIHdpdGhTdWJzY3JpcHRpb25zOiB0cnVlLFxuICAgICAgc3VjY2VzcyhfcmVzKSB7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g5riF6Zmk57yT5a2YXG4gIGNsZWFyQ2FjaGUoKSB7XG4gICAgd3guZ2V0U3RvcmFnZUluZm8oe1xuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHJlcy5jdXJyZW50U2l6ZSAvIDEwMjRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3eC5jbGVhclN0b3JhZ2Uoe1xuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+e8k+WtmOa4heeQhuaIkOWKnycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+a4hemZpOe8k+WtmCcgKyBzaXplLnRvRml4ZWQoNSkgKyAnTUInLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfnvJPlrZjmuIXnkIblpLHotKUnLFxuICAgICAgICAgICAgY29udGVudDogZXJyb3IsXG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7IHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5zdGFydCgpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH1cbn0pIl19