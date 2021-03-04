"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        oprate() {
            wx.showLoading({ title: '获取指令列表' });
            api_1.default.getDevOprate(this.data.protocol).then(({ arg }) => {
                wx.hideLoading();
                const items = arg.OprateInstruct?.map(el => el) || [{ name: '设备不支持操作指令' }];
                this.setData({
                    actionItems: items,
                    actionShow: true
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2T3ByYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV2T3ByYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQWlDO0FBR2pDLFNBQVMsQ0FBQztJQUlSLFVBQVUsRUFBRTtRQUNWLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2I7S0FDRjtJQUtELElBQUksRUFBRTtRQUNKLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFdBQVcsRUFBRSxFQUFTO0tBQ3ZCO0lBRUQsU0FBUyxFQUFFO1FBQ1QsS0FBSztRQUVMLENBQUM7S0FDRjtJQUtELE9BQU8sRUFBRTtRQUNQLE1BQU07WUFDSixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7WUFDbkMsYUFBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtnQkFDcEQsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUNoQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQTtnQkFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxXQUFXLEVBQUUsS0FBSztvQkFDbEIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCLENBQUMsQ0FBQTtZQUNKLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFdBQVc7WUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQWdCO1lBQ2pDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUF3QixDQUFBO1lBQzdDLElBQUksTUFBTSxDQUFDLEtBQUs7Z0JBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDOUQsQ0FBQztRQUdELFdBQVc7WUFDVCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDekMsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDakIsUUFBUTtnQkFDUixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDZixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDcEQsQ0FBQztnQkFDRCxJQUFJLENBQUMsR0FBRztvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUVGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gY29tcG9uZW50L2Rldk9wcmF0ZS9kZXZPcHJhdGUuanNcbkNvbXBvbmVudCh7XG4gIC8qKlxuICAgKiDnu4Tku7bnmoTlsZ7mgKfliJfooahcbiAgICovXG4gIHByb3BlcnRpZXM6IHtcbiAgICBwcm90b2NvbDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiDnu4Tku7bnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBhY3Rpb25TaG93OiBmYWxzZSxcbiAgICBhY3Rpb25JdGVtczogW10gYXMgYW55XG4gIH0sXG5cbiAgbGlmZXRpbWVzOiB7XG4gICAgcmVhZHkoKSB7XG5cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczoge1xuICAgIG9wcmF0ZSgpIHtcbiAgICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfojrflj5bmjIfku6TliJfooagnIH0pXG4gICAgICBhcGkuZ2V0RGV2T3ByYXRlKHRoaXMuZGF0YS5wcm90b2NvbCkudGhlbigoeyBhcmcgfSkgPT4ge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gYXJnLk9wcmF0ZUluc3RydWN0Py5tYXAoZWwgPT4gZWwpIHx8IFt7IG5hbWU6ICforr7lpIfkuI3mlK/mjIHmk43kvZzmjIfku6QnIH1dXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYWN0aW9uSXRlbXM6IGl0ZW1zLFxuICAgICAgICAgIGFjdGlvblNob3c6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBhY3Rpb25DbG9zZSgpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFjdGlvblNob3c6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sXG4gICAgLy8g6YCJ5oup5Y+R6YCB5oyH5LukXG4gICAgYXN5bmMgYWN0aW9uU2VsZWN0KGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICAgIGNvbnN0IG9wcmF0ZSA9IGV2ZW50LmRldGFpbCBhcyBPcHJhdGVJbnN0cnVjdFxuICAgICAgaWYgKG9wcmF0ZS52YWx1ZSkgdGhpcy50cmlnZ2VyRXZlbnQoXCJvcHJhdGVcIiwgeyAuLi5vcHJhdGUgfSlcbiAgICB9LFxuXG4gICAgLy8gXG4gICAgb3ByYXRlYWxhcm0oKSB7XG4gICAgICBjb25zdCBpdGVtTGlzdCA9IFsn5pi+56S65Y+C5pWwJywgJ+WPguaVsOmZkOWAvCcsICflj4LmlbDnirbmgIEnXVxuICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgaXRlbUxpc3QsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnYWxhcm0nLCB7IHR5cGU6IHJlcy50YXBJbmRleCB9KVxuICAgICAgICB9LFxuICAgICAgICBmYWlsKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICB9XG59KVxuIl19