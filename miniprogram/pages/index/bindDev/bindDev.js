"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
Page({
    data: {
        mac: '',
        terminal: {
            name: '',
            mountNode: '',
            mountDevs: []
        }
    },
    async scanMac() {
        const scanResult = await wx.scanCode({});
        this.setData({
            mac: scanResult.result
        });
        this.scanRequst();
    },
    async scanRequst() {
        wx.showLoading({ title: '查询中' });
        const { code, data } = await api_1.default.getTerminalOnline(this.data.mac);
        wx.hideLoading();
        if (code) {
            if (data) {
                this.setData({
                    terminal: data
                });
            }
            else if (typeof data === 'boolean') {
                wx.showModal({
                    title: 'search',
                    content: '设备未上线，请检查设备是否连接正确和开启'
                });
            }
            else {
                wx.showModal({
                    title: 'search',
                    content: '设备未注册，请核对设备是否在我司渠道购买'
                });
            }
        }
        else {
            wx.showModal({
                title: 'error',
                content: data
            });
        }
    },
    async bindDev() {
        wx.showLoading({ title: '正在绑定' });
        const { code, msg } = await api_1.default.addUserTerminal(this.data.mac);
        if (code) {
            const r = await api_1.default.getTerminal(this.data.terminal.DevMac);
            wx.hideLoading();
            if (r.data?.mountDevs?.length > 0) {
                wx.navigateBack();
            }
            else {
                wx.showModal({
                    title: 'bind success',
                    content: `绑定DTU:${this.data.mac} 成功，是否现在添加挂载设备？`,
                    success: (res) => {
                        const events = this.getOpenerEventChannel();
                        if (res.confirm) {
                            if (events) {
                                events.emit("addSuccess", {});
                                wx.navigateBack();
                            }
                            else
                                wx.navigateTo({ url: '/pages/index/manageDev/manageDev' });
                        }
                        else {
                            events.emit("addSuccess", {});
                            wx.navigateBack();
                        }
                    }
                });
            }
        }
        else {
            wx.showModal({
                title: 'bind error',
                content: `绑定DTU:${this.data.mac} 失败，tip:${msg}`,
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZERldi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmREZXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQThCO1NBQ3pCO0tBQ25CO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLFVBQVUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsRUFBRSxVQUFVLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDaEIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFHLElBQUksRUFBQztnQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQTthQUNIO2lCQUFLLElBQUcsT0FBTyxJQUFJLEtBQUssU0FBUyxFQUFDO2dCQUNqQyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxRQUFRO29CQUNmLE9BQU8sRUFBRSxzQkFBc0I7aUJBQ2hDLENBQUMsQ0FBQTthQUNIO2lCQUFLO2dCQUNKLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1gsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsT0FBTyxFQUFFLHNCQUFzQjtpQkFDaEMsQ0FBQyxDQUFBO2FBQ0g7U0FDRjthQUFNO1lBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsT0FBTztnQkFDZCxPQUFPLEVBQUUsSUFBVzthQUNyQixDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUNqQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzlELElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxDQUFDLEdBQUcsTUFBTSxhQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzFELEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNoQixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTthQUNsQjtpQkFBTTtnQkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxjQUFjO29CQUNyQixPQUFPLEVBQUUsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCO29CQUNoRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDZixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQTt3QkFDM0MsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFOzRCQUVmLElBQUksTUFBTSxFQUFFO2dDQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dDQUM3QixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7NkJBQ2xCOztnQ0FDSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLGtDQUFrQyxFQUFFLENBQUMsQ0FBQTt5QkFDaEU7NkJBQU07NEJBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7NEJBQzdCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTt5QkFDbEI7b0JBQ0gsQ0FBQztpQkFDRixDQUFDLENBQUE7YUFDSDtTQUdGO2FBQU07WUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxZQUFZO2dCQUNuQixPQUFPLEVBQUUsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxHQUFHLEVBQUU7YUFDaEQsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtYWM6ICcnLFxuICAgIHRlcm1pbmFsOiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIG1vdW50Tm9kZTogJycsXG4gICAgICBtb3VudERldnM6IFtdIGFzIFVhcnQuVGVybWluYWxNb3VudERldnNbXVxuICAgIH0gYXMgVWFydC5UZXJtaW5hbFxuICB9LFxuICAvLyDosIPnlKjlvq7kv6FhcGnvvIzmiavmj49EVFXmnaHlvaLnoIFcbiAgYXN5bmMgc2Nhbk1hYygpIHtcbiAgICBjb25zdCBzY2FuUmVzdWx0ID0gYXdhaXQgd3guc2NhbkNvZGUoe30pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1hYzogc2NhblJlc3VsdC5yZXN1bHRcbiAgICB9KVxuICAgIHRoaXMuc2NhblJlcXVzdCgpXG4gIH0sXG4gIC8vIOafpeivokRUVeiuvuWkh+S/oeaBr1xuICBhc3luYyBzY2FuUmVxdXN0KCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmn6Xor6LkuK0nIH0pXG4gICAgY29uc3QgeyBjb2RlLCBkYXRhIH0gPSBhd2FpdCBhcGkuZ2V0VGVybWluYWxPbmxpbmUodGhpcy5kYXRhLm1hYylcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKGNvZGUpIHtcbiAgICAgIGlmKGRhdGEpe1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHRlcm1pbmFsOiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9ZWxzZSBpZih0eXBlb2YgZGF0YSA9PT0gJ2Jvb2xlYW4nKXtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ3NlYXJjaCcsXG4gICAgICAgICAgY29udGVudDogJ+iuvuWkh+acquS4iue6v++8jOivt+ajgOafpeiuvuWkh+aYr+WQpui/nuaOpeato+ehruWSjOW8gOWQrydcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ3NlYXJjaCcsXG4gICAgICAgICAgY29udGVudDogJ+iuvuWkh+acquazqOWGjO+8jOivt+aguOWvueiuvuWkh+aYr+WQpuWcqOaIkeWPuOa4oOmBk+i0reS5sCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdlcnJvcicsXG4gICAgICAgIGNvbnRlbnQ6IGRhdGEgYXMgYW55XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g57uR5a6a6K6+5aSHXG4gIGFzeW5jIGJpbmREZXYoKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+ato+WcqOe7keWumicgfSlcbiAgICBjb25zdCB7IGNvZGUsIG1zZyB9ID0gYXdhaXQgYXBpLmFkZFVzZXJUZXJtaW5hbCh0aGlzLmRhdGEubWFjKVxuICAgIGlmIChjb2RlKSB7XG4gICAgICBjb25zdCByID0gYXdhaXQgYXBpLmdldFRlcm1pbmFsKHRoaXMuZGF0YS50ZXJtaW5hbC5EZXZNYWMpXG4gICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICBpZiAoci5kYXRhPy5tb3VudERldnM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICdiaW5kIHN1Y2Nlc3MnLFxuICAgICAgICAgIGNvbnRlbnQ6IGDnu5HlrppEVFU6JHt0aGlzLmRhdGEubWFjfSDmiJDlip/vvIzmmK/lkKbnjrDlnKjmt7vliqDmjILovb3orr7lpIfvvJ9gLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuZ2V0T3BlbmVyRXZlbnRDaGFubmVsKClcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuXG4gICAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBldmVudHMuZW1pdChcImFkZFN1Y2Nlc3NcIiwge30pXG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvaW5kZXgvbWFuYWdlRGV2L21hbmFnZURldicgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGV2ZW50cy5lbWl0KFwiYWRkU3VjY2Vzc1wiLCB7fSlcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG5cblxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ2JpbmQgZXJyb3InLFxuICAgICAgICBjb250ZW50OiBg57uR5a6aRFRVOiR7dGhpcy5kYXRhLm1hY30g5aSx6LSl77yMdGlwOiR7bXNnfWAsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkiXX0=