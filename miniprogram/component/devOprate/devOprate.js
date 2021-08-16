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
            await util_1.sleep(500);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2T3ByYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV2T3ByYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXdDO0FBQ3hDLHlDQUFpQztBQUdqQyxTQUFTLENBQUM7SUFJUixVQUFVLEVBQUU7UUFDVixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNiO0tBQ0Y7SUFLRCxJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsS0FBSztRQUNqQixXQUFXLEVBQUUsRUFBUztLQUN2QjtJQUVELFNBQVMsRUFBRTtRQUNULEtBQUs7UUFFTCxDQUFDO0tBQ0Y7SUFLRCxPQUFPLEVBQUU7UUFDUCxLQUFLLENBQUMsTUFBTTtZQUNWLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUNuQyxNQUFNLFlBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNoQixhQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7Z0JBQ3pELEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFDaEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDL0MsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxXQUFXLEVBQUUsS0FBSzt3QkFDbEIsVUFBVSxFQUFFLElBQUk7cUJBQ2pCLENBQUMsQ0FBQTtpQkFDSDtxQkFBTTtvQkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO3dCQUNYLEtBQUssRUFBRSxTQUFTO3FCQUNqQixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxVQUFVLEVBQUUsS0FBSzthQUNsQixDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFnQjtZQUNqQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBNkIsQ0FBQTtZQUNsRCxJQUFJLE1BQU0sQ0FBQyxLQUFLO2dCQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzlELENBQUM7UUFHRCxXQUFXO1lBQ1QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ3pDLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQ2pCLFFBQVE7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0JBQ3BELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLEdBQUc7b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsQ0FBQzthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FFRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNsZWVwIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxcIlxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gY29tcG9uZW50L2Rldk9wcmF0ZS9kZXZPcHJhdGUuanNcbkNvbXBvbmVudCh7XG4gIC8qKlxuICAgKiDnu4Tku7bnmoTlsZ7mgKfliJfooahcbiAgICovXG4gIHByb3BlcnRpZXM6IHtcbiAgICBwcm90b2NvbDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiDnu4Tku7bnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBhY3Rpb25TaG93OiBmYWxzZSxcbiAgICBhY3Rpb25JdGVtczogW10gYXMgYW55XG4gIH0sXG5cbiAgbGlmZXRpbWVzOiB7XG4gICAgcmVhZHkoKSB7XG5cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczoge1xuICAgIGFzeW5jIG9wcmF0ZSgpIHtcbiAgICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfojrflj5bmjIfku6TliJfooagnIH0pXG4gICAgICBhd2FpdCBzbGVlcCg1MDApXG4gICAgICBhcGkuZ2V0QWxhcm1Qcm90b2NvbCh0aGlzLmRhdGEucHJvdG9jb2wpLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgY29uc3QgaXRlbXMgPSBkYXRhLk9wcmF0ZUluc3RydWN0Lm1hcChlbCA9PiBlbClcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgYWN0aW9uSXRlbXM6IGl0ZW1zLFxuICAgICAgICAgICAgYWN0aW9uU2hvdzogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K6+5aSH5LiN5pSv5oyB5oyH5LukJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhY3Rpb25DbG9zZSgpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFjdGlvblNob3c6IGZhbHNlXG4gICAgICB9KVxuICAgIH0sXG4gICAgLy8g6YCJ5oup5Y+R6YCB5oyH5LukXG4gICAgYXN5bmMgYWN0aW9uU2VsZWN0KGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICAgIGNvbnN0IG9wcmF0ZSA9IGV2ZW50LmRldGFpbCBhcyBVYXJ0Lk9wcmF0ZUluc3RydWN0XG4gICAgICBpZiAob3ByYXRlLnZhbHVlKSB0aGlzLnRyaWdnZXJFdmVudChcIm9wcmF0ZVwiLCB7IC4uLm9wcmF0ZSB9KVxuICAgIH0sXG5cbiAgICAvLyBcbiAgICBvcHJhdGVhbGFybSgpIHtcbiAgICAgIGNvbnN0IGl0ZW1MaXN0ID0gWyfmmL7npLrlj4LmlbAnLCAn5Y+C5pWw6ZmQ5YC8JywgJ+WPguaVsOeKtuaAgSddXG4gICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICBpdGVtTGlzdCxcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdhbGFybScsIHsgdHlwZTogcmVzLnRhcEluZGV4IH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gIH1cbn0pXG4iXX0=