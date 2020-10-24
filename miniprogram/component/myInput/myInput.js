"use strict";
Component({
    properties: {
        label: {
            type: String
        },
        value: {
            type: String
        },
        type: {
            type: String,
            value: 'text'
        }
    },
    data: {
        readonly: true,
        right_icon: '',
        focus: false,
        vd: ''
    },
    observers: {
        'value': function (newval) {
            this.setData({
                vd: newval
            });
        }
    },
    methods: {
        click: function () {
            var _this = this;
            this.setData({
                readonly: false
            });
            wx.nextTick(function () {
                _this.setData({
                    focus: true
                });
            });
        },
        focus: function () {
        },
        blur: function () {
            this.trige();
        },
        confirm: function () {
        },
        trige: function () {
            var _this = this;
            var _a = this.data, value = _a.value, vd = _a.vd;
            if (value !== vd) {
                wx.showModal({
                    title: "Tip",
                    content: "\u786E\u5B9A\u4ECE\u300C" + value + "\u300D\u4FEE\u6539\u4E3A\u300C" + vd + "\u300D?",
                    success: function (res) {
                        if (res.confirm) {
                            _this.triggerEvent('submit', { value: _this.data.vd });
                        }
                    }
                });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15SW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFNBQVMsQ0FBQztJQUlSLFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtTQUNiO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsTUFBTTtTQUNkO0tBQ0Y7SUFLRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxFQUFFO1FBQ2QsS0FBSyxFQUFFLEtBQUs7UUFDWixFQUFFLEVBQUUsRUFBRTtLQUNQO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsT0FBTyxFQUFFLFVBQVUsTUFBTTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLEVBQUUsRUFBRSxNQUFNO2FBQ1gsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0lBS0QsT0FBTyxFQUFFO1FBQ1AsS0FBSztZQUFMLGlCQVNDO1lBUkMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUE7WUFDRixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsS0FBSyxFQUFFLElBQUk7aUJBQ1osQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsS0FBSztRQUNMLENBQUM7UUFDRCxJQUFJO1lBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2QsQ0FBQztRQUNELE9BQU87UUFFUCxDQUFDO1FBQ0QsS0FBSztZQUFMLGlCQWFDO1lBWk8sSUFBQSxjQUF5QixFQUF2QixnQkFBSyxFQUFFLFVBQWdCLENBQUE7WUFDL0IsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO2dCQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxLQUFLO29CQUNaLE9BQU8sRUFBRSw2QkFBTyxLQUFLLHNDQUFRLEVBQUUsWUFBSTtvQkFDbkMsT0FBTyxFQUFFLFVBQUMsR0FBRzt3QkFDWCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ2YsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO3lCQUNyRDtvQkFDSCxDQUFDO2lCQUNGLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY29tcG9uZW50L215SW5wdXQvbXlJbnB1dC5qc1xuQ29tcG9uZW50KHtcbiAgLyoqXG4gICAqIOe7hOS7tueahOWxnuaAp+WIl+ihqFxuICAgKi9cbiAgcHJvcGVydGllczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAndGV4dCdcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHJpZ2h0X2ljb246ICcnLFxuICAgIGZvY3VzOiBmYWxzZSxcbiAgICB2ZDogJydcbiAgfSxcbiAgb2JzZXJ2ZXJzOiB7XG4gICAgJ3ZhbHVlJzogZnVuY3Rpb24gKG5ld3ZhbCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdmQ6IG5ld3ZhbFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczoge1xuICAgIGNsaWNrKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgcmVhZG9ubHk6IGZhbHNlXG4gICAgICB9KVxuICAgICAgd3gubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGZvY3VzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZm9jdXMoKSB7XG4gICAgfSxcbiAgICBibHVyKCkge1xuICAgICAgdGhpcy50cmlnZSgpXG4gICAgfSxcbiAgICBjb25maXJtKCkge1xuICAgICAgLy90aGlzLnRyaWdlKClcbiAgICB9LFxuICAgIHRyaWdlKCkge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgdmQgfSA9IHRoaXMuZGF0YVxuICAgICAgaWYgKHZhbHVlICE9PSB2ZCkge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiBgVGlwYCxcbiAgICAgICAgICBjb250ZW50OiBg56Gu5a6a5LuO44CMJHt2YWx1ZX3jgI3kv67mlLnkuLrjgIwke3ZkfeOAjT9gLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnc3VibWl0JywgeyB2YWx1ZTogdGhpcy5kYXRhLnZkIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdfQ==