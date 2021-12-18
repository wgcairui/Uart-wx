import { ObjectToStrquery } from "../../../utils/util"
import api from "../../../utils/api"
Page({
  data: {
    mac: '',
    macs: [] as string[],
    terminal: {
      name: '',
      mountNode: '',
      mountDevs: [] as Uart.TerminalMountDevs[],
      uptime: ''
    } as Uart.Terminal,
    remoteUrl: '',
    uarts: ['2400,8,1,NONE,NFC', '4800,8,1,NONE,HD', '9600,8,1,NONE,HD', '19200,8,1,NONE,HD', '115200,8,1,NONE,HD'],
    qrReady: false
  },

  onLoad() {
    wx.getStorage({
      key: "macHis",
      success: (res) => {
        console.log(res.data);
        this.setData({
          macs: res.data
        })
      }
    })
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
        mac: data.DevMac,
        terminal: data
      })
      this.addHis(data.DevMac)
      // this.generateLabel()
    } else {
      wx.showModal({
        title: 'search',
        content: '此设备没有注册，请核对设备是否在我司渠道购买'
      })
    }
  },

  /**
   * 点击历史记录查询
   * @param e 
   */
  search(e:vantEvent){
    this.setData({
      mac:e.target.id
    })
    this.scanRequst()
  },

  /**
   * 添加历史记录
   * @param mac 
   */
  addHis(mac: string) {
    if (this.data.macs.length > 5) {
      this.data.macs.pop()
    }
    const macSet = new Set(this.data.macs)
    macSet.add(mac)
    this.setData({
      macs: [...macSet]
    })
    wx.setStorage({
      key: 'macHis',
      data: [...macSet]
    })
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

  async resetDtu() {
    wx.showModal({
      title: "重启Dtu",
      content: "确定现在重启Dtu吗?",
      success: async () => {
        const uart = `+++AT+Z`
        wx.showLoading({ title: '正在修改' })
        const { code, data } = await api.sendATInstruct(this.data.terminal.DevMac, uart)
        wx.hideLoading()
        if (code) {
          wx.showToast({
            title: 'success',
            content: data.msg
          })
        }
      }
    })
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
      url: '/pages/admin/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac: this.data.terminal.DevMac, Type })
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
  },



  /**
   * 生成标签
   */
  /* async generateLabel() {
    this.setData({
      qrReady: false
    })
    const mac = this.data.terminal.DevMac
    const pic_readmeqr = await this.dowmPic("https://www.ladishb.com/upload/9_18_2021_qrcode_www.yuque.com.png")
    const pic_wpqr = await this.dowmPic("https://www.ladishb.com/upload/3312021__LADS_Uart.5df2cc6.png")
    const pic_mac = await this.generateFile(mac)
    this.setData({
      qrReady: true
    })
    const res = await new Promise<any>(resolve => {
      wx.createSelectorQuery()
        .select("#canvas1")
        .fields({ node: true, size: true })
        .exec(res => resolve(res))
    })
    const canvas = res[0].node as WechatMiniprogram.Canvas
    canvas.height = 180
    canvas.width = 380
    const ctx = canvas.getContext("2d") as WechatMiniprogram.CanvasContext
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 350, 200);
    ctx.fillStyle = "#000000";
    ctx.drawImage(await this.generateCanvasImg(canvas, pic_readmeqr), 10, 5, 110, 95)
    ctx.fillText('操作说明', 50, 110)
    ctx.drawImage(await this.generateCanvasImg(canvas, pic_wpqr), 120, 5, 110, 95)
    ctx.fillText('小程序', 165, 110)
    ctx.drawImage(await this.generateCanvasImg(canvas, pic_mac), 230, 5, 110, 95)
    ctx.fillText('mac:' + mac, 240, 110)
  }, */

  /**
   * 下载标签
   */
  /* async downLabel() {
    const res = await new Promise<any>(resolve => {
      wx.createSelectorQuery()
        .select("#canvas1")
        .fields({ node: true, size: true })
        .exec(res => resolve(res))
    })
    const canvas = res[0].node as WechatMiniprogram.Canvas
    wx.canvasToTempFilePath({
      canvasId: "canvas1",
      quality: 1,
      canvas,
      fileType: "jpg",
      destHeight: 300,
      destWidth: 700,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            if (res.errMsg = "saveImageToPhotosAlbum:ok") {
              wx.showToast({
                title: "已保存到照片库",
                icon: "success"
              })
            }
          }
        })
      }
    })
  },

  async generateFile(code: string) {
    const base = await api.qr(code)
    const filePath = `${wx.env.USER_DATA_PATH}/${code}.png`
    const m = wx.getFileSystemManager()
    return await new Promise<string>(resolve => {
      m.writeFile({
        filePath,
        data: base.data.replace(/[\r\n]/g, '').slice(22),
        encoding: "base64",
        success() {
          resolve(filePath)
        },
        fail(e) {
          wx.showToast({
            title: e.errMsg,
            icon: "error"
          })
        }
      })
    })
  },
 */
  /**
   * 
   * @param canvas 
   * @param path 
   */
  /* generateCanvasImg(canvas: WechatMiniprogram.Canvas, path: string) {
    return new Promise<string>(resolve => {
      const img = canvas.createImage()
      img.onload = () => resolve(img as any)
      img.onerror = (e) => {
        wx.showToast({
          title: e.errMsg,
          icon: "error"
        })
      }
      img.src = path
    })
  },
 */
  /**
   * 下载文件
   */
  /* dowmPic(url: string) {
    const nArr = url.split("/")
    const name = nArr[nArr.length - 1]
    const filename = `${wx.env.USER_DATA_PATH}/${name}`
    //console.log({ nArr, name, filename });

    return new Promise<string>(resolve => {
      // 判断文件是否存在,不存在就下载文件
      const m = wx.getFileSystemManager()
      m.stat({
        path: filename,
        success() {
          resolve(filename)
        },
        fail(e) {
          console.log(e.errMsg);
          wx.downloadFile({
            url,
            filePath: filename,
            success(res) {
              resolve(res.filePath)
            },
            fail(e) {
              wx.showToast({
                title: e.errMsg,
                icon: "error"
              })
            }
          })
        }
      })
    })
  }, */
})