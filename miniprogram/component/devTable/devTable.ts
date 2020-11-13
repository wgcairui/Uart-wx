

// component/devTable/devTable.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result: {
      type: Array,
      observer(newval: queryResultArgument[], old: queryResultArgument[] | null) {
        if (old && old.length === newval.length) {
          // 比较新老数据，添加上下箭头
          // newval = newval
          newval.sort((o, t) => ~(Number(o.alarm || false) - Number(t.alarm || false))).forEach((el, index) => {
            const oldi = old[index]
            if (el.unit && el.name === oldi.name) {
              const ov = parseFloat(oldi.value)
              const nv = parseFloat(el.value)
              if (nv > ov) {
                el.step = '↑'
              } else {
                el.step = nv === ov ? '~' : '↓'
              }
            }else{
              el.step = ''
            }
          })
          this.setData({
            result: newval
          })
        }
      }
    }
  },
  data: {
    filter: '',
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
