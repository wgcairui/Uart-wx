"use strict";
Page({
    data: {
        name: '',
        min: 0,
        max: 0,
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({ title: '参数限值' + options.name });
        this.setData({
            name: options.name,
            min: Number(options.min),
            max: Number(options.max)
        });
    },
    minonChange: function (event) {
        var max = this.data.max;
        var min = event.detail;
        this.setData({
            min: min,
            max: min >= max ? Number(min) + 1 : max
        });
    },
    maxonChange: function (event) {
        this.setData({
            max: event.detail
        });
    },
    submit: function () {
        var events = this.getOpenerEventChannel();
        events.emit("modifyThreshold", this.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZXNob2xkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhyZXNob2xkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUM7S0FDUDtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN4QixHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDekIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFdBQVcsRUFBWCxVQUFZLEtBQWdCO1FBQzFCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ3pCLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFnQixDQUFBO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxHQUFHLEtBQUE7WUFDSCxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztTQUN4QyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsV0FBVyxFQUFYLFVBQVksS0FBZ0I7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3pDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBS0QsT0FBTyxFQUFFO0lBRVQsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7SUFLRCxhQUFhLEVBQUU7SUFFZixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1pbmlwcm9ncmFtL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy90aHJlc2hvbGQvdGhyZXNob2xkLmpzXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbmFtZTogJycsXG4gICAgbWluOiAwLFxuICAgIG1heDogMCxcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZTogJ+WPguaVsOmZkOWAvCcgKyBvcHRpb25zLm5hbWUgfSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgbWluOiBOdW1iZXIob3B0aW9ucy5taW4pLFxuICAgICAgbWF4OiBOdW1iZXIob3B0aW9ucy5tYXgpXG4gICAgfSlcbiAgfSxcblxuICBtaW5vbkNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgbWF4ID0gdGhpcy5kYXRhLm1heFxuICAgIGNvbnN0IG1pbiA9IGV2ZW50LmRldGFpbCBhcyBudW1iZXJcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWluLFxuICAgICAgbWF4OiBtaW4gPj0gbWF4ID8gTnVtYmVyKG1pbikgKyAxIDogbWF4XG4gICAgfSlcbiAgfSxcbiAgbWF4b25DaGFuZ2UoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtYXg6IGV2ZW50LmRldGFpbFxuICAgIH0pXG4gIH0sXG5cbiAgc3VibWl0KCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuZ2V0T3BlbmVyRXZlbnRDaGFubmVsKClcbiAgICBldmVudHMuZW1pdChcIm1vZGlmeVRocmVzaG9sZFwiLCB0aGlzLmRhdGEpXG4gICAgd3gubmF2aWdhdGVCYWNrKClcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcbiAgICovXG4gIG9uUmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxuICAgKi9cbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgKi9cbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcblxuICB9XG59KSJdfQ==