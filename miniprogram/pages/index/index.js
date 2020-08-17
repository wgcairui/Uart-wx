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
                        }
                        else {
                            app.globalData.openid = res.arg.openid;
                            wx.showToast({ title: res.msg, icon: "none", duration: 3000 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUF3QztBQUV4QyxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUNoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsYUFBYTtRQUNwQixRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDO0tBQ3BEO0lBRUQsV0FBVztJQUNYLENBQUM7SUFDRCxNQUFNO1FBQU4saUJBc0NDO1FBckNDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsVUFBQSxHQUFHO2dCQUVWO29CQUNFLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0JBQ2IsT0FBTyxFQUFFLFVBQUEsR0FBRzs0QkFDVixHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBOzRCQUN0QyxLQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQ0FDdEIsV0FBVyxFQUFFLElBQUk7NkJBQ2xCLENBQUMsQ0FBQTs0QkFDRixJQUFJLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDN0IsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFBOzZCQUMvQjt3QkFDSCxDQUFDO3dCQUNELElBQUksRUFBRTs0QkFDSixFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxNQUFNO2dDQUNiLE9BQU8sRUFBRSxlQUFlOzZCQUN6QixDQUFDLENBQUE7d0JBQ0osQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7Z0JBRUQ7b0JBQ0UsWUFBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7d0JBQ25DLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTs0QkFDVixHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTs0QkFDbEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUE7eUJBQzdDOzZCQUFNOzRCQUNMLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFBOzRCQUN0QyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTt5QkFDL0Q7b0JBQ0gsQ0FBQyxDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFdBQVcsRUFBWCxVQUFZLENBQU07UUFDaEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDM0IsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCJcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgbW90dG86ICdIZWxsbyBXb3JsZCcsXG4gICAgdXNlckluZm86IHt9LFxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gIH0sXG4gIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxuICBiaW5kVmlld1RhcCgpIHtcbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vIOiOt+WPlueUqOaIt+WktOWDj+aYteensFxuICAgICAgICB7XG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBpZiAoYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o6I5p2D6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIuWwj+eoi+W6j+eZu+W9lemcgOimgeW+ruS/oeaYteensOWktOWDj1wiXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvLyDlj5HpgIHnvZHnu5zor7fmsYLvvIzojrflj5blnKjnur/otKbmiLdcbiAgICAgICAge1xuICAgICAgICAgIGxvZ2luKHsganNfY29kZTogcmVzLmNvZGUgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VyID0gcmVzLmFyZy51c2VyXG4gICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJHcm91cCA9IHJlcy5hcmcudXNlckdyb3VwXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQgPSByZXMuYXJnLm9wZW5pZFxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogcmVzLm1zZywgaWNvbjogXCJub25lXCIsIGR1cmF0aW9uOiAzMDAwIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgfSlcbiAgfSxcbn0pXG4iXX0=