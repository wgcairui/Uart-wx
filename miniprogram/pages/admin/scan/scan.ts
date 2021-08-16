import { ObjectToStrquery } from "../../../utils/util"
import api from "../../../utils/api"
Page({
  data: {
    mac: '',
    terminal: {
      name: '',
      mountNode: '',
      mountDevs: [] as Uart.TerminalMountDevs[],
      uptime: ''
    } as Uart.Terminal,
    remoteUrl: '',
    uarts: ['2400,8,1,NONE,NFC', '4800,8,1,NONE,HD', '9600,8,1,NONE,HD', '19200,8,1,NONE,HD', '115200,8,1,NONE,HD']
  },
  // 调用微信api，扫描DTU条形码
  async scanMac() {
    const scanResult = await wx.scanCode({})
    this.setData({
      mac: scanResult.result
    })
    this.scanRequst()
  },
  // 查询DTU设备信息
  async scanRequst() {
    wx.showLoading({ title: '查询中' })
    const { code, data } = await api.getRootTerminal(this.data.mac)
    wx.hideLoading()
    if (code && data) {
      this.setData({
        terminal: data
      })
    } else {
      wx.showModal({
        title: 'search',
        content: '此设备没有注册，请核对设备是否在我司渠道购买'
      })
    }
  },

  async initTerminal() {
    const { confirm } = await wx.showModal({
      title: '初始化' + this.data.terminal.name,
      content: '初始化操作不可逆,会清除dtu绑定的设备信息,告警信息,且只能清除未被绑定的dtu!!!'
    })
    if (confirm) {
      wx.showLoading({ title: 'loading' })
      const { code, data, msg } = await api.initTerminal(this.data.terminal.DevMac)
      if (code) {
        wx.showModal({
          title: 'success',
          content: `耗时${data}ms`
        })
        this.scanRequst()
      } else {
        wx.showModal({
          title: 'error',
          content: msg
        })
      }
    }
  },

  /**
   * 修改波特率
   */
  async modifyUart() {
    const d = await wx.showActionSheet({
      itemList: this.data.uarts
    })
    if (this.data.terminal.DevMac && d.errMsg === 'showActionSheet:ok') {
      const uart = `+++AT+UART=1,` + this.data.uarts[d.tapIndex]
      wx.showLoading({ title: '正在修改' })
      const { code, data } = await api.sendATInstruct(this.data.terminal.DevMac, uart)
      wx.hideLoading()
      if (code && data.ok) {
        wx.showToast({
          title: 'success',
          content: data.msg
        })
        this.setData({
          "terminal.uart": this.data.uarts[d.tapIndex]
        })
      } else {
        wx.showModal({
          title: '操作失败',
          content: data.msg
        })
      }
    }

  },
  /**
   * 绑定设备id
   */
  async bindDevId() {
    const scanResult = await wx.scanCode({})
    wx.showLoading({ title: 'loading' })
    const t = await api.getTerminal(scanResult.result)
    if (t.data) {
      wx.hideLoading()
      wx.showModal({
        title: 'error',
        content: `${scanResult.result}已被dtu:${t.data.DevMac} 绑定`
      })
      return
    }
    const { data } = await api.getRegisterDev(scanResult.result)
    wx.hideLoading()
    if (data) {
      const { confirm } = await wx.showModal({
        title: '确认绑定信息',
        content: `类型:${data.Type}\n 设备:${data.mountDev}\n 协议:${data.protocol}\n 地址:${data.pid}`
      })
      if (confirm) {
        wx.showLoading({ title: '正在绑定设备' })
        const r = await api.addTerminalMountDev(this.data.terminal.DevMac, { mountDev: data.mountDev, Type: data.Type, protocol: data.protocol, pid: data.pid, bindDev: scanResult.result })
        wx.hideLoading()
        if (r.code) {
          wx.showToast({
            title: '设备绑定成功'
          })
          this.scanRequst()
        }
      }
    } else {
      wx.showModal({
        title: '流程出错',
        content: `${scanResult.result}未注册,请先注册后绑定`
      })
    }

  },

  // 查看设备数据
  see(event: vantEvent<Uart.TerminalMountDevs>) {
    const { pid, mountDev, protocol, Type } = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/admin/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac: this.data.mac, Type })
    })
  },

  // 删除绑定设备
  async rmBind(e: vantEvent<Uart.registerDev>) {
    const item = e.currentTarget.dataset.item
    const { confirm } = await wx.showModal({
      title: '删除绑定设备',
      content: `确定删除 ${item.mountDev} ???`
    })
    if (confirm) {
      api.delTerminalMountDev(this.data.terminal.DevMac, item.pid).then(() => {
        this.scanRequst()
      })
    }


  },
  //远程调试设备
  async iotRemoteUrl() {
    const { code, data } = await api.iotRemoteUrl(this.data.mac)
    if (!code) {
      wx.showModal({
        title: '获取失败',
        content: '设备未绑定到IOT账号'
      })
    } else {
      if (!/remote_code=$/.test(data)) {
        wx.showModal({
          title: '调试地址',
          content: data,
          success() {
            wx.setClipboardData({
              data,
              success() {
                wx.showToast({
                  title: '已复制网址到剪切板'
                })
              }
            })
          }
        })
      } else {
        wx.showModal({
          title: '获取失败',
          content: '设备未连接到iot server中心'
        })
      }
    }
  }
})