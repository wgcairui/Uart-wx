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
        click() {
            this.setData({
                readonly: false
            });
            wx.nextTick(() => {
                this.setData({
                    focus: true
                });
            });
        },
        focus() {
        },
        blur() {
            this.trige();
        },
        confirm() {
        },
        trige() {
            const { value, vd } = this.data;
            if (value !== vd) {
                wx.showModal({
                    title: `Tip`,
                    content: `确定从「${value}」修改为「${vd}」?`,
                    success: (res) => {
                        if (res.confirm) {
                            this.triggerEvent('submit', { value: this.data.vd });
                        }
                    }
                });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15SW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFNBQVMsQ0FBQztJQUlSLFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNO1NBQ2I7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtTQUNiO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsTUFBTTtTQUNkO0tBQ0Y7SUFLRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxFQUFFO1FBQ2QsS0FBSyxFQUFFLEtBQUs7UUFDWixFQUFFLEVBQUUsRUFBRTtLQUNQO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsT0FBTyxFQUFFLFVBQVUsTUFBTTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLEVBQUUsRUFBRSxNQUFNO2FBQ1gsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0lBS0QsT0FBTyxFQUFFO1FBQ1AsS0FBSztZQUNILElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxLQUFLLEVBQUUsSUFBSTtpQkFDWixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxLQUFLO1FBQ0wsQ0FBQztRQUNELElBQUk7WUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDZCxDQUFDO1FBQ0QsT0FBTztRQUVQLENBQUM7UUFDRCxLQUFLO1lBQ0gsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBQy9CLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtnQkFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsS0FBSztvQkFDWixPQUFPLEVBQUUsT0FBTyxLQUFLLFFBQVEsRUFBRSxJQUFJO29CQUNuQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDZixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO3lCQUNyRDtvQkFDSCxDQUFDO2lCQUNGLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY29tcG9uZW50L215SW5wdXQvbXlJbnB1dC5qc1xuQ29tcG9uZW50KHtcbiAgLyoqXG4gICAqIOe7hOS7tueahOWxnuaAp+WIl+ihqFxuICAgKi9cbiAgcHJvcGVydGllczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAndGV4dCdcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHJpZ2h0X2ljb246ICcnLFxuICAgIGZvY3VzOiBmYWxzZSxcbiAgICB2ZDogJydcbiAgfSxcbiAgb2JzZXJ2ZXJzOiB7XG4gICAgJ3ZhbHVlJzogZnVuY3Rpb24gKG5ld3ZhbCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdmQ6IG5ld3ZhbFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczoge1xuICAgIGNsaWNrKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgcmVhZG9ubHk6IGZhbHNlXG4gICAgICB9KVxuICAgICAgd3gubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGZvY3VzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgZm9jdXMoKSB7XG4gICAgfSxcbiAgICBibHVyKCkge1xuICAgICAgdGhpcy50cmlnZSgpXG4gICAgfSxcbiAgICBjb25maXJtKCkge1xuICAgICAgLy90aGlzLnRyaWdlKClcbiAgICB9LFxuICAgIHRyaWdlKCkge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgdmQgfSA9IHRoaXMuZGF0YVxuICAgICAgaWYgKHZhbHVlICE9PSB2ZCkge1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiBgVGlwYCxcbiAgICAgICAgICBjb250ZW50OiBg56Gu5a6a5LuO44CMJHt2YWx1ZX3jgI3kv67mlLnkuLrjgIwke3ZkfeOAjT9gLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnc3VibWl0JywgeyB2YWx1ZTogdGhpcy5kYXRhLnZkIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdfQ==