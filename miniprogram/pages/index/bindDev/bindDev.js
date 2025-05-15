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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZERldi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmREZXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQThCO1NBQ3pCO0tBQ25CO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLFVBQVUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsRUFBRSxVQUFVLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDaEIsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNULElBQUcsSUFBSSxFQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUE7WUFDSixDQUFDO2lCQUFLLElBQUcsT0FBTyxJQUFJLEtBQUssU0FBUyxFQUFDLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1gsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsT0FBTyxFQUFFLHNCQUFzQjtpQkFDaEMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztpQkFBSyxDQUFDO2dCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1gsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsT0FBTyxFQUFFLHNCQUFzQjtpQkFDaEMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsT0FBTztnQkFDZCxPQUFPLEVBQUUsSUFBVzthQUNyQixDQUFDLENBQUE7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ2pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDOUQsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNULE1BQU0sQ0FBQyxHQUFHLE1BQU0sYUFBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxRCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDaEIsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUNuQixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsY0FBYztvQkFDckIsT0FBTyxFQUFFLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQjtvQkFDaEQsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUE7d0JBQzNDLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUVoQixJQUFJLE1BQU0sRUFBRSxDQUFDO2dDQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dDQUM3QixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7NEJBQ25CLENBQUM7O2dDQUNJLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsa0NBQWtDLEVBQUUsQ0FBQyxDQUFBO3dCQUNqRSxDQUFDOzZCQUFNLENBQUM7NEJBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7NEJBQzdCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTt3QkFDbkIsQ0FBQztvQkFDSCxDQUFDO2lCQUNGLENBQUMsQ0FBQTtZQUNKLENBQUM7UUFHSCxDQUFDO2FBQU0sQ0FBQztZQUNOLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLE9BQU8sRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLEdBQUcsRUFBRTthQUNoRCxDQUFDLENBQUE7UUFDSixDQUFDO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgbWFjOiAnJyxcbiAgICB0ZXJtaW5hbDoge1xuICAgICAgbmFtZTogJycsXG4gICAgICBtb3VudE5vZGU6ICcnLFxuICAgICAgbW91bnREZXZzOiBbXSBhcyBVYXJ0LlRlcm1pbmFsTW91bnREZXZzW11cbiAgICB9IGFzIFVhcnQuVGVybWluYWxcbiAgfSxcbiAgLy8g6LCD55So5b6u5L+hYXBp77yM5omr5o+PRFRV5p2h5b2i56CBXG4gIGFzeW5jIHNjYW5NYWMoKSB7XG4gICAgY29uc3Qgc2NhblJlc3VsdCA9IGF3YWl0IHd4LnNjYW5Db2RlKHt9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtYWM6IHNjYW5SZXN1bHQucmVzdWx0XG4gICAgfSlcbiAgICB0aGlzLnNjYW5SZXF1c3QoKVxuICB9LFxuICAvLyDmn6Xor6JEVFXorr7lpIfkv6Hmga9cbiAgYXN5bmMgc2NhblJlcXVzdCgpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5p+l6K+i5LitJyB9KVxuICAgIGNvbnN0IHsgY29kZSwgZGF0YSB9ID0gYXdhaXQgYXBpLmdldFRlcm1pbmFsT25saW5lKHRoaXMuZGF0YS5tYWMpXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIGlmIChjb2RlKSB7XG4gICAgICBpZihkYXRhKXtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICB0ZXJtaW5hbDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfWVsc2UgaWYodHlwZW9mIGRhdGEgPT09ICdib29sZWFuJyl7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICdzZWFyY2gnLFxuICAgICAgICAgIGNvbnRlbnQ6ICforr7lpIfmnKrkuIrnur/vvIzor7fmo4Dmn6Xorr7lpIfmmK/lkKbov57mjqXmraPnoa7lkozlvIDlkK8nXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2V7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICdzZWFyY2gnLFxuICAgICAgICAgIGNvbnRlbnQ6ICforr7lpIfmnKrms6jlhozvvIzor7fmoLjlr7norr7lpIfmmK/lkKblnKjmiJHlj7jmuKDpgZPotK3kubAnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnZXJyb3InLFxuICAgICAgICBjb250ZW50OiBkYXRhIGFzIGFueVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOe7keWumuiuvuWkh1xuICBhc3luYyBiaW5kRGV2KCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjnu5HlrponIH0pXG4gICAgY29uc3QgeyBjb2RlLCBtc2cgfSA9IGF3YWl0IGFwaS5hZGRVc2VyVGVybWluYWwodGhpcy5kYXRhLm1hYylcbiAgICBpZiAoY29kZSkge1xuICAgICAgY29uc3QgciA9IGF3YWl0IGFwaS5nZXRUZXJtaW5hbCh0aGlzLmRhdGEudGVybWluYWwuRGV2TWFjKVxuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgaWYgKHIuZGF0YT8ubW91bnREZXZzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAnYmluZCBzdWNjZXNzJyxcbiAgICAgICAgICBjb250ZW50OiBg57uR5a6aRFRVOiR7dGhpcy5kYXRhLm1hY30g5oiQ5Yqf77yM5piv5ZCm546w5Zyo5re75Yqg5oyC6L296K6+5aSH77yfYCxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSB0aGlzLmdldE9wZW5lckV2ZW50Q2hhbm5lbCgpXG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcblxuICAgICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLmVtaXQoXCJhZGRTdWNjZXNzXCIsIHt9KVxuICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L21hbmFnZURldi9tYW5hZ2VEZXYnIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBldmVudHMuZW1pdChcImFkZFN1Y2Nlc3NcIiwge30pXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG5cbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdiaW5kIGVycm9yJyxcbiAgICAgICAgY29udGVudDogYOe7keWumkRUVToke3RoaXMuZGF0YS5tYWN9IOWksei0pe+8jHRpcDoke21zZ31gLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pIl19