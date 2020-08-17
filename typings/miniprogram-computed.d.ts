declare module 'miniprogram-computed'

type DataOption = Record<string, any>
declare namespace WechatMiniprogram {
  namespace Page {
    interface Data<D extends DataOption> {
      /** 页面的初始数据
       *
       * `data` 是页面第一次渲染使用的**初始数据**。
       *
       * 页面加载时，`data` 将会以`JSON`字符串的形式由逻辑层传至渲染层，因此`data`中的数据必须是可以转成`JSON`的类型：字符串，数字，布尔值，对象，数组。
       *
       * 渲染层可以通过 `WXML` 对数据进行绑定。
       */
      computed: any,
      watch: any,
      behaviors: [any]
    }
  }
}
