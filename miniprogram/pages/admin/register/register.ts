import api from "../../../utils/api";

// miniprogram/pages/admin/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mac: '',
    bind: '',
    dtus: [] as Uart.RegisterTerminal[],
    nodes: [] as Uart.NodeClient[],
    radio: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getNodes()
  },

  // 调用微信api，扫描DTU条形码
  async scanMac() {
    const scanResult = await wx.scanCode({})
    //const { code, data } = await api.getTerminal(scanResult.result)
    this.setData({
      mac: scanResult.result
    })
    this.addDtus()
  },

  /* async scanBind() {
    const scanResult = await wx.scanCode({})
    this.setData({
      bind: scanResult.result
    })
    if (this.data.mac && this.data.bind) this.addDtus()
  }, */

  // 加入dtus
  scanRequst() {
    /* if (!this.data.bind) {
      wx.showModal({
        title: '参数不完整',
        content: '设备ID还未填写,是否添加??',
        success: (e) => {
          if (e.confirm) this.addDtus()
        }
      })
    } else */
    this.addDtus()
  },

  // add
  async addDtus() {
    const { mac, bind, radio } = this.data
    if (this.data.dtus.findIndex(el => el.DevMac === mac) !== -1) {
      console.log('重复扫描');
    } else {
      this.setData({
        mac,
        dtus: [...this.data.dtus, { DevMac: mac, bindDev: bind, mountNode: radio }]
      })
      const dtulen = this.data.dtus.length
      for (let node of this.data.nodes) {
        if (node.MaxConnections - (node.count || 0) > dtulen) {
          this.setData({
            radio: node.Name
          })
          break
        }
      }
    }
  },

  // 选择节点
  onChange_Node(event: vantEvent) {
    console.log(event);

  },

  // 删除选择的DTU
  rmDtu(event: vantEvent) {
    const mac = event.currentTarget.dataset.key
    wx.showModal({
      title: '删除dtu',
      content: `确定删除dtu:${mac} ??`,
      success: (res) => {
        if (res.confirm) {
          this.setData({
            dtus: this.data.dtus.filter(el => el.DevMac !== mac)
          })
        }
      }
    })
  },

  // 获取节点列表
  async getNodes() {
    const { data } = await api.Nodes()
    this.setData({
      nodes: data,
      radio: data[0].Name
    })
  },
  // 变更选择节点
  changeNode(event: vantEvent) {
    this.setData({
      radio: event.detail,
    });
  },

  // 选择节点
  selectNode(event: vantEvent) {
    const item: Uart.NodeClient = event.currentTarget.dataset.item
    this.setData({
      radio: item.Name
    });
  },
  // 提交
  submit() {
    const { dtus, radio } = this.data
    wx.showModal({
      title: '提交核对',
      content: `本次提交的dtu数目:${dtus.length},挂载的节点为:${radio},`,
      success: async () => {
        const all = await Promise.all(dtus.map(el => api.addRegisterTerminal(el.DevMac, el.mountNode)))
        if (all.length === dtus.length) {
          wx.showModal({
            title: '提交成功',
            content: `成功提交[${all.length}] 个设备`
          })
          this.getNodes()
          this.setData({
            dtus: [],
            mac: ''
          })
        } else {
          wx.showModal({
            title: '提交错误',
            content: '提交错误'
          })
        }
      }
    })
  }
})