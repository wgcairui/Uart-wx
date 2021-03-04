"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
Page({
    data: {
        mac: '',
        terminal: {
            name: '',
            mountNode: '',
            mountDevs: [],
            uptime: ''
        },
        remoteUrl: ''
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
        const { ok, arg } = await api_1.default.getDTUInfo(this.data.mac);
        wx.hideLoading();
        if (ok) {
            this.setData({
                terminal: arg
            });
        }
        else {
            wx.showModal({
                title: 'search',
                content: '此设备没有注册，请核对设备是否在我司渠道购买'
            });
        }
    },
    async bindDev() {
        const { ok, msg } = await api_1.default.bindDev(this.data.mac);
        if (ok) {
            wx.showModal({
                title: 'bind success',
                content: `绑定DTU:${this.data.mac} 成功，是否现在添加挂载设备？`,
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({ url: '/pages/index/manageDev/manageDev' });
                    }
                }
            });
        }
        else {
            wx.showModal({
                title: 'bind error',
                content: `绑定DTU:${this.data.mac} 失败，tip:${msg}`,
            });
        }
    },
    async iotRemoteUrl() {
        const url = await api_1.default.iotRemoteUrl(this.data.mac);
        if (!url) {
            wx.showModal({
                title: '获取失败',
                content: '设备未连接到iot server中心'
            });
        }
        else {
            wx.showModal({
                title: '调试地址',
                content: url,
                success() {
                    wx.setClipboardData({
                        data: url,
                        success() {
                            wx.showToast({
                                title: '已复制网址到剪切板'
                            });
                        }
                    });
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0M7QUFDcEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQXlCO1lBQ3BDLE1BQU0sRUFBRSxFQUFFO1NBQ0M7UUFDYixTQUFTLEVBQUUsRUFBRTtLQUNkO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLFVBQVUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsRUFBRSxVQUFVLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVO1FBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkQsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2hCLElBQUksRUFBRSxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUUsR0FBRzthQUNkLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxRQUFRO2dCQUNmLE9BQU8sRUFBRSx3QkFBd0I7YUFDbEMsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3BELElBQUksRUFBRSxFQUFFO1lBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsY0FBYztnQkFDckIsT0FBTyxFQUFFLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQjtnQkFDaEQsT0FBTyxDQUFDLEdBQUc7b0JBQ1QsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO3dCQUNmLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsa0NBQWtDLEVBQUUsQ0FBQyxDQUFBO3FCQUMzRDtnQkFDSCxDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLE9BQU8sRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLEdBQUcsRUFBRTthQUNoRCxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWTtRQUNoQixNQUFNLEdBQUcsR0FBRyxNQUFNLGFBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWtCLENBQUE7UUFDbEUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLG9CQUFvQjthQUM5QixDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsTUFBTTtnQkFDYixPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPO29CQUNMLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDbEIsSUFBSSxFQUFFLEdBQUc7d0JBQ1QsT0FBTzs0QkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxXQUFXOzZCQUNuQixDQUFDLENBQUE7d0JBQ0osQ0FBQztxQkFDRixDQUFDLENBQUE7Z0JBQ0osQ0FBQzthQUNGLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIG1hYzogJycsXG4gICAgdGVybWluYWw6IHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgbW91bnROb2RlOiAnJyxcbiAgICAgIG1vdW50RGV2czogW10gYXMgVGVybWluYWxNb3VudERldnNbXSxcbiAgICAgIHVwdGltZTogJydcbiAgICB9IGFzIFRlcm1pbmFsLFxuICAgIHJlbW90ZVVybDogJydcbiAgfSxcbiAgLy8g6LCD55So5b6u5L+hYXBp77yM5omr5o+PRFRV5p2h5b2i56CBXG4gIGFzeW5jIHNjYW5NYWMoKSB7XG4gICAgY29uc3Qgc2NhblJlc3VsdCA9IGF3YWl0IHd4LnNjYW5Db2RlKHt9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtYWM6IHNjYW5SZXN1bHQucmVzdWx0XG4gICAgfSlcbiAgICB0aGlzLnNjYW5SZXF1c3QoKVxuICB9LFxuICAvLyDmn6Xor6JEVFXorr7lpIfkv6Hmga9cbiAgYXN5bmMgc2NhblJlcXVzdCgpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5p+l6K+i5LitJyB9KVxuICAgIGNvbnN0IHsgb2ssIGFyZyB9ID0gYXdhaXQgYXBpLmdldERUVUluZm8odGhpcy5kYXRhLm1hYylcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKG9rKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0ZXJtaW5hbDogYXJnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ3NlYXJjaCcsXG4gICAgICAgIGNvbnRlbnQ6ICfmraTorr7lpIfmsqHmnInms6jlhozvvIzor7fmoLjlr7norr7lpIfmmK/lkKblnKjmiJHlj7jmuKDpgZPotK3kubAnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgLy8g57uR5a6a6K6+5aSHXG4gIGFzeW5jIGJpbmREZXYoKSB7XG4gICAgY29uc3QgeyBvaywgbXNnIH0gPSBhd2FpdCBhcGkuYmluZERldih0aGlzLmRhdGEubWFjKVxuICAgIGlmIChvaykge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICdiaW5kIHN1Y2Nlc3MnLFxuICAgICAgICBjb250ZW50OiBg57uR5a6aRFRVOiR7dGhpcy5kYXRhLm1hY30g5oiQ5Yqf77yM5piv5ZCm546w5Zyo5re75Yqg5oyC6L296K6+5aSH77yfYCxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvaW5kZXgvbWFuYWdlRGV2L21hbmFnZURldicgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnYmluZCBlcnJvcicsXG4gICAgICAgIGNvbnRlbnQ6IGDnu5HlrppEVFU6JHt0aGlzLmRhdGEubWFjfSDlpLHotKXvvIx0aXA6JHttc2d9YCxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvL+i/nOeoi+iwg+ivleiuvuWkh1xuICBhc3luYyBpb3RSZW1vdGVVcmwoKSB7XG4gICAgY29uc3QgdXJsID0gYXdhaXQgYXBpLmlvdFJlbW90ZVVybCh0aGlzLmRhdGEubWFjKSBhcyBhbnkgYXMgc3RyaW5nXG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn6I635Y+W5aSx6LSlJyxcbiAgICAgICAgY29udGVudDogJ+iuvuWkh+acqui/nuaOpeWIsGlvdCBzZXJ2ZXLkuK3lv4MnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+iwg+ivleWcsOWdgCcsXG4gICAgICAgIGNvbnRlbnQ6IHVybCxcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgIGRhdGE6IHVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflt7LlpI3liLbnvZHlnYDliLDliarliIfmnb8nXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pIl19