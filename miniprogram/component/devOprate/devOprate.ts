import { ObjectToStrquery } from "miniprogram/utils/util"
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
    oprate() {
      wx.showLoading({ title: '获取指令列表' })
      api.getDevOprate(this.data.protocol).then(({ arg }) => {
        wx.hideLoading()
        const items = arg.OprateInstruct?.map(el => el) || [{ name: '设备不支持操作指令' }]
        this.setData({
          actionItems: items,
          actionShow: true
        })
      })
    },
    actionClose() {
      this.setData({
        actionShow: false
      })
    },
    // 选择发送指令
    async actionSelect(event: vantEvent) {
      const oprate = event.detail as OprateInstruct
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
