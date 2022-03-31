import { ObjectToStrquery, parseTime } from "../../../utils/util"
import api from "../../../utils/api"

// miniprogram/pages/index/dtu/dtu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mac: '',
    terminal: {} as Uart.Terminal,
    dtuItem: [] as Uart.TerminalMountDevs[],
    jwSupport: false,
    longitude: '',
    latitude: '',
    markers: [] as any[],
    address: '',
    recommend: '',
    devPics: {
      "UPS": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/99daa3e07c7b60ef7e16ed8b9fe7cf33.png',
      "温湿度": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/5fc7d6fe0571b714d5a3395a8c7a9f12.png',
      "电量仪": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/ab52d9fccdddc0fa5b0386ea0b5cbc7f.png',
      "空调": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/c3c1852270ca35fd56135d8fda2a9977.png'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { mac: string }) {
    this.setData({
      mac: options.mac
    })
    this.start()
  },

  async start() {
    const { data: terminal } = await api.getTerminal(this.data.mac)
    const jw = terminal.jw && terminal.jw.length > 10 ? terminal.jw.split(',') : false
    // console.log(jw);
    terminal.uptime = parseTime(terminal.uptime)
    //
    const devs = terminal.mountDevs.map(dev => {
      dev.pic = (this.data.devPics as any)[dev.Type]
      return dev
    })
    this.setData({
      terminal,
      dtuItem: devs,
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
      api.getGPSaddress([jw[1], jw[0]].join(',')).then(({ code, data, msg }) => {
        if (code) {
          this.setData({
            address: data.address,
            recommend: data.formatted_addresses.recommend
          })
        } else {
          wx.showToast({ title: msg })
        }
      })
    }
    wx.setNavigationBarTitle({ title: terminal.name || terminal.DevMac })
  },

  // 查看设备数据
  showMountDevData(event: vantEvent<Uart.TerminalMountDevs>) {
    const { pid, mountDev, protocol, Type } = event.currentTarget.dataset.item
    const { DevMac } = this.data.terminal
    wx.navigateTo({
      url: '/pages/index/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac, Type })
    })
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
    const { code, msg } = await api.modifyTerminal(this.data.terminal.DevMac, value)
    if (!code) {
      wx.showModal({
        title: "Error",
        content: msg
      })
    } else {
      this.setData({
        "terminal.name": value
      })
      wx.setStorage({
        key: this.data.terminal._id,
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
    const { terminal } = this.data
    wx.getLocation({
      success: (location) => {
        terminal.jw = [location.longitude.toFixed(5), location.latitude.toFixed(5)].join(',')
        wx.hideLoading()
        wx.setStorage({
          key: terminal._id,
          data: terminal,
          success: () => {
            this.start()
          }
        })
        // 上传定位到服务端
        api.updateGps(terminal.DevMac, terminal.jw).then(el => {
          if (el.code) {
            wx.showToast({ title: '更新定位成功' })
          } else {
            wx.showToast({ title: el.msg, icon: 'none' })
          }
          wx.hideLoading()
        })
      }
    })
  }
})