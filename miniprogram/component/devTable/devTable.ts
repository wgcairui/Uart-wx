

// component/devTable/devTable.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result: {
      type: null,
      observer(newval: queryResult, old: queryResult) {
        // console.log({ newval, old });
        if (newval.result) {
          const successData = [] as queryResultArgument[]
          const dangerData = [] as queryResultArgument[]
          newval.result.forEach(el => {
            if (el.alarm) dangerData.push(el)
            else successData.push(el)
          })
          if (old?.result && old.updatedAt !== newval.updatedAt && old.result.length === newval.result.length) {
            // 声明两个不同的数组存放告警和正常数据
            [...successData, ...dangerData].forEach((el, index) => {
              // 比较新老数据，添加上下箭头
              const oldi = old.result[index]
              if (el.unit && el.name === oldi.name) {
                const ov = parseFloat(oldi.value)
                const nv = parseFloat(el.value)
                if (nv > ov) el.step = '↑'
                else el.step = nv === ov ? '~' : '↓'
              } else el.step = ''
            })

          }
          this.setData({
            successData,
            dangerData
          })
        }
      }
    }
  },
  data: {
    filter: '',
    successData: [] as queryResultArgument[],
    dangerData: [] as queryResultArgument[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch() {
      this.triggerEvent('filter', { filter: this.data.filter })
    },
    // 进入参数状态
    onLine(event: vantEvent<queryResultArgument>) {
      if (event.currentTarget.dataset.item.unit) {
        this.triggerEvent('line', { name: event.target.id })
      }
    }
  }
})
