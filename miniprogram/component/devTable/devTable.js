"use strict";
Component({
    properties: {
        result: {
            type: Array,
            observer: function (newval, old) {
                if (old && old.length === newval.length) {
                    newval.sort(function (o, t) { return ~(Number(o.alarm || false) - Number(t.alarm || false)); }).forEach(function (el, index) {
                        var oldi = old[index];
                        if (el.unit && el.name === oldi.name) {
                            var ov = parseFloat(oldi.value);
                            var nv = parseFloat(el.value);
                            if (nv > ov) {
                                el.step = '↑';
                            }
                            else {
                                el.step = nv === ov ? '~' : '↓';
                            }
                        }
                        else {
                            el.step = '';
                        }
                    });
                    this.setData({
                        result: newval
                    });
                }
            }
        }
    },
    data: {
        filter: '',
    },
    methods: {
        onSearch: function () {
            this.triggerEvent('filter', { filter: this.data.filter });
        },
        onLine: function (event) {
            if (event.currentTarget.dataset.item.unit) {
                this.triggerEvent('line', { name: event.target.id });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2VGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXZUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsU0FBUyxDQUFDO0lBSVIsVUFBVSxFQUFFO1FBQ1YsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLEtBQUs7WUFDWCxRQUFRLEVBQVIsVUFBUyxNQUE2QixFQUFFLEdBQWlDO2dCQUN2RSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBR3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQXRELENBQXNELENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFLEVBQUUsS0FBSzt3QkFDOUYsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO3dCQUN2QixJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFOzRCQUNwQyxJQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBOzRCQUNqQyxJQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBOzRCQUMvQixJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ1gsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUE7NkJBQ2Q7aUNBQU07Z0NBQ0wsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTs2QkFDaEM7eUJBQ0Y7NkJBQUk7NEJBQ0gsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUE7eUJBQ2I7b0JBQ0gsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxNQUFNLEVBQUUsTUFBTTtxQkFDZixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0Y7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxFQUFFO0tBQ1g7SUFLRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzNELENBQUM7UUFFRCxNQUFNLEVBQU4sVUFBTyxLQUFxQztZQUMxQyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUNyRDtRQUNILENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vLyBjb21wb25lbnQvZGV2VGFibGUvZGV2VGFibGUuanNcbkNvbXBvbmVudCh7XG4gIC8qKlxuICAgKiDnu4Tku7bnmoTlsZ7mgKfliJfooahcbiAgICovXG4gIHByb3BlcnRpZXM6IHtcbiAgICByZXN1bHQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgb2JzZXJ2ZXIobmV3dmFsOiBxdWVyeVJlc3VsdEFyZ3VtZW50W10sIG9sZDogcXVlcnlSZXN1bHRBcmd1bWVudFtdIHwgbnVsbCkge1xuICAgICAgICBpZiAob2xkICYmIG9sZC5sZW5ndGggPT09IG5ld3ZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAvLyDmr5TovoPmlrDogIHmlbDmja7vvIzmt7vliqDkuIrkuIvnrq3lpLRcbiAgICAgICAgICAvLyBuZXd2YWwgPSBuZXd2YWxcbiAgICAgICAgICBuZXd2YWwuc29ydCgobywgdCkgPT4gfihOdW1iZXIoby5hbGFybSB8fCBmYWxzZSkgLSBOdW1iZXIodC5hbGFybSB8fCBmYWxzZSkpKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9sZGkgPSBvbGRbaW5kZXhdXG4gICAgICAgICAgICBpZiAoZWwudW5pdCAmJiBlbC5uYW1lID09PSBvbGRpLm5hbWUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgb3YgPSBwYXJzZUZsb2F0KG9sZGkudmFsdWUpXG4gICAgICAgICAgICAgIGNvbnN0IG52ID0gcGFyc2VGbG9hdChlbC52YWx1ZSlcbiAgICAgICAgICAgICAgaWYgKG52ID4gb3YpIHtcbiAgICAgICAgICAgICAgICBlbC5zdGVwID0gJ+KGkSdcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC5zdGVwID0gbnYgPT09IG92ID8gJ34nIDogJ+KGkydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIGVsLnN0ZXAgPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHJlc3VsdDogbmV3dmFsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIGZpbHRlcjogJycsXG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczoge1xuICAgIG9uU2VhcmNoKCkge1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2ZpbHRlcicsIHsgZmlsdGVyOiB0aGlzLmRhdGEuZmlsdGVyIH0pXG4gICAgfSxcbiAgICAvLyDov5vlhaXlj4LmlbDnirbmgIFcbiAgICBvbkxpbmUoZXZlbnQ6IHZhbnRFdmVudDxxdWVyeVJlc3VsdEFyZ3VtZW50Pikge1xuICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtLnVuaXQpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2xpbmUnLCB7IG5hbWU6IGV2ZW50LnRhcmdldC5pZCB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdfQ==