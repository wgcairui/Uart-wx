"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
var app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    bindViewTap: function () {
    },
    onLoad: function () {
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
                            console.log(res.arg);
                        }
                        else {
                            app.globalData.openid = res.arg.openid;
                            wx.showToast({ title: res.msg, icon: "none", duration: 3000 });
                            wx.navigateTo({ url: "/pages/login/login" });
                        }
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUF3QztBQUV4QyxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUNoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsYUFBYTtRQUNwQixRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO0tBQ3BEO0lBRUQsV0FBVztJQUNYLENBQUM7SUFDRCxNQUFNO1FBQU4saUJBeUNDO1FBeENDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsVUFBQSxHQUFHO2dCQUVWO29CQUNFLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0JBQ2IsT0FBTyxFQUFFLFVBQUEsR0FBRzs0QkFDVixHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBOzRCQUN0QyxLQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQ0FDdEIsV0FBVyxFQUFFLElBQUk7NkJBQ2xCLENBQUMsQ0FBQTs0QkFDRixJQUFJLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDN0IsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFBOzZCQUMvQjt3QkFDSCxDQUFDO3dCQUNELElBQUksRUFBRTs0QkFDSixFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxNQUFNO2dDQUNiLE9BQU8sRUFBRSxlQUFlOzZCQUN6QixDQUFDLENBQUE7d0JBQ0osQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7Z0JBRUQ7b0JBQ0UsWUFBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7d0JBQ25DLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTs0QkFDVixHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTs0QkFDbEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUE7NEJBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUV0Qjs2QkFBTTs0QkFDTCxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQTs0QkFDdEMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7NEJBQzlELEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUMsb0JBQW9CLEVBQUMsQ0FBQyxDQUFBO3lCQUMxQztvQkFDSCxDQUFDLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsV0FBVyxFQUFYLFVBQVksQ0FBTTtRQUNoQixHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUMzQixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbmltcG9ydCB7IGxvZ2luIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxcIlxuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtb3R0bzogJ0hlbGxvIFdvcmxkJyxcbiAgICB1c2VySW5mbzoge30sXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgfSxcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXG4gIGJpbmRWaWV3VGFwKCkge1xuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8g6I635Y+W55So5oi35aS05YOP5pi156ewXG4gICAgICAgIHtcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXG4gICAgICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGlmIChhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmjojmnYPplJnor68nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwi5bCP56iL5bqP55m75b2V6ZyA6KaB5b6u5L+h5pi156ew5aS05YOPXCJcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkemAgee9kee7nOivt+axgu+8jOiOt+WPluWcqOe6v+i0puaIt1xuICAgICAgICB7XG4gICAgICAgICAgbG9naW4oeyBqc19jb2RlOiByZXMuY29kZSB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXIgPSByZXMuYXJnLnVzZXJcbiAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckdyb3VwID0gcmVzLmFyZy51c2VyR3JvdXBcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmFyZyk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEub3BlbmlkID0gcmVzLmFyZy5vcGVuaWRcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IHJlcy5tc2csIGljb246IFwibm9uZVwiLCBkdXJhdGlvbjogMzAwMCB9KVxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6XCIvcGFnZXMvbG9naW4vbG9naW5cIn0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgfSlcbiAgfSxcbn0pXG4iXX0=