"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
Page({
    data: {
        tel: '',
        sms: '',
        senddisable: false,
        sendtext: '发送验证码',
        int: 60,
        interval: 0
    },
    onLoad: function () {
    },
    async sendValidation() {
        wx.showLoading({ title: '正在发送' });
        const { code, data } = await api_1.default.fetch('smsValidation');
        wx.hideLoading();
        if (!code)
            wx.showModal({ title: '发送失败', content: data });
        else {
            wx.showModal({
                title: '发送成功',
                content: '已发送到' + data
            });
        }
        const interval = setInterval(() => {
            if (this.data.int === 0) {
                clearInterval(this.data.interval);
                this.setData({
                    senddisable: false,
                    sendtext: '发送验证码',
                    interval
                });
            }
            else {
                this.setData({
                    int: this.data.int - 1,
                    sendtext: this.data.int - 1 + '秒后再试'
                });
            }
        }, 1000);
        this.setData({
            senddisable: true,
            sendtext: '60秒后再试',
            interval
        });
    },
    checkSms() {
        const event = this.getOpenerEventChannel();
        event.emit("code", this.data.sms);
        wx.navigateBack();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21zVmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNtc1ZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLEdBQUcsRUFBRSxFQUFFO1FBQ1AsUUFBUSxFQUFFLENBQUM7S0FDWjtJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFHRCxLQUFLLENBQUMsY0FBYztRQUNsQixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDakMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLGFBQUcsQ0FBQyxLQUFLLENBQVMsZUFBZSxDQUFDLENBQUE7UUFDL0QsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxJQUFJO1lBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7YUFDcEQsQ0FBQztZQUNKLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLE1BQU0sR0FBRyxJQUFJO2FBQ3ZCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2hDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3hCLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFdBQVcsRUFBRSxLQUFLO29CQUNsQixRQUFRLEVBQUUsT0FBTztvQkFDakIsUUFBUTtpQkFDVCxDQUFDLENBQUE7WUFDSixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNO2lCQUNyQyxDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBUSxDQUFBO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVE7U0FDVCxDQUFDLENBQUE7SUFHSixDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO1FBQzFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDakMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ25CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuXG4vLyBtaW5pcHJvZ3JhbS9wYWdlcy91dGlsL3Ntc1ZhbGlkYXRpb24vc21zVmFsaWRhdGlvbi5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIHRlbDogJycsXG4gICAgc21zOiAnJyxcbiAgICBzZW5kZGlzYWJsZTogZmFsc2UsXG4gICAgc2VuZHRleHQ6ICflj5HpgIHpqozor4HnoIEnLFxuICAgIGludDogNjAsXG4gICAgaW50ZXJ2YWw6IDBcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLy8g5Y+R6YCB55+t5L+h6aqM6K+B56CBXG4gIGFzeW5jIHNlbmRWYWxpZGF0aW9uKCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjlj5HpgIEnIH0pXG4gICAgY29uc3QgeyBjb2RlLCBkYXRhIH0gPSBhd2FpdCBhcGkuZmV0Y2g8c3RyaW5nPignc21zVmFsaWRhdGlvbicpXG4gICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIGlmICghY29kZSkgd3guc2hvd01vZGFsKHsgdGl0bGU6ICflj5HpgIHlpLHotKUnLCBjb250ZW50OiBkYXRhIH0pXG4gICAgZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+WPkemAgeaIkOWKnycsXG4gICAgICAgIGNvbnRlbnQ6ICflt7Llj5HpgIHliLAnICsgZGF0YVxuICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kYXRhLmludCA9PT0gMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBzZW5kZGlzYWJsZTogZmFsc2UsXG4gICAgICAgICAgc2VuZHRleHQ6ICflj5HpgIHpqozor4HnoIEnLFxuICAgICAgICAgIGludGVydmFsXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGludDogdGhpcy5kYXRhLmludCAtIDEsXG4gICAgICAgICAgc2VuZHRleHQ6IHRoaXMuZGF0YS5pbnQgLSAxICsgJ+enkuWQjuWGjeivlSdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCAxMDAwKSBhcyBhbnlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc2VuZGRpc2FibGU6IHRydWUsXG4gICAgICBzZW5kdGV4dDogJzYw56eS5ZCO5YaN6K+VJyxcbiAgICAgIGludGVydmFsXG4gICAgfSlcblxuXG4gIH0sXG4gIC8vIOajgOafpemqjOivgeegge+8jOWmguaenOaYrzTkvY3liJnkuIrkvKDpqozor4FcbiAgY2hlY2tTbXMoKSB7XG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmdldE9wZW5lckV2ZW50Q2hhbm5lbCgpXG4gICAgZXZlbnQuZW1pdChcImNvZGVcIiwgdGhpcy5kYXRhLnNtcylcbiAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICB9XG59KSJdfQ==