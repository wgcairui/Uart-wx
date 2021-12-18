// component/myInput/myInput.js
Component({
  /**
   * 组件的属性列表
   */
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

  /**
   * 组件的初始数据
   */
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
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click() {
      this.setData({
        readonly: false
      })
      wx.nextTick(() => {
        this.setData({
          focus: true
        })
      })
    },
    focus() {
    },
    blur() {
      this.trige()
    },
    confirm() {
      //this.trige()
    },
    trige() {
      const { value, vd } = this.data
      if (value !== vd) {
        this.triggerEvent('submit', { value: this.data.vd })
        /* wx.showModal({
          title: `Tip`,
          content: `确定从「${value}」修改为「${vd}」?`,
          success: (res) => {
            if (res.confirm) {
              this.triggerEvent('submit', { value: this.data.vd })
            }
          }
        }) */
      }
    }
  }
})
