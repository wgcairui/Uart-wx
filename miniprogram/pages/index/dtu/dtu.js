"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../utils/util");
const api_1 = require("../../../utils/api");
Page({
    data: {
        id: '',
        terminal: {},
        jwSupport: false,
        longitude: '',
        latitude: '',
        markers: [],
        address: '',
        recommend: ''
    },
    onLoad: function (options) {
        const id = options.id;
        if (id) {
            this.setData({
                id
            });
            this.start();
        }
    },
    start() {
        const id = this.data.id;
        const terminal = wx.getStorageSync(id);
        const jw = terminal.jw && terminal.jw.length > 10 ? terminal.jw.split(',') : false;
        terminal.uptime = util_1.parseTime(terminal.uptime);
        this.setData({
            terminal,
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
                key: this.data.id,
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
        const { terminal, id } = this.data;
        wx.getLocation({
            success: (location) => {
                terminal.jw = [location.longitude.toFixed(5), location.latitude.toFixed(5)].join(',');
                wx.hideLoading();
                wx.setStorage({
                    key: id,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHR1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHR1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQStDO0FBQy9DLDRDQUFvQztBQUdwQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsRUFBRTtRQUNOLFFBQVEsRUFBRSxFQUFjO1FBQ3hCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEVBQUU7UUFDWixPQUFPLEVBQUUsRUFBVztRQUNwQixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO0tBRWQ7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUFvQjtRQUNwQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFBO1FBQ3JCLElBQUksRUFBRSxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxFQUFFO2FBQ0gsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQ2I7SUFFSCxDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFhLENBQUE7UUFDbEQsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFFbEYsUUFBUSxDQUFDLE1BQU0sR0FBRyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUTtZQUNSLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxD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RSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO3FCQUM5QztnQkFDSCxDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2VUaW1lIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIlxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvZHR1L2R0dS5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGlkOiAnJyxcbiAgICB0ZXJtaW5hbDoge30gYXMgVGVybWluYWwsXG4gICAgandTdXBwb3J0OiBmYWxzZSxcbiAgICBsb25naXR1ZGU6ICcnLFxuICAgIGxhdGl0dWRlOiAnJyxcbiAgICBtYXJrZXJzOiBbXSBhcyBhbnlbXSxcbiAgICBhZGRyZXNzOiAnJyxcbiAgICByZWNvbW1lbmQ6ICcnXG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnM6IHsgaWQ6IGFueSB9KSB7XG4gICAgY29uc3QgaWQgPSBvcHRpb25zLmlkXG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBpZFxuICAgICAgfSlcbiAgICAgIHRoaXMuc3RhcnQoKVxuICAgIH1cblxuICB9LFxuXG4gIHN0YXJ0KCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5kYXRhLmlkXG4gICAgY29uc3QgdGVybWluYWwgPSB3eC5nZXRTdG9yYWdlU3luYyhpZCkgYXMgVGVybWluYWxcbiAgICBjb25zdCBqdyA9IHRlcm1pbmFsLmp3ICYmIHRlcm1pbmFsLmp3Lmxlbmd0aCA+IDEwID8gdGVybWluYWwuancuc3BsaXQoJywnKSA6IGZhbHNlXG4gICAgLy8gY29uc29sZS5sb2coancpO1xuICAgIHRlcm1pbmFsLnVwdGltZSA9IHBhcnNlVGltZSh0ZXJtaW5hbC51cHRpbWUpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRlcm1pbmFsLFxuICAgICAgandTdXBwb3J0OiBCb29sZWFuKGp3KSxcbiAgICB9KVxuICAgIGlmIChqdykge1xuICAgICAgY29uc3QgbWFyayA9IHtcbiAgICAgICAgaWNvblBhdGg6IFwiLi4vLi4vLi4vYXNzZXJ0L21hcmsucG5nXCIsXG4gICAgICAgIGxhdGl0dWRlOiBOdW1iZXIoandbMV0pLFxuICAgICAgICBsb25naXR1ZGU6IE51bWJlcihqd1swXSksXG4gICAgICAgIHRpdGxlOiB0ZXJtaW5hbC5uYW1lLFxuICAgICAgICB3aWR0aDogNTAsXG4gICAgICAgIGhlaWdodDogNTBcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGxvbmdpdHVkZTogandbMF0sXG4gICAgICAgIGxhdGl0dWRlOiBqd1sxXSxcbiAgICAgICAgbWFya2VyczogW21hcmtdXG4gICAgICB9KVxuICAgICAgLy8g5qC55o2uZ3Bz6I635Y+W5Zyw5Z2AXG4gICAgICBhcGkuZ2V0R1BTYWRkcmVzcyhbandbMV0sIGp3WzBdXS5qb2luKCcsJykpLnRoZW4oKHsgb2ssIGFyZyB9KSA9PiB7XG4gICAgICAgIGlmIChvaykge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhcmcucmVzdWx0LmFkZHJlc3MsXG4gICAgICAgICAgICByZWNvbW1lbmQ6IGFyZy5yZXN1bHQuZm9ybWF0dGVkX2FkZHJlc3Nlcy5yZWNvbW1lbmRcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZTogdGVybWluYWwubmFtZSB9KVxuICB9LFxuXG4gIG1hcmtlcnRhcChfZTogdmFudEV2ZW50KSB7XG4gICAgLyogY29uc3QgbWFwID0gd3guY3JlYXRlTWFwQ29udGV4dChlLmN1cnJlbnRUYXJnZXQuaWQpXG4gICAgbWFwLmdldENlbnRlckxvY2F0aW9uKHtcbiAgICAgIHN1Y2Nlc3MoZTIpe1xuICAgICAgICBjb25zb2xlLmxvZyhlMik7XG4gICAgICAgIFxuICAgICAgfVxuICAgIH0pXG4gICAgXG4gKi9cbiAgfSxcbiAgLy9cbiAgYXN5bmMgbmFtZUNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWVcbiAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS5tb2RpZnlEVFVOYW1lKHRoaXMuZGF0YS50ZXJtaW5hbC5EZXZNYWMsIHZhbHVlKVxuICAgIGlmICghb2spIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgIGNvbnRlbnQ6IG1zZ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgXCJ0ZXJtaW5hbC5uYW1lXCI6IHZhbHVlXG4gICAgICB9KVxuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogdGhpcy5kYXRhLmlkLFxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEudGVybWluYWxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIFxuICB1cGRhdGVHcHMoKSB7XG4gICAgY29uc3Qgc2V0dXBHcHMgPSB0aGlzLnNldHVwR3BzXG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAnVGlwJyxcbiAgICAgIGNvbnRlbnQ6ICfmmK/lkKbmiopEVFXlrprkvY3mm7TmlrDkuLrlvZPliY3lnLDlnYA/JyxcbiAgICAgIHN1Y2Nlc3Mob2spIHtcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn6K+356iN562JJ1xuICAgICAgICB9KVxuICAgICAgICBpZiAob2suY29uZmlybSkge1xuICAgICAgICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKCFyZXMuYXV0aFNldHRpbmdbXCJzY29wZS51c2VyTG9jYXRpb25cIl0pIHtcbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgd3guYXV0aG9yaXplKHtcbiAgICAgICAgICAgICAgICAgIHNjb3BlOiBcInNjb3BlLnVzZXJMb2NhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dXBHcHMoKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0dXBHcHMoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy8g6K6+572uR3BzXG4gIHNldHVwR3BzKCkge1xuICAgIGNvbnN0IHsgdGVybWluYWwsIGlkIH0gPSB0aGlzLmRhdGFcbiAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICBzdWNjZXNzOiAobG9jYXRpb24pID0+IHtcbiAgICAgICAgdGVybWluYWwuancgPSBbbG9jYXRpb24ubG9uZ2l0dWRlLnRvRml4ZWQoNSksIGxvY2F0aW9uLmxhdGl0dWRlLnRvRml4ZWQoNSldLmpvaW4oJywnKVxuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTogaWQsXG4gICAgICAgICAgZGF0YTogdGVybWluYWwsXG4gICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAvLyDkuIrkvKDlrprkvY3liLDmnI3liqHnq69cbiAgICAgICAgYXBpLnVwZGF0ZUdwcyh0ZXJtaW5hbC5EZXZNYWMsIHRlcm1pbmFsLmp3KS50aGVuKGVsID0+IHtcbiAgICAgICAgICBpZiAoZWwub2spIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn5pu05paw5a6a5L2N5oiQ5YqfJyB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogZWwubXNnLCBpY29uOiAnbm9uZScgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSkiXX0=