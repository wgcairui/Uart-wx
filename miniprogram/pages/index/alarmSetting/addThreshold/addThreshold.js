"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../../utils/api");
Page({
    data: {
        name: '',
        cache: new Map(),
        unit: '',
        min: 0,
        max: 0,
        icon: 'star',
        columns: [],
    },
    onLoad: async function (options) {
        console.log(options);
        const protocol = options.protocol;
        const setup = await api_1.default.getAlarmProtocol(protocol);
        const showSet = new Set(setup.data.ShowTag);
        api_1.default.getProtocol(protocol).then(({ data }) => {
            const setups = data.instruct
                .map(el => el.formResize.filter(el2 => !el2.isState))
                .reduce((pre, cur) => [...pre, ...cur]);
            const cache = new Map(setups.map(el => [el.name, el]));
            const keysSet = new Set(options.keys.split(","));
            this.setData({
                columns: Array.from(cache.keys()).filter(el => showSet.has(el) && !keysSet.has(el)),
                cache
            });
        });
    },
    minonChange(event) {
        const max = this.data.max;
        const min = event.detail;
        this.setData({
            min,
            max: min >= max ? Number(min) + 1 : max
        });
    },
    maxonChange(event) {
        this.setData({
            max: event.detail
        });
    },
    onChange(event) {
        const name = event.detail.value;
        this.setData({
            name,
            unit: this.data.cache.get(name)?.unit || ''
        });
    },
    submit() {
        const events = this.getOpenerEventChannel();
        events.emit("addThreshold", this.data);
        wx.navigateBack();
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkVGhyZXNob2xkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkVGhyZXNob2xkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXVDO0FBR3ZDLElBQUksQ0FBQztJQUtILElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ2hCLElBQUksRUFBRSxFQUFFO1FBQ1IsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLEVBQWM7S0FDeEI7SUFLRCxNQUFNLEVBQUUsS0FBSyxXQUFXLE9BQVc7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUyxDQUFBO1FBQ2xDLE1BQU0sS0FBSyxHQUFHLE1BQU0sYUFBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2xELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDM0MsYUFBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVE7aUJBQ3pCLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3BELE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3pDLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFVLE9BQU8sQ0FBQyxJQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkYsS0FBSzthQUNOLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFdBQVcsQ0FBQyxLQUFnQjtRQUMxQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUN6QixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBZ0IsQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsR0FBRztZQUNILEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO1NBQ3hDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxXQUFXLENBQUMsS0FBZ0I7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWdCO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJO1lBQ0osSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRTtTQUM1QyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUNKLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9hcGlcIlxuXG4vLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvYWRkVGhyZXNob2xkL2FkZFRocmVzaG9sZC5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG5hbWU6ICcnLFxuICAgIGNhY2hlOiBuZXcgTWFwKCksXG4gICAgdW5pdDogJycsXG4gICAgbWluOiAwLFxuICAgIG1heDogMCxcbiAgICBpY29uOiAnc3RhcicsXG4gICAgY29sdW1uczogW10gYXMgc3RyaW5nW10sXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGFzeW5jIGZ1bmN0aW9uIChvcHRpb25zOmFueSkge1xuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuICAgIGNvbnN0IHByb3RvY29sID0gb3B0aW9ucy5wcm90b2NvbCFcbiAgICBjb25zdCBzZXR1cCA9IGF3YWl0IGFwaS5nZXRBbGFybVByb3RvY29sKHByb3RvY29sKVxuICAgIGNvbnN0IHNob3dTZXQgPSBuZXcgU2V0KHNldHVwLmRhdGEuU2hvd1RhZylcbiAgICBhcGkuZ2V0UHJvdG9jb2wocHJvdG9jb2wpLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICBjb25zdCBzZXR1cHMgPSBkYXRhLmluc3RydWN0XG4gICAgICAgIC5tYXAoZWwgPT4gZWwuZm9ybVJlc2l6ZS5maWx0ZXIoZWwyID0+ICFlbDIuaXNTdGF0ZSkpXG4gICAgICAgIC5yZWR1Y2UoKHByZSwgY3VyKSA9PiBbLi4ucHJlLCAuLi5jdXJdKVxuICAgICAgY29uc3QgY2FjaGUgPSBuZXcgTWFwKHNldHVwcy5tYXAoZWwgPT4gW2VsLm5hbWUsIGVsXSkpXG4gICAgICBjb25zdCBrZXlzU2V0ID0gbmV3IFNldCgoPHN0cmluZz5vcHRpb25zLmtleXMpLnNwbGl0KFwiLFwiKSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNvbHVtbnM6IEFycmF5LmZyb20oY2FjaGUua2V5cygpKS5maWx0ZXIoZWwgPT4gc2hvd1NldC5oYXMoZWwpICYmICFrZXlzU2V0LmhhcyhlbCkpLFxuICAgICAgICBjYWNoZVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBtaW5vbkNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgbWF4ID0gdGhpcy5kYXRhLm1heFxuICAgIGNvbnN0IG1pbiA9IGV2ZW50LmRldGFpbCBhcyBudW1iZXJcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWluLFxuICAgICAgbWF4OiBtaW4gPj0gbWF4ID8gTnVtYmVyKG1pbikgKyAxIDogbWF4XG4gICAgfSlcbiAgfSxcbiAgbWF4b25DaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtYXg6IGV2ZW50LmRldGFpbFxuICAgIH0pXG4gIH0sXG4gIG9uQ2hhbmdlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQuZGV0YWlsLnZhbHVlXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG5hbWUsXG4gICAgICB1bml0OiB0aGlzLmRhdGEuY2FjaGUuZ2V0KG5hbWUpPy51bml0IHx8ICcnXG4gICAgfSlcbiAgfSxcbiAgc3VibWl0KCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuZ2V0T3BlbmVyRXZlbnRDaGFubmVsKClcbiAgICBldmVudHMuZW1pdChcImFkZFRocmVzaG9sZFwiLCB0aGlzLmRhdGEpXG4gICAgd3gubmF2aWdhdGVCYWNrKClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==