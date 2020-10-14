// 保存设备参数解析状态

class unit {
  private cache: Map<string, {
    value: string,
    unit: string
  }>
  constructor() {
    this.cache = new Map()
  }
  get(value: string | number, unit: string) {
    if (unit && /^{.*}$/.test(unit)) {
      const unitObject = this.cache.get(unit)
      if (unitObject) return unitObject
      else {
        const parseObject = this.parse(value, unit)
        this.cache.set(unit, parseObject)
        return parseObject
      }
    } else {
      return {
        value,
        unit
      }
    }

  }

  private parse(value: string | number, unit: string) {
    const arr = unit.replace(/(\{|\}| )/g, "")
      .split(",")
      .map(el => {
        const [key, val] = el.split(":")
        return { [key]: val }
      })
    const valueStr = String(value)
    return {
      value: Object.assign({}, ...arr)[valueStr] as string,
      unit: ''
    }
  }
}

export default new unit()