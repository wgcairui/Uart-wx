// 保存设备参数解析状态

class unit {
  private cache: Map<string, { [x: string]: string }>
  constructor() {
    this.cache = new Map()
  }
  get(value: string | number, unit: string) {
    const unitObject = this.cache.get(unit)
    const valueStr = String(value)
    if (unitObject) {
      return unitObject[valueStr]
    } else {
      const parseObject = this.parse(unit)
      this.cache.set(unit, parseObject)
      return parseObject[valueStr]
    }
  }

  private parse(unit: string): { [x: string]: string } {
    const arr = unit.replace(/(\{|\}| )/g, "")
      .split(",")
      .map(el => {
        const [key, val] = el.split(":")
        return { [key]: val }
      })
    return Object.assign({}, ...arr)
  }
}

export default new unit()