import WxCanvas from './wx-canvas';
import * as echarts from './echarts';

Component({
  properties: {
    canvasId: {
      type: String,
      value: 'ec-canvas'
    },
    opt:{
      type:Object,
      observer:function(newavl,oldval){
        const val = Object.assign({},oldval,newavl)
        if(typeof this.data.chart === "object"){
          this.data.chart.setOption(val)
        }
      }
    }
  },
  data:{
    chart:'null'
  },
  ready: function () {
    // Disable prograssive because drawImage doesn't support DOM as parameter
    // See https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.drawImage.html
    echarts.registerPreprocessor(option => {
      if (option && option.series) {
        if (option.series.length > 0) {
          option.series.forEach(series => {
            series.progressive = 0;
          });
        }
        else if (typeof option.series === 'object') {
          option.series.progressive = 0;
        }
      }
    });
    this.init();
  },

  methods: {
    init() {
      wx.createSelectorQuery().in(this)
        .select('.ec-canvas')
        .fields({ node: true, size: true })
        .exec(res => {
          const canvasNode = res[0].node
          const canvas = new WxCanvas(canvasNode.getContext('2d'), this.data.canvasId, true, canvasNode)
          echarts.setCanvasCreator(() => {
            return canvas
          })
          //this.chart = this.data.ec.onInit(canvas, res[0].width, res[0].height, wx.getSystemInfoSync().pixelRatio)
          const chart = echarts.init(canvas, '', {
            width: res[0].width,
            height: res[0].height * 0.8,
            devicePixelRatio:  wx.getSystemInfoSync().pixelRatio
          });
          /* this.setData({
            chart:this.chart
          }) */
          //this.data.chart = chart
          canvas.setChart(chart);
          if(this.data.opt){
            chart.setOption(this.data.opt)
          }
          this.chart = chart
          this.data.chart = chart
        })
    },

    canvasToTempFilePath(opt) {
      const query = wx.createSelectorQuery().in(this)
      query
        .select('.ec-canvas')
        .fields({ node: true, size: true })
        .exec(res => {
          const canvasNode = res[0].node
          opt.canvas = canvasNode
          wx.canvasToTempFilePath(opt)
        })
    },

    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'start');
      }
    },

    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'change');
      }
    },

    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = this.chart.getZr().handler;
        handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'end');
      }
    }
  }
});

function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}