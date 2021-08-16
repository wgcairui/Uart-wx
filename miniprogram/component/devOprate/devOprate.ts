import { sleep } from "../../utils/util"
import api from "../../utils/api"

// component/devOprate/devOprate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    protocol: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    actionShow: false,
    actionItems: [] as any
  },

  lifetimes: {
    ready() {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async oprate() {
      wx.showLoading({ title: '获取指令列表' })
      await sleep(500)
      api.getAlarmProtocol(this.data.protocol).then(({ data }) => {
        wx.hideLoading()
        const items = data.OprateInstruct.map(el => el)
        if (items.length > 0) {
          this.setData({
            actionItems: items,
            actionShow: true
          })
        } else {
          wx.showToast({
            title: '设备不支持指令'
          })
        }
      })
    },
    actionClose() {
      this.setData({
        actionShow: false
      })
    },
    // 选择发送指令
    async actionSelect(event: vantEvent) {
      const oprate = event.detail as Uart.OprateInstruct
      if (oprate.value) this.triggerEvent("oprate", { ...oprate })
    },

    // 
    opratealarm() {
      const itemList = ['显示参数', '参数限值', '参数状态']
      wx.showActionSheet({
        itemList,
        success: (res) => {
          this.triggerEvent('alarm', { type: res.tapIndex })
        },
        fail(err) {
          console.log(err);
        }
      })
    },

  }
})
