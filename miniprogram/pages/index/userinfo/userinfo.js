"use strict";
Page({
    data: {
        name: '',
        avanter: '',
        creatTime: "",
        modifyTime: "",
        user: "",
        tel: "",
        mail: "",
        company: "",
        address: "",
        rgtype: ''
    },
    onLoad: function (_options) {
        var _this = this;
        wx.getStorage({
            key: 'userinfo',
            success: function (_a) {
                var data = _a.data;
                _this.setData({
                    avanter: data.avanter,
                    name: data.name,
                    creatTime: new Date(data.creatTime).toLocaleString(),
                    modifyTime: new Date(data.modifyTime).toLocaleString(),
                    mail: data.mail,
                    tel: data.tel,
                    user: data.user,
                    company: data.company,
                    address: data.address,
                    rgtype: data.rgtype
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxDQUFDO0lBS0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsRUFBRTtRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUtELE1BQU0sRUFBRSxVQUFVLFFBQVE7UUFBbEIsaUJBa0JQO1FBakJDLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsVUFBVTtZQUNmLE9BQU8sRUFBRSxVQUFDLEVBQTRCO29CQUExQixjQUFJO2dCQUNkLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFnQixDQUFDLENBQUMsY0FBYyxFQUFFO29CQUMzRCxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQWlCLENBQUMsQ0FBQyxjQUFjLEVBQUU7b0JBQzdELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQVU7b0JBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2lCQUNwQixDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUtELE9BQU8sRUFBRTtJQUVULENBQUM7SUFLRCxNQUFNLEVBQUU7SUFFUixDQUFDO0lBS0QsTUFBTSxFQUFFO0lBRVIsQ0FBQztJQUtELFFBQVEsRUFBRTtJQUVWLENBQUM7SUFLRCxpQkFBaUIsRUFBRTtJQUVuQixDQUFDO0lBS0QsYUFBYSxFQUFFO0lBRWYsQ0FBQztJQUtELGlCQUFpQixFQUFFO0lBRW5CLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy9pbmRleC91c2VyaW5mby91c2VyaW5mby5qc1xuUGFnZSh7XG5cbiAgLyoqXG4gICAqIOmhtemdoueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIG5hbWU6ICcnLFxuICAgIGF2YW50ZXI6ICcnLFxuICAgIGNyZWF0VGltZTogXCJcIixcbiAgICBtb2RpZnlUaW1lOiBcIlwiLFxuICAgIHVzZXI6IFwiXCIsXG4gICAgdGVsOiBcIlwiLFxuICAgIG1haWw6IFwiXCIsXG4gICAgY29tcGFueTogXCJcIixcbiAgICBhZGRyZXNzOiBcIlwiLFxuICAgIHJndHlwZTogJydcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKF9vcHRpb25zKSB7XG4gICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICBrZXk6ICd1c2VyaW5mbycsXG4gICAgICBzdWNjZXNzOiAoeyBkYXRhIH06IHsgZGF0YTogVXNlckluZm8gfSkgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGF2YW50ZXI6IGRhdGEuYXZhbnRlcixcbiAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgICAgY3JlYXRUaW1lOiBuZXcgRGF0ZShkYXRhLmNyZWF0VGltZSBhcyBhbnkpLnRvTG9jYWxlU3RyaW5nKCksXG4gICAgICAgICAgbW9kaWZ5VGltZTogbmV3IERhdGUoZGF0YS5tb2RpZnlUaW1lIGFzIGFueSkudG9Mb2NhbGVTdHJpbmcoKSxcbiAgICAgICAgICBtYWlsOiBkYXRhLm1haWwsXG4gICAgICAgICAgdGVsOiBkYXRhLnRlbCBhcyBhbnksXG4gICAgICAgICAgdXNlcjogZGF0YS51c2VyLFxuICAgICAgICAgIGNvbXBhbnk6IGRhdGEuY29tcGFueSxcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MsXG4gICAgICAgICAgcmd0eXBlOiBkYXRhLnJndHlwZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBvblJlYWR5OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICovXG4gIG9uU2hvdzogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXG4gICAqL1xuICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b206IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICovXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfVxufSkiXX0=