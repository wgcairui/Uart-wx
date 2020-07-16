// miniprogram/pages/admin/scan/scan.js
import { webUrl } from "../../../utils/store";
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (_options) {
    console.log(webUrl);
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }else{
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true,
            })
          },
        })
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

  }
})