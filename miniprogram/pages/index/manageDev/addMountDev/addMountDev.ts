import api from "../../../../utils/api"
interface devModals {
  text: string,
  value: string | number
}
// miniprogram/pages/index/manageDev/addMountDev/addMountDev.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    terminal: {} as Uart.Terminal,
    columns: [] as devModals[],
    devType: 'UPS',
    devTypes: [{ text: 'UPS', value: 'UPS' }, { text: '空调', value: '空调' }, { text: '电量仪', value: '电量仪' }, { text: '温湿度', value: '温湿度' }] as devModals[],
    devModal: '',
    devModals: [] as devModals[],
    devModesMap: new Map() as Map<string, Uart.DevsType>,
    devProtocol: '',
    pids: [] as devModals[],
    pid: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options: { mac: string }) {
    if (options.mac) {
      const { data: terminal } = await api.getTerminal(options.mac)
      const hasPid = new Set(terminal.mountDevs.map(el => el.pid))
      let columns = [] as devModals[]
      for (let i = 0; i < 255; i++) {
        if (!hasPid.has(i)) {
          columns.push({ text: String(i), value: i })
        }
      }
      this.setData({
        terminal,
        columns
      })
      this.devTypeChange()
      wx.setNavigationBarTitle({ title: terminal.name })
    } else {
      wx.switchTab({ url: '/pages/index/index' })
    }


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
  // 监听pid
 /*  pidChange(event: vantEvent) {
    this.setData({
      pid: event.detail.value.text
    })
    console.log({ event, p: this.data.pid });

  }, */
  // 提交新增
  async addMountDev() {
    const { devModal, devType, devProtocol, pid, terminal } = this.data
    if (devProtocol && devType && devProtocol) {
      const { code } = await api.addTerminalMountDev(terminal.DevMac, { Type: devType, mountDev: devModal, protocol: devProtocol, pid })
      if (code) {
        const event = this.getOpenerEventChannel()
        event.emit("addSuccess", { stat: true })
        wx.navigateBack()
        /* wx.showModal({
          title: 'Success',
          content: '添加设备成功，是否返回上一页面?',
          success(res) {
            if (res.confirm)
          }
        }) */
      } else {
        wx.showModal({
          title: '提交失败',
          content: '请检查参数并重新提交'
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