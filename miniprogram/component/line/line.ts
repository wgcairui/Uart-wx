import * as echarts from '../../ec-canvas/echarts';

Component({
  properties: {
    canvasId: {
      type: String
    },
    id: {
      type: String
    },
    opt: {
      type: Object,
      value: {},
      observer: function (newval: echarts.EChartOption.Dataset) {
        this.setData({
          "option.dataset": newval
        })
      }
    }
  },
  data: {
    option: {
      color: ["#67E0E3", "#9FE6B8"],
      legend: {
        top: 30,
      },
      /* dataZoom: [
        {
          startValue: '00:00:00'
        }, {
          type: 'inside'
        }
      ], */
      grid: {
        show: true,
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { type: 'line',sampling:'min' }
      ],
      dataset: {
        dimensions: [],
        source: []
      },
    } as Partial<echarts.EChartOption>
  },
  lifetimes: {
    /* ready() {
      setInterval(() => {
        const option = {
          dataset: {
            // 用 dimensions 指定了维度的顺序。直角坐标系中，
            // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
            // 如果不指定 dimensions，也可以通过指定 series.encode
            // 完成映射，参见后文。
            dimensions: ['product', '2015', '2016', '2017'],
            source: [
              { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
              { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
              { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
              { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
            ]
          },
        }
        this.setData({
          option
        })
      }, 1000)
    } */
  }
});
