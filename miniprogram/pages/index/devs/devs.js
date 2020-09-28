"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../../../utils/api");
Page({
    data: {
        mac: '',
        pid: '',
        result: {}
    },
    onLoad: function (options) {
        this.setData({
            mac: options.mac,
            pid: options.pid
        });
        this.GetDevsRunInfo();
    },
    GetDevsRunInfo: function () {
        var _this = this;
        api_1.default.getDevsRunInfo(this.data.mac, this.data.pid).then(function (el) {
            var _a;
            if (el.ok) {
                el.arg.result = (_a = el.arg.result) === null || _a === void 0 ? void 0 : _a.map(function (obj) {
                    if (obj.unit && /^{.*}$/.test(obj.unit)) {
                        obj.value = obj.value;
                        obj.unit = '';
                    }
                    return obj;
                });
                _this.setData({
                    result: el.arg
                });
                console.log(el.arg);
            }
            else {
                wx.showModal({
                    title: 'Error',
                    content: '信息获取失败'
                });
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBb0M7QUFHcEMsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsRUFBRTtRQUNQLE1BQU0sRUFBRSxFQUFpQjtLQUMxQjtJQUtELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztZQUNoQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7U0FDakIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxjQUFjO1FBQWQsaUJBc0JDO1FBckJDLGFBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFOztZQUN0RCxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLFNBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLDBDQUFFLEdBQUcsQ0FBQyxVQUFBLEdBQUc7b0JBQ3BDLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdkMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO3dCQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQTtxQkFDZDtvQkFDRCxPQUFPLEdBQUcsQ0FBQTtnQkFDWixDQUFDLENBQUMsQ0FBQTtnQkFDRixLQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLE1BQU0sRUFBRSxFQUFFLENBQUMsR0FBRztpQkFDZixDQUFDLENBQUE7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7YUFFckI7aUJBQU07Z0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsT0FBTztvQkFDZCxPQUFPLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFLRCxPQUFPLEVBQUU7SUFFVCxDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELE1BQU0sRUFBRTtJQUVSLENBQUM7SUFLRCxRQUFRLEVBQUU7SUFFVixDQUFDO0lBS0QsaUJBQWlCLEVBQUU7SUFFbkIsQ0FBQztJQUtELGFBQWEsRUFBRTtJQUVmLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvYXBpXCJcblxuLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvZGV2cy9kZXZzLmpzXG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgbWFjOiAnJyxcbiAgICBwaWQ6ICcnLFxuICAgIHJlc3VsdDoge30gYXMgcXVlcnlSZXN1bHRcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWFjOiBvcHRpb25zLm1hYyxcbiAgICAgIHBpZDogb3B0aW9ucy5waWRcbiAgICB9KVxuICAgIHRoaXMuR2V0RGV2c1J1bkluZm8oKVxuICB9LFxuXG4gIEdldERldnNSdW5JbmZvKCkge1xuICAgIGFwaS5nZXREZXZzUnVuSW5mbyh0aGlzLmRhdGEubWFjLCB0aGlzLmRhdGEucGlkKS50aGVuKGVsID0+IHtcbiAgICAgIGlmIChlbC5vaykge1xuICAgICAgICBlbC5hcmcucmVzdWx0ID0gZWwuYXJnLnJlc3VsdD8ubWFwKG9iaiA9PiB7XG4gICAgICAgICAgaWYgKG9iai51bml0ICYmIC9eey4qfSQvLnRlc3Qob2JqLnVuaXQpKSB7XG4gICAgICAgICAgICBvYmoudmFsdWUgPSBvYmoudmFsdWVcbiAgICAgICAgICAgIG9iai51bml0ID0gJydcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9ialxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHJlc3VsdDogZWwuYXJnXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKGVsLmFyZyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgY29udGVudDogJ+S/oeaBr+iOt+WPluWksei0pSdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH1cbn0pIl19