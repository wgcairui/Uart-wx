import api from "../../../utils/api";

// miniprogram/pages/admin/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mac: '',
    dtus: [] as string[],
    nodes: [] as NodeClient[],
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
    this.setData({
      mac: scanResult.result
    })
    this.addDtus()
  },

  // 加入dtus
  scanRequst() {
    this.addDtus()
  },

  // add
  addDtus() {
    const mac = this.data.mac
    if (this.data.dtus.includes(mac)) {
      console.log('重复扫描');
    } else {
      this.setData({
        mac,
        dtus: [...this.data.dtus, mac]
      })
      const dtulen = this.data.dtus.length
      for (let node of this.data.nodes) {
        if (node.MaxConnections - node.count > dtulen) {
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
    const key = event.currentTarget.dataset.key
    wx.showModal({
      title: '删除dtu',
      content: `确定删除dtu:${key} ??`,
      success: (res) => {
        if (res.confirm) {
          this.setData({
            dtus: this.data.dtus.filter(el => el !== key)
          })
        }
      }
    })
  },

  // 获取节点列表
  async getNodes() {
    const { arg } = await api.getNodes()
    this.setData({
      nodes: arg,
      radio: arg[0].Name
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
    const item: NodeClient = event.currentTarget.dataset.item
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
        const { ok, msg } = await api.bacthRegisterDTU(radio, dtus)
        if (ok) {
          wx.showToast({
            title: '提交成功'
          })
          this.setData({
            dtus: [],
            mac: ''
          })
        } else {
          wx.showModal({
            title: '提交错误',
            content: msg
          })
        }
      }
    })
  }
})