"use strict";
App({
    globalData: {
        userInfo: {},
        user: '',
        userGroup: '',
        userName: '',
        userAvanter: '',
        userTel: ''
    },
    onLaunch: function () {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log("新版本：" + res.hasUpdate)
        })

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })

        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
        })
    },
    onHide() {
        wx.clearStorage()
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUU7UUFDVixRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxFQUFFO1FBQ2YsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELFFBQVE7SUFFUixDQUFDO0NBRUYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwLnRzXG5BcHA8SUFwcE9wdGlvbj4oe1xuICBnbG9iYWxEYXRhOiB7XG4gICAgdXNlckluZm86IHt9LFxuICAgIHVzZXI6ICcnLFxuICAgIHVzZXJHcm91cDogJycsXG4gICAgdXNlck5hbWU6ICcnLFxuICAgIHVzZXJBdmFudGVyOiAnJyxcbiAgICB1c2VyVGVsOiAnJ1xuICB9LFxuICBvbkxhdW5jaCgpIHtcbiAgICBcbiAgfSxcblxufSkiXX0=