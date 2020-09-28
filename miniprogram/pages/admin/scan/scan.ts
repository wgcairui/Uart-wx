// miniprogram/pages/admin/scan/scan.js
const app = getApp<IAppOption>()
Page({
  data: {
    mac:'',
    iccd:'',
    userInfo:{}
  },
  
  async scanMac(){
    const result = await this.scan()
    this.setData({mac:result})
  },
  async scanICCD(){
    const result = await this.scan()
    this.setData({iccd:result})
  },

  // 扫码
  async scan(){ 
   const el = await wx.scanCode({});
    return el.result;
  }
})