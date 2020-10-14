

// component/devTable/devTable.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result: {
      type: Object
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
