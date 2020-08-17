"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var computed = require("miniprogram-computed");
var util_1 = require("../../utils/util");
Page({
    behaviors: [computed],
    data: {
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isregister: false,
        userInfo: {},
        tel: '',
        mail: 'wgcairui@icloud.com',
        registerloading: false
    },
    computed: {
        isR: function (data) {
            var istel = /^1(3|4|5|7|8)\d{9}$/.test(data.tel);
            var ismail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(data.mail);
            return istel && ismail;
        }
    },
    onLoad: function (_options) {
        var _this = this;
        wx.login({
            success: function (res) {
                {
                    wx.getUserInfo({
                        success: function (res) {
                            app.globalData.userInfo = res.userInfo;
                            _this.setData({
                                userInfo: res.userInfo,
                                hasUserInfo: true,
                            });
                            if (app.userInfoReadyCallback) {
                                app.userInfoReadyCallback(res);
                            }
                        },
                        fail: function () {
                            wx.showModal({
                                title: '授权错误',
                                content: "小程序登录需要微信昵称头像"
                            });
                        }
                    });
                }
                {
                    util_1.login({ js_code: res.code }).then(function (res) {
                        if (res.ok) {
                            app.globalData.user = res.arg.user;
                            app.globalData.userGroup = res.arg.userGroup;
                            _this.setData({
                                isregister: false
                            });
                            console.log(_this);
                        }
                        else {
                            app.globalData.openid = res.arg.openid;
                            _this.setData({
                                isregister: true
                            });
                            wx.showToast({ title: res.msg, icon: "none", duration: 3000 });
                        }
                    }).catch(function (e) {
                        wx.showModal({ title: '登录出错', content: e });
                    });
                }
            }
        });
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },
    getphonenumber: function (e) {
        var _this = this;
        util_1.getphonenumber({ encryptedData: e.detail.encryptedData, iv: e.detail.iv }).then(function (res) {
            _this.setData({
                tel: res.arg.phoneNumber
            });
        }).catch(function (e) {
            console.log(e);
        });
    },
    register: function () {
        wx.navigateTo({ url: '/pages/index/index' });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBQ2hDLCtDQUFnRDtBQUNoRCx5Q0FBdUU7QUFDdkUsSUFBSSxDQUFDO0lBQ0gsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBSXJCLElBQUksRUFBRTtRQUNKLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO1FBQ25ELFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFFBQVEsRUFBRSxFQUFnQztRQUMxQyxHQUFHLEVBQUUsRUFBRTtRQUNQLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsZUFBZSxFQUFFLEtBQUs7S0FDdkI7SUFFRCxRQUFRLEVBQUU7UUFDUixHQUFHLEVBQUgsVUFBSSxJQUFTO1lBQ1gsSUFBTSxLQUFLLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNsRCxJQUFNLE1BQU0sR0FBRyxvREFBb0QsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ25GLE9BQU8sS0FBSyxJQUFJLE1BQU0sQ0FBQTtRQUN4QixDQUFDO0tBQ0Y7SUFJRCxNQUFNLEVBQUUsVUFBVSxRQUFRO1FBQWxCLGlCQWdEUDtRQTlDQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFFLFVBQUEsR0FBRztnQkFFVjtvQkFDRSxFQUFFLENBQUMsV0FBVyxDQUFDO3dCQUNiLE9BQU8sRUFBRSxVQUFBLEdBQUc7NEJBQ1YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTs0QkFDdEMsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0NBQ3RCLFdBQVcsRUFBRSxJQUFJOzZCQUNsQixDQUFDLENBQUE7NEJBQ0YsSUFBSSxHQUFHLENBQUMscUJBQXFCLEVBQUU7Z0NBQzdCLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQTs2QkFDL0I7d0JBQ0gsQ0FBQzt3QkFDRCxJQUFJLEVBQUU7NEJBQ0osRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsZUFBZTs2QkFDekIsQ0FBQyxDQUFBO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO2dCQUVEO29CQUNFLFlBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO3dCQUNuQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUU7NEJBQ1YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7NEJBQ2xDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFBOzRCQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLFVBQVUsRUFBRSxLQUFLOzZCQUNsQixDQUFDLENBQUE7NEJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsQ0FBQzt5QkFDbkI7NkJBQU07NEJBQ0wsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUE7NEJBQ3RDLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsVUFBVSxFQUFFLElBQUk7NkJBQ2pCLENBQUMsQ0FBQTs0QkFDRixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTt5QkFDL0Q7b0JBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQzt3QkFDUixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDN0MsQ0FBQyxDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFdBQVcsRUFBWCxVQUFZLENBQU07UUFDaEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDM0IsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGNBQWMsRUFBZCxVQUFlLENBQU07UUFBckIsaUJBUUM7UUFQQyxxQkFBYyxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNqRixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVc7YUFDekIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsUUFBUTtRQVlOLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQyxDQUFBO0lBQzVDLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9sb2dpbi9sb2dpbi5qc1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcbmltcG9ydCAqIGFzIGNvbXB1dGVkIGZyb20gXCJtaW5pcHJvZ3JhbS1jb21wdXRlZFwiXG5pbXBvcnQgeyBsb2dpbiwgZ2V0cGhvbmVudW1iZXIsIHJlZ2lzdGVyVXNlciB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCI7XG5QYWdlKHtcbiAgYmVoYXZpb3JzOiBbY29tcHV0ZWRdLFxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgICBpc3JlZ2lzdGVyOiBmYWxzZSxcbiAgICB1c2VySW5mbzoge30gYXMgV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8sXG4gICAgdGVsOiAnJyxcbiAgICBtYWlsOiAnd2djYWlydWlAaWNsb3VkLmNvbScsXG4gICAgcmVnaXN0ZXJsb2FkaW5nOiBmYWxzZVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgaXNSKGRhdGE6IGFueSkge1xuICAgICAgY29uc3QgaXN0ZWwgPSAvXjEoM3w0fDV8N3w4KVxcZHs5fSQvLnRlc3QoZGF0YS50ZWwpXG4gICAgICBjb25zdCBpc21haWwgPSAvXlthLXpBLVowLTlfLV0rQFthLXpBLVowLTlfLV0rKFxcLlthLXpBLVowLTlfLV0rKSskLy50ZXN0KGRhdGEubWFpbClcbiAgICAgIHJldHVybiBpc3RlbCAmJiBpc21haWxcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoX29wdGlvbnMpIHtcbiAgICAvLyBnZXQgdXNlcmxvZ2luXG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8g6I635Y+W55So5oi35aS05YOP5pi156ewXG4gICAgICAgIHtcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXG4gICAgICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGlmIChhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmjojmnYPplJnor68nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwi5bCP56iL5bqP55m75b2V6ZyA6KaB5b6u5L+h5pi156ew5aS05YOPXCJcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgee9kee7nOivt+axgu+8jOiOt+WPluWcqOe6v+i0puaIt1xuICAgICAgICB7XG4gICAgICAgICAgbG9naW4oeyBqc19jb2RlOiByZXMuY29kZSB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXIgPSByZXMuYXJnLnVzZXJcbiAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckdyb3VwID0gcmVzLmFyZy51c2VyR3JvdXBcbiAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBpc3JlZ2lzdGVyOiBmYWxzZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9wZW5pZCA9IHJlcy5hcmcub3BlbmlkXG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgaXNyZWdpc3RlcjogdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogcmVzLm1zZywgaWNvbjogXCJub25lXCIsIGR1cmF0aW9uOiAzMDAwIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoeyB0aXRsZTogJ+eZu+W9leWHuumUmScsIGNvbnRlbnQ6IGUgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgfSlcbiAgfSxcbiAgLy8g6I635Y+W55So5oi35omL5py65Y+356CBXG4gIGdldHBob25lbnVtYmVyKGU6IGFueSkge1xuICAgIGdldHBob25lbnVtYmVyKHsgZW5jcnlwdGVkRGF0YTogZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSwgaXY6IGUuZGV0YWlsLml2IH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHRlbDogcmVzLmFyZy5waG9uZU51bWJlci8vcmVzLmFyZy5jb3VudHJ5Q29kZSArIHJlcy5hcmcucGhvbmVOdW1iZXJcbiAgICAgIH0pXG4gICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KVxuICB9LFxuICAvLyDms6jlhoznlKjmiLdcbiAgcmVnaXN0ZXIoKSB7XG4gICAgLyogXG4gICAgY29uc3QgeyB1c2VySW5mbzogeyBuaWNrTmFtZSwgYXZhdGFyVXJsIH0sIHRlbCwgbWFpbCB9ID0gdGhpcy5kYXRhXG4gICAgcmVnaXN0ZXJVc2VyKHsgdXNlcjogYXBwLmdsb2JhbERhdGEub3BlbmlkLCBuYW1lOiBuaWNrTmFtZSwgYXZhbnRlcjogYXZhdGFyVXJsLCB0ZWwsIG1haWwgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYocmVzPy5vayAhPT0gMSl7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6cmVzIGFzIGFueSxpY29uOlwibm9uZVwifSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOnJlcy5tc2d9KVxuICAgICAgd3gucmVkaXJlY3RUbyh7dXJsOlwiL1wifSlcbiAgICB9KSBcbiAgICAqL1xuICAgIHd4Lm5hdmlnYXRlVG8oe3VybDogJy9wYWdlcy9pbmRleC9pbmRleCd9KVxuICB9XG59KSJdfQ==