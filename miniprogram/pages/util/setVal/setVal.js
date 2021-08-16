"use strict";
Page({
    data: {
        val: 0
    },
    sendVal() {
        const num = Number(this.data.val);
        if (Number.isNaN(num)) {
            wx.showModal({
                title: '输入错误',
                content: '值必须是整数',
                success: () => {
                    this.setData({
                        val: 0
                    });
                }
            });
        }
        else {
            const event = this.getOpenerEventChannel();
            event.emit("valueOk", { val: this.data.val });
            wx.navigateBack();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0VmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0VmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsQ0FBQztLQUNQO0lBV0QsT0FBTztRQUNMLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQixFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxNQUFNO2dCQUNiLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixPQUFPLEVBQUUsR0FBRyxFQUFFO29CQUNaLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsR0FBRyxFQUFFLENBQUM7cUJBQ1AsQ0FBQyxDQUFBO2dCQUNKLENBQUM7YUFDRixDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUE7WUFDMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQzdDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtTQUNsQjtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtaW5pcHJvZ3JhbS9wYWdlcy91dGlsL3NldFZhbC9zZXRWYWwuanNcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICB2YWw6IDBcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gLyogIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBjb25zdCBpdGVtID0gb3B0aW9uc1xuICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuXG4gIH0sICovXG5cbiAgc2VuZFZhbCgpIHtcbiAgICBjb25zdCBudW0gPSBOdW1iZXIodGhpcy5kYXRhLnZhbClcbiAgICBpZiAoTnVtYmVyLmlzTmFOKG51bSkpIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn6L6T5YWl6ZSZ6K+vJyxcbiAgICAgICAgY29udGVudDogJ+WAvOW/hemhu+aYr+aVtOaVsCcsXG4gICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgdmFsOiAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmdldE9wZW5lckV2ZW50Q2hhbm5lbCgpXG4gICAgICBldmVudC5lbWl0KFwidmFsdWVPa1wiLCB7IHZhbDogdGhpcy5kYXRhLnZhbCB9KVxuICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICB9XG4gIH1cbn0pIl19