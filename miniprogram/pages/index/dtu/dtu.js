"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../utils/util");
const api_1 = require("../../../utils/api");
Page({
    data: {
        mac: '',
        terminal: {},
        dtuItem: [],
        jwSupport: false,
        longitude: '',
        latitude: '',
        markers: [],
        address: '',
        recommend: '',
        devPics: {
            "UPS": '/assert/ups.png',
            "温湿度": '/assert/th.png',
            "电量仪": '/assert/em.png',
            "空调": '/assert/air.png'
        },
    },
    onLoad: function (options) {
        this.setData({
            mac: options.mac
        });
        this.start();
    },
    async start() {
        const terminal = (await api_1.default.getDTUInfo(this.data.mac)).arg;
        const jw = terminal.jw && terminal.jw.length > 10 ? terminal.jw.split(',') : false;
        terminal.uptime = util_1.parseTime(terminal.uptime);
        const devs = terminal.mountDevs.map(dev => {
            dev.pic = this.data.devPics[dev.Type];
            return dev;
        });
        this.setData({
            terminal,
            dtuItem: devs,
            jwSupport: Boolean(jw),
        });
        if (jw) {
            const mark = {
                iconPath: "../../../assert/mark.png",
                latitude: Number(jw[1]),
                longitude: Number(jw[0]),
                title: terminal.name,
                width: 50,
                height: 50
            };
            this.setData({
                longitude: jw[0],
                latitude: jw[1],
                markers: [mark]
            });
            api_1.default.getGPSaddress([jw[1], jw[0]].join(',')).then(({ ok, arg }) => {
                if (ok) {
                    this.setData({
                        address: arg.result.address,
                        recommend: arg.result.formatted_addresses.recommend
                    });
                }
            });
        }
        wx.setNavigationBarTitle({ title: terminal.name });
    },
    showMountDevData(event) {
        const { pid, mountDev, protocol, Type } = event.currentTarget.dataset.item;
        const { DevMac } = this.data.terminal;
        wx.navigateTo({
            url: '/pages/index/devs/devs' + util_1.ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac, Type })
        });
    },
    markertap(_e) {
    },
    async nameChange(event) {
        const value = event.detail.value;
        const { ok, msg } = await api_1.default.modifyDTUName(this.data.terminal.DevMac, value);
        if (!ok) {
            wx.showModal({
                title: "Error",
                content: msg
            });
        }
        else {
            this.setData({
                "terminal.name": value
            });
            wx.setStorage({
                key: this.data.terminal._id,
                data: this.data.terminal
            });
        }
    },
    updateGps() {
        const setupGps = this.setupGps;
        wx.showModal({
            title: 'Tip',
            content: '是否把DTU定位更新为当前地址?',
            success(ok) {
                wx.showLoading({
                    title: '请稍等'
                });
                if (ok.confirm) {
                    wx.getSetting({
                        success(res) {
                            if (!res.authSetting["scope.userLocation"]) {
                                wx.hideLoading();
                                wx.authorize({
                                    scope: "scope.userLocation",
                                    success() {
                                        setupGps();
                                    }
                                });
                            }
                            else {
                                setupGps();
                            }
                        }
                    });
                }
            }
        });
    },
    setupGps() {
        const { terminal } = this.data;
        wx.getLocation({
            success: (location) => {
                terminal.jw = [location.longitude.toFixed(5), location.latitude.toFixed(5)].join(',');
                wx.hideLoading();
                wx.setStorage({
                    key: terminal._id,
                    data: terminal,
                    success: () => {
                        this.start();
                    }
                });
                api_1.default.updateGps(terminal.DevMac, terminal.jw).then(el => {
                    if (el.ok) {
                        wx.showToast({ title: '更新定位成功' });
                    }
                    else {
                        wx.showToast({ title: el.msg, icon: 'none' });
                    }
                });
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHR1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHR1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQWlFO0FBQ2pFLDRDQUFvQztBQUdwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLFFBQVEsRUFBRSxFQUFjO1FBQ3hCLE9BQU8sRUFBRSxFQUF5QjtRQUNsQyxTQUFTLEVBQUUsS0FBSztRQUNoQixTQUFTLEVBQUUsRUFBRTtRQUNiLFFBQVEsRUFBRSxFQUFFO1FBQ1osT0FBTyxFQUFFLEVBQVc7UUFDcEIsT0FBTyxFQUFFLEVBQUU7UUFDWCxTQUFTLEVBQUUsRUFBRTtRQUNiLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLElBQUksRUFBRSxpQkFBaUI7U0FDeEI7S0FDRjtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQXdCO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7U0FDakIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLGFBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtRQUMxRCxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUVsRixRQUFRLENBQUMsTUFBTSxHQUFHLGdCQUFTLENBQUMs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LElBQUksQ0FBQyxJQUFJLENBQUE7UUFDOUIsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNwQixRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3JGLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDWixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxHQUFHLEVBQUU7d0JBQ1osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO29CQUNkLENBQUM7aUJBQ0YsQ0FBQyxDQUFBO2dCQUVGLGFBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNwRCxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ1QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO3FCQUNsQzt5QkFBTTt3QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7cUJBQzlDO2dCQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUb1N0cnF1ZXJ5LCBwYXJzZVRpbWUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG4vLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9kdHUvZHR1LmpzXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbWFjOiAnJyxcbiAgICB0ZXJtaW5hbDoge30gYXMgVGVybWluYWwsXG4gICAgZHR1SXRlbTogW10gYXMgVGVybWluYWxNb3VudERldnNbXSxcbiAgICBqd1N1cHBvcnQ6IGZhbHNlLFxuICAgIGxvbmdpdHVkZTogJycsXG4gICAgbGF0aXR1ZGU6ICcnLFxuICAgIG1hcmtlcnM6IFtdIGFzIGFueVtdLFxuICAgIGFkZHJlc3M6ICcnLFxuICAgIHJlY29tbWVuZDogJycsXG4gICAgZGV2UGljczoge1xuICAgICAgXCJVUFNcIjogJy9hc3NlcnQvdXBzLnBuZycsXG4gICAgICBcIua4qea5v+W6plwiOiAnL2Fzc2VydC90aC5wbmcnLFxuICAgICAgXCLnlLXph4/ku6pcIjogJy9hc3NlcnQvZW0ucG5nJyxcbiAgICAgIFwi56m66LCDXCI6ICcvYXNzZXJ0L2Fpci5wbmcnXG4gICAgfSxcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnM6IHsgbWFjOiBzdHJpbmcgfSkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtYWM6IG9wdGlvbnMubWFjXG4gICAgfSlcbiAgICB0aGlzLnN0YXJ0KClcbiAgfSxcblxuICBhc3luYyBzdGFydCgpIHtcbiAgICBjb25zdCB0ZXJtaW5hbCA9IChhd2FpdCBhcGkuZ2V0RFRVSW5mbyh0aGlzLmRhdGEubWFjKSkuYXJnXG4gICAgY29uc3QgancgPSB0ZXJtaW5hbC5qdyAmJiB0ZXJtaW5hbC5qdy5sZW5ndGggPiAxMCA/IHRlcm1pbmFsLmp3LnNwbGl0KCcsJykgOiBmYWxzZVxuICAgIC8vIGNvbnNvbGUubG9nKGp3KTtcbiAgICB0ZXJtaW5hbC51cHRpbWUgPSBwYXJzZVRpbWUodGVybWluYWwudXB0aW1lKVxuICAgIC8vXG4gICAgY29uc3QgZGV2cyA9IHRlcm1pbmFsLm1vdW50RGV2cy5tYXAoZGV2ID0+IHtcbiAgICAgIGRldi5waWMgPSAodGhpcy5kYXRhLmRldlBpY3MgYXMgYW55KVtkZXYuVHlwZV1cbiAgICAgIHJldHVybiBkZXZcbiAgICB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB0ZXJtaW5hbCxcbiAgICAgIGR0dUl0ZW06IGRldnMsXG4gICAgICBqd1N1cHBvcnQ6IEJvb2xlYW4oancpLFxuICAgIH0pXG4gICAgaWYgKGp3KSB7XG4gICAgICBjb25zdCBtYXJrID0ge1xuICAgICAgICBpY29uUGF0aDogXCIuLi8uLi8uLi9hc3NlcnQvbWFyay5wbmdcIixcbiAgICAgICAgbGF0aXR1ZGU6IE51bWJlcihqd1sxXSksXG4gICAgICAgIGxvbmdpdHVkZTogTnVtYmVyKGp3WzBdKSxcbiAgICAgICAgdGl0bGU6IHRlcm1pbmFsLm5hbWUsXG4gICAgICAgIHdpZHRoOiA1MCxcbiAgICAgICAgaGVpZ2h0OiA1MFxuICAgICAgfVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbG9uZ2l0dWRlOiBqd1swXSxcbiAgICAgICAgbGF0aXR1ZGU6IGp3WzFdLFxuICAgICAgICBtYXJrZXJzOiBbbWFya11cbiAgICAgIH0pXG4gICAgICAvLyDmoLnmja5ncHPojrflj5blnLDlnYBcbiAgICAgIGFwaS5nZXRHUFNhZGRyZXNzKFtqd1sxXSwgandbMF1dLmpvaW4oJywnKSkudGhlbigoeyBvaywgYXJnIH0pID0+IHtcbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGFyZy5yZXN1bHQuYWRkcmVzcyxcbiAgICAgICAgICAgIHJlY29tbWVuZDogYXJnLnJlc3VsdC5mb3JtYXR0ZWRfYWRkcmVzc2VzLnJlY29tbWVuZFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiB0ZXJtaW5hbC5uYW1lIH0pXG4gIH0sXG5cbiAgLy8g5p+l55yL6K6+5aSH5pWw5o2uXG4gIHNob3dNb3VudERldkRhdGEoZXZlbnQ6IHZhbnRFdmVudDxUZXJtaW5hbE1vdW50RGV2cz4pIHtcbiAgICBjb25zdCB7IHBpZCwgbW91bnREZXYsIHByb3RvY29sLCBUeXBlIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIGNvbnN0IHsgRGV2TWFjIH0gPSB0aGlzLmRhdGEudGVybWluYWxcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9kZXZzL2RldnMnICsgT2JqZWN0VG9TdHJxdWVyeSh7IHBpZDogU3RyaW5nKHBpZCksIG1vdW50RGV2LCBwcm90b2NvbCwgRGV2TWFjLCBUeXBlIH0pXG4gICAgfSlcbiAgfSxcblxuICBtYXJrZXJ0YXAoX2U6IHZhbnRFdmVudCkge1xuICAgIC8qIGNvbnN0IG1hcCA9IHd4LmNyZWF0ZU1hcENvbnRleHQoZS5jdXJyZW50VGFyZ2V0LmlkKVxuICAgIG1hcC5nZXRDZW50ZXJMb2NhdGlvbih7XG4gICAgICBzdWNjZXNzKGUyKXtcbiAgICAgICAgY29uc29sZS5sb2coZTIpO1xuICAgICAgICBcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICovXG4gIH0sXG4gIC8vXG4gIGFzeW5jIG5hbWVDaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlXG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkubW9kaWZ5RFRVTmFtZSh0aGlzLmRhdGEudGVybWluYWwuRGV2TWFjLCB2YWx1ZSlcbiAgICBpZiAoIW9rKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIFwidGVybWluYWwubmFtZVwiOiB2YWx1ZVxuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6IHRoaXMuZGF0YS50ZXJtaW5hbC5faWQsXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YS50ZXJtaW5hbFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gXG4gIHVwZGF0ZUdwcygpIHtcbiAgICBjb25zdCBzZXR1cEdwcyA9IHRoaXMuc2V0dXBHcHNcbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICdUaXAnLFxuICAgICAgY29udGVudDogJ+aYr+WQpuaKikRUVeWumuS9jeabtOaWsOS4uuW9k+WJjeWcsOWdgD8nLFxuICAgICAgc3VjY2Vzcyhvaykge1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfor7fnqI3nrYknXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChvay5jb25maXJtKSB7XG4gICAgICAgICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICBpZiAoIXJlcy5hdXRoU2V0dGluZ1tcInNjb3BlLnVzZXJMb2NhdGlvblwiXSkge1xuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICB3eC5hdXRob3JpemUoe1xuICAgICAgICAgICAgICAgICAgc2NvcGU6IFwic2NvcGUudXNlckxvY2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR1cEdwcygpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXR1cEdwcygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvLyDorr7nva5HcHNcbiAgc2V0dXBHcHMoKSB7XG4gICAgY29uc3QgeyB0ZXJtaW5hbCB9ID0gdGhpcy5kYXRhXG4gICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgc3VjY2VzczogKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIHRlcm1pbmFsLmp3ID0gW2xvY2F0aW9uLmxvbmdpdHVkZS50b0ZpeGVkKDUpLCBsb2NhdGlvbi5sYXRpdHVkZS50b0ZpeGVkKDUpXS5qb2luKCcsJylcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6IHRlcm1pbmFsLl9pZCxcbiAgICAgICAgICBkYXRhOiB0ZXJtaW5hbCxcbiAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8vIOS4iuS8oOWumuS9jeWIsOacjeWKoeerr1xuICAgICAgICBhcGkudXBkYXRlR3BzKHRlcm1pbmFsLkRldk1hYywgdGVybWluYWwuancpLnRoZW4oZWwgPT4ge1xuICAgICAgICAgIGlmIChlbC5vaykge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfmm7TmlrDlrprkvY3miJDlip8nIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiBlbC5tc2csIGljb246ICdub25lJyB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59KSJdfQ==