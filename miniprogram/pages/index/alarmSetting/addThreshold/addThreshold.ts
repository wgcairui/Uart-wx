import api from "../../../../utils/api"

// miniprogram/pages/index/alarmSetting/addThreshold/addThreshold.js
Page({
  data: {
    name: '',
    cache: new Map<string, any>(),
    unit: '',
    min: 0,
    max: 100,
    columns: [] as string[],
  },

  onLoad: async function (options: any) {
    const protocol = options.protocol
    const setup = await api.getAlarmProtocol(protocol)
    const showSet = new Set(setup.data.ShowTag || [])
    const Protocols = await api.getProtocol(protocol)
    const setups = (Protocols.data.instruct || [])
      .map((el: any) => el.formResize.filter((el2: any) => !el2.isState))
      .reduce((pre: any, cur: any) => [...pre, ...cur], [])
    const cache = new Map<string, any>(setups.map((el: any) => [el.name, el]))
    const keysSet = new Set(((options.keys as string) || '').split(',').filter(Boolean))
    this.setData({
      columns: Array.from(cache.keys()).filter((el: any) => showSet.has(el) && !keysSet.has(el)) as any,
      cache,
    })
  },

  // 选择参数
  onPick(e: vantEvent) {
    const name = e.currentTarget.dataset.name as string
    this.setData({
      name,
      unit: this.data.cache.get(name)?.unit || '',
    })
  },

  // min/max stepper
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

  // 提交
  onSubmit() {
    if (!this.data.name) {
      wx.showToast({ title: '请先选择参数', icon: 'none' })
      return
    }
    if (this.data.max <= this.data.min) {
      wx.showToast({ title: '最大值需大于最小值', icon: 'none' })
      return
    }
    const events = this.getOpenerEventChannel()
    events.emit('addThreshold', {
      name: this.data.name,
      min: this.data.min,
      max: this.data.max,
      unit: this.data.unit,
      icon: 'star',
    })
    wx.navigateBack()
  },
})
