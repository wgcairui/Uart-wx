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
        if (code && data) {
            this.setData({
                terminal: data
            });
        }
        else {
            wx.showModal({
                title: 'search',
                content: '设备未注册或未上线，请核对设备是否在我司渠道购买'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZERldi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmREZXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQThCO1NBQ3pCO0tBQ25CO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLFVBQVUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsRUFBRSxVQUFVLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDaEIsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsUUFBUTtnQkFDZixPQUFPLEVBQUUsMEJBQTBCO2FBQ3BDLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ2pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDOUQsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsR0FBRyxNQUFNLGFBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDMUQsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ2hCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO2FBQ2xCO2lCQUFNO2dCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1gsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLE9BQU8sRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBaUI7b0JBQ2hELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUNmLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO3dCQUMzQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBRWYsSUFBSSxNQUFNLEVBQUU7Z0NBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0NBQzdCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTs2QkFDbEI7O2dDQUNJLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsa0NBQWtDLEVBQUUsQ0FBQyxDQUFBO3lCQUNoRTs2QkFBTTs0QkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTs0QkFDN0IsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO3lCQUNsQjtvQkFDSCxDQUFDO2lCQUNGLENBQUMsQ0FBQTthQUNIO1NBR0Y7YUFBTTtZQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLE9BQU8sRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLEdBQUcsRUFBRTthQUNoRCxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIG1hYzogJycsXG4gICAgdGVybWluYWw6IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgbW91bnROb2RlOiAnJyxcbiAgICAgIG1vdW50RGV2czogW10gYXMgVWFydC5UZXJtaW5hbE1vdW50RGV2c1tdXG4gICAgfSBhcyBVYXJ0LlRlcm1pbmFsXG4gIH0sXG4gIC8vIOiwg+eUqOW+ruS/oWFwae+8jOaJq+aPj0RUVeadoeW9oueggVxuICBhc3luYyBzY2FuTWFjKCkge1xuICAgIGNvbnN0IHNjYW5SZXN1bHQgPSBhd2FpdCB3eC5zY2FuQ29kZSh7fSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWFjOiBzY2FuUmVzdWx0LnJlc3VsdFxuICAgIH0pXG4gICAgdGhpcy5zY2FuUmVxdXN0KClcbiAgfSxcbiAgLy8g5p+l6K+iRFRV6K6+5aSH5L+h5oGvXG4gIGFzeW5jIHNjYW5SZXF1c3QoKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+afpeivouS4rScgfSlcbiAgICBjb25zdCB7IGNvZGUsIGRhdGEgfSA9IGF3YWl0IGFwaS5nZXRUZXJtaW5hbE9ubGluZSh0aGlzLmRhdGEubWFjKVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICBpZiAoY29kZSAmJiBkYXRhKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0ZXJtaW5hbDogZGF0YVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdzZWFyY2gnLFxuICAgICAgICBjb250ZW50OiAn6K6+5aSH5pyq5rOo5YaM5oiW5pyq5LiK57q/77yM6K+35qC45a+56K6+5aSH5piv5ZCm5Zyo5oiR5Y+45rig6YGT6LSt5LmwJ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIC8vIOe7keWumuiuvuWkh1xuICBhc3luYyBiaW5kRGV2KCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjnu5HlrponIH0pXG4gICAgY29uc3QgeyBjb2RlLCBtc2cgfSA9IGF3YWl0IGFwaS5hZGRVc2VyVGVybWluYWwodGhpcy5kYXRhLm1hYylcbiAgICBpZiAoY29kZSkge1xuICAgICAgY29uc3QgciA9IGF3YWl0IGFwaS5nZXRUZXJtaW5hbCh0aGlzLmRhdGEudGVybWluYWwuRGV2TWFjKVxuICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgaWYgKHIuZGF0YT8ubW91bnREZXZzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAnYmluZCBzdWNjZXNzJyxcbiAgICAgICAgICBjb250ZW50OiBg57uR5a6aRFRVOiR7dGhpcy5kYXRhLm1hY30g5oiQ5Yqf77yM5piv5ZCm546w5Zyo5re75Yqg5oyC6L296K6+5aSH77yfYCxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSB0aGlzLmdldE9wZW5lckV2ZW50Q2hhbm5lbCgpXG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcblxuICAgICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLmVtaXQoXCJhZGRTdWNjZXNzXCIsIHt9KVxuICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L21hbmFnZURldi9tYW5hZ2VEZXYnIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBldmVudHMuZW1pdChcImFkZFN1Y2Nlc3NcIiwge30pXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuXG5cbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdiaW5kIGVycm9yJyxcbiAgICAgICAgY29udGVudDogYOe7keWumkRUVToke3RoaXMuZGF0YS5tYWN9IOWksei0pe+8jHRpcDoke21zZ31gLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pIl19