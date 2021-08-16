"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
Page({
    data: {
        tel: '',
        sms: '',
        senddisable: false,
        sendtext: '发送验证码'
    },
    onLoad: function () {
    },
    async sendValidation() {
        wx.showLoading({ title: '正在发送' });
        const { code, msg } = await api_1.default.fetch('smsValidation');
        wx.hideLoading();
        if (!code)
            wx.showModal({ title: '发送失败', content: msg });
        else {
            wx.showModal({
                title: '发送成功',
                content: '已发送到' + msg
            });
        }
        this.setData({
            senddisable: true,
            sendtext: '60秒后再试'
        });
        setTimeout(() => {
            this.setData({
                senddisable: false,
                sendtext: '发送验证码'
            });
        }, 1000 * 60);
    },
    checkSms() {
        const event = this.getOpenerEventChannel();
        event.emit("code", this.data.sms);
        wx.navigateBack();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21zVmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNtc1ZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFFBQVEsRUFBRSxPQUFPO0tBQ2xCO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUdELEtBQUssQ0FBQyxjQUFjO1FBQ2xCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUNqQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUN0RCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDLElBQUk7WUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTthQUNuRDtZQUNILEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLE1BQU0sR0FBRyxHQUFHO2FBQ3RCLENBQUMsQ0FBQTtTQUNIO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQTtRQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixRQUFRLEVBQUUsT0FBTzthQUNsQixDQUFDLENBQUE7UUFDSixDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQ2YsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtRQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvdXRpbC9zbXNWYWxpZGF0aW9uL3Ntc1ZhbGlkYXRpb24uanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICB0ZWw6ICcnLFxuICAgIHNtczogJycsXG4gICAgc2VuZGRpc2FibGU6IGZhbHNlLFxuICAgIHNlbmR0ZXh0OiAn5Y+R6YCB6aqM6K+B56CBJ1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvLyDlj5HpgIHnn63kv6Hpqozor4HnoIFcbiAgYXN5bmMgc2VuZFZhbGlkYXRpb24oKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+ato+WcqOWPkemAgScgfSlcbiAgICBjb25zdCB7IGNvZGUsIG1zZyB9ID0gYXdhaXQgYXBpLmZldGNoKCdzbXNWYWxpZGF0aW9uJylcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKCFjb2RlKSB3eC5zaG93TW9kYWwoeyB0aXRsZTogJ+WPkemAgeWksei0pScsIGNvbnRlbnQ6IG1zZyB9KVxuICAgIGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICflj5HpgIHmiJDlip8nLFxuICAgICAgICBjb250ZW50OiAn5bey5Y+R6YCB5YiwJyArIG1zZ1xuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHNlbmRkaXNhYmxlOiB0cnVlLFxuICAgICAgc2VuZHRleHQ6ICc2MOenkuWQjuWGjeivlSdcbiAgICB9KVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgc2VuZGRpc2FibGU6IGZhbHNlLFxuICAgICAgICBzZW5kdGV4dDogJ+WPkemAgemqjOivgeeggSdcbiAgICAgIH0pXG4gICAgfSwgMTAwMCAqIDYwKVxuICB9LFxuICAvLyDmo4Dmn6Xpqozor4HnoIHvvIzlpoLmnpzmmK805L2N5YiZ5LiK5Lyg6aqM6K+BXG4gIGNoZWNrU21zKCkge1xuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5nZXRPcGVuZXJFdmVudENoYW5uZWwoKVxuICAgIGV2ZW50LmVtaXQoXCJjb2RlXCIsIHRoaXMuZGF0YS5zbXMpXG4gICAgd3gubmF2aWdhdGVCYWNrKClcbiAgfVxufSkiXX0=