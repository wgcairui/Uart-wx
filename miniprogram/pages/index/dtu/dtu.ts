import api from "../../../utils/api"

// miniprogram/pages/index/dtu/dtu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    terminal: {} as Terminal,
    jwSupport: false,
    longitude: '',
    latitude: '',
    markers: [] as any[],
    address: '',
    recommend: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    if (id) {
      this.setData({
        id
      })
      this.start()
    }

  },

  start() {
    const id = this.data.id
    const terminal = wx.getStorageSync(id) as Terminal
    const jw = terminal.jw && terminal.jw.length > 10 ? terminal.jw.split(',') : false
    console.log(jw);
    terminal.uptime = new Date(terminal.uptime!).toLocaleString()
    this.setData({
      terminal,
      jwSupport: Boolean(jw),
    })
    if (jw) {
      const mark = {
        iconPath: "../../../assert/mark.png",
        latitude: Number(jw[1]),
        longitude: Number(jw[0]),
        title: terminal.name,
        width: 50,
        height: 50
      }
      this.setData({
        longitude: jw[0],
        latitude: jw[1],
        markers: [mark]
      })
      // 根据gps获取地址
      api.getGPSaddress([jw[1], jw[0]].join(',')).then(({ ok, arg }) => {
        if (ok) {
          this.setData({
            address: arg.result.address,
            recommend: arg.result.formatted_addresses.recommend
          })
        }
      })
    }
    wx.setNavigationBarTitle({ title: terminal.name })
  },

  markertap(_e: vantEvent) {
    /* const map = wx.createMapContext(e.currentTarget.id)
    map.getCenterLocation({
      success(e2){
        console.log(e2);
        
      }
    })
    
 */
  },
  //
  async nameChange(event: vantEvent) {
    const value = event.detail.value
    const { ok, msg } = await api.modifyDTUName(this.data.terminal.DevMac, value)
    if (!ok) {
      wx.showModal({
        title: "Error",
        content: msg
      })
    } else {
      this.setData({
        "terminal.name": value
      })
      wx.setStorage({
        key: this.data.id,
        data: this.data.terminal
      })
    }
  },

  // 
  updateGps() {
    const setupGps = this.setupGps
    wx.showModal({
      title: 'Tip',
      content: '是否把DTU定位更新为当前地址?',
      success(ok) {
        wx.showLoading({
          title: '请稍等'
        })
        if (ok.confirm) {
          wx.getSetting({
            success(res) {
              if (!res.authSetting["scope.userLocation"]) {
                wx.hideLoading()
                wx.authorize({
                  scope: "scope.userLocation",
                  success() {
                    setupGps()
                  }
                })
              } else {
                setupGps()
              }
            }
          })
        }
      }
    })
  },

  // 设置Gps
  setupGps() {
    const { terminal, id } = this.data
    wx.getLocation({
      success: (location) => {
        terminal.jw = [location.longitude.toFixed(5), location.latitude.toFixed(5)].join(',')
        wx.hideLoading()
        wx.setStorage({
          key: id,
          data: terminal,
          success: () => {
            this.start()
          }
        })
        // 上传定位到服务端
        api.updateGps(terminal.DevMac, terminal.jw).then(el => {
          if (el.ok) {
            wx.showToast({ title: '更新定位成功' })
          } else {
            wx.showToast({ title: el.msg, icon: 'none' })
          }
        })
      }
    })
  }
})