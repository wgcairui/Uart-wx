"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../utils/util");
const api_1 = require("../../utils/api");
Component({
    properties: {
        protocol: {
            type: String
        }
    },
    data: {
        actionShow: false,
        actionItems: []
    },
    lifetimes: {
        ready() {
        }
    },
    methods: {
        async oprate() {
            wx.showLoading({ title: '获取指令列表' });
            await (0, util_1.sleep)(500);
            api_1.default.getAlarmProtocol(this.data.protocol).then(({ data }) => {
                wx.hideLoading();
                const items = data.OprateInstruct.map(el => el);
                if (items.length > 0) {
                    this.setData({
                        actionItems: items,
                        actionShow: true
                    });
                }
                else {
                    wx.showToast({
                        title: '设备不支持指令'
                    });
                }
            });
        },
        actionClose() {
            this.setData({
                actionShow: false
            });
        },
        async actionSelect(event) {
            const oprate = event.detail;
            if (oprate.value)
                this.triggerEvent("oprate", { ...oprate });
        },
        opratealarm() {
            const itemList = ['显示参数', '参数限值', '参数状态'];
            wx.showActionSheet({
                itemList,
                success: (res) => {
                    this.triggerEvent('alarm', { type: res.tapIndex });
                },
                fail(err) {
                    console.log(err);
                }
            });
        },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2T3ByYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV2T3ByYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXdDO0FBQ3hDLHlDQUFpQztBQUdqQyxTQUFTLENBQUM7SUFJUixVQUFVLEVBQUU7UUFDVixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNiO0tBQ0Y7SUFLRCxJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsS0FBSztRQUNqQixXQUFXLEVBQUUsRUFBUztLQUN2QjtJQUVELFNBQVMsRUFBRTtRQUNULEtBQUs7UUFFTCxDQUFDO0tBQ0Y7SUFLRCxPQUFPLEVBQUU7UUFDUCxLQUFLLENBQUMsTUFBTTtZQUNWLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUNuQyxNQUFNLElBQUEsWUFBSyxFQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLGFBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDekQsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUNoQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUMvQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNYLFdBQVcsRUFBRSxLQUFLO3dCQUNsQixVQUFVLEVBQUUsSUFBSTtxQkFDakIsQ0FBQyxDQUFBO2lCQUNIO3FCQUFNO29CQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1gsS0FBSyxFQUFFLFNBQVM7cUJBQ2pCLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFdBQVc7WUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQWdCO1lBQ2pDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUE2QixDQUFBO1lBQ2xELElBQUksTUFBTSxDQUFDLEtBQUs7Z0JBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDOUQsQ0FBQztRQUdELFdBQVc7WUFDVCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDekMsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDakIsUUFBUTtnQkFDUixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDZixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDcEQsQ0FBQztnQkFDRCxJQUFJLENBQUMsR0FBRztvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUVGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2xlZXAgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdXRpbFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi91dGlscy9hcGlcIlxuXG4vLyBjb21wb25lbnQvZGV2T3ByYXRlL2Rldk9wcmF0ZS5qc1xuQ29tcG9uZW50KHtcbiAgLyoqXG4gICAqIOe7hOS7tueahOWxnuaAp+WIl+ihqFxuICAgKi9cbiAgcHJvcGVydGllczoge1xuICAgIHByb3RvY29sOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGFjdGlvblNob3c6IGZhbHNlLFxuICAgIGFjdGlvbkl0ZW1zOiBbXSBhcyBhbnlcbiAgfSxcblxuICBsaWZldGltZXM6IHtcbiAgICByZWFkeSgpIHtcblxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog57uE5Lu255qE5pa55rOV5YiX6KGoXG4gICAqL1xuICBtZXRob2RzOiB7XG4gICAgYXN5bmMgb3ByYXRlKCkge1xuICAgICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+iOt+WPluaMh+S7pOWIl+ihqCcgfSlcbiAgICAgIGF3YWl0IHNsZWVwKDUwMClcbiAgICAgIGFwaS5nZXRBbGFybVByb3RvY29sKHRoaXMuZGF0YS5wcm90b2NvbCkudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBjb25zdCBpdGVtcyA9IGRhdGEuT3ByYXRlSW5zdHJ1Y3QubWFwKGVsID0+IGVsKVxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhY3Rpb25JdGVtczogaXRlbXMsXG4gICAgICAgICAgICBhY3Rpb25TaG93OiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICforr7lpIfkuI3mlK/mjIHmjIfku6QnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGFjdGlvbkNsb3NlKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYWN0aW9uU2hvdzogZmFsc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICAvLyDpgInmi6nlj5HpgIHmjIfku6RcbiAgICBhc3luYyBhY3Rpb25TZWxlY3QoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgICAgY29uc3Qgb3ByYXRlID0gZXZlbnQuZGV0YWlsIGFzIFVhcnQuT3ByYXRlSW5zdHJ1Y3RcbiAgICAgIGlmIChvcHJhdGUudmFsdWUpIHRoaXMudHJpZ2dlckV2ZW50KFwib3ByYXRlXCIsIHsgLi4ub3ByYXRlIH0pXG4gICAgfSxcblxuICAgIC8vIFxuICAgIG9wcmF0ZWFsYXJtKCkge1xuICAgICAgY29uc3QgaXRlbUxpc3QgPSBbJ+aYvuekuuWPguaVsCcsICflj4LmlbDpmZDlgLwnLCAn5Y+C5pWw54q25oCBJ11cbiAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgIGl0ZW1MaXN0LFxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2FsYXJtJywgeyB0eXBlOiByZXMudGFwSW5kZXggfSlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgfVxufSlcbiJdfQ==