"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../../utils/api");
const util_1 = require("../../../utils/util");
Page({
    data: {
        devs: []
    },
    onLoad: function () {
        this.sortDevslist();
    },
    sortDevslist() {
        api_1.default.BindDev().then(el => {
            if (el.code) {
                this.setData({
                    devs: el.data.UTs
                });
            }
        });
    },
    toDev(event) {
        const { DevMac } = event.currentTarget.dataset.item;
        wx.navigateTo({
            url: '/pages/index/manageDev/mountDevs/mountDevs' + (0, util_1.ObjectToStrquery)({ mac: DevMac })
        });
    },
    addDTU() {
        wx.navigateTo({
            url: "/pages/index/bindDev/bindDev"
        });
    },
    onReady: function () {
    },
    onShow: function () {
        this.sortDevslist();
    },
    onHide: function () {
    },
    onUnload: function () {
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlRGV2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFuYWdlRGV2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQW9DO0FBQ3BDLDhDQUFzRDtBQUV0RCxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBcUI7S0FDNUI7SUFLRCxNQUFNLEVBQUU7UUFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVELFlBQVk7UUFDVixhQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3RCLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtnQkFDWCxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQVU7aUJBQ3pCLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBR0QsS0FBSyxDQUFDLEtBQStCO1FBQ25DLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDbkQsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSw0Q0FBNEMsR0FBRyxJQUFBLHVCQUFnQixFQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQ3RGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxNQUFNO1FBQ0osRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBQyw4QkFBOEI7U0FDbkMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7UUFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0NBRUYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcbmltcG9ydCB7IE9iamVjdFRvU3RycXVlcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG4vLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvaW5kZXguanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBkZXZzOiBbXSBhcyBVYXJ0LlRlcm1pbmFsW11cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc29ydERldnNsaXN0KClcbiAgfSxcblxuICBzb3J0RGV2c2xpc3QoKSB7XG4gICAgYXBpLkJpbmREZXYoKS50aGVuKGVsID0+IHtcbiAgICAgIGlmIChlbC5jb2RlKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgZGV2czogZWwuZGF0YS5VVHMgYXMgYW55XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvLyDmn6XnnIvmjILovb1cbiAgdG9EZXYoZXZlbnQ6IHZhbnRFdmVudDxVYXJ0LlRlcm1pbmFsPikge1xuICAgIGNvbnN0IHsgRGV2TWFjIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L21hbmFnZURldi9tb3VudERldnMvbW91bnREZXZzJyArIE9iamVjdFRvU3RycXVlcnkoeyBtYWM6IERldk1hYyB9KVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkRFRVKCl7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6XCIvcGFnZXMvaW5kZXgvYmluZERldi9iaW5kRGV2XCJcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNvcnREZXZzbGlzdCgpXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG59KSJdfQ==