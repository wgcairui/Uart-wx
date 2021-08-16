import api from "../../../utils/api"

// miniprogram/pages/admin/registerDev/registerDev.js
interface devModals {
  text: string,
  value: string
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    ids: [] as string[],
    devType: 'UPS',
    devTypes: [{ text: 'UPS', value: 'UPS' }, { text: '空调', value: '空调' }, { text: '电量仪', value: '电量仪' }, { text: '温湿度', value: '温湿度' }] as devModals[],
    devModal: '',
    devModals: [] as devModals[],
    devModesMap: new Map() as Map<string, Uart.DevsType>,
    devProtocol: '',
    devProtocols: [] as devModals[],
    pid: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.devTypeChange()
  },

  // 监听设备类型变化
  async devTypeChange() {
    const { data } = await api.getDevTypes(this.data.devType)
    const devModals = data.map(el => ({ text: el.DevModel, value: el.DevModel }))
    this.setData({
      devModals,
      devProtocols: [],
      devModesMap: new Map(data.map(el => [el.DevModel, el]))
    })
  },

  // 监听设备型号变化
  async devModalChange() {
    const { devModesMap, devModal } = this.data
    const devProtocols = devModesMap.get(devModal)?.Protocols.map(el => ({ text: el.Protocol, value: el.Protocol }))!
    this.setData({
      devProtocols
    })
  },

  // 调用微信api，扫描DTU条形码
  async scanMac() {
    const scanResult = await wx.scanCode({})
    this.setData({
      id: scanResult.result
    })
    this.scanRequst()
  },

  async scanRequst() {
    wx.showLoading({ title: '查询中' })
    const r = await api.getRegisterDev(this.data.id)
    wx.hideLoading()
    if (r.code && r.data) {
      wx.showModal({
        title: '重复注册',
        content: `设备${r.data.id}/${r.data.mountDev}已被注册`
      })
    } else
      this.setData({
        ids: [...new Set([...this.data.ids, this.data.id])]
      })
  },


  // 删除选择的DTU
  rmid(event: vantEvent) {
    const mac = event.currentTarget.dataset.key
    wx.showModal({
      title: '删除Id',
      content: `确定删除Id:${mac} ??`,
      success: (res) => {
        if (res.confirm) {
          this.setData({
            ids: this.data.ids.filter(el => el !== mac)
          })
        }
      }
    })
  },
  // 提交
  async submit() {
    const { ids, pid, devModal, devProtocol, devType } = this.data
    if (ids.length === 0 || !pid || !devProtocol || !devModal || !devType) {
      wx.showModal({
        title: '校验错误',
        content: "缺少参数"
      })
      return
    }
    const mountDev: Uart.TerminalMountDevs = {
      Type: devType,
      mountDev: devModal,
      pid,
      protocol: devProtocol
    }

    const res = await wx.showModal({
      title: '登记设备',
      content: `确认参数[${mountDev.mountDev}]/[${mountDev.protocol}]/[${mountDev.pid}] !!!`
    })
    if (res.confirm) {
      wx.showLoading({ title: '正在登记' })
      const r = await api.addRegisterDev(ids, mountDev)
      wx.hideLoading()
      if (r.code) {
        wx.showModal({
          title: 'success',
          content: `成功注册设备${r.data.length}个`
        })
        this.setData({
          id: '',
          ids: []
        })
      }
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})