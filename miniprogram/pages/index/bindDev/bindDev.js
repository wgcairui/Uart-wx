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
                success: (res) => {
                    if (res.confirm) {
                        const events = this.getOpenerEventChannel();
                        if (events) {
                            events.emit("addSuccess", {});
                            wx.navigateBack();
                        }
                        else
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZERldi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmREZXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0M7QUFFcEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQXlCO1NBQ3pCO0tBQ2Q7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sVUFBVSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRyxFQUFFLFVBQVUsQ0FBQyxNQUFNO1NBQ3ZCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDZCxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUE7UUFDN0IsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLGFBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2RCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDaEIsSUFBSSxFQUFFLEVBQUU7WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsT0FBTyxFQUFFLHdCQUF3QjthQUNsQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxhQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEQsSUFBSSxFQUFFLEVBQUU7WUFDTixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxjQUFjO2dCQUNyQixPQUFPLEVBQUUsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCO2dCQUNoRCxPQUFPLEVBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtvQkFDYixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUE7d0JBQzNDLElBQUcsTUFBTSxFQUFFOzRCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLEVBQUUsQ0FBQyxDQUFBOzRCQUM1QixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7eUJBQ2xCOzs0QkFDSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLGtDQUFrQyxFQUFFLENBQUMsQ0FBQTtxQkFDaEU7Z0JBQ0gsQ0FBQzthQUNGLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxZQUFZO2dCQUNuQixPQUFPLEVBQUUsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxHQUFHLEVBQUU7YUFDaEQsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtYWM6ICcnLFxuICAgIHRlcm1pbmFsOiB7XG4gICAgICBuYW1lOiAnJyxcbiAgICAgIG1vdW50Tm9kZTogJycsXG4gICAgICBtb3VudERldnM6IFtdIGFzIFRlcm1pbmFsTW91bnREZXZzW11cbiAgICB9IGFzIFRlcm1pbmFsXG4gIH0sXG4gIC8vIOiwg+eUqOW+ruS/oWFwae+8jOaJq+aPj0RUVeadoeW9oueggVxuICBhc3luYyBzY2FuTWFjKCkge1xuICAgIGNvbnN0IHNjYW5SZXN1bHQgPSBhd2FpdCB3eC5zY2FuQ29kZSh7fSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWFjOiBzY2FuUmVzdWx0LnJlc3VsdFxuICAgIH0pXG4gICAgdGhpcy5zY2FuUmVxdXN0KClcbiAgfSxcbiAgLy8g5p+l6K+iRFRV6K6+5aSH5L+h5oGvXG4gIGFzeW5jIHNjYW5SZXF1c3QoKSB7IFxuICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTon5p+l6K+i5LitJ30pXG4gICAgY29uc3QgeyBvaywgYXJnIH0gPSBhd2FpdCBhcGkuZ2V0RFRVSW5mbyh0aGlzLmRhdGEubWFjKVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHRlcm1pbmFsOiBhcmdcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnc2VhcmNoJyxcbiAgICAgICAgY29udGVudDogJ+atpOiuvuWkh+ayoeacieazqOWGjO+8jOivt+aguOWvueiuvuWkh+aYr+WQpuWcqOaIkeWPuOa4oOmBk+i0reS5sCdcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDnu5Hlrprorr7lpIdcbiAgYXN5bmMgYmluZERldigpIHtcbiAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS5iaW5kRGV2KHRoaXMuZGF0YS5tYWMpXG4gICAgaWYgKG9rKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ2JpbmQgc3VjY2VzcycsXG4gICAgICAgIGNvbnRlbnQ6IGDnu5HlrppEVFU6JHt0aGlzLmRhdGEubWFjfSDmiJDlip/vvIzmmK/lkKbnjrDlnKjmt7vliqDmjILovb3orr7lpIfvvJ9gLFxuICAgICAgICBzdWNjZXNzOihyZXMpPT4ge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5nZXRPcGVuZXJFdmVudENoYW5uZWwoKVxuICAgICAgICAgICAgaWYoZXZlbnRzKSB7XG4gICAgICAgICAgICAgIGV2ZW50cy5lbWl0KFwiYWRkU3VjY2Vzc1wiLHt9KVxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L21hbmFnZURldi9tYW5hZ2VEZXYnIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ2JpbmQgZXJyb3InLFxuICAgICAgICBjb250ZW50OiBg57uR5a6aRFRVOiR7dGhpcy5kYXRhLm1hY30g5aSx6LSl77yMdGlwOiR7bXNnfWAsXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkiXX0=