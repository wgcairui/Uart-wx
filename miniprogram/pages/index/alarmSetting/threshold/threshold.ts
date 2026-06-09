// miniprogram/pages/index/alarmSetting/threshold/threshold.js
Page({
  data: {
    name: '',
    min: 0,
    max: 0,
    unit: '',
  },

  onLoad(options: any) {
    wx.setNavigationBarTitle({ title: '参数限值 - ' + options.name })
    this.setData({
      name: options.name,
      min: Number(options.min) || 0,
      max: Number(options.max) || 0,
      unit: options.unit || '',
    })
  },

  onMinMinus() {
    const next = Number((this.data.min - 1).toFixed(4))
    this.setData({ min: next < 0 ? 0 : next, max: next >= this.data.max ? next + 1 : this.data.max })
  },
  onMinPlus() {
    const next = Number((this.data.min + 1).toFixed(4))
    this.setData({ min: next, max: next >= this.data.max ? next + 1 : this.data.max })
  },
  onMaxMinus() {
    const next = Number((this.data.max - 1).toFixed(4))
    this.setData({ max: next < this.data.min ? this.data.min : next })
  },
  onMaxPlus() {
    const next = Number((this.data.max + 1).toFixed(4))
    this.setData({ max: next })
  },

  onSubmit() {
    if (this.data.max <= this.data.min) {
      wx.showToast({ title: '最大值需大于最小值', icon: 'none' })
      return
    }
    const events = this.getOpenerEventChannel()
    events.emit('modifyThreshold', {
      name: this.data.name,
      min: this.data.min,
      max: this.data.max,
      unit: this.data.unit,
    })
    wx.navigateBack()
  },
})
